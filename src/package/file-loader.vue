<template></template>

<script>
import Store from '../util.js';

let packageName = 'fileLoader';
const packageInfo = {
    displayName: 'file-loader',
    devDepend: ['file-loader'],
    config: {
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ['file-loader']
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


