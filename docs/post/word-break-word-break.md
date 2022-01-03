---
title: word-break 和 word-wrap 中的 break-word 的用法详解
created: 2020-7-31
tags:
    - css
---
`word-wrap` 和 `word-break` 的区别在于
### word-break
MDN 和 W3C 标准中都将 `break-word` 归为废弃的值，只是为了兼容遗留版本，所以没有删除（ [W3C#word-break]](https://www.w3.org/TR/css-text-3/#word-break) ），
而且兼容性较差，比如较老的 Firefox(< v67，也就是去年之前的版本 [https://hg.mozilla.org/mozilla-central/rev/c1075c1f1605](https://hg.mozilla.org/mozilla-central/rev/c1075c1f1605)) 就不支持 `break-word`，IE 也不支持。W3C 的解释为
  ::: tip
  For compatibility with legacy content, the word-break property also supports a deprecated break-word keyword. When specified, this has the same effect as word-break: normal and overflow-wrap: anywhere, regardless of the actual value of the overflow-wrap property.
  ::: 
也就是说 W3C 将 `word-break: break-word` 解释为 `word-break: normal; overflow-wrap: anywhere;`的集合，但是 `overflow-wrap: anywhere` [兼容性](https://caniuse.com/#search=overflow-wrap)又很一般。
### word-wrap
1. Chrome 中使用`word-wrap: break-word;` 会有中划线显示（如下图），但是其实是生效了的，MDN 对此的解释是：
    ::: tip
    注：word-wrap 属性原本属于微软的一个私有属性，在 CSS3 现在的文本规范草案中已经被重名为 overflow-wrap 。 word-wrap 现在被当作 overflow-wrap 的 “别名”。 稳定的谷歌 Chrome 和 Opera 浏览器版本支持这种新语法。
    :::
    `overflow-wrap`相比于`word-wrap`，多了 `anywhere` 的值，不过正如上面所讲的，这个值的兼容性比较差，所以暂不建议使用。 
    ![图-2.1](https://qiniu.yasinchan.com/image/0acce773267861595f8ffb057ad71d68.png)   
2. `word-wrap: break-word;` 在 Chrome 中使用时的中划线如何去除：
    ```css
    overflow-wrap: break-word;
    word-wrap: break-word;
    ```
3. 当`word-wrap` 使用在 `flex` 布局中时，会存在失效的情况  
    解决方式为，给 flex item 元素添加 `min-width: 0;` 即可 [查看](https://stackoverflow.com/questions/47820826/word-wrap-in-flexbox-is-not-respecting-100-width-limit)、[查看](https://stackoverflow.com/questions/36150458/flex-item-overflows-container-due-to-long-word-even-after-using-word-wrap)
### 总结
1. 对于大部分的留白换行方式：
    ```css
    word-wrap: break-word;
    word-break: break-word;
    ```
2. 对于部分需要强制所有单词折行的
    ```css
    word-break: break-all;
    ```