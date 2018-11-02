<template></template>

<script>
import Store from '../util.js';

let packageName = 'babel';
const packageInfo = {
    displayName: 'babel',
    devDepend: ['babel-loader', '@babel/core', '@babel/cli', '@babel/preset-env'],
    config: {
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage'
                                    }
                                ]
                            ]
                        }
                    }
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


