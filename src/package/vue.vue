<template>
    <div id="package-config"></div>
</template>

<script>
import Store from '../util.js';

let packageName = 'vue';
let packageInfo = {
    displayName: 'vue',
    depend: ['vue'],
    devDepend: ['vue-template-compiler', 'vue-loader'],
    require: [
        {
            identifier: 'VueLoaderPlugin',
            path: 'vue-loader/lib/plugin',
            weight: 0
        }
    ],
    config: {
        module: {
            rules: [
                {
                    test: `%/\.vue$/%`,
                    loader: 'vue-loader'
                }
            ]
        },
        plugins: [`%new VueLoaderPlugin()%`]
    }
};
Store.commit('addPackage', {
    name: packageName,
    info: packageInfo
});

export default {};
</script>

