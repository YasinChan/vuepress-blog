---
title: git 本地仓库提交到远程操作
created: 2019-2-1
tags:
    - git
---
1. 新建远程空仓库
2. 本地仓库执行
    ```bash
    git init
    
    git add .
    
    git commit -m '提交说明'
    
    git remote add origin 远程仓库地址
    
    git push -u origin master
    ```
