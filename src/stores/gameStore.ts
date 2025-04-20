import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { games, type Game } from '../composables/games.ts';

export const useGameStore = defineStore('game', () => {
    const gamesRef = ref(games);
    const currentGame: Ref<Game | null> = ref(null);

    function updateGameStatus(gameName: string) {
        const game = gamesRef.value.find(game => game.name === gameName);
        const gameIdx = gamesRef.value.findIndex(game => game.name === gameName);
        if (!game) return;
        if (game.status === 'inactive') {
            game.status = 'progress';
        } else if (game.status === 'progress') {
            game.status = 'complete';
        } else if (game.status === 'complete') {
            game.status = 'inactive';
        }

        const path = window.location.pathname.split('');
        path[gameIdx + 1] =
            game.status === 'inactive' ? '0' : game.status === 'progress' ? '1' : '2';

        window.history.replaceState(null, '', path.join(''));
    }

    function setCurrentGame(game: Game | null) {
        currentGame.value = game;
    }

    return { gamesRef, currentGame, updateGameStatus, setCurrentGame };
});
