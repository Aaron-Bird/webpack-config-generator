<template>
    <nav>
        <ul>
            <li
                v-for="packageName in packageNameList"
                :key="packageName"
                :class="{'general-setting': packageName === 'generalSetting'}"
            >
                <label :for="'label-' + packageName" class="checkbox-square">
                    <input
                        :id="'label-' + packageName"
                        type="checkbox"
                        name="package-checkbox"
                        :checked="isChecked(packageName)"
                        @click="checked(packageName, $event)"
                    >
                    <span :data-package="packageName"></span>
                </label>
                <div
                    class="package-name"
                    @click="switchConfigPage(packageName)"
                >{{ packag[packageName].displayName }}</div>
            </li>
        </ul>
    </nav>
</template>

<script>
import Store from './util.js';

export default {
    data() {
        return {};
    },
    computed: {
        packag() {
            return Store.state.package;
        },
        packageNameList() {
            return Object.keys(Store.state.package);
        }
    },
    methods: {
        switchConfigPage(packageName) {
            Store.commit('updatePorperty', {
                key: 'currentPackagePage',
                value: packageName
            });
        },
        isChecked(packageName) {
            return Store.state.use.indexOf(packageName) !== -1;
        },
        checked(packageName, event) {
            let use = Store.state.use;
            let packageNameindexInUse = use.indexOf(packageName);

            if (event.target.checked) {
                if (packageNameindexInUse === -1) {
                    use.push(packageName);
                }
                let packag = Store.state.package[packageName];
                // conflict
                let conflictList = packag.conflict;
                if (conflictList && conflictList.length) {
                    for (let conflictName of conflictList) {
                        let index = use.indexOf(conflictName);
                        if (index >= 0) {
                            use.splice(index, 1);
                        }
                    }
                }
                // must
                let mustList = packag.must;
                if (mustList && mustList.length) {
                    for (let mustName of mustList) {
                        let index = use.indexOf(mustName);
                        if (index === -1) {
                            use.push(mustName);
                        }
                    }
                }
            } else {
                if (packageNameindexInUse >= 0) {
                    use.splice(packageNameindexInUse, 1);
                }
                for (let i = use.length - 1; i >= 0; i--) {
                    let name = use[i];
                    let packageMustList = Store.state.package[name].must;
                    if (!packageMustList) continue;
                    if (packageMustList.indexOf(packageName) >= 0) {
                        use.splice(i, 1);
                    }
                }
            }
        }
    }
};
</script>

<style scoped>
nav {
    overflow-y: auto;
    height: calc(100% - 120px);
}

nav ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

nav li {
    display: block;
    height: 42px;
    margin: 0;
    padding: 0;
    line-height: 44px;
    user-select: none;
    transition: 0.4s;
    white-space: nowrap;
    text-overflow: ellipsis;
}

nav li > * {
    font-size: 0.875rem;
}

nav li:hover {
    background: rgba(0, 0, 0, 0.05);
}

.general-setting {
    position: relative;
}

.general-setting:after {
    position: absolute;
    bottom: 0;
    left: 5px;
    display: block;
    width: calc(100% - 10px);
    height: 1px;
    content: '';
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.general-setting label {
    visibility: hidden;
}

label.checkbox-square {
    position: relative;
    display: block;
    float: left;
    width: 30px;
    height: 100%;
    cursor: pointer;
    user-select: none;
}

label.checkbox-square > input {
    display: none;
}

label.checkbox-square > span {
    position: relative;
    position: absolute;
    top: 49%;
    left: 50%;
    display: inline-block;
    width: 20px;
    height: 20px;
    user-select: none;
    transition: 0.1s ease;
    transform: translate(-50%, -50%);
    vertical-align: top;
    border: 1px solid #343434;
}

label.checkbox-square > span:before {
    display: block;
    height: 100%;
    content: '';
    transition: 0.2s;
    opacity: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABJUlEQVR4Ae3UgUZEURSF4aO5epQg5O79CL1AgUCIECEMAhTQcwQCknGDCb1YOiUs5HKagTlL/38fYH/L5RQiIiIiIiIiIvrdeGzNz8eseenNr1nj2pivCa58fUtfviZ482vcm/DjCT58+PDh/yP+njv/GT58+PDhb9LCnJ8T/O2K03wpgy0/T/Ija05lYcmPsx9+1QQv/ngenzqpCZ58TbDhHx3Mnl6VDYrVLvgqLubO5/THF2no4N0fr7aeMOR6p/zGhHUZLPitCQb81gQDfmOCAb8xoXe+ypvGhL757QmH+33zGxO++e8981UuZye8xluD3/1fcOFrgi9fEyz5ary15muCL18TfPma4MvXBEu+ijtXvsoHX74mePH9IyIiIiIiIvoCNddudozLkb4AAAAASUVORK5CYII=)
        no-repeat;
    background-size: 14px;
    background-size: contain;
}

label.checkbox-square > input:checked + span:before {
    opacity: 1;
}
</style>

