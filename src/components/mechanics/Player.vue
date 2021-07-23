<template>
    <div id="player">
        <h3>{{ player.winCount.length }}</h3>
        <Rank :rank="rank"></Rank>
        <AwesomeInput v-model="player.name" label="Name" />
        <div v-if="gameSettings && gameSettings.differentPointsInRound">
            <input v-model="player.points" />
        </div>
        <div v-if="gameSettings && gameSettings.teams">
            <button>team</button>
        </div>
        <button v-else @click="addWin()">Gewonnen!</button>
        <slot>
            <p>Keine Widgets :/</p>
        </slot>
        <AreYouSure
            v-if="!gameSettings || gameSettings.playerCount === undefined"
            :confirm-msg="(player.name || 'Spieler') + ' wirklich löschen?'"
            @confirm="deletePlayer()"
        >
            <button>{{ player.name || "Spieler" }} löschen</button>
        </AreYouSure>
    </div>
</template>

<script>
import AreYouSure from "@/components/widgets/AreYouSure";
import AwesomeInput from "@/components/widgets/AwesomeInput";
import Rank from "@/components/widgets/Rank";
export default {
    name: "HelloWorld",
    components: { Rank, AwesomeInput, AreYouSure },
    props: {
        value: {
            type: Object,
            default: () => {},
        },
        rank: {
            type: Number,
            default: null,
        },
        gameSettings: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            player: this.value,
        };
    },
    computed() {

    },
    methods: {
        addWin() {
            this.player.winCount.push(new Date());
            this.$emit("input", this.player);
        },
        deletePlayer() {
            this.$emit("delete", this.player);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#player {
    display: flex;
    flex-direction: column;
}
#player > * {
    margin: 4px;
}
h3 {
    margin: 40px 0 0;
}
a {
    color: #42b983;
}
</style>
