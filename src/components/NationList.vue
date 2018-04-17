<template>
   <div class="nation-list">
            <ul>
                <li v-for="(item,index) in teamlists" :key="item.id">
                    <div class="top">
                        <div class="country-icon">
                            <img :src="'@/../static/team_icon/icon'+ (index+1) +'.png'">
                        </div>
                        <div class="country-pic">
                            <img :src="'@/../static/team_pic/pic'+ (index+1) +'.png'">
                        </div>
                        <p>{{teamlists[index].name}}</p>
                        <span>Owner:{{teamlists[index].nick}}</span>
                    </div>
                    <div class="mid">
                        <div class="card-left">
                            <span>
                                Continent
                                <p>{{teamlists[index].continent}}</p>
                            </span>
                            <span>
                                Ball-game star
                                <p>{{teamlists[index].star}}</p>
                            </span>
                        </div>                   
                        <div class="card-right">
                            <span>
                                World Rank
                                <p>{{teamlists[index].rank}}</p>
                            </span>
                            <span>
                                Best achievement
                                <p>{{teamlists[index].best}}</p>
                            </span>
                        </div>
                    </div>
                    <div class="bot">
                        <span>{{teamlists[index].price | number}} Eth</span>
                        <button class="buy-bot">BUY</button>
                    </div>
                </li>
                
            </ul>
        </div>
</template>

<script>
import axios from 'axios'
import team_data from '@/../static/json/team.json'


export default {
    name: "nationlist",
    data(){
        return{
            teamlists: [],
            teamdata: [],
           
        }
        
    },
    created() {
        // for(var n=0;n<32;n++){
        //     return{
        //         images:[{src:require('@/iamges/team_pic/'+n+'.png')}]
        //     }
        // }
    },
    mounted(){
        var _this = this;          
        axios.get('http://10.10.1.149:8124/index', {
            params:{
                action: 'TD'
            }
        })
        .then(function (response) {           
            _this.teamlists = response.data.data;
            for(var i=0; i< team_data.length;i++){
                Object.assign(_this.teamlists[i],team_data[i]);     
            }          
        }) 
                  
    },
    filters: {
        number(value) {
            var toFixedNum = Number(value).toFixed(6);
            var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
            return realVal;
        }
    },
    computed:{

    },
    methods:{

    }
}

</script>

