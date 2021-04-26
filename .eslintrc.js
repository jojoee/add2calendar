module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "accessor-pairs": "error",
    "array-bracket-newline": "off",
    "array-bracket-spacing": [
      "error",
      "never"
    ],
    "array-callback-return": "error",
    "array-element-newline": "off",
    "arrow-body-style": "error",
    "arrow-parens": "error",
    "arrow-spacing": "error",
    "block-scoped-var": "off",
    "block-spacing": [
      "error",
      "always"
    ],
    "brace-style": [
      "error",
      "1tbs",
      {
        "allowSingleLine": true
      }
    ],
    "capitalized-comments": "off",
    "class-methods-use-this": "error",
    "comma-dangle": "off",
    "comma-spacing": "off",
    "comma-style": [
      "error",
      "last"
    ],
    "complexity": "error",
    "computed-property-spacing": [
      "error",
      "never"
    ],
    "consistent-return": "off",
    "consistent-this": "off",
    "curly": "off",
    "default-case": "error",
    "default-case-last": "error",
    "default-param-last": "error",
    "dot-location": [
      "error",
      "property"
    ],
    "dot-notation": [
      "error",
      {
        "allowKeywords": true
      }
    ],
    "eol-last": "error",
    "eqeqeq": "off",
    "func-call-spacing": "error",
    "func-name-matching": "error",
    "func-names": "off",
    "func-style": "off",
    "function-call-argument-newline": [
      "error",
      "consistent"
    ],
    "function-paren-newline": "off",
    "generator-star-spacing": "error",
    "grouped-accessor-pairs": "error",
    "guard-for-in": "off",
    "id-denylist": "error",
    "id-length": "off",
    "id-match": "error",
    "implicit-arrow-linebreak": "error",
    "indent": "off",
    "init-declarations": "error",
    "jsx-quotes": "error",
    "key-spacing": "off",
    "keyword-spacing": [
      "error",
      {
        "after": true,
        "before": true
      }
    ],
    "line-comment-position": "off",
    "linebreak-style": [
      "error",
      "unix"
    ],
    "lines-around-comment": "off",
    "lines-between-class-members": "error",
    "max-classes-per-file": "error",
    "max-depth": "error",
    "max-len": "off",
    "max-lines": "off",
    "max-lines-per-function": "off",
    "max-nested-callbacks": "error",
    "max-params": "off",
    "max-statements": "off",
    "max-statements-per-line": "off",
    "multiline-comment-style": "off",
    "multiline-ternary": [
      "error",
      "always-multiline"
    ],
    "new-cap": "error",
    "new-parens": "error",
    "newline-per-chained-call": "error",
    "no-alert": "error",
    "no-array-constructor": "error",
    "no-await-in-loop": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-confusing-arrow": "error",
    "no-console": "off",
    "no-constructor-return": "error",
    "no-continue": "error",
    "no-div-regex": "error",
    "no-duplicate-imports": "error",
    "no-else-return": "off",
    "no-empty-function": "off",
    "no-eq-null": "off",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-extra-parens": "off",
    "no-floating-decimal": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-inline-comments": "off",
    "no-inner-declarations": [
      "error",
      "functions"
    ],
    "no-invalid-this": "off",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "off",
    "no-loop-func": "error",
    "no-loss-of-precision": "error",
    "no-magic-numbers": "off",
    "no-mixed-operators": "off",
    "no-multi-assign": "error",
    "no-multi-spaces": "off",
    "no-multi-str": "error",
    "no-multiple-empty-lines": "error",
    "no-negated-condition": "off",
    "no-nested-ternary": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-wrappers": "error",
    "no-nonoctal-decimal-escape": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "off",
    "no-plusplus": [
      "error",
      {
        "allowForLoopAfterthoughts": true
      }
    ],
    "no-promise-executor-return": "error",
    "no-proto": "error",
    "no-restricted-exports": "error",
    "no-restricted-globals": "error",
    "no-restricted-imports": "error",
    "no-restricted-properties": "error",
    "no-restricted-syntax": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow": "off",
    "no-tabs": "error",
    "no-template-curly-in-string": "error",
    "no-ternary": "off",
    "no-throw-literal": "error",
    "no-trailing-spaces": "off",
    "no-undef-init": "error",
    "no-undefined": "off",
    "no-underscore-dangle": "error",
    "no-unmodified-loop-condition": "error",
    "no-unneeded-ternary": "error",
    "no-unreachable-loop": "error",
    "no-unsafe-optional-chaining": "error",
    "no-unused-expressions": "off",
    "no-use-before-define": "error",
    "no-useless-backreference": "error",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "off",
    "no-void": "error",
    "no-warning-comments": "off",
    "no-whitespace-before-property": "error",
    "nonblock-statement-body-position": "error",
    "object-curly-newline": "error",
    "object-curly-spacing": "off",
    "object-shorthand": "error",
    "one-var": "off",
    "one-var-declaration-per-line": "error",
    "operator-assignment": [
      "error",
      "always"
    ],
    "operator-linebreak": [
      "error",
      null
    ],
    "padded-blocks": "off",
    "padding-line-between-statements": "error",
    "prefer-arrow-callback": "off",
    "prefer-const": "error",
    "prefer-destructuring": "off",
    "prefer-exponentiation-operator": "error",
    "prefer-named-capture-group": "off",
    "prefer-numeric-literals": "error",
    "prefer-object-spread": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-regex-literals": "error",
    "prefer-rest-params": "off",
    "prefer-spread": "error",
    "prefer-template": "off",
    "quote-props": "off",
    "quotes": "off",
    "radix": "error",
    "require-atomic-updates": "error",
    "require-await": "error",
    "require-unicode-regexp": "off",
    "rest-spread-spacing": "error",
    "semi": "off",
    "semi-spacing": [
      "error",
      {
        "after": true,
        "before": false
      }
    ],
    "semi-style": [
      "error",
      "last"
    ],
    "sort-imports": "error",
    "sort-keys": "off",
    "sort-vars": "off",
    "space-before-blocks": "error",
    "space-before-function-paren": "off",
    "space-in-parens": [
      "error",
      "never"
    ],
    "space-infix-ops": "off",
    "space-unary-ops": "off",
    "spaced-comment": "off",
    "strict": "error",
    "switch-colon-spacing": "error",
    "symbol-description": "error",
    "template-curly-spacing": "error",
    "template-tag-spacing": "error",
    "unicode-bom": [
      "error",
      "never"
    ],
    "vars-on-top": "off",
    "wrap-iife": "error",
    "wrap-regex": "error",
    "yield-star-spacing": "error",
    "yoda": [
      "error",
      "never"
    ]
  }
};
