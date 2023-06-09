import * as Vue from 'vue';
import * as VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
console.log({Vue})
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
