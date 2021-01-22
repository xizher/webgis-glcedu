# webgis-glcedu

> WebGIS应用系统实践：基于Globeland30全球地表覆盖数据的辅助地理教学系统
>

## 项目技术要点

### GZIP打包配置

安装相关配置模块库

```bash
npm i -D webpack@4 compression-webpack-plugin@6
```

修改项目配置文件

```javascript
/* in vite.config.js */
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  port: 8080,
  publicPath: './',
  productionSourceMap: false,
  assetsDir: 'static',

  // GZIP打包配置项
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ],
  },
}
```

### Git子模块配置（wxz）

在src目录下引入Git子模块

```shell
# in src
git submodule add https://github.com/xizher/wxz.git
```

根目录在创建`babel.config.js`，并安装babel相关模块来匹配该模块的Eslint配置`npm i -D @babel/core @babel/eslint-parser @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime @babel/preset-env`

```javascript
// in babel.config.js
module.exports = {
  'presets': [
    '@babel/preset-env',
  ],
  'plugins': [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ]
}
```

拉取更新（包含子模块）

```shell
git pull --recurse-submodules
```

### Eslint代码规范配置

```shell
npm i -D eslint eslint-plugin-vue
```

```javascript
// in .eslintrc.js
module.exports = {

  'root': true,

  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true
  },

  'parser': '@babel/eslint-parser',

  'extends': [
    'eslint:recommended',
  ],

  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },

  /*
   * 允许的全局变量
   * example: var1:writable, var2:readonly
   */
  'globals': {
  },

  'plugins': [
  ],

  'rules': {

    // 行末不用分号
    'semi':
      ['error', 'never'],

    // 字符串使用单引号，允许字符串使用反勾号
    'quotes':
      ['error', 'single', { 'allowTemplateLiterals': true }],

    // 块区域前后时刻保留大括号
    'curly':
      'error',

    // switch 语句中必须包含 default 分支
    'default-case':
      'error',

    // 点操作符和属性放在同一行
    'dot-location':
      ['error', 'property'],

    // === !==
    'eqeqeq':
      'error',

    // 不出现空函数
    'no-empty-function':
      'error',

    // 不出现多个空格
    'no-multi-spaces':
      'error',

    // 不多行字符串
    'no-multi-str':
      'error',

    // 数组格式
    'array-bracket-spacing':
      ['error', 'never'],

    // 代码块大括号风格
    'block-spacing':
      'error',

    // 代码块大括号风格
    'brace-style':
      'error',

    // 使用骆驼拼写法
    'camelcase':
      'error',

    // 逗号前后的空格风格
    'comma-spacing':
      ['error', { 'before': false, 'after': true }],

    // 文件末尾存在空行
    'eol-last':
      ['error', 'always'],

    // 缩进 2
    'indent':
      ['error', 2],

    // 关键字之前至少有一个空格，关键字之后至少有一个空格
    'keyword-spacing':
      ['error', { 'before': true, 'after': true }],

    // 行末不出现空格
    'no-trailing-spaces':
      'error',

    // 函数圆括号之前有一个空格
    'space-before-function-paren':
      'error',

    // 操作符周围有空格
    'space-infix-ops':
      'error',

    // 不能使用var声明
    'no-var':
      'error',

  }

}
```

### sass配置

```shell
npm i -D sass sass-loader
```

