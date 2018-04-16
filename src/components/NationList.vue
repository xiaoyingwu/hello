<template>
   <div class="nation-list">
            <ul>
                <li v-for="(item,index) in teamlists" :key="item.id">
                    <div class="top">
                        <div class="country-icon">
                            <img src="@/images/icon1.png">
                        </div>
                        <div class="country-pic">
                            <img src="@/images/pic1.png">
                        </div>
                        <p>{{teamdata.teamName}}</p>
                        <span>Owner:{{teamlists[index].nick}}</span>
                    </div>
                    <div class="mid">
                        <div class="card-left">
                            <span>
                                Continent
                                <p>Europe</p>
                            </span>
                            <span>
                                Ball-game star
                                <p>Alan Dzagoev</p>
                            </span>
                        </div>                   
                        <div class="card-right">
                            <span>
                                World Rank
                                <p>No.20</p>
                            </span>
                            <span>
                                Best achievement
                                <p>Eight</p>
                            </span>
                        </div>
                    </div>
                    <div class="bot">
                        <span>{{teamlists[index].price}} Eth</span>
                        <button class="buy-bot">BUY</button>
                    </div>
                </li>
                
            </ul>
        </div>
</template>

<script>
import axios from 'axios'
import team_data from '@/../static/json/cfg_team.json'

export default {
    name: "nationlist",
    data(){
        return{
            teamlists:[],
            teamdata:""
        }
        
    },
    mounted(){
        var _this = this;          
        axios.get('http://10.10.1.149:8124/index', {
            params:{
                action: 'TD'
            }
        })
        .then(function (response) {
            _this.teamlists = response.data.data
            
        })
        this.getTeamdata();
    },
    methods:{
        getTeamdata(){
            setTimeout(() => {
            this.teamdata = team_data.find(item => item.id === this.teamID);
            }, 500);
        } 
    }
}

</script>

