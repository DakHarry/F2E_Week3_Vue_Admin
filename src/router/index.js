import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/HomeComponent.vue'
import Order from '../components/order/OrderComponent.vue'
import Product from '../components/product/ProductComponent.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/Product',
      name: 'Product',
      component: Product
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
