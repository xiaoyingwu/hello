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
        <div class="day-match" v-for="(item,index) in list" :key="item.index">

            <div class="time">{{item.matchTime |date}}</div>
            <ul class="guesslist">
                <li v-for="group in filterTimeList" :key="group.index">
                    <div class="guesslist-top">
                        <div class="teamleft">RUS</div>
                        <div class="teamright">RSA</div>
                        <p>14 JUN 2018 - 18:00 Local time</p>
                        <p>GROUP A</p>
                        <p>Luzhniki Stadium</p>
                        <p>Moscow</p>
                    </div>
                    <div class="guesslist-mid">
                        <p>In the match of {{group.team1}} VS {{group.team2}}, can {{group.team1}} win by 2 goals or better?
                        </p>
                    </div>
                    <div class="guesslist-detail">
                        <div class="endtime">15 JUN 2018 - 17:00 Local time</div>
                        <div class="pk-btn">
                            <a href="" @click.prevent="guesswin">YES</a><a href="" @click.prevent="guessfailed">NO</a>
                            </div>
                            <div class="pk-pro">
                                <div class="yes"><span></span><p>Total</p><p>200000Eth</p></div>
                                <div class="no"><span></span><p>Total</p><p>200000Eth</p></div>                                                                                       
                            </div>
                            <div class="bot-left">Invest most: Cristiano Ronaldo<span>500000ETH</span></div>  
                        </div>
                    <div class="guesslist-bot"></div>
                </li>
                
            </ul>
        </div>

        <div class="modle-overlay" :class="{show:model}" v-on:click="model=!model">
            <div class="popup" :class="{show:model}" @click.stop>               
                <div class="popup-top">
                        <span>In the match of Russia VS Saudi Arabia, can Russia win by  2 goals or better?</span>
                        <p>YOUR CHOICE : {{message}}</p>
                        <div class="p-close" :class="{show:model}" v-on:click.stop="model=!model"><img src="../images/p-close.png"></div>
                </div>
                <div class="popup-mid">                   
                        <ul>
                            <li v-for="item in lists" :key="item.index" :class="{active:isactive}" @click="betvalue(item)">{{item.bet}}</li>
                            <li><label><input type="number" name="amounts" placeholder="Other"></label></li>
                        </ul>
                        <p>According to the amount of your bet, if you win the right guess, you can
get<span>709.61577 ETH</span>  </p>
                                                 
                </div>
                <div class="popup-bot">
                        <div class="bet">betting: <span>{{betting}}</span></div>
                        <div class="payment">
                            <button class="buy-bot" @click="buyTeam(item)">payment</button>
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
export default {
    data(){
        return{
            filtertime:'',
            begantime:'',
            model: false,
            message:'',
            lists:[
                {bet:'20ETH'},
                {bet:'50ETH'},
                {bet:'100ETH'},
                {bet:'200ETH'},
                {bet:'500ETH'},

            ],
            isactive: false,
            betting: 0
            
        }  
    },
    computed:{  
        datavalue(){
            
        },      
        list(){
            return this.$store.state.matchList;
        },
        time(){
            let time = this.$store.getters.matchtime;
            // time = time.sort((a,b)=>a-b);
            // let res = [];
            // for(let i=0;i<time.length;i++){
            //     res.push(this.date(time[i]))
            // }
            return time;
        },
        filterTimeList () {
            console.log(list);
            let list = [...this.list];
            //按时间过滤
            list = list.sort((a,b)=>a.matchTime - b.matchTime);
            
            list = list.filter(item=>this.date(item.matchTime)===this.time[2]);
            return list;
            console.log(list);
        }
    },
    filters:{
        date(val){
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
    },
    mounted(){
        
        this.$store.dispatch('getMatchList');

    },
    methods:{
        date(val){
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
        },
        guesswin(){
            this.model=!this.model;
            this.message = "yes";
        },
        guessfailed(){
            this.model=!this.model;
            this.message = "no";
        },
        guesspayment(){

        },
        betvalue(item){
            this.isactive = true;
            this.betting = item.bet;
        }
    }
}
</script>

