<template>
    <div id="package-config">
        <p>
            <label class="option">contentBase:</label>
            <input v-model.trim="config.devServer.contentBase">
        </p>
        <p>
            <label class="option">watchContentBase:</label>
            <input type="checkbox" v-model="config.devServer.watchContentBase">
        </p>
        <p>
            <label class="option">host:</label>
            <input v-model.trim="config.devServer.host">
        </p>
        <p>
            <label class="option">port:</label>
            <input v-model.number="config.devServer.port">
        </p>
        <p>
            <label class="option">open:</label>
            <input type="checkbox" v-model="config.devServer.open">
        </p>
        <p>
            <label class="option">public:</label>
            <input v-model.trim="config.devServer.public">
        </p>
        <p>
            <label class="option">hot:</label>
            <input type="checkbox" @click="hotEvent($event)" :checked="config.devServer.hot">
        </p>
    </div>
</template>

<script>
import Store from '../util.js';

let packageName = 'webpackDevServer';
const packageInfo = {
    displayName: 'webpack-dev-server',
    depend: [],
    devDepend: ['webpack-dev-server'],
    require: [
        {
            identifier: 'webpack',
            path: 'webpack',
            weight: 1
        }
    ],
    config: {
        entry: [
            {
                key: 'webpackDevServer',
                value: [
                    'webpack-dev-server/client?http://0.0.0.0:8080',
                    'webpack/hot/only-dev-server'
                ],
                weight: 1
            }
        ],
        devServer: {
            contentBase: './dist',
            watchContentBase: true,
            host: '0.0.0.0',
            port: 8000,
            open: true,
            public: '127.0.0.1:8000',
            hot: true
        },
        plugins: ['%new webpack.HotModuleReplacementPlugin()%']
    }
};

Store.commit('addPackage', {
    name: packageName,
    info: packageInfo
});

export default {
    data() {
        return {
            config: packageInfo.config
        };
    },
    methods: {
        hotEvent: function(event) {
            let checked = event.target.checked;
            this.config.devServer.hot = checked;
            if (checked) {
                this.$set(this.config, 'plugins', ['%new webpack.HotModuleReplacementPlugin()%']);
            } else {
                this.$delete(this.config, 'plugins');
            }
        }
    }
};
</script>

