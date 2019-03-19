import Vue from 'vue';
import Router from 'vue-router';
import Activite from './views/Activite';
import TimeLine from './views/TimeLine';
import Main from './views/Main';
import Aside from './views/Aside';

Vue.use(Router)

//写路由信息
const routes = [{
    path: '/',
    redirect: '/timeline/recommended', //重定向给用户一个默认页面，可以看到一个url跳转的过程
    //component: PageA 效果没有区别
    beforeEnter: (to, from, next) => {
        console.log("before enter");
        next();
    }

}, {
    path: '/activities',
    name: 'Activite',
    redirect: '/activities/test',
    component: Activite,
    children: [{
        path: 'test',
        //命名视图
        components: {
            main: Main,
            aside: Aside
        }
    }]
}, {
    path: '/timeline',
    redirect: '/timeline/recommended',
    component: TimeLine,
    //嵌套路由
    children: [{
        //动态路由
        path: ':id',
        //命名路由
        name: 'TimeLineId',
        //路由懒加载
        component: () =>
            import ('./views/TimeLineId'),
        props: true
    }]
}]

export default new Router({
    mode: 'history', //history和hash两种模式
    routes
})