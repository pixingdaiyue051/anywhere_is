import Vue from 'vue'
// 引入vue-router库
import VueRouter from 'vue-router'
// 使用该插件
Vue.use(VueRouter)

// 引入需要被router管理的组件
import Mid from '../pages/Mid.vue'
import Backend from '../pages/Backend.vue'
import Boot from '../pages/Boot.vue'
import Home from '../pages/Home.vue'
import Im from '../components/Im.vue'
import Ws from '../components/Ws.vue'
import Rtc from '../components/Rtc.vue'

const router = new VueRouter({
    // 路由工作模式 默认hash 可选hash history
    // hash模式 访问路径以/#/开始 之后的路径不会传入服务器作为访问路由接收
    mode: 'hash',
    routes: [
        {
            name: 'mid',
            path: '/mid',   // route的跳转连接 标识 /时必须的(on-nested routes must include a leading slash character)
            component: Mid, // 跳转的具体组件
        },
        {
            name: 'backend',
            path: '/backend',   // route的跳转连接 标识 /时必须的(on-nested routes must include a leading slash character)
            component: Backend, // 跳转的具体组件
        },
        {
            name: 'boot',
            path: '/boot',   // route的跳转连接 标识 /时必须的(on-nested routes must include a leading slash character)
            component: Boot, // 跳转的具体组件
        },
        {
            name: 'home',
            path: '/home',   // route的跳转连接 标识 /时必须的(on-nested routes must include a leading slash character)
            component: Home, // 跳转的具体组件
            children: [
                {
                    name: 'im',
                    path: 'im',
                    component: Im,
                    props($route) { // 函数式 直接获得$route对象 最后通过函数体内返回一个对象传入组件的props属性
                        return { // 传递一个对象
                            role: $route.query.role,
                            serviceId: $route.query.serviceId,
                            userId: $route.query.userId
                        }
                    }
                },
                {
                    name: 'ws',
                    path: 'ws',
                    component: Ws,
                    // props($route) { // 函数式 直接获得$route对象 最后通过函数体内返回一个对象传入组件的props属性
                    //     return { // 传递一个对象
                    //         uri: $route.query.uri,
                    //     }
                    // }
                },
            ]
        },
        {
            name: 'rtc',
            path: '/rtc',   // route的跳转连接 标识 /时必须的(on-nested routes must include a leading slash character)
            component: Rtc, // 跳转的具体组件
        },
    ]
})


export default router