### 命令行
0. 查询包https://www.npmjs.com/
1. node -v  检查版本  
    node xx.js   运行单个脚本  
    npm init -y  初始化在项目根目录下生成package.json  
    npm install xx  简写 npm i xx  安装xx最新版本  
    npm i xx@x.x.x  安装xx指定版本  
    npm i  直接安装package.json这种全部依赖包  
    npm i xx --save 简写 npm i xx -S    安装依赖包  
    npm i xx --save-dev 简写 npm i xx -D    安装开发环境包  
    npm i cnpm -g --registry=https://registry.npm.taobao.org    安装阿里镜像包   
    npm uninstall xx 简写 npm un xx  删除包  
    npm config get registry     查看当前下载路径  
    npm config set registry=https://registry.npm.taobao.org   设置淘宝镜像  
    npm root -g  查看全局安装路径  
    npm prefix -g  查看node路径  
    npm config set prefix 'xx'  设置node安装的全局路径(默认带上node_modules)

2. nrm小工具  
    npm i nrm -g  
    nrm ls  显示所有可选下载报地址  
    nrm use xx 切换到具体的地址
3. i5ting_toc  
    npm install -g i5ting_toc
    i5ting_toc -f xx
### 模块
1. 全局模板
    1. 全局可访问的模板 不需要显式引用
    2. process.env 全局环境
    3. __dirname   当前访问路径
    4. __filename   当前访问文件路径
2. 系统模块
    1. 使用require加载node提供的模板
    2. 使用require加载模块按照下面的顺序查找
        参数中写明的路径
        项目路径下node_modules目录
        node安装目录下node_modules目录
    4. const path = require('path');
    5. const fs = require('fs');
    6. const http = require('http');
    7. const url = require('url');
    8. const querystring = require('querystring');
3. 自定义模板
    1. 自己编写js
    2. 每一个js文件都有一个内置的module对象 使各个js文件之间相互隔离和互相传递引用
    4. 使用require加载module时得到的就是module的exports对象 且永远以模块文件内的module.exports对象为准
4. 第三方模块(包)
    1. 其他个人或团队编写通用模块
    2. 基于系统模块内置API编写的更高级的通用的API
    3. 版本号意义
        1. 第一位 大版本号 标识基础架构
        2. 第二位 功能版本号 标识增加了某些功能
        3. 第三位 bug修改版本号 标识某功能版本下的某bug修复了
        4. 版本号提升规则  
            前一位版本号增加了 当前版本号需要归0
### 项目目录
1. node_modules  
    存放当前项目依赖的包
2. package-lock.json   
    记录下载的包的名字 版本号 下载地址