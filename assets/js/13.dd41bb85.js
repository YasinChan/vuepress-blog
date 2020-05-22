(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{385:function(t,s,a){"use strict";a.r(s);var e=a(25),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("有一种场景，在我们的主仓库下需要引入其他仓库的，同时要保持双方的独立。此时，我们可以使用 git 提供的 git submodules 方法")])]),t._v(" "),a("h2",{attrs:{id:"场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#场景"}},[t._v("#")]),t._v(" 场景")]),t._v(" "),a("p",[t._v("我们新建一个场景，有一个主仓库叫做 "),a("code",[t._v("git-father")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/xxx/git-father\n├── .git\n└── README.md\n")])])]),a("p",[t._v("需要将另一个仓库 "),a("code",[t._v("git-sub")]),t._v(" 引入此仓库中")]),t._v(" "),a("h3",{attrs:{id:"引入子仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#引入子仓库"}},[t._v("#")]),t._v(" 引入子仓库")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 在主仓库 git-father 下执行")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" submodule "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" git@github.com:YasinChan/git-sub.git git-sub\n")])])]),a("p",[t._v("此时，在主仓库下，子仓库将被引入，同时生成 "),a("code",[t._v(".gitmodules")]),t._v(" 配置文件")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/xxx/git-father\n├── .git\n├── .gitmodules\n├── README.md\n└── git-sub\n")])])]),a("h3",{attrs:{id:"更新子仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#更新子仓库"}},[t._v("#")]),t._v(" 更新子仓库")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 方法一")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" submodule foreach "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull origin master\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 方法二")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" git-sub\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull origin master\n")])])]),a("h3",{attrs:{id:"克隆一个包含子仓库的仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#克隆一个包含子仓库的仓库"}},[t._v("#")]),t._v(" 克隆一个包含子仓库的仓库")]),t._v(" "),a("p",[t._v("前面说到主仓库和子仓库是互相保持独立的，所以无论是 push 还是 pull 操作，都需要单独执行"),a("br"),t._v("\n所以我们在 clone 主仓库时，不会同时将子仓库 clone 下来。此时可以如下操作")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 克隆主仓库")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone git@github.com:YasinChan/git-father.git\n")])])]),a("p",[t._v("此时结构如下")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/xxx/git-father\n├── .git\n├── .gitmodules\n├── README.md\n└── git-sub\n# git-sub 是一个空的文件夹\n")])])]),a("p",[t._v("然后继续执行")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" submodule init\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 提示：Submodule 'git-sub' (git@github.com:YasinChan/git-sub.git) registered for path 'git-sub'")]),t._v("\n")])])]),a("p",[t._v("然后")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" submodule update\n")])])]),a("p",[t._v("此时，"),a("code",[t._v("git-sub")]),t._v(" 将被拉取下来")]),t._v(" "),a("h3",{attrs:{id:"gitmodules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitmodules"}},[t._v("#")]),t._v(" .gitmodules")]),t._v(" "),a("p",[t._v("这个配置文件记录了项目 URL 与已经拉取的本地目录之间的映射关系，也就是我们如上 "),a("code",[t._v("git submodule")]),t._v(" 相关操作都是读取的此文件的配置。")])])}),[],!1,null,null,null);s.default=n.exports}}]);