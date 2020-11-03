<template>
    <div id="wrapper">
        <div id="handicap" @click="add()">
            <span>+1</span>
            <span id="handicap-name">{{ name }}</span>
        </div>
        <span id="handicap-counter">{{ list.length }}</span>
    </div>
</template>

<script>
export default {
    name: "HandiCap",
    props: {
        name: {
            type: String,
            default: "",
        },
        value: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            list: this.value,
        };
    },
    methods: {
        add() {
            this.list.push(new Date());
            this.$emit("input", this.list);
        },
    },
};
</script>

<style scoped>
#wrapper {
    display: flex;
    border: 1px solid rgba(33, 33, 33, 0.3);
    border-radius: 4px;
}
#handicap {
    flex: 1;
}
</style>
