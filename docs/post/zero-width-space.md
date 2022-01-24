---
title: slate 系列 - 零宽空格在 slate 中的运用
created: 2021-12-20
tags: 
  - slate
  - 编辑器
  - zero-width
  - \uFEFF
---
> 在 slate 源码中，我们会看到零宽空格的运用，如 [代码1](https://github.com/ianstormtaylor/slate/blob/main/packages/slate-react/src/components/string.tsx#L107) [代码2](https://github.com/ianstormtaylor/slate/blob/main/packages/slate-react/src/components/editable.tsx#L853) 。其含义是什么。

在前端层面来讲，零宽字符本身是不会在 HTML 中渲染出来的，一般情况下我们不会使用到它。不过在编辑器中，对于 slate 而言，其本身是基于监听 div contenteditable 变化事件来做数据渲染的，而 div contenteditable 中，零宽字符会在其中独占一个 range 从而可以让光标在一个空位显示。

上一篇 [slate 系列](/post/about-slate.html)