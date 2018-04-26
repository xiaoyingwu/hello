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
        <div class="day-match" v-for="item in filterTimeList" :key="item.index">
            <div class="time">{{item.matchTime |date}}</div>
            <ul class="guesslist">
                <li>
                    <div class="guesslist-top">
                        <div class="teamleft">RUS</div>
                        <div class="teamright">RSA</div>
                        <p>14 JUN 2018 - 18:00 Local time</p>
                        <p>GROUP A</p>
                        <p>Luzhniki Stadium</p>
                        <p>Moscow</p>
                    </div>
                    <div class="guesslist-mid">
                        <p>In the match of {{item.team1}} VS {{item.team2}}, can Russia win by 2 goals or better?
                        </p>
                    </div>
                    <div class="guesslist-detail">
                        <div class="endtime">15 JUN 2018 - 17:00 Local time</div>
                        <div class="pk-btn">
                            <a href="" v-on:click.prevent="modelCha=!modelCha">YES</a><a href="">NO</a>
                            </div>
                            <div class="pk-pro">
                                <div class="yes"><span></span><p>Total</p><p>200000Eth</p></div>
                                <div class="no"><span></span><p>Total</p><p>200000Eth</p></div>                                                                                       
                            </div>
                            <div class="bot-left">Invest most: Cristiano Ronaldo<span>500000ETH</span></div>  
                        </div>
                    <div class="guesslist-bot"></div>
                </li>
                <li></li>
            </ul>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{
            filtertime:''
        }  
    },
    computed:{           
        list(){
            return this.$store.state.matchList;
        },
        time(){
            return this.$store.getters.matchtime;
        },
        filterTimeList () {
            console.log(list);
            let list = [...this.list];
            //按时间过滤
            list = list.sort((a,b)=>b.matchtime - a.matchtime);
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
            var week = weekday[d.getDay()];
            var m = d.getMonth()+1;
            var day = d.getDate();
            var n = week + day + m;
            return n;           
        }
    },
    mounted(){
        
        this.$store.dispatch('getMatchList');

    },
}
</script>

