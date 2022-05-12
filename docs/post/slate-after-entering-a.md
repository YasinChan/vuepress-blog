---
title: slate 系列 - 在编辑器中输入 A 发生了什么
description: 本文将结合文本输入，细究 slate 内部执行逻辑。
created: 2022/05/12
tags: 
  - slate
  - 队列
  - 执行栈
---
::: tip
本文将结合文本输入，细究 slate 内部执行逻辑。
:::

1. 光标先选中一个位置，触发 [selectionchange](https://github.com/ianstormtaylor/slate/blob/d2fc25c3c31453597f59cd2ac6ba087a1beb1fe3/packages/slate-react/src/components/editable.tsx#L274) 事件，在事件中，通过 js 原生 getSelection 方法，获取到当前光标坐标 selection，再通过 slate-react 的 ReactEditor.toSlateRange 方法，获取 slate range，再使用 [Transforms.select](http://Transforms.select) 将该 range 设置到 editor.selection 上，这里将执行 apply 的 [set_selection](https://github.com/ianstormtaylor/slate/blob/d2fc25c3c31453597f59cd2ac6ba087a1beb1fe3/packages/slate/src/transforms/general.ts#L230) 操作（这个方法是在[这里](https://github.com/ianstormtaylor/slate/blob/d2fc25c3c31453597f59cd2ac6ba087a1beb1fe3/packages/slate/src/create-editor.ts#L81)被触发的）。
2. 输入 A 时，触发 slate-react 中的 [beforeinput](https://github.com/ianstormtaylor/slate/blob/d2fc25c3c31453597f59cd2ac6ba087a1beb1fe3/packages/slate-react/src/components/editable.tsx#L326) 事件，判断到 event.inputType 为 insertText 时，使用 Editor.insertText 方法插入文本
3. 在 Editor.insertText 中将执行 apply [insert_text](https://github.com/ianstormtaylor/slate/blob/d2fc25c3c31453597f59cd2ac6ba087a1beb1fe3/packages/slate/src/transforms/general.ts#L45) 操作
4. 以上的 apply 操作，都是对 Operation 的操作，当 Operation 处理完之后，会主动触发 [onChange](https://github.com/ianstormtaylor/slate/blob/d2fc25c3c31453597f59cd2ac6ba087a1beb1fe3/packages/slate/src/create-editor.ts#L95) 事件，目的是 react 的重新渲染。
5. 这里会有一个问题，当调用某个复杂命令时，会在一个 task 中执行多次 apply，这意味着 onChange 会被调用多次，而 slate 这里用了一个巧妙的方式：将 onChange 放在 Promise 的回调中，在当前 task 完成后才会调用一次 onChange 方法。
    
    ```jsx
    // https://github.com/ianstormtaylor/slate/blob/d2fc25c3c31453597f59cd2ac6ba087a1beb1fe3/packages/slate/src/create-editor.ts#L90
    apply: () => {
    	...
    	...
    	if (!FLUSHING.get(editor)) {
    	  FLUSHING.set(editor, true)
    	
    	  Promise.resolve().then(() => {
    	    FLUSHING.set(editor, false)
    	    editor.onChange()
    	    editor.operations = []
    	  })
    	}
    }
    ```
    
    - 这里涉及了执行栈和队列的知识，我们知道 js 是单线程的，异步任务会被先放置于队列中，当同步任务执行完后，会执行队列中的异步任务。
    - 异步任务中会分宏任务（task）和微任务（microtask），浏览器在每个 task 之间会执行 DOM 重新渲染的逻辑，也就是 task → 渲染 → task 。
    - 而微任务将会在第一个 task 之后和渲染之前执行
    - Promise.then 是微任务，所以 slate 这里多次执行的 apply ，会将其中的 Promise.then 放到队列中，当同步任务执行完，在 DOM 重新渲染之前执行其中的 onChange 事件。
6. onChange 会在 [react 组件](https://github.com/ianstormtaylor/slate/blob/main/packages/slate-react/src/components/slate.tsx)中更改 [state 的 Hook](https://github.com/ianstormtaylor/slate/blob/d2fc25c3c31453597f59cd2ac6ba087a1beb1fe3/packages/slate-react/src/components/slate.tsx#L29)，并且触发 [Context.Provider](https://github.com/ianstormtaylor/slate/blob/d2fc25c3c31453597f59cd2ac6ba087a1beb1fe3/packages/slate-react/src/components/slate.tsx#L99) 的值的改变，从而更新组件。

上一篇 [slate 系列 - 不同空格的处理](/post/html-different-space-slate.html)