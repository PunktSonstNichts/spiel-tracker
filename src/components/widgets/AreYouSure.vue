<template>
    <div>
        <div v-if="stage1" style="display: inline;" @click="nextStage()">
            <slot />
        </div>
        <div v-else>
            <span>Bist du sicher?</span>
            <button size="sm" @click="stage1 = true">Abbrechen</button>
            <button :variant="variant || 'danger'" @click="confirm()">
                {{ confirmMsg || "Bestätigen" }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "AreYouSure",
    props: {
        confirmMsg: {
            type: String,
            default: () => false,
        },
        variant: {
            type: [String, Boolean],
            default: () => false,
        },
    },
    data() {
        return {
            stage1: true,
        };
    },
    methods: {
        nextStage() {
            this.stage1 = false;
        },
        confirm() {
            this.$emit("confirm");
            this.stage1 = true;
        },
    },
};
</script>

<style scoped>
button {
    margin: 0 6px;
}
</style>
