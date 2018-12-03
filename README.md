# webpack-generator
生成webpack项目
### 运行
```$xslt
1. npm install 
2. npm run server -- --env=dev
```
### 部署
```$xslt
1. npm run build -- --env=prod
```
### 项目说明
1. 添加了vue和react编译支持，可根据需要删减没用的插件
2. 支持scss语法, 所有组件的样式可继承根目录下的 global.scss
3. 支持jsx、es6最新语法
4. 使用node搭建本地服务器，进行热替换更新
5. 部署环境下会进行css提取
6. 部署环境下，引用超过2次的js模块会被打包到一个js文件
7. 自动引入了lodash.js工具函数，可全局使用
