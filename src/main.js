// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import router from './router/index'
import axios from 'axios'
import './app.js'
import './less/common.less'
import team_data from '@/../static/json/team.json'

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

//数组去重
function getFilterArray (array) {
  const res = [];
  const json = {};
  for (let i = 0; i < array.length; i++){
      const _self = array[i];
      if(!json[_self]){
          res.push(_self);
          json[_self] = 1;
      }
  }
  return res;
}
//取前六位
// function getOwnersArray (array,value){
//   const resname = [];
//   const resval = [];
//   const json = {};
//   for (let i = 0; i < array.length; i++){
//     const _self = array[i];
//     const value = 0
//     if(!json[_self]){
//       resname.push(_self);
//       json[_self] = 1;
//     }else{
//       value = value+value[i]
//       resval.push(value);
//       value = 0;
//     }
//     resval=resval.sort((a,b)=>a-b)
//   }
//  return resname;
// }


const store = new Vuex.Store({
  strict: false,
  state:{
    teamList:[]
   
  },
  getters:{
    continents: state=>{
      const continents = state.teamList.map(item =>item.continent)
      return getFilterArray (continents);
    },
    owners: state =>{
      const owners = state.teamList.map(item =>item.nick)
      // const owners = state.teamList.map(item => {
      //   var rnick ={};
      //   rnick[item.nick]=item.price;
      //   return rnick;
      // })
    
     
      
      return getFilterArray (owners);
     
    }
  },
  mutations:{
    setTeamList(state,data){
      state.teamList = data;
    }
  },
  actions:{
    getTeamList(context){
          
        axios.get('http://10.10.1.149:8124/index', {
            params:{
                action: 'TD'
            }
        })
        .then(function (response) {                     
            for(var i=0; i< team_data.length;i++){
                Object.assign(response.data.data[i],team_data[i]); 
                context.commit('setTeamList',response.data.data)    
            }          
        }) 
      
    }
  }
})
new Vue({
   strict: false,
   el: '#app',
   router: router,
   store: store,
   render: h => {
     return h(App)
   }
});
