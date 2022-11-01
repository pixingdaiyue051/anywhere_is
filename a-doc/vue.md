### cdn script引入
0. 查询 https://cn.vuejs.org/
1. Vue作为构造函数可以直接使用  
    Vue.config是默认使用的全局配置对象  
    Vue实例与模板一一对应  
    由Vue管理的函数一定都使用普通函数 保证this指向vue实例(methods,computed,watch内都是Vue管理的函数)
    不被Vue管理的函数最好写成箭头函数 保证this指向vue实例(延时任务,定时任务,ajax函数)
2. vue数据代理
    1. 通过vm对象代理data对象的数据 将data数据域复制成vm的_data属性
    2. 更方便操作data数据
    3. 为_data属性设置getter setter 使映射成vm的属性  使用Object.defineProperty实现
2. 插值语法{{xx}}  
    xxx是js表达式  
    作用于标签体
3. 指令语法v-xxx  
    同样也是js表达式  
    作用于标签 标签属性  标签事件
    1. 单向绑定v-bind:(简写:) 数据从vue实例(data)流向模板(html)
    2. 双向绑定v-model: 数据在vue实例(data)流向模板(html)之间双向流转  
        v-model只能作用在表单元素 输入性元素 input select radio 这些带有value属性的标签
4. Vue属性
    1. 计算属性computed
### vue-cli
0. npm i -g @vue/cli      全局安装脚手架  
    npm run serve         启动vue项目  
    npm run build         构建项目输出可执行文件  
    vue inspect > out.js  输出配置项到out.js文件
1. ajax请求
    - xhr new XMLHttpRequest() open send
    - fetch 
    - jquery $.get $.post $.ajax
    - axios
