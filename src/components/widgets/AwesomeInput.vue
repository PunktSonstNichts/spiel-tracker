<template>
    <div :class="{ underline: isUnderline, labelFloating: isLabelFloating, input_field: true }">
        <input
            v-model="input_value"
            class="input_input"
            type="text"
            :name="label"
            @blur="handleBlur"
            @focus="handleFocus"
        />
        <label class="input_label" :for="label">{{ label }}</label>
        <span class="input_focusline"></span>
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
        label: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            input_value: this.value,
            isUnderline: false,
            isLabelFloating: !!this.value,
        };
    },
    watch: {
        input_value: {
            immediate: true,
            handler(newVal) {
                console.log(newVal);
                this.$emit("input", newVal);
            },
        },
    },
    methods: {
        handleFocus() {
            console.log("focusing");
            this.isUnderline = true;
            this.isLabelFloating = true;
        },
        handleBlur() {
            this.isUnderline = false;
            this.isLabelFloating = !!this.value;
        },
    },
};
</script>

<style scoped>
.input_field {
    position: relative;
    border-bottom: 1px solid rgba(204, 196, 188, 0.8);
    transition-property: border, padding;
    transition-duration: 0.25s;
    transition-timing-function: cubic-bezier(0.66, 0.13, 0.4, 0.99);
    margin: 10px 5px;
}

.input_field.underline {
    border-bottom: 1px solid rgba(23, 95, 148, 0.8);
}

.input_field.error {
    border-bottom: 1px solid rgba(228, 70, 31, 0.8) !important;
}

.input_field.underline.error {
    border-bottom: 1px solid rgba(251, 149, 33, 0) !important;
}

.input_input {
    display: block;
    margin: 0;
    padding-top: 0.5em;
    width: 100%;
    min-height: 2.5rem;
    font-size: inherit;
    font-weight: 700;
    line-height: inherit;
    text-align: left;
    color: rgb(0, 58, 121);
    background: none;
    border: none;
    transition: color 0.25s cubic-bezier(0.66, 0.13, 0.4, 0.99);
    resize: none;
    outline: 0;
    border-radius: 0;
}

.input_label {
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    color: rgb(44 62 80);
    top: 1.1875rem;
    font-size: inherit;
    font-weight: 700;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    transition-property: top, font-size, color, opacity;
    transition-duration: 0.25s;
    transition-timing-function: cubic-bezier(0.66, 0.13, 0.4, 0.99);
}

.input_field.labelFloating > .input_label {
    top: 0;
    font-size: 0.75rem;
}

.input_focusline {
    display: block;
    position: relative;
    width: 0;
    margin-top: -2px;
    height: 2px;
    background: rgb(0, 58, 121);
    opacity: 0;
    transition-property: width, opacity, background;
    transition-duration: 0.25s;
}

.input_field.underline > .input_focusline {
    opacity: 1;
    width: 100%;
}
</style>
