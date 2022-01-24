---
title: slate 系列
created: 2021/11/11
tags: 
  - slate
  - 编辑器
---
> 本文将根据 [slate 文档](https://docs.slatejs.org/) 结合实例整理讲述 [slate](https://github.com/ianstormtaylor/slate) 的部分细节。

## 简述
1. slate 是一个完全可定制的构建富文本编辑器的框架，本质是一个构建于 React 之上的 div contenteditable。
2. 文档中提到其逻辑都是通过各个插件实现的，可以不用受到“核心”不“核心”的影响。
3. slate 的主要插件只有三个，分别是 slate-react、slate-history、slate-hyperscript。
4. slate 本身提供了逻辑处理；
5. slate-react 是做视图层逻辑（官方。slate 的视图层组件还有包括 vue 和 angular 在内的其他衍生品，这里基于 react 的组件是由官方维护）；
6. slate-history 记录状态，配合撤销反撤销操作；
7. slate-hyperscript 用于提供 jsx，可以在比如粘贴一段 HTML 做转换处理时使用。

## 细节
slate 逻辑本质是基于对一段数组对象数据的处理
```json
[
    {
        "type": "paragraph",
        "children": [
            {
                "text": "测试"
            },
            {
                "text": "加粗",
                "bold": true
            },
            {
                "text": "斜体",
                "italic": true
            },
            {
                "text": "下划线",
                "underline": true
            },
            {
                "text": " "
            }, 
            {
                "children": [
                    {
                        "text": "链接"
                    }
                ],
                "type": "link",
                "info": {
                    "url": "https://taptap.com"
                }
            }
        ]
    },
    {
        "id": "sWIx",
        "type": "image",
        "info": {
            "url": "https://img2.tapimg.com/moment/etag/FkNk2byCBYVIw0xr2tA43mSpoxDs.png"
        },
        "children": [
            {
                "text": ""
            }
        ]
    }
]
```
如这段数组对应的是下图两行展示
![图一](https://qiniu.yasinchan.com/image/image2021-11-17_13-47-43.png)

这段数组中的两个对象，对应了视图层的两行。对于 slate 来说，每行既是一个对象，我们的增删改查都是通过对这段数组的操作。

slate 对于操作（**Operations**），分为了如下 9 种

```ts
type BaseInsertNodeOperation = {
  type: 'insert_node'
  path: Path
  node: Node
}

type BaseRemoveNodeOperation = {
  type: 'remove_node'
  path: Path
  node: Node
}

type BaseInsertTextOperation = {
  type: 'insert_text'
  path: Path
  offset: number
  text: string
}

type BaseRemoveTextOperation = {
  type: 'remove_text'
  path: Path
  offset: number
  text: string
}

type BaseMergeNodeOperation = {
  type: 'merge_node'
  path: Path
  position: number
  properties: Partial<Node>
}

type BaseSplitNodeOperation = {
  type: 'split_node'
  path: Path
  position: number
  properties: Partial<Node>
}

type BaseMoveNodeOperation = {
  type: 'move_node'
  path: Path
  newPath: Path
}

type BaseSetNodeOperation = {
  type: 'set_node'
  path: Path
  properties: Partial<Node>
  newProperties: Partial<Node>
}

type BaseSetSelectionOperation =
  | {
      type: 'set_selection'
      properties: null
      newProperties: Range
    }
  | {
      type: 'set_selection'
      properties: Partial<Range>
      newProperties: Partial<Range>
    }
  | {
      type: 'set_selection'
      properties: Range
      newProperties: null
    }

```

形成了对于步骤的记录，也就是能够做到 `undo` `redo` 的操作，另外在此基础上，为了减轻心智负担，slate 做了进一步封装，也就是 **Transform** 以及 **Editor**。

**Transform** 能够内部消化对于 `Range` 的处理。

更高级的，还有 `Commands`。也就是 **Editor**，上面所谓的“减轻心智负担”，也就是说一般情况下，我们在调用 **Editor** 时是不需要再传递路径等的。也可以理解为是对 Transform 的封装。

举个例子 **Operations** 中的 `insert_text` 和 `insert_node`，**Transform** 会将其封装成 `insertText` 和 `insertNodes` 方法，其都接收包括 `at` 在内的多个 `options`。

而 **Editor** 中的 `insertText` 方法，则包含了 **Transform** 中的这两个方法，我们无需再外部判断当前是否是一个 marks 而决定使用 `Transforms.insertText` 还是 `Transforms.insertNodes`，也不用传递 `at` 等参数。在某些命令式的情况下使用很方便。

上面提到了 **Range**，所谓 **Range** 是 slate 对路径的管理。
```ts
interface Range {
  anchor: Point
  focus: Point
}
```
如上所示，这便是 **Range** 的定义，anchor 是初始点，focus 为结束点。通俗来说就是比如框选了一段文字，mousedown 的位置即为 anchor，mouseout 的位置即为 focus。一般 focus 而没有选中一段文字的状态下 anchor 和 focus 是同一个 **Point**。

那么这个 **Point** 又是何物呢
```ts
interface Point {
  path: Path
  offset: number
}

type Path = number[]
```
这是形容光标的具体位置，举个例子，上面图片中若光标在“测”与“试”中间，此时的 **Point** 即为
```ts
{
    "path": [0, 0],
    "offset": 1
}
```

