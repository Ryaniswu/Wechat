# ClassScoring

这个项目里面包含前端(web)和后端(end),前端是通过React+React-Router写的，后端是通过Node.js+Koa写的。

## 具体的说明如下：
* 编程语言：JavaScript
* Node.js：10.x.x
* 前端JavaScript语法：所有的JavaScript语法都可以
* 后端JavaScript语法：对于module模块的import和export支持不好
* 前端和后端分为两个独立的模块，不要搞混，不要相互调用。
* 准备工作，需要分别前往end文件夹和web文件夹下运行`npm install`命令。
* web模块和end模块之间的通信是采用http请求的方式，也就是ajax请求。他们之间数据传输的格式是json格式，json的内容是MessageBean.js文件里面的对象转换而来。
* .idea文件夹和.vscode文件夹是由IDE生成的，平常不用管，尽量不要上传到GIT中，也不要修改GIT中的备份

## end模块
* 启动：数据库导入之后，配置本地的config.js文件中的信息，然后运行`npm start`命令即可启动。
* class_scoring.sql是数据库文件，用MySQL WorkBench导入即可，会自动创建数据库。
* bean文件夹是放的一些很常用的Bean的生成
* business文件夹下的文件负责一些业务流程，比如创建、删除、用户登录等等。
* controller文件夹是http请求的入口地址，处理发往服务器的各种请求，最常见的操作是数据的获取、检查、和往business层调用以及数据返回的过程。
* middleware文件夹是中间件，和SPRING框架中的interceptor一样的功能，负责在请求到来时的一些事物处理，平常不用管。
* routes文件夹是路由文件夹，里面全是路由的配置。
* util是常用的工具包，与请求和业务无关的方法可以卸载这个里面
* config.js是配置文件，和部署和平台有关的配置请放在这个里面，不要更改服务器中的这个文件的配置，也就是说，**不要把本地更改过的config.js文件传到服务器中**。
* index.js是入口文件，平常不做更改
* 数据库：MySQL 5.7/8.0
* 文件后缀一律使用.js结尾

## web模块
* 前端使用React [doc](https://reactjs.org/docs/getting-started.html) 和react-router [doc1](https://reacttraining.com/react-router/web/guides/philosophy), [doc2](http://react-guide.github.io/react-router-cn/docs/guides/basics/RouteConfiguration.html)，不懂之处请自行阅读文档，还是不懂的话问学长。
* 启动：`npm start`命令运行一下就好了。启动后的网址：http://localhost:3000
* util文件夹是一些常用的工具方法，与视图无关的工具方法请放在这个里面
* 关于模块：请使用import和export语法
* view文件夹是视图相关的文件夹
* route.js是与路由相关的文件，路由配置在这个文件里面
* index.js是入口文件
* jsx和js后缀分别是react的jsx语法和javascript默认文件后缀名，在react项目实际编写中无明显区别，但是注意，如果是react视图相关的文件尽量使用jsx后缀，不是的用js后缀。
