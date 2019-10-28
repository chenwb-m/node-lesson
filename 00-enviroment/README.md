# 使用 nvm 管理 Node.js 版本

## 需要使用多 Node.js 版本原因

* 公司存在多版本的 Node.js 应用
* 测试新特性

## nvm 安装

> 参考 [nvm-sh](https://github.com/nvm-sh/nvm)

### Mac 或 Linux 用户

* 使用 `curl` 安装

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
```

* 使用 `wget` 安装

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
```

### Windows 用户

> 参考 [nvm-windows](https://github.com/coreybutler/nvm-windows)

<br/>

## nvm 常用命令

```bash
# 安装 v10.16.3 版本的 Node.js
nvm install v10.16.3

# 设置 v10.16.3 版本的 Node.js 为当前版本
nvm use v10.16.3

# 设置 v10.16.3 版本的 Node.js 为默认版本
nvm alias default v10.16.3

# 使用 v10.16.3 版本的 Node.js 单次运行 index.js
nvm exec v10.16.3 node index.js
```

<br/>

## nvm 与项目配置

> 案例：./nvm

1. 在项目根路径下放置 `.nvmrc` 文件，文件内容为 Node.js 版本号
```bash
# filepath: .nvmrc
v10.16.3
```

2. 进入项目，启动项目前，使用不加参数的 `nvm use` 将环境切换为正确版本的 Node.js
```bash
nvm use
```