# Node.js 包管理器 npm

> npm 全称为 Node Package Manager

<br />

## 需要使用包管理器原因

* 对于没有包管理的开发语言，传递或部署项目都要拷贝完整的副本
* 对于没有包管理的开发语言，添加/升级第三方包需要花费大量代价验证兼容性、解决包与包这间的依赖性

<br />
<br />

# npm 使用

## 全局安装包

通常情况下，全局安装的包多为命令行工具包，安装后可在命令行直接使用运行命令。

如果使用 nvm 工具，全局包通常被安装到用户 home 目录下的 .nvm 文件夹中对应的 Node.js 版本目录下。例如，对于 v10.16.3 版本的 Node.js：

`~/.nvm/versions/node/v10.16.3/lib/node_modules`

```
npm install -g nodemon
```

<br />

## 初始化新项目

使用 `npm init` 命令生成 `package.json` 项目文件。

```bash
npm init --yes
```

<br />

## 初始化历史项目

使用 `npm install` 命令安装 `package.json` 中指定的所有依懒包。

```bash
npm install
```

<br />

## 局部/本地安装包

> 案例：./base-project

包被安装到所在项目的 `node_modules` 目录下，只能被所在项目所使用。

### 安装最新版本包

```
npm install lodash
```

### 安装指定版本包

```
npm install jquery@1.12.4
```


### 安装开发依赖包

```
npm install --save-dev mocha
```

### 安装本地文件路径包

```
npm install moduleName file://path
```

<br />
<br />

# package.json 文件结构

> ref: https://docs.npmjs.com/files/package.json#git-urls-as-dependencies

## 例子

```javascript
{
    "name": "base-project",
    "version": "1.0.0",
    "description": "Just a demo package",
    "keywords": "demo",
    "homepage": "https://github.com/owner/base-project#readme",
    "bugs": "https://github.com/owner/base-project/issues",
    "author": "full name",
    "main": "index.js",
    "repository": {
        "type" : "git",
        "url" : "https://github.com/owner/base-project.git"
    },
    "scripts": {
        "start": "node index.js",
        "test": "mocha"
    },
    "dependencies": {
        "jquery": "^1.12.4",
        "lodash": "^4.17.15"
    },
    "devDependencies": {
        "mocha": "^6.2.2"
    }
    "license": "ISC",
}
```

## name

*类型：String*

* 对于需要发布到 npm 的包，`name` 和 `version` 作为唯一标识包的属性，必需。否则可选。
* URL-safe 小写字符串
* 使用 `@` 开头的包名，一般用于标识组织或所属(scope)，例如 @ebay/skin、@babel/core

## version

*类型：String*

* 标准的版本号采用 `X.Y.Z` 的格式，并且 `X`、`Y` 和 `Z` 为非负的整数，分别代表`主版本号`、`次版本号`、`修订号`。禁止在数字前方补零，版本发布需要严格递增。例如：1.9.1 -> 1.10.0 -> 1.11.0。
    * `主版本号` 标识一个全新版本的发布，不需要兼容之前版本
    * `次版本号` 常用于增加新特性，需要兼容之前版本
    * `修订号` 常用于修改 bug
* 当要发布大版本或者新的核心的功能时，往往会先通过发布先行版本给开发者测试，比较常见的先行版本包括：`alpha`、`beta`和`rc`版本。关键字后面可以带上次数和meta信息。
    * `alpha` 内测版本，例如：1.0.0-alpha.1
    * `beta` 公测版本，例如：1.0.0-beta.1
    * `rc` 即 Release Candiate，正式版本的候选版本，例如：1.0.0-rc.1
* 版本号必需能通过 [The semantic versioner for npm ](https://docs.npmjs.com/misc/semver) 较验。 

## keywords

*类型：Array\<String\>*

* 包的功能关键字，用于 npm 检索。

## main

*类型：字符串*

* 指明包的入口，默认为 index.js。
* 假定有个名为 `foo` 包，当使用者安装后并使用 `require(‘foo’)` 声明引入时，它将会返回 `main` 指定的导出对象。

## scripts

*类型：Object*

* 用于 `npm run` 执行命令
* 默认值
    * "start": "node server.js"
    * "install": "node-gyp rebuild"

## dependencies

*类型：Object*

* 用于指明项目运行时需要依赖的第三方包和版本
* key 为包名，value 为版本
* 版本
    * `version` 完全匹配
    * `>version` 大于指定版本
    * `>=version` 大于或等于指定版本
    * `<version` 小于指定版本
    * `<=version` 小于或等于指定版本
    * `~version` 通常匹配`修订号`，例如 ~1.0.1 会匹配 1.0.X
    * `^version` 通常匹配`次版本号`，例如 ~1.0.1 会匹配 1.X.X
    * `*` 任意版本
    * `version1 - version2` 同 `>=version1 <=version2`
    * `version1 || version2` 版本 version1 或 >=version2
    * `file:` 本地文件包，例如 {"bar": "file:../foo/bar"}

## devDependencies

*类型：Object*

* 用于指明项目开发时需要依赖的第三方包和版本

## peerDependencies

*类型：Object*

* 常见于插件包，例如：[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin/blob/master/package.json)
    * 对于 npm v2 版本，peerDependencies 包会被安装到宿主环境中。
    * 对于 npm v3 版本，用于声明在安装本包时，宿主环境上需存在指定的包。
    
<br />
<br />

# module 导出与引用
> base-module 案例：./base-module  
> base-project 案例：./base-project  

使用 CommonJS 模块规范

## 使用 `exports` 导出与引用

### base-module 声明导出

```javascript
// file: base-module/index.js
exports.getChineseDateString = (date = new Date()) => {
    return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
}
```

### base-project 引用

```javascript
// file: base-project/index.js
const baseModule = require('base-module');
console.log(baseModule.getChineseDateString());
```

## 使用 `module.exports` 导出与引用

### base-module 声明导出

```javascript
// file: base-module/index.js
module.exports = (date = new Date()) => {
    return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
}
```

### base-project 引用

```javascript
// file: base-project/index.js
const getChineseDateString = require('base-module');
console.log(getChineseDateString());
```

<br />
<br />

# Node.js 模块机制

## 模块分类

Node.js 模块分为 *核心模块*（Node.js 提供）和 *扩展/文件模块*（从 npm 安装或其它地方提供）

### 核心模块

Node.js 原生提供的模块，在 Node.js 安装过程中已编译进其执行文件中。当 Node.js 启动时，部份核心模块会被直接加载进内存中。

### 扩展模块

用户从第三方安装的模块。

<br />

## require 加载流程

### 查找

1. 查找缓存，如果命中缓存则直接返回缓存中的结果；

2. 根据模块标识符进行路径分析

    2.1 如果是以路径标识符开头，例如 `./`、`../` 或 `/`，优先作文件分析
        
    * 如果路径标识符包含扩展名，则优先完全匹配查找文件

    * 如果没有扩展名或上一步未命中，则使用扩展名分析（尝试依次添加 `.js`、`.json`、`.node` 后查找文件）
        > debug `console.log(module.paths)`

    * 如果上一步未命中，但路径能完全匹配一个目录，则作为目录分析，将目录作为一个扩展包分析

    2.2 查找核心模块

    2.3 查找扩展模块

    > 扩展模块的查找顺序为：从当前目录下的 node_modules 目录下开始查找，沿路径向上逐级查找 node_modules 目录下查找，直到根目录下的 node_modules 目录。

    > debug `console.log(require.extensions);`

    * 查找包目录下的 package.json 文件，并使用 `JSON.parse()` 解析内容取出 `main` 属性值作为包入口

    * 如果 `main` 属性值不包含扩展名，则使用扩展名分析

    * 如果没有 package.json 文件，或 `main` 属性不存在，则默认使用 index 作为入口，并使用扩展名分析。

3. 编译执行

    3.1 *.js* 读取文件解析，编译执行。

    3.2 *.json* 读取文件，使用 `JSON.parse()` 解析后返回结果。

    3.3 *.node* 一般为 C/C++ 扩展编译后文件，使用 `dlopen()` 方法加载文件。

    3.4 *.\** 如果未注册解析器，则当作 *.js* 文件载入。 

### js 文件加载

1. 对 js 文件头尾进行包装，传入必要参数：

    ```javascript
    /*
     * @params exports - 为 module 的 exports 属性，用于导出
     * @params require - 用于引入其它依依赖项
     * @params module - 模块对象本身，用于默认导出
     * @params __filename - 含文件名的完整目录路径
     * @params __dirname - 文件所在的目录的完整路径
     */
    (function (exports, require, module, __filename, __dirname) {
        /* 原文件内容 */
    });
    ```

2. 包装后的 js 代码在独立上下文执行。

3. 执行结束，`module.exports` 属性被返回给调用方并缓存。

### json 文件加载

1. 读取文件后，调用 `JSON.parse()` 解析成对象，赋值给 module.exports 返回调用方并缓存。

<br />

## 编写 C/C++ 扩展模块

> https://nodejs.org/api/addons.html

<br />

## 使用 app-module-path 避免多级相对路径引入

### 安装

```bash
npm install app-module-path
```

### 使用

假定存在一个项目结构：

* *my-app/*
    * *src/* - Source code and application modules directory
        * *foo/* - A module directory
            * index.js
        * *bar/* - Another module directory
            * index.js
    * *node_modules/* - Installed modules
        * *installed-baz/* - An installed module
            * index.js
    * index.js - Main script


```javascript
// file: ./index.js
// ***IMPORTANT**: The following line should be added to the very beginning of your main script!
require('app-module-path').addPath(__dirname);
```

```javascript
// file: ./src/foo.js
var bar = require('src/bar');       // Works
var baz = require('installed-baz'); // Works
```

### VS Code 代码跳转问题

在项目根路径增加 *jsconfig.json* 文件，参考内容如下

```javascript
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "src/*": ["src/*"]
        }
    }
}
```

<br />
<br />

# 其它

## 更换 npm 源

### 需要设置源原因

* 在国内能极大地加快项目依赖包的安装速度
* 使用公司内部 npm 源

### 配置文件 .npmrc

#### 官方源

```
registry=https://registry.npmjs.org
```

#### taobao 源

```
registry=https://registry.npm.taobao.org
```

### 使用 nrm 切换源

> https://github.com/Pana/nrm

