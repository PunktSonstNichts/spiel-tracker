<template>
    <div id="app">
        <div id="game">
            <h1>{{ (gameSettings ? gameSettings.name : false) || "Das Spiel" }}</h1>
            <span>{{ totalRounds }} gespielte Runden</span>
        </div>
        <Settings v-model="gameSettings" />
        <div id="player-wrapper">
            <Player
                v-for="(player, i) in players"
                :key="player.id"
                v-model="players[i]"
                class="player"
                :game-settings="gameSettings"
                @delete="deletePlayer(player)"
            >
                <template>
                    <HandiCap
                        v-for="(handicap, x) in handicaps"
                        :key="handicap"
                        v-model="players[i].handicaps[handicaps[x]]"
                        :name="handicap"
                    />
                </template>
            </Player>
            <div
                v-if="!gameSettings || gameSettings.playerCount === undefined"
                id="add-player"
                @click="addPlayer()"
            >
                <span>Spieler hinzufügen</span>
            </div>
        </div>
        <div>
            <h2>Handicaps für alle</h2>

            <HandiCap v-for="(handicap, x) in handicaps" :key="x" :name="handicap" />
        </div>
        <button @click="log()">Neues Spiel (Spielstand zurücksetzen)</button>
    </div>
</template>

<script>
import Settings from "@/views/Settings";
var axios = require("axios");
import Player from "./components/Player.vue";
import HandiCap from "./components/HandiCap.vue";

export default {
    name: "App",
    components: {
        Settings,
        Player,
        HandiCap,
    },
    data() {
        return {
            gameSettings: null,
            players: [
                {
                    id: 0,
                    name: null,
                    winCount: [],
                    handicaps: {},
                },
                {
                    id: 1,
                    name: null,
                    winCount: [],
                    handicaps: {},
                },
                {
                    id: 2,
                    name: null,
                    winCount: [],
                    handicaps: {},
                },
            ],
            handicaps: ["Bier", "Kippen"],
        };
    },
    computed: {
        filteredPlayers() {
            return this.players.filter(Boolean);
        },
        totalRounds() {
            return this.players.map((player) => player.winCount.length).reduce((a, b) => a + b);
        },
    },
    watch: {
        players: {
            deep: true,
            handler: console.log,
        },
        gameSettings: {
            deep: true,
            handler: "adjustGameToSettings",
        },
    },
    mounted() {
        console.log(this.players);
        this.players = this.players.filter(Boolean);
        /*        axios.post("http://localhost:/").then((response) => {
            console.log(response);
        });*/
    },

    methods: {
        addPlayer() {
            this.players.push({
                id: this.filteredPlayers[this.filteredPlayers.length - 1].id + 1,
                name: null,
                winCount: [],
                handicaps: {},
            });
        },
        deletePlayer(player) {
            if (this.players.length >= 2) {
                this.players.splice(this.players.indexOf(player), 1);
            }
        },
        adjustGameToSettings() {
            if (this.gameSettings && this.gameSettings.playerCount) {
                if (this.players.length > this.gameSettings.playerCount) {
                    this.players.splice(
                        this.gameSettings.playerCount,
                        this.players.length - this.gameSettings.playerCount
                    );
                } else {
                    for (let i = this.players.length; i < this.gameSettings.playerCount; i++) {
                        this.addPlayer();
                    }
                }
            }
        },
        log() {
            console.log(this.players);
            console.log(this.filteredPlayers);
        },
    },
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
#player-wrapper {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}
.player,
#add-player {
    margin: 12px;
    width: 250px;
    min-height: 140px;
}
#add-player {
    border-radius: 6px;
    border: 1px dotted;
    display: flex;
    justify-content: center;
    align-items: center;
    color: dimgrey;
}
</style>
