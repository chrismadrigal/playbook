module.exports = {
    root: true,
    env: {
        node: true,
    },
    'extends': [
        'plugin:vue/recommended',
        '@vue/standard',
    ],
    rules: {
        'indent': ['error', 4, {
            'SwitchCase': 1,
        }, ],
        'no-console': 'off',
        'no-debugger': 'off',
        'semi': [ 2, 'always', ],
        'comma-dangle': [ 'error', 'always', ],
        'space-before-function-paren': [ 'error', 'never', ],

        // Vue Specific Rules
        'vue/attributes-order': [ 2, {
            'order': [
                'GLOBAL',
                'UNIQUE',
                'CONDITIONALS',
                'LIST_RENDERING',
                'RENDER_MODIFIERS',
                'BINDING',
                'DEFINITION',
                'OTHER_ATTR',
                'EVENTS',
                'CONTENT',
            ],
        }, ],
        'vue/html-closing-bracket-newline': [ 'error', {
            'singleline': 'never',
            'multiline': 'never',
        }, ],
        'vue/html-indent': [ 'error', 4, ],
        'vue/html-self-closing': [ 'error', {
            'html': {
                'void': 'always',
                'normal': 'never',
                'component': 'never',
            },
            'svg': 'never',
            'math': 'always',
        }, ],
        'vue/max-attributes-per-line': [2, {
            'singleline': 5,
            'multiline': {
                'max': 1,
                'allowFirstLine': false,
            },
        }, ],
        'vue/name-property-casing': [ 'error', 'kebab-case', ],
        'vue/order-in-components': [ 'error', {
            'order': [
                'el',
                'name',
                'parent',
                'mixins',
                [ 'components', 'directives', 'filters', ],
                'functional',
                [ 'delimiters', 'comments', ],
                'extends',
                'inheritAttrs',
                'model',
                [ 'props', 'propsData', ],
                'data',
                'computed',
                'watch',
                'methods',
                'LIFECYCLE_HOOKS',
                [ 'template', 'render', ],
                'renderError',
            ],
        }, ],
        'vue/prop-name-casing': [ 'error', 'camelCase', ],
        'vue/require-component-is': 'off',
        'vue/return-in-computed-property': [ 2, {
            'treatUndefinedAsUnspecified': true,
        }, ],
        'vue/script-indent': 0,
        'vue/no-v-html': 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
