---
title: git 子仓库管理
description: 有一种场景，在我们的主仓库下需要引入其他仓库的，同时要保持双方的独立。此时，我们可以使用 git 提供的 git submodules 方法
created: 2020-5-22
tags:
    - git
    - 技术
---
::: tip
有一种场景，在我们的主仓库下需要引入其他仓库的，同时要保持双方的独立。此时，我们可以使用 git 提供的 git submodules 方法
:::

## 场景
我们新建一个场景，有一个主仓库叫做 `git-father` 
```
/xxx/git-father
├── .git
└── README.md
```
需要将另一个仓库 `git-sub` 引入此仓库中
### 引入子仓库
```bash
# 在主仓库 git-father 下执行
git submodule add git@github.com:YasinChan/git-sub.git git-sub
```
此时，在主仓库下，子仓库将被引入，同时生成 `.gitmodules` 配置文件
```
/xxx/git-father
├── .git
├── .gitmodules
├── README.md
└── git-sub
```
### 更新子仓库
```bash
# 方法一
git submodule foreach git pull origin master
# 方法二
cd git-sub
git pull origin master
```    
### 克隆一个包含子仓库的仓库
前面说到主仓库和子仓库是互相保持独立的，所以无论是 push 还是 pull 操作，都需要单独执行  
所以我们在 clone 主仓库时，不会同时将子仓库 clone 下来。此时可以如下操作
```bash
# 克隆主仓库
git clone git@github.com:YasinChan/git-father.git
```
此时结构如下
``` 
/xxx/git-father
├── .git
├── .gitmodules
├── README.md
└── git-sub
# git-sub 是一个空的文件夹
```
然后继续执行
```bash
git submodule init
# 提示：Submodule 'git-sub' (git@github.com:YasinChan/git-sub.git) registered for path 'git-sub'
```
然后
```bash
git submodule update
```
此时，`git-sub` 将被拉取下来

### .gitmodules
这个配置文件记录了项目 URL 与已经拉取的本地目录之间的映射关系，也就是我们如上 `git submodule` 相关操作都是读取的此文件的配置。
