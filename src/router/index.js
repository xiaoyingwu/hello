import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('./Home')

Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    base: 'dist',
    routes: [
        {
            path:'',
            // path: '/Worldcup/web/index.html',
            name:'Home',
            component: Home,
        }
        // {
        //     path: '*',
        //     component: Error
        // }
    ]
})