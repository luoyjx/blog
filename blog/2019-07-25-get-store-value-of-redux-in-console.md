---
slug: get-store-value-of-redux-in-console
title: 如何在 Console 中获取当前 redux 的 store 值
tags: [react ,redux]
---

### 如何在 Console 中获取当前 redux 的 store 值

如果你安装了 react developer tools ，你可以通过 `$r.store.getState();` 来获取，不用改别的代码.

**Note:** 你需要先打开 react developer tool 之后，让他可用, 不然你回遇到 `$r is not defined` error

<br/>

 ![image.png](https://static.gaoqixhb.com/Fs8jbtroDbL_JS9q45mEhwmX61L4)

<br/>

1. 开打 developer tools
2. 点击 「React」 tab
3. 确认 provider 节点 (or topmost 节点) 现在是被选中的
4. 然后输入 `$r.store.getState();` or `$r.store.dispatch({type:"MY_ACTION"})` 到你的浏览器 console


[https://stackoverflow.com/questions/34373462/while-debugging-can-i-have-access-to-the-redux-store-from-the-browser-console](https://stackoverflow.com/questions/34373462/while-debugging-can-i-have-access-to-the-redux-store-from-the-browser-console)
