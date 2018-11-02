<template></template>

<script>
import Store from '../util.js';

let packageName = '';
const packageInfo = {
    displayName: '',
    depend: [],
    devDepend: [],
    must: [],
    conflict: [],
    require: [],
    config: {},
    callback: {
        before(config) {},
        after(config) {}
    }
};

Store.commit('addPackage', {
    name: packageName,
    info: packageInfo
});
export default {
    data() {
        return {};
    }
};
</script>


<style scoped>
</style>

