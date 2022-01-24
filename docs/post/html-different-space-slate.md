---
title: slate 系列 - 不同空格的处理
created: 2022/01/15
tags: 
  - slate
  - 编辑器
  - space
---
> slate 的数据在最终渲染到页面后会出现问题，表现为行首空格消失，文字之间的多个空格变成一个空格。而一般的 div contenteditable 中的空格可以连续渲染。

对于这个问题有几个概念先解释一下

1. 前端编码过程中常见的空格包括这两个： &nbsp 和由键盘 space 键打出的空格（unicode 分别表示为 `\u00a0` 和 `\u0020`），区别在于如图所示红框区域，前者被称之为[不可换行空格](https://zh.wikipedia.org/wiki/%E4%B8%8D%E6%8D%A2%E8%A1%8C%E7%A9%BA%E6%A0%BC)，所以在图中出现折行的位置，`10 km` 是直接一起换行而不像蓝框中会在 `10` 和 `km` 之间折行。
![图一](https://qiniu.yasinchan.com/image/image.png) 
2. 浏览器本身对于由键盘 space 键打出的空格的处理方式如上图，浏览器会自动合并多个连续的空白字符，对于开头的空白字符，也不会渲染出来。在使用 innerText 和 innerHTML 看出区分如图。
![图二](https://qiniu.yasinchan.com/image/image%20%281%29.png) 
3. div 的 contenteditable 属性会在输入空格时做如[视频](https://qiniu.yasinchan.com/image/QQ20220117-150233-HD.mp4)中的效果（Chrome），会依次插入 `\u0020` 和 `\u00a0`，保证了浏览器可以正确渲染出所有空格。

> 以上例子中的代码[参考](https://jsbin.com/qiqezahodu/edit?html,output)

解释了上面的概念之后再看问题：
`div contenteditable` 中连续空格在上面第三点中解释了。slate 本身由数据渲染，最终储存的数据中的连续空格不会做特殊处理，就是单纯的连 `\u0020`。当最终渲染成页面时就会发生上面说的第二种情况，为避免这种情况，我们可以在 slate 中可以在最终保存的数据做二次处理，处理方式可以是比如
```js
text = text.replace(/\u0020{2,}/g, (str) => {
  const len = str.length;
  let space = '';
  for (let i = 0; i < len; i++) {
    space += i % 2 === 0 ? '\u00a0' : '\u0020';
  }
  return space;
});
```
通过这种方式在保存之前将 slate json 数据中的 text 做一次处理转成如上面视频中的那样。


上一篇 [slate 系列 - 零宽空格在 slate 中的运用](/post/zero-width-space.html)