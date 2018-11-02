<template>
    <div class="package-config">
        <h2>{{currPackagedisplayName}}</h2>
        <component :is="currentPackagePage"></component>
    </div>
</template>

<script>
import Store from './util.js';

import GeneralConfig from './package/general-setting.vue';
import CssLoader from './package/css-loader.vue';
import SassLoader from './package/sass-loader.vue';
import FileLoader from './package/file-loader.vue';
import HtmlWebpackPlugin from './package/html-webpack-plugin.vue';
import WebpackDevServer from './package/webpack-dev-server.vue';
import VueTemplate from './package/vue.vue';
import Babel from './package/babel.vue';
import BabelPolyfill from './package/babel-polyfill.vue';

export default {
    computed: {
        currentPackagePage() {
            return Store.state.currentPackagePage;
        },
        currPackagedisplayName() {
            let packageName = Store.state.currentPackagePage;
            return Store.state.package[packageName].displayName;
        }
    },
    components: {
        generalSetting: GeneralConfig,
        cssLoader: CssLoader,
        sassLoader: SassLoader,
        fileLoader: FileLoader,
        htmlWebpackPlugin: HtmlWebpackPlugin,
        webpackDevServer: WebpackDevServer,
        vue: VueTemplate,
        babel: Babel,
        babelPolyfill: BabelPolyfill
    }
};
</script>

<style>
.package-config input {
    position: relative;
    width: 100%;
    padding: 8px 0;
    font-size: 0.875rem;
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    outline: 0;
    background: inherit;
}

.package-config .option {
    font-size: 1.2rem;
}

.package-config input[type] {
    width: auto;
}

.package-config input[type]:after {
    display: none;
}

.package-config input[type='radio'] {
    vertical-align: -2px;
}

.package-config input[type='checkbox'] {
    vertical-align: -1px;
}
</style>



