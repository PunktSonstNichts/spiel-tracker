module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/recommended",
        "eslint:recommended",
        "prettier/vue",
        "plugin:prettier/recommended"
    ],
    rules: {
        "vue/component-name-in-template-casing": ["error", "PascalCase"],
        "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "prettier/prettier": ["error", {
            "tabWidth": 4,
            "jsxBracketSameLine": true,
            "htmlWhitespaceSensitivity": "ignore",
            "printWidth": 100
        }]
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};