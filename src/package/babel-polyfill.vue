<template></template>

<script>
import Store from '../util.js';

let packageName = 'babelPolyfill';
const packageInfo = {
    displayName: 'babel/polyfill',
    devDepend: ['@babel/polyfill'],
    must: ['babel'],
    config: {
        entry: [
            {
                key: 'babelPolyfill',
                value: '@babel/polyfill',
                weight: 10
            }
        ]
    }
};

Store.commit('addPackage', {
    name: packageName,
    info: packageInfo
});
export default {};
</script>


