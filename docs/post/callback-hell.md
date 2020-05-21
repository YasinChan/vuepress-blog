---
title: callback hell
created: 2018-3-1
tags: 
  - 前端
  - 技术
---
> JavaScript 是单线程的语言，处理异步的事件比如ajax 请求，我们会使用callback的方式来处理。可是当我们需要处理复杂的异步过程时，最常见的方式就是在回调事件中层层嵌套，可是这样做的弊端也很明显，就是代码不直观，冗余，当我们在后期维护的时候，工程量也会很大。

> 于是，在ES6 中，增加了几种新的方法，来使我们能更加优雅的处理复杂异步事件。

1. Promise  
这也是我们在解决这类问题中用的最多的方式了，不做赘述，详情参考 http://es6.ruanyifeng.com/#docs/promise 。

2. Generator 函数  
这个可能使用率比较小，但是个人认为是个更加直观的解决方式。生成器函数一般而言可以配合 yield 来用，使用方法：

```javascript
    function* countAppleSales () {
        var result1 = yield $.get('data1.json');
        var result2 = yield $.get('data2.json');

    }
```
使用 * 来区分他跟一般的函数的区别，yield 是一个用来暂停生成器函数的关键字，使用 .next() 来继续函数详情可参见 https://www.w3ctech.com/topic/1917

3. acync 函数  
<http://es6.ruanyifeng.com/#docs/async>

<https://www.w3ctech.com/topic/1917>
