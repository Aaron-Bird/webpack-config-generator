<template>
    <p>
        <label class="option">inject:</label>
        <input type="radio" name="inject" value="head" v-model="inject">
        <label>head</label>
        <input type="radio" name="inject" value="body" v-model="inject">
        <label>body</label>
    </p>
</template>

<script>
import Store from '../util.js';

let packageName = 'htmlWebpackPlugin';
const packageInfo = {
    displayName: 'html-webpack-plugin',
    devDepend: ['html-webpack-plugin'],
    require: [
        {
            identifier: 'HtmlWebpackPlugin ',
            path: 'html-webpack-plugin',
            weight: 0
        }
    ],
    config: {
        plugins: [
            `%new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: 'body'
            })%`
        ]
    }
};

Store.commit('addPackage', {
    name: packageName,
    info: packageInfo
});
export default {
    data() {
        return {
            inject: 'body'
        };
    },
    watch: {
        inject: function(val) {
            console.log(this.inject);
            let plugins = packageInfo.config.plugins;
            this.$set(
                plugins,
                0,
                `%new HtmlWebpackPlugin({
                    template: './src/index.html',
                    inject: '${val}'
                })%`
            );
        }
    }
};
</script>


