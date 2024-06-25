<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { Game, AUTO, Scale } from "phaser";
import { Preloader } from "./game/Preloader";
import { Home } from "./game/Home";
import { Login } from "./game/Login";
import { Main } from "./game/Main";
import { Pause } from "./game/Pause";
import { End } from "./game/End";

//判断是否为移动端
let isMobile = /(iPhone|iPad|Android)/i.test(navigator.userAgent);

let game: Game;
onMounted(() => {
    game = new Game({
        parent: "container",
        type: AUTO,
        width: 375,
        // 高度依据屏幕宽高比计算
        height: isMobile ? (window.innerHeight / window.innerWidth) * 375 : 667,
        scale: {
            mode: isMobile ? Scale.FIT : Scale.NONE,
        },
        physics: {
            default: "arcade",
            arcade: {
                debug: false,
            },
        },
        dom :{
            createContainer: true
        },
        scene: [Preloader, Login , Home , Main , Pause, End],
    });
});
 
onUnmounted(() => {
    game.destroy(true);
});
</script>

<template>
    <div id="container"></div>
</template>

<style>
body {
    margin: 0;
}
#app {
    height: 100%;
}
</style>