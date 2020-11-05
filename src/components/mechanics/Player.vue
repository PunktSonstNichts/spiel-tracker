<template>
    <div id="player">
        <h3>{{ player.winCount.length }}</h3>
        <SpanOrInput v-model="player.name" />
        <div v-if="gameSettings && gameSettings.differentPointsInRound">
            <input v-model="player.points" />
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
import SpanOrInput from "@/components/widgets/SpanOrInput";
export default {
    name: "HelloWorld",
    components: { SpanOrInput, AreYouSure },
    props: {
        value: {
            type: Object,
            default: () => {},
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
