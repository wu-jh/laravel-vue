import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/admin/Home.vue'
import CategoryDetails from '../views/admin/CategoryDetails.vue'
import CategoryAdd from '../views/admin/CategoryAdd.vue'
import Product from '../views/admin/Product.vue'
import ProductAdd from '../views/admin/ProductAdd.vue'
import ProductDetails from '../views/admin/ProductDetails.vue'
import ProductEdit from '../views/admin/ProductEdit.vue'
import Nav from '../views/admin/Nav.vue'
import Banner from '../views/admin/Banner.vue'
import Icon from '../views/admin/Icon.vue'
import Boutique from '../views/admin/Boutique.vue'
import LayoutAdd from '../views/admin/LayoutAdd.vue'
import LayoutDetails from '../views/admin/LayoutDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin/category',
    name: 'home',
    component: Home
  },
  {
    path: '/admin/category/details',
    name: 'categoryDetails',
    component: CategoryDetails
  },
  {
    path: '/admin/categoryAdd',
    name: 'categoryAdd',
    component: CategoryAdd
  },
  {
    path: '/admin/product',
    name: 'product',
    component: Product
  },
  {
    path: '/admin/productAdd',
    name: 'productAdd',
    component: ProductAdd
  },
  {
    path: '/admin/product/details',
    name: 'productDetails',
    component: ProductDetails
  },
  {
    path: '/admin/productEdit',
    name: 'ProductEdit',
    component: ProductEdit
  },
  {
    path: '/admin/nav',
    name: 'nav',
    component: Nav
  },
  {
    path: '/admin/banner',
    name: 'banner',
    component: Banner
  },
  {
    path: '/admin/icon',
    name: 'icon',
    component: Icon
  },
  {
    path: '/admin/boutique',
    name: 'boutique',
    component: Boutique
  },
  {
    path: '/admin/layoutAdd',
    name: 'layoutAdd',
    component: LayoutAdd
  },
  {
    path: '/admin/layout/details',
    name: 'layoutDetails',
    component: LayoutDetails
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
