---
id: auth-control-in-react-router
title: react 路由权限控制
---

# 路由的权限控制(摘要: onEnter、context.router)

单页应用路由的权限控制的基本思路是：

监听路由的改变，每当路由**将要**发生改变，我们就使用一个**中间服务**(该服务介于上一级路由和将要到达路由之间启动)，来判断我们是否有进入这个**路由的权限**，有的话直接进入，没有的话就redirect。

在React中，为某个路由进行权限监听的方式是onEnter `<Route path="page" component={Page} onEnter={requireCredentials}/>` ，该onEnter属性对应连着一个具有判**断权限的中间服务。**我们通过上一级路由来启动这个服务。假设我们需要从'/form'到'/page'之间做一个判断，在'/form'中填写特定字段后才能成功跳转，否则redirect到'/error'


```js
//form
const Form = createClass({
  // 省略部分代码
  submitAction(event) {
    event.preventDefault();
     // 通过 context 传输数据
    // 通过 url 的 query 字段传输数据
    // 也可以通过制定其他服务来传输数据
    this.context.router.push({
      pathname: '/page',
      query: {
        qsparam: this.state.value
      }
    })
  },
  render() {
    return (
      <form onSubmit={this.submitAction}>
        // 省略部分代码
        <button type="submit">Submit </button>
      </form>
    )
  }
})

// 路由权限控制
<Route path="page" component={Page} onEnter={requireCredentials}/>

// 权限控制的中间服务
function requireCredentials(nextState, replace, next) {
  // 获取传输过来的数据
  if (query.qsparam) {
    serverAuth(query.qsparam)
    .then(
      () => next(),// 成功 , 通过 next() 成功跳转
      () => {
        replace('/error')// 重定向
        next()
      }
    )
  } else {
    replace('/error')
    next()
  }
}
```
