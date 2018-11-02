<template>
    <div id="package-config">
        <p>
            <label>mode:</label>
            <input v-model="config.mode" value="development" type="radio" name="mode">
            <label>development</label>
            <input v-model="config.mode" value="production" type="radio" name="mode">
            <label>production</label>
        </p>
        <p>
            <label>entry:</label>
            <input v-model.trim="config.entry[0].value">
        </p>
        <p>
            <label>output.filename:</label>
            <input v-model.trim="config.output.filename">
        </p>
        <p>
            <label>output.path:</label>
            <input
                @input="outputPathEvent($event, 'State.generalSetting.config.output', 'path')"
                :value="outputPath"
            >
        </p>
        <p>
            <label>devtool:</label>
            <input v-model="config.devtool" value="source-map" type="radio" name="devtool">
            <label>source-map</label>
            <input v-model="config.devtool" value="none" type="radio" name="devtool">
            <label>none</label>
        </p>
    </div>
</template>

<script>
import Store from '../util.js';

let packageName = 'generalSetting';
let packageInfo = {
    displayName: 'general setting',
    devDepend: ['webpack', 'webpack-cli'],
    require: [
        {
            identifier: 'path',
            path: 'path',
            weight: 1
        }
    ],
    config: {
        mode: 'development',
        entry: [
            {
                key: 'main',
                value: './src/main.js',
                weight: 0
            }
        ],
        output: {
            filename: '[name].js',
            path: `%path.resolve(__dirname, 'dist')%`
        },
        devtool: 'source-map'
    }
};

Store.commit('addPackage', {
    name: packageName,
    info: packageInfo
});

export default {
    computed: {
        config() {
            return packageInfo.config;
        },
        outputPath() {
            let value = packageInfo.config.output.path;
            return value.match(/^%(.*)%$/)[1];
        }
    },
    methods: {
        outputPathEvent(event, key) {
            console.log(event.target.value);
            let value = `%${event.target.value.trim()}%`;
            packageInfo.config.output.path = value;
        }
    }
};
</script>

