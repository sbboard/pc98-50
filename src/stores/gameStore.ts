import { ref } from 'vue';
import { defineStore } from 'pinia';
import { games } from '../composables/games.ts';

export const useGameStore = defineStore('game', () => {
    const gamesRef = ref(games);

    function updateGameStatus(gameName: string) {
        const game = gamesRef.value.find(game => game.name === gameName);
        if (!game) return;
        if (game.status === 'inactive') {
            game.status = 'progress';
        } else if (game.status === 'progress') {
            game.status = 'complete';
        } else if (game.status === 'complete') {
            game.status = 'inactive';
        }
    }
    return { gamesRef, updateGameStatus };
});
