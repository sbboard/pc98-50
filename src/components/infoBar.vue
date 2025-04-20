<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';
import { computed } from 'vue';

const gameStore = useGameStore();

//get game year
// const getGameYear = () => {
//     const currentGame = gameStore.currentGame;
//     if (currentGame) {
//         const year = currentGame.date.split('/')[2];
//         return year;
//     }
//     return '';
// };

const getGameYear = computed(() => {
    const currentGame = gameStore.currentGame;
    if (!currentGame) return '';
    const year = currentGame.date.split('/')[2];
    return year;
});
</script>

<template>
    <div id="infoBar">
        <div class="info">
            <div class="name">{{ gameStore.currentGame?.name.toUpperCase() }}</div>
            <div class="year">{{ getGameYear }}</div>
            <div class="genre">{{ gameStore.currentGame?.genre.toUpperCase() }}</div>
        </div>
        <img src="/sInfoBar_0.png" />
    </div>
</template>

<style scoped lang="scss">
#infoBar {
    position: absolute;
    bottom: -1px;
    height: 17px;
    font-family: 'Jersey 10', sans-serif;
    font-weight: 400;
    font-style: normal;
    img {
        position: absolute;
        height: 17px;
        z-index: 5;
    }
    .name,
    .year,
    .genre {
        color: white;
        position: absolute;
        z-index: 10;
        top: 9px;
        white-space: pre;
        font-size: 16px;
    }
    .name {
        left: 7px;
    }
    .year {
        left: 199px;
    }
    .genre {
        left: 247px;
    }
}
</style>
