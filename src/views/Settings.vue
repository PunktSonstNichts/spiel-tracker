<template>
    <div>
        <h1>Einstellungen</h1>
        <select v-model="currentGame">
            <option v-for="(game, index) in presets" :key="index" :value="game">
                {{ game.name }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "SettingsVue",
    props: {
        value: {
            type: Object,
            default: () => {
                return {
                    name: "Arschloch",
                    differentPointsInRound: false,
                    Teams: null,
                    playerCount: undefined,
                };
            },
        },
    },
    data() {
        return {
            currentGame: null,
            presets: [
                {
                    name: "Doppelkopf",
                    differentPointsInRound: true,
                    Teams: 2,
                    playerCount: 4,
                },
                {
                    name: "Durak",
                    differentPointsInRound: false,
                    Teams: false,
                    playerCount: undefined,
                },
                {
                    name: "Backgammon",
                    differentPointsInRound: false,
                    playerCount: 2,
                },
            ],
        };
    },
    watch: {
        currentGame() {
            this.$emit("input", this.currentGame);
        },
    },
};
</script>

<style scoped></style>
