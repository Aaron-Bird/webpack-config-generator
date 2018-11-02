<template>
    <div>
        <pre id="yarn-command">{{ selected }}</pre>
        <pre id="webpack-config-js"><code v-html="webpackConfig"></code></pre>
        <div id="download-webpack-config" @click="download"></div>
    </div>
</template>

<script>
import Store from './util.js';
// import Beautify from 'js-beautify/js';
import Prism from 'prismjs';
import 'prismjs/themes/prism-solarizedlight.css';

export default {
    data() {
        return {};
    },
    computed: {
        selected() {
            let dependList = this.getDependList();
            let devDependList = this.getDevDependList();
            let code = '';
            if (dependList.length) {
                code += 'yarn add ';
                code += dependList.join(' ');
                code += '\n';
            }
            if (devDependList.length) {
                code += 'yarn add --dev ';
                code += devDependList.join(' ');
            }
            return code;
        },
        webpackConfig() {
            let code = this.getCode();
            code = Prism.highlight(code, Prism.languages.javascript, 'javascript');
            return code;
        }
    },
    methods: {
        getType(value) {
            let type = Object.prototype.toString.call(value);
            return type.match(/^\[object (.*?)\]$/)[1];
        },
        download() {
            let a = document.createElement('a');
            a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.getCode());
            a.download = 'webpack.config.js';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        getCode() {
            let code = '';
            code += this.getRequireCode();
            code += this.getModuleExportsCode() + '\n';
            // code = Beautify(code, {
            //     indent_size: 4,
            //     wrap_line_length: 80
            // });
            return code;
        },
        getRequireCode() {
            let packageList = Store.state.package;
            let usePackageList = Store.state.use;
            // Get 'require' from the package
            let requireList = [];
            let requireIdentifierList = [];
            for (let usePackage of usePackageList) {
                let packag = packageList[usePackage];
                if (packag.require && packag.require.length > 0) {
                    for (let req of packag.require) {
                        // Skip repeat
                        if (requireIdentifierList.indexOf(req.identifier) === -1) {
                            requireList.push(req);
                            requireIdentifierList.push(req.identifier);
                        }
                    }
                }
            }
            // Sort by weight
            // Big in front
            requireList.sort(function(x, y) {
                return y.weight - x.weight;
            });
            // Generate code
            let code = '';
            for (let req of requireList) {
                code += `const ${req.identifier} = require('${req.path}');\n`;
            }
            return code;
        },
        getModuleExportsCode() {
            let config = {
                mode: null,
                entry: [],
                output: null,
                devtool: null,
                module: {
                    rules: []
                },
                plugins: []
            };
            // Merge 'config'
            let packageList = Store.state.package;
            for (let usePackage of Store.state.use) {
                let packageInfo = packageList[usePackage];
                let packageConfig = packageInfo.config;
                // Callback.before
                if (packageInfo.callback && packageInfo.callback.before) {
                    packageInfo.callback.before.call(this, config);
                }

                for (let key of Object.keys(packageConfig)) {
                    if (key === 'entry') {
                        if (packageConfig.entry && packageConfig.entry.length > 0) {
                            config.entry = config.entry.concat(packageConfig.entry);
                        }
                    } else if (key === 'module') {
                        if (packageConfig.module.rules && packageConfig.module.rules.length > 0) {
                            config.module.rules = config.module.rules.concat(
                                packageConfig.module.rules
                            );
                        }
                    } else if (key === 'plugins') {
                        if (packageConfig.plugins && packageConfig.plugins.length > 0) {
                            config.plugins = config.plugins.concat(packageConfig.plugins);
                        }
                    } else {
                        config[key] = packageConfig[key];
                    }
                }
                // Callback.after
                if (packageInfo.callback && packageInfo.callback.after) {
                    packageInfo.callback.after.call(this, config);
                }
            }
            // Processing 'config.entry'
            if (config.entry.length > 0) {
                config.entry.sort(function(x, y) {
                    return y.weight - x.weight;
                });
                let temp = config.entry;
                config.entry = {};
                for (let i of temp) {
                    config.entry[i.key] = i.value;
                }
            } else {
                delete config.entry;
            }
            // Remove empty 'config.module'
            if (config.module.rules.length === 0) delete config.module;
            // Remove empty 'config.plugins'
            if (config.plugins.length === 0) delete config.plugins;

            // Generate code
            let code = 'module.exports = ';
            code += this.convModuleExportsToStr(config);
            code += ';';
            return code;
        },
        convModuleExportsToStr(value, intendSize = 4) {
            let type = this.getType(value);
            let code = '';

            if (type === 'Object') {
                let keyList = Object.keys(value);
                let keyListLen = keyList.length;

                code += '{';
                code += '\n';
                for (let i = 0; i < keyListLen; i++) {
                    let key = keyList[i];
                    code += ' '.repeat(intendSize);
                    code += key + ': ' + this.convModuleExportsToStr(value[key], intendSize + 4);
                    if (i !== keyListLen - 1) code += ', ';
                    code += '\n';
                }
                code += ' '.repeat(intendSize - 4);
                code += '}';
            } else if (type === 'Array') {
                code += '[';
                code += '\n';
                let valueLen = value.length;
                for (let i = 0; i < valueLen; i++) {
                    code += ' '.repeat(intendSize);
                    code += this.convModuleExportsToStr(value[i], intendSize + 4);
                    if (i !== valueLen - 1) code += ', ';
                    code += '\n';
                }
                code += ' '.repeat(intendSize - 4);
                code += ']';
            } else if (type === 'String') {
                if (/^%([\w\W]*)%$/.test(value)) {
                    code += value.match(/^%([\w\W]*)%$/)[1];
                } else {
                    code += `'` + value + `'`;
                }
            } else {
                code += value;
            }
            return code;
        },
        getDependList() {
            let dependList = [];
            for (let key of Store.state.use) {
                let packageDepend = Store.state.package[key].depend;
                if (!packageDepend) continue;
                for (let i of packageDepend) {
                    if (dependList.indexOf(i) === -1) {
                        dependList.push(i);
                    }
                }
            }
            return dependList;
        },
        getDevDependList() {
            let devDependList = [];
            for (let key of Store.state.use) {
                let packageDevDepend = Store.state.package[key].devDepend;
                if (!packageDevDepend) continue;
                for (let i of packageDevDepend) {
                    if (devDependList.indexOf(i) === -1) {
                        devDependList.push(i);
                    }
                }
            }
            return devDependList;
        }
    }
};
</script>

<style scoped>
div {
    font-size: 0.875rem;
}

#yarn-command {
    white-space: pre-wrap;
}

#webpack-config-js {
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
}

#download-webpack-config {
    position: fixed;
    bottom: 20px;
    right: 10px;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 3px;
    cursor: pointer;
    transition: 0.2s ease;
}

#download-webpack-config:before {
    position: absolute;
    top: 49%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAMAAACPWYlDAAAAQlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////8IX9KGAAAAFXRSTlMAM/xvU/h/dktFi2VeWLu1N+jWCwlKlXoCAAAApUlEQVQ4y+3NSw6DIABFURAF/GDth/1vtVbT3hQI0KQzfXGg5B4R6T1u17v4ZdJ7eYITHBNIvZTBojmZfdeXQN/5+fOhPAIQ9o0VX8LmgF37dntD8IMYtA09giNAske4NHD0gfAuBSYuj8UUAfq0GEMw0mcEQO19TigAfV4ADH1OmDfQ9HmhdzDQl8TwAvQV4rI+9GWxjb4s6Ctn6GsFfeWkFH/aE8pNDwep/DvnAAAAAElFTkSuQmCC');
    background-size: 25px;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.6;
    transition: 0.4s;
}

#download-webpack-config:hover {
}

#download-webpack-config:hover:before {
    opacity: 1;
}
</style>
