<script setup lang="ts">
import type { Game } from '@/composables/games.ts';
import { useGameStore } from '@/stores/gameStore';
import { computed } from 'vue';

const gameStore = useGameStore();

const { game, idx } = defineProps<{
    game: Game;
    idx: number;
}>();

const webNo = idx % 6;

const disc = computed(() => {
    if (game.status === 'inactive') return '/sIconEmpty_3.png';
    if (game.status === 'complete') return '/sIconEmpty_5.png';
    return '/sIconEmpty_1.png';
});
</script>

<template>
    <div
        class="game"
        v-if="game.img"
        :class="game.status"
        @click="gameStore.updateGameStatus(game.name)"
    >
        <img v-if="game.status === 'inactive'" class="web" :src="`/sIconCobwebFull_${webNo}.png`" />
        <img class="label" :src="`/pc98/${game.img}`" />
        <img :src="disc" />
    </div>
</template>

<style scoped lang="scss">
.game {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 36px;
    cursor: pointer;
    & > * {
        pointer-events: none;
    }
    .label {
        width: 22px;
        height: 22px;
        position: absolute;
        left: 4px;
        top: 2px;
        image-rendering: -webkit-optimize-contrast;
        filter: sepia(0) hue-rotate(0deg) brightness(1) contrast(1) saturate(1);
        transition: filter 0.25s;
    }
    &.inactive {
        .label {
            filter: sepia(1) hue-rotate(-141deg) brightness(0.4) contrast(1.5) saturate(1);
        }
        .web {
            position: absolute;
            inset: 0;
            z-index: 100;
        }
    }
    &.complete .label {
        filter: sepia(1) hue-rotate(0deg) brightness(1) contrast(1) saturate(5);
    }
}
</style>
