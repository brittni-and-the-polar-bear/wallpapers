/*
 * MIT License
 *
 * Copyright (C) 2024 brittni and the polar bear LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* This configuration is designed to lint all JavaScript configuration files */

import eslint from '@eslint/js';

import es_x from 'eslint-plugin-es-x';
import node from 'eslint-plugin-n';
import security from 'eslint-plugin-security';

import stylistic from '@stylistic/eslint-plugin';

export default [
    eslint.configs.recommended,
    es_x.configs['flat/restrict-to-es2022'],
    node.configs['flat/recommended'],
    security.configs.recommended,
    stylistic.configs['recommended-flat'],
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module'
        },
        rules: {
            /* @eslint/js */
            'array-callback-return': ['error', {
                checkForEach: true
            }],

            'no-await-in-loop': 'error',

            'no-cond-assign': ['error', 'always'],

            'no-constant-condition': ['error', {
                checkLoops: 'all'
            }],

            'no-constructor-return': 'error',

            'no-duplicate-imports': ['error', {
                includeExports: true
            }],

            'no-inner-declarations': ['error', 'both'],

            'no-promise-executor-return': 'error',

            'no-self-compare': 'error',

            'no-template-curly-in-string': 'error',

            'no-unmodified-loop-condition': 'error',

            'no-unreachable-loop': 'error',

            'no-unsafe-negation': ['error', {
                enforceForOrderingRelations: true
            }],

            'no-unsafe-optional-chaining': ['error', {
                disallowArithmeticOperators: true
            }],

            'no-useless-assignment': 'error',

            'require-atomic-updates': 'error',

            'use-isnan': ['error', {
                enforceForSwitchCase: true,
                enforceForIndexOf: true
            }],

            'valid-typeof': ['error', {
                requireStringLiterals: true
            }],

            'one-var': ['error', 'never'],

            /* @stylistic/eslint-plugin */

            '@stylistic/brace-style': ['error', '1tbs'],

            '@stylistic/no-extra-semi': 'error',

            '@stylistic/function-call-argument-newline': ['error', 'consistent'],

            '@stylistic/function-call-spacing': ['error', 'never'],

            '@stylistic/comma-dangle': ['error', 'never'],

            '@stylistic/indent': ['error',
                4,
                {
                    SwitchCase: 1,
                    FunctionDeclaration: {
                        parameters: 'first'
                    },
                    FunctionExpression: {
                        parameters: 'first'
                    }
                }
            ],

            '@stylistic/indent-binary-ops': 'off',

            '@stylistic/member-delimiter-style': ['error', {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: true
                }
            }],

            '@stylistic/operator-linebreak': ['error', 'after'],

            '@stylistic/quotes': ['error',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true
                }
            ],

            '@stylistic/semi': ['error', 'always'],

            /* eslint-plugin-security */

            'security/detect-object-injection': 'off',

            /* eslint-plugin-n */

            'n/no-missing-import': 'off'
        }
    }
];
