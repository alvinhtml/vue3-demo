module.exports = {
  // 继承的预设配置
  extends: [
    'stylelint-config-standard',  // 标准配置
    'stylelint-config-recommended-vue'  // Vue 推荐配置
  ],
  // 自定义规则配置
  rules: {
    // 允许空源码
    'no-empty-source': null,
    // 允许未知的伪类选择器
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global']
      }
    ],
    // 允许未知的伪元素选择器
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
      }
    ],
    // 允许未知的规则
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin'
        ]
      }
    ],
    // 字符串使用单引号
    'string-quotes': 'single',
    // 允许未知的属性
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes', 'compose-with']
      }
    ],
    // 缩进配置
    'indentation': 2,
    // 允许 global 关键字
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page', 'global']
      }
    ]
  },
  // 忽略的文件
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts']
}