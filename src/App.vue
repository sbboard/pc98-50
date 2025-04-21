<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import GameDiscs from './components/gameDiscs.vue';
import InfoBar from './components/infoBar.vue';
import { useGameStore } from './stores/gameStore.ts';

const gameStore = useGameStore();
const { setCurrentGame } = gameStore;
const currentScale = ref(1);
const scaleValue = computed(() => `scale(${currentScale.value})`);

function changeScale() {
    if (currentScale.value === 3) {
        currentScale.value = 1;
    } else currentScale.value += 1;
}

const params = new URLSearchParams(window.location.search);
const progressParam = params.get('progress');
if (!progressParam) {
    const zeros = '0'.repeat(50);
    window.history.replaceState(null, '', `${window.location.pathname}?progress=${zeros}`);
} else {
    progressParam.split('').forEach((num, idx) => {
        let status: 'progress' | 'inactive' | 'complete' = 'inactive';
        if (num === '1') status = 'progress';
        if (num === '2') status = 'complete';
        gameStore.gamesRef[idx].status = status;
    });
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
            <GameDiscs
                v-for="(game, idx) in gameStore.gamesRef"
                :game
                :idx
                :key="game.name"
                @mouseover="setCurrentGame(game)"
            />
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
        padding: 16px 8px 16px 16px;
        line-height: 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        user-select: none;
    }
}
</style>
