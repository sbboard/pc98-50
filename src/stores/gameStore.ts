import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { games, type Game } from '../composables/games.ts';

export const useGameStore = defineStore('game', () => {
    const gamesRef = ref(
        games.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        })
    );
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

        const params = new URLSearchParams(window.location.search);
        const progress = params.get('progress')?.split('') || [];
        progress[gameIdx] =
            game.status === 'inactive' ? '0' : game.status === 'progress' ? '1' : '2';

        params.set('progress', progress.join(''));
        window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
    }

    function setCurrentGame(game: Game | null) {
        currentGame.value = game;
    }

    return { gamesRef, currentGame, updateGameStatus, setCurrentGame };
});
