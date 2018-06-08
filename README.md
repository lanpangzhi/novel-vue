# novel-vue
一个基于vue2.0开发的小说网站
1.0版本技术栈采用yarn、vue-cli3.0、axios、vue-router、vue-touch、vuex、vant、vue2.0、ESLint。
store使用localStorage本地存储，dns预解析，vue-router路由组件的懒加载，部署后使用nginx缓存开启gzip压缩。
## 线上访问地址
[vbook.langpz.com](https://vbook.langpz.com)

开发环境
```
git clone https://github.com/lanpangzhi/novel-vue.git
cd novel-vue
yarn 
yarn serve
```

打包
```
yarn build
```