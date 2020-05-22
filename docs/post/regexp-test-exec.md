---
title: 正则 test 和 exec 在 global 模式下的工作机制
description: 正则的 test 方法是和 exec 类似的机制 会在当正则设置了 global 标志位的情况下每次执行 test 方法的时候都会记录匹配之后的位置 在下一次执行的时候从新的位置开始匹配
created: 2020-5-21
updated: 2020-5-22
tags: 
  - 技术
  - 前端
  - 正则
---

::: tip
正则的 `test` 方法是和 `exec` 类似的机制 会在当正则设置了 global 标志位的情况下每次执行 `test` 方法的时候都会记录匹配之后的位置 在下一次执行的时候从新的位置开始匹配
:::

有一个字符串 `axbaybazbaaa` 

当需要匹配出所有满足 a.b 的字符时，可以定义一个如下的正则表达式

```javascript
var reg = new RegExp('a.b', 'g')
```

```javascript
var str = 'axbaybazbaaa'
var arr
while((arr = reg.exec(str)) !== null) { console.log(arr) }
-> ["axb", index: 0, input: "axbaybazbaaa", groups: undefined]
-> ["ayb", index: 3, input: "axbaybazbaaa", groups: undefined]
-> ["azb", index: 6, input: "axbaybazbaaa", groups: undefined]
```

一个正则对象包括多个属性，此时我们需要观察的是其中的 `lastIndex` 属性，此属性的作用是记录下一次匹配开始的位置，所以我们可以将上述的 `while` 方法拆分开了查看每步执行了什么

```javascript
reg.lastIndex
-> 0 // 最初 lastIndex 属性必然是指向 0 的
reg.exec(str)
-> ["axb", index: 0, input: "axbaybazbaaa", groups: undefined]
reg.lastIndex
-> 3 // 在执行一次之后，匹配了字符串前三个字符，所以下一次匹配开始的位置为 3
reg.exec(str)
-> ["ayb", index: 3, input: "axbaybazbaaa", groups: undefined]
reg.lastIndex
-> 6 // 同上
reg.exec(str)
-> ["azb", index: 6, input: "axbaybazbaaa", groups: undefined]
reg.lastIndex
-> 9
reg.exec(str)
-> null // 此时 从第 9 个值开始执行，会发现匹配不到值，所以是 null
reg.lastIndex
-> 0 // 以上执行到 null 时，表示一个循环结束了
```

以上便是我们常用的 `exec` 的方法详解，`test` 方法本质也和 exec 相似，所以当我们在重复执行 `reg.test(str)` 时，也会和上述相同的遍历过程，之所以我们平时不会注意到 `test` 的这个机制，是因为 我们在使用 `test` 的时候，目的就是检测字符串中是否有满足我们正则表达式的字符，只要有一个满足，就不需要继续检测了。

```javascript
reg.lastIndex
-> 0
reg.test(str)
-> true
reg.lastIndex
-> 3
reg.test(str)
-> true
reg.lastIndex
-> 6
reg.test(str)
-> true
reg.lastIndex
-> 9
reg.test(str)
-> false
reg.lastIndex
-> 0
```
