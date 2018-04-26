import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('./Home')
const Faq = () => import('./Faq')
const Rules = () => import('./Rules')
Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    // base: '/Worldcup/web',
    routes: [
        {
            path:'',
            // path: '/Worldcup/web/index.html',
            name:'Home',
            component: Home,
        },
        {
            path:'/faq',
            // path: '/Worldcup/web/index.html',
            name:'Faq',
            component: Faq,
        },
        {
            path:'/rules',
            // path: '/Worldcup/web/index.html',
            name:'Rules',
            component: Rules,
        }
        // {
        //     path: '*',
        //     component: Error
        // }
    ]
})