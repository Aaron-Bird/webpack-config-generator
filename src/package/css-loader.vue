<template></template>

<script>
import Store from '../util.js';

let packageName = 'cssLoader';
const packageInfo = {
    displayName: 'css-loader',
    devDepend: ['style-loader', 'css-loader'],
    callback: {
        before(config) {
            let hasVue = Store.state.use.indexOf('vue') >= 0;
            let rulesUse = packageInfo.config.module.rules[0].use;
            let devDepend = packageInfo.devDepend;
            if (hasVue && devDepend[0] === 'style-loader') {
                this.$set(devDepend, 0, 'vue-style-loader');
                this.$set(rulesUse, 0, 'vue-style-loader');
            }
            if (!hasVue && devDepend[0] === 'vue-style-loader') {
                this.$set(devDepend, 0, 'style-loader');
                this.$set(rulesUse, 0, 'style-loader');
            }
        }
    },
    config: {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        }
    }
};

Store.commit('addPackage', {
    name: packageName,
    info: packageInfo
});
export default {};
</script>


