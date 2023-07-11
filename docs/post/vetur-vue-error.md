---
title: vue3 在 vscode 中引用报错的问题
created: 2023/07/11
tags: 
  - vue3
  - vscode
---
::: tip
Cannot find module '@/components/ui/Button.vue' or its corresponding type declarations.Vetur(2307)
:::

## 简述
vite 启动的 vue3 项目，在引用组件时可能会报如下错误
![](https://tf.yasinchan.com/JIg54yX6OTUzHPIWxW64m8OUo6llWDWF/55D44D1F-95CA-4483-A575-AC74368D2ED1.png)
[官网](https://cn.vuejs.org/guide/typescript/overview.html#ide-support)给出了解决方案：将 vetur 卸载。