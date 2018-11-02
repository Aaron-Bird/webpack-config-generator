<template>
    <div class="wrap">
        <aside>
            <div class="logo">webpack
                <br>conf<span>i</span>g
                <br>generator
            </div>
            <AsideComponent></AsideComponent>
        </aside>
        <main>
            <div id="package-config-wrap">
                <PackageConfig></PackageConfig>
            </div>
            <div id="webpack-config-wrap">
                <WebpackConfig></WebpackConfig>
            </div>
        </main>
    </div>
</template>

<script>
import AsideComponent from './aside.vue';
import PackageConfig from './packageConfig.vue';
import WebpackConfig from './webpackConfig.vue';

export default {
    components: {
        AsideComponent,
        PackageConfig,
        WebpackConfig
    }
};
</script>

<style>
.wrap {
    position: relative;
    height: 100%;
}

aside,
main {
    position: absolute;
    top: 0;
    bottom: 0;
}

main {
    right: 0;
    left: 220px;
}

aside {
    left: 0;
    overflow-y: hidden;
    width: 220px;
}

main #package-config-wrap {
    position: absolute;
    left: 0;
    overflow: auto;
    width: 400px;
    height: 100%;
    padding: 0 20px;
}

main #webpack-config-wrap {
    position: absolute;
    right: 0;
    left: 400px;
    overflow: auto;
    height: 100%;
    padding: 0 20px;
}

.logo {
    height: 120px;
    padding: 14px 0 16px 30px;
    font-family: 'Roboto', sans-serif;
    font-size: 1.1rem;
    line-height: 1.8rem;
    letter-spacing: 8.5px;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(0, 0, 0, 0.9);
}
</style>

<style>
aside,
main {
    opacity: 0;
}

aside,
main {
    animation: aside 0.4s ease 2s forwards;
}

@keyframes aside {
    100% {
        opacity: 1;
    }
}

.wrap:before {
    position: fixed;
    top: 40%;
    left: 50%;
    display: block;
    font-family: 'Roboto', sans-serif;
    font-size: 40px;
    font-weight: 700;
    content: 'webpack config generator';
    transform: translate(-50%, -50%);
    animation: wrap 1.8s ease 0.2s forwards;
    text-align: center;
    white-space: nowrap;
    text-transform: Uppercase;
    opacity: 0;
    color: rgba(0, 0, 0, 0.9);
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

@keyframes wrap {
    40% {
        top: 45%;
        opacity: 1;
    }
    80% {
        top: 45%;
        opacity: 1;
    }
    100% {
        top: 48%;
        opacity: 0;
    }
}

main #package-config-wrap,
main #webpack-config-wrap {
    border-left: 1px solid rgba(0,0,0,0.2);
}

/* main #package-config-wrap:before,
main #webpack-config-wrap:before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 1px;
    height: 0;
    content: '';
    animation: border-line 0.4s ease-out 2s forwards;
    background: rgba(0, 0, 0, 0.2);
}

main #webpack-config-wrap:before {
    animation-delay: 2.4s;
}

@keyframes border-line {
    100% {
        height: 100%;
    }
} */
</style>
