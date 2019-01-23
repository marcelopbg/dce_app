import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes/router'
import VueFire from 'vuefire'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueFire)



// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})
/* const app = new Vue({
  router
}) */

// Now the app has started!
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
