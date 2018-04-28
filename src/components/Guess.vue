<template>
    <div class="guess">
        <div class="guess-header">
            
        </div>
        <h2>Group matches</h2>

        <div class="local">
            <ul>
                <li class="active">Bottom Pour</li>
                <li>Run a Lottery</li>
            </ul>
        </div>
       
        <div class="day-match" v-for="(item,index) in time" :key="item.index">
            <div class="time">{{item}}</div>
            <ul class="guesslist">
                <li v-for="group in filterTimeList(index)" :key="group.index">
                    <div class="guesslist-top">
                        <div class="teamleft" v-text="getother(group.team1)"></div>
                        <div class="teamright" v-text="getother(group.team2)"></div>
                        <p>{{group.matchTime | local}}</p>
                        <p>{{group.level}}</p>
                        <p v-html="group.location"></p>
                        
                    </div>
                    <div class="pk-img" v-if="group.pic ==1"><img :src="'@/../static/match/'+ group.team1+'pk.jpg'"></div>
                    <div class="guesslist-mid">
                        <p>In the match of {{group.team1}} VS {{group.team2}}, can {{group.team1}} win by {{group.flag}} goals or better?
                        </p>
                    </div>
                    <div class="guesslist-detail">
                        <div class="endtime">15 JUN 2018 - 17:00 Local time</div>
                        <div class="pk-btn">
                            <a href="" @click.prevent="guesswin(group)">YES</a><a href="" @click.prevent="guessfailed(group)">NO</a>
                            </div>
                            <div class="pk-pro">
                                <div class="yes"><span></span><p>Total</p><p>{{group.values1}}Eth</p></div>
                                <div class="no"><span></span><p>Total</p><p>{{group.values2}}Eth</p></div>                                                                                       
                            </div>
                            <div class="bot-left">Invest most: Cristiano Ronaldo<span>500000ETH</span></div>  
                        </div>
                    <div class="guesslist-bot"></div>
                </li>
                
            </ul>
        </div>

        <div class="modle-overlay" 
            :class="{show:model}" 
            @click="model=!model" 
            v-for="item in list" :key="item.index" 
            v-if="item.team1 === teamid"

        >
            <div class="popup" :class="{show:model}" @click.stop>               
                <div class="popup-top">
                    <span>In the match of Russia VS Saudi Arabia, can Russia win by  2 goals or better?</span>
                    <p>YOUR CHOICE : {{message}}</p>
                    <div class="p-close" :class="{show:model}" v-on:click.stop="model=!model">
                        <img src="../images/p-close.png">
                    </div>
                </div>
                <div class="popup-mid">                   
                    <ul>
                        <li v-for="item in lists" :key="item.index" :class="{'active':item.bet===betting}" @click="betvalue(item)">{{item.bet}}ETH</li>
                        <li><label><input type="text" name="amounts" placeholder="Other" v-model="bettings"></label></li>
                    </ul>
                    <p>According to the amount of your bet, if you win the right guess, you canget
                        <span>709.61577 ETH</span>  
                    </p>                                                 
                </div>
                <div class="popup-bot">
                    <div class="bet">betting: <span v-if="bettings==''">{{betting}}ETH</span><span v-if="bettings!==''">{{bettings}}ETH</span></div>
                    <div class="payment">
                        <button class="buy-bot" @click="guesspayment(item)">payment</button>
                    </div>
                </div>
                
            </div>
        </div>
            
    </div>

</template>
<style lang="less" scoped>
.popup{
    width: 606px;
    height: 512px;
    background: #fff;
    &-top{
        height: 181px;
        width: 465px;
        margin: 0px auto;
        border-bottom: 1px solid #e6e6e6;
        padding-top: 80px;
        span{
            text-align: left;
            
        }
        p{
            font-size: 16px;
            color: #007b17;
            line-height: 2.5;
            font-weight: bold;
            text-align: left;
        }
    }
}
</style>

<script>
import isToday from 'date-fns/is_today'
export default {
    data(){
        return{
            filtertime:'',
            begantime:'',
            model: false,
            message:'',
            lists:[
                {bet:'20'},
                {bet:'50'},
                {bet:'100'},
                {bet:'200'},
                {bet:'500'},
            ],
            isactive: false,
            betting: '500',
            bettings:'',
            partIndex: 0,
            teamid:'',
        }  
    },
    computed:{      
        list(){
            return this.$store.state.matchList;
        },
        time(){
            let time = this.$store.getters.matchtime;
            return time;
        },       
        teams(){
            return this.$store.getters.allteam;
        },
        teamsmall(){
            return this.$store.getters.teamname;
        }
    },
    filters:{
        
        local(val){
            var d = new Date(val*1000);
            var localtime = d.toUTCString();
            return localtime;
        }
    },
    mounted(){
        
        this.$store.dispatch('getMatchList');

    },
    methods:{
        filterTimeList (index) {
            console.log(list);
            let list = [...this.list];
            //按时间过滤
            list = list.sort((a,b)=>a.matchTime - b.matchTime);        
            list = list.filter(item=>this.date(item.matchTime)===this.time[index]);
            return list;
            console.log(list);
        },
        date(val){
            var d = new Date(val*1000);
            var weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var mon=["Jan","Feb","Mar","Apr","May","June","Aug","Sep","Oct","Nove","Dece"];
            var week = weekday[d.getDay()];
            var m = mon[d.getMonth()];
            var day = d.getDate();
            var n = week + " " + day+ " " + m;
            return n;           
        },
        getTeamid(teamname){
            var n;
            for(let i = 0;i<this.teams.length;i++){
                if(teamname == this.teams[i]){
                    n=i+1;
                }
            }
            return n;
        },
        getother(small){
            let teamid = this.getTeamid(small)-1;
            let smallname = this.teamsmall[teamid];
            return smallname;
        },
        guesswin(item){           
            this.model=!this.model;
            this.teamid = item.team1;
            this.message = "yes";
        },
        guessfailed(item){           
            this.model=!this.model;
            this.teamid = item.team1;
            this.message = "no";
            this.partIndex = 1;
        },
        guesspayment(item){
            this.teamid = item.team1;
            let teamid = this.getTeamid(this.teamid);
            let valueEth = '';
            if(this.bettings == ''){
                valueEth = this.betting;
            }else{
                valueEth = this.bettings;
            }            
            App.invest(teamid,this.partIndex,valueEth);
        },
        betvalue(item){      
            this.bettings = '';      
            this.betting = item.bet;

        }
    }
}
</script>

