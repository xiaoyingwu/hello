<template>
    <div class="golden">
        <div class="golden-header">
            <div class="bonus">
                <span :style="'width:'+58*num +'px;'">{{bonus}}</span><span>ETH</span>
            </div>
        </div>
        <div class="pepole">
            <ul>
                <li date-numeber="">Cristiano Ronaldo</li>
                <li>Cristiano Ronaldo</li>
                <li>Cristiano Ronaldo</li>
                <li>Cristiano Ronaldo</li>
                <li>Cristiano Ronaldo</li>
                <li>Cristiano Ronaldo</li>
            </ul>
        </div>
        <div class="local">
            <ul>
                <li class="active">All</li>
                <li>Europe</li>
                <li>S.America</li>
                <li>N,America</li>
                <li>Africa</li>
                <li>Asia</li>
            </ul>
        </div>
        <div class="choose">
            <div class="pepole-show">
                <ul>
                    <li>
                        <span>Cristiano Ronaldo</span>
                        <div class="close">×</div>
                    </li>
                    <li>
                        <span>Cristiano Ronaldo</span>
                        <div class="close">×</div>
                    </li>
                </ul>
            </div>

            <div class="sort">
                <select name="sort" id="sort">
                    <option value="">Price Ascending</option> 
                    <option value="">Price Descending</option> 
                </select>
                <em></em>
            </div>
        </div>
        
        <div class="golden-list">
            <ul>
                <li v-for="item in list" :key="item.id">
                    <div class="top">
                        <img  :src="'@/../static/boots/Boot'+ item.id +'.jpg'">                       
                        <p>{{item.name}}</p>
                        <span>Owner:Crisriano Ronaldo</span>
                    </div>
                    <div class="goal">
                        <p>Goal</p>
                        <p>4</p>
                    </div>
                    <div class="bot">
                        <span>800.62577 Eth</span>
                        <button class="buy-bot"  @click="handlebuyTeam(item)">BUY</button>
                    </div>
                </li>
                <li></li>               
            </ul>
        </div>
        <div class="modle-overlay" 
            :class="{show:model}" 
            @click.stop="model=!model"
            v-for="item in list" :key="item.id"
            v-if="item.name=== buyteam"
        >
            <div class="popup" :class="{show:model}" @click.stop>
                <div class="popup-top">
                    <img :src="'@/../static/boots/Boot'+ item.id +'.jpg'">
                    <span>{{item.name}}</span>
                    <p>Owner: {{item.nick}}</p>
                    <div class="p-close" @click.stop="model=!model"><img src="../images/p-close.png"></div>
                </div>
                <div class="popup-content">
                    <p>You can buy the team name from the player's name by <span>{{item.price | number}} ETH</span></p>
                    <p>The next person who buys this team needs a bid of <span>{{item.nextPrice | number}} ETH</span>. If
                    someone buys you,you will get<span> XXX ETH</span></p>
                    <p>You can bid higher than the current team price to ensurethat you get a
                    purchase. If your bid exceeds the current price, you will get a refund.If 
                    the price is higher than your bid, your transaction may fail.</p>
                    <p>This information was updated 2 seconds ago.</p>
                    <p>Disclaimer: the team is a collection, and no guarantee that other players
or others will buy this collection from you.</p>
                </div>      
                <div class="popup-bottom"><span>0.05000 Eth</span> <button class="buy-bot" @click="buyTeam(item)">BUY</button></div>
                
            </div>
        </div>
    </div>
</template>


<script>
    import '@/less/national.less'

    export default {
        name: "golden",
        data() {
            return {
                bonus:'6,666.66',
                num:1,
                model:false,
                chosse:[],
                flag: false,
                buyteam:''
            }
        },
        computed:{
            
            list(){
                return this.$store.state.playerList;
            },
        },
        mounted(){
            this.$store.dispatch('getPlayerList');
            this.num=this.bonus.length;
        },
        filters: {
            number(value) {
                var toFixedNum = Number(value).toFixed(6);
                var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
                return realVal;
            }
        },
        methods:{
            handlebuyTeam(buy){
                this.model=!this.model;
                this.buyteam = buy.name;
            },
            buyTeam(item){ 
                this.buyteam = item.id;              
                this.model= false;        
                App.buy(this.buyteam,cb=>{ 
                    console.log(cb);
                });
                
            }
        }
    }
</script>
<style lang="less" scoped>
    .popup-top img{
        padding: 5px 0;
    }

</style>



