<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import GameDiscs from './components/gameDiscs.vue';
import InfoBar from './components/infoBar.vue';
import { useGameStore } from './stores/gameStore.ts';

const gameStore = useGameStore();
const currentScale = ref(1);
const scaleValue = computed(() => `scale(${currentScale.value})`);

function changeScale() {
    if (currentScale.value === 4) {
        currentScale.value = 1;
    } else currentScale.value += 1;
}

onMounted(() => {
    addEventListener('keydown', e => {
        if (e.key === 's') {
            changeScale();
        }
    });
});
</script>

<template>
    <div id="main">
        <div class="games">
            <GameDiscs v-for="(game, idx) in gameStore.gamesRef" :game :idx :key="game.name" />
        </div>
        <InfoBar />
    </div>
    <div class="scale" @click="changeScale">{{ currentScale }}x</div>
</template>

<style scoped lang="scss">
#main {
    background: url('/sLibraryBG_0.png');
    width: 384px;
    position: relative;
    transform: v-bind(scaleValue);
    image-rendering: pixelated;
    transition: transform 0.25s;
    .games {
        padding: 30px;
        padding-top: 16px;
        line-height: 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        user-select: none;
    }
}
</style>
