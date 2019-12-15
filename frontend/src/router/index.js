import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/Home'
import Product from '@/components/views/Product'
import Category from '@/components/views/Category'
import Customer from '@/components/views/Customer'
import Brand from '@/components/views/Brand';
import Order from '@/components/views/Order';
import Staff from '@/components/views/Staff'
import Logout from '@/components/views/Logout'
import Vuetify from 'vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#7986CB',
    secondary: '#e57373',
    accent: '#9c27b0',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})
Vue.use(VueSweetalert2)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/api/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/api/category',
      name: 'Category',
      component: Category
    },
    {
      path:'/api/brand',
      name:'Brand',
      component:Brand
    },
    {
      path: '/api/customer',
      name: 'Customer',
      component: Customer
    },
    {
      path: '/api/order',
      name: 'Order',
      component: Order
    },
    {
      path:'/api/staff',
      name:'Staff',
      component:Staff
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
