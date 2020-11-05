<template>
    <div>
        <span v-if="isInSpanMode" id="span">
            {{ name }}
            <div id="edit-btn" @click="changeToInput()">edit</div>
        </span>
        <input v-else v-model="name" @blur="changeToSpan()" />
    </div>
</template>

<script>
export default {
    name: "SpanOrInput",
    props: {
        value: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            name: this.value,
            isInSpanMode: false,
        };
    },
    watch: {
        name: (newVal) => {
            this.$emit("input", newVal);
        },
    },
    methods: {
        changeToInput() {
            this.isInSpanMode = false;
        },
        changeToSpan() {
            if (this.name != null && !(this.name.length === 0 || !this.name.trim())) {
                this.isInSpanMode = true;
            }
        },
    },
};
</script>

<style scoped>
#edit-btn {
    display: none;
}
#span:hover #edit-btn {
    display: inline;
}
</style>
