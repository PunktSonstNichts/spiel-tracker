<template>
    <div id="player">
        <h3>{{ player.winCount.length }}</h3>
        <input v-model="player.name" />
        <button @click="addWin()">Gewonnen!</button>
        <slot>
            <p>Keine Widgets :/</p>
        </slot>
        <button @click="deletePlayer()">{{ player.name || "Spieler" }} löschen</button>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
        value: {
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
