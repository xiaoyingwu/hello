// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex';
import router from './router/index'

import './less/common.less'


Vue.config.productionTip = false
Vue.use(Vuex);
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })



// const app = new Vue({
//   el: '#app',
//   ...App,
//   router,
 
  
// })
const store = new Vuex.Store({
  state:{

  },
  getters:{

  },
  mutations:{

  },
  actions:{

  }
})
new Vue({
   el: '#app',
   router: router,
   store: store,
   render: h => {
     return h(App)
   }
});
