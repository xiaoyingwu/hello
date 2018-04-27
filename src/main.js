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
import player_data from '@/../static/json/player.json'
import match_data from '@/../static/json/match.json'

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
function getOwnersArray (array) {
  getFilterArray (array);
  for(let i=0;i<6;i++){
    res[i]=6;
    res.join().split(",");
    if(res[i]==""){
      res[i]=null;
    }
  }
  return res;
}
function date(val){
  var d = new Date(val*1000);
  var weekday=new Array(7);
      weekday[0]="Sunday";
      weekday[1]="Monday";
      weekday[2]="Tuesday";
      weekday[3]="Wednesday";
      weekday[4]="Thursday";
      weekday[5]="Friday";
      weekday[6]="Saturday";
  var mon=["Jan","Feb","Mar","Apr","May","June","Aug","Sep","Oct","Nove","Dece"]
  var week = weekday[d.getDay()];
  var m = mon[d.getMonth()];
  var day = d.getDate();
  var n = week + " " + day+ " " + m;
  return n;           
}


const store = new Vuex.Store({
  strict: false,
  state:{
    teamList:[],
    playerList:[],
    matchList:[]
  },
  getters:{
    continents: state=>{
      const continents = state.teamList.map(item =>item.continent)
      return getFilterArray (continents);
    },
    owners: state =>{
      const owners = state.teamList.map(item =>item.nick);
      var filterowners = getFilterArray (owners);    
      return filterowners;
    },
    matchtime: state =>{
      let matchtime = state.matchList.map(item =>item.matchTime);
      matchtime = matchtime.sort((a,b)=>a-b);
            let emp = [];
            for(let i=0;i<matchtime.length;i++){
                emp.push(date(matchtime[i]));
            }
            
      return getFilterArray(emp);
    },

  },
  mutations:{
    //Team list
    setTeamList(state,data){
      state.teamList = data;
    },
    //player list
    setPlayerList(state,data){
      state.playerList = data;
    },
    setMatchList(state,data){
      state.matchList = data;
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
                context.commit('setTeamList',response.data.data);    
            }          
        }) 
    
    },
    getPlayerList(context){
      context.commit('setPlayerList',player_data); 
    },
    getMatchList(context){
      context.commit('setMatchList',match_data)
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
