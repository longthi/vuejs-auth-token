# Vue-Auth-Token

---

- 基于Token的Vue登录状态插件
- 通过HTML5的Web Storage进行状态缓存，而非Vuex的Store，保证页面切换，页面刷新及子域名跳转时都不会丢失登录状态
- 该插件只负责登录状态及token的保存及获取，不涉及登录逻辑

## 安装

~~~
  npm install vuejs-auth-token
~~~

## Vue加载

~~~
import Vue from 'vue'

// 注册插件
import Auth from 'vuejs-auth-token';
Vue.use(Auth);
~~~

## 配置

~~~
Vue.use(Auth, {
  webStore : 'session',
  authName : 'signIn',
  tokenName : 'token',
  localAge : 259200
});
~~~

#### webStore

说明：设置使用的web存储器

默认值：session

可选值：
- session

使用sessionStorage，临时缓存，关闭浏览器后数据清除

- local

使用localStorage，永久缓存，关闭浏览器后数据一直保存，直至手动清除

使用场景：

如需保存登录状态，使用户可自动登录时，使用local模式

#### authName

说明：设置保存在存储器中的登录状态字段名

默认值：signIn

#### tokenName

说明：设置保存在存储器中的Token字段名

默认值：token

#### localAge

说明：token过期时间，存储在localStorage中时，该过期时间有效

过期后，缓存会自动清除

单位：秒（s）

默认值：259200（3天）

配置`webStore=‘local’`时，该值为 `-1` (永不过期)

## 方法

该插件添加了` this.$auth `实例方法

#### this.$auth.login(token, webStore)

登录，必须传入token

如果不传入参数，则只返回当前登录状态，不改变当前状态

如果已有token，传入token可刷新当前已保存的token

无论配置了哪种存储器，这里都可通过设置webStore指定存储器

返回：登录状态，Boolean

#### this.$auth.signOut()

退出登录

清除已保存的相关数据

token过期时，用此方法进行清除后重新登录

返回：登录状态，Boolean

#### this.$auth.check()

返回登录状态，Boolean

#### this.$auth.token()

返回当前保存的token，String

## 使用

### 配合vue-router进行自动跳转

插件注册了全局方法Vue.auth

在router.beforeEach中使用全局方法Vue.auth.check()进行状态判断

```
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!Vue.auth.check()) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next();
    }
  } else {
    next();
  }
})
```

> 仍推荐在子组件中使用实例方法this.$auth

### 登录

1. 通过axios进行登录请求，并获取token
2. 将token传入login(token)进行登录，并保存状态及token

### 获取token

在任何组件内都可通过token()获取

### token过期

1. 通过axios请求时，捕获token过期状态
2. 通过signOut()进行退出
3. 重定向到登录页