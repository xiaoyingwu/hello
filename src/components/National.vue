<template>
    <div class="national">
        <div class="nation-header">
            <div class="bonus">
                <span :style="'width:'+58*num +'px;'">{{bonus | number(2)}}</span><span>ETH</span>
            </div>
        </div>        
        <div class="pepole">
            <ul>
                <li 
                    v-for="item in owners" v-bind:key="item.id"
                    @click="handleFilterOwner(item)" 
                    v-if="owners!=''"                   
                >
                     {{ item }}
                </li>
            </ul>
        </div>
        <div class="local">
            <ul>
                <li
                    :class="{
                        'active':filterContinent === ''
                    }"
                    @click="filterContinent =''"
                >
                All
                </li>
                <li 
                    v-for="item in continents" v-bind:key="item.index"
                    :class="{
                        'active':item === filterContinent
                    }" 
                    @click="handleFilterContinent(item)"
                >
                     {{ item }}
                </li>
                
            </ul>
        </div>
        <div class="choose">
            <div class="pepole-show">
                <ul>
                    <li  
                        
                        v-for = "item in chosse" v-bind:key="item.id"                        
                    >
                        <span>{{ item }}</span>
                        <div class="close" @click="closechosse(item)">×</div>
                    </li>
                    
                </ul>
            </div>

            <div class="sort">
                <select name="sort" id="sort" @change="changeOrder">
                    <option value="up">Price Ascending</option> 
                    <option value="down">Price Descending</option> 
                </select>
                <em></em>
            </div>
        </div>
       <div class="nation-list">
            <ul>
                <li v-for="item in filteredAndOrderedList" :key="item.id">
                    <div class="top">
                        <div class="country-icon">
                            <img :src="'@/../static/team_icon/icon'+ item.id +'.png'">
                        </div>
                        <div class="country-pic">
                            <img :src="'@/../static/team_pic/pic'+ item.id +'.png'">
                        </div>
                        <p>{{item.name}}</p>
                        <span>Owner:{{item.nick}}</span>
                    </div>
                    <div class="mid">
                        <div class="card-left">
                            <span>
                                Continent
                                <p>{{item.continent}}</p>
                            </span>
                            <span>
                                Ball-game star
                                <p>{{item.star}}</p>
                            </span>
                        </div>                   
                        <div class="card-right">
                            <span>
                                World Rank
                                <p>{{item.rank}}</p>
                            </span>
                            <span>
                                Best achievement
                                <p>{{item.best}}</p>
                            </span>
                        </div>
                    </div>
                    <div class="bot">
                        <span>{{item.price | number(5)}} Eth</span>
                        <button class="buy-bot" @click="handlebuyTeam(item)">BUY</button>
                    </div>
                </li>
                
            </ul>
        </div>
            
        <!-- <nation-list></nation-list> -->
              
         <div class="modle-overlay" 
            :class="{show:model}" 
            @click.stop="model=!model"
            v-for="item in filteredAndOrderedList" :key="item.id"
            v-if="item.name=== buyteam"
        >
                  <div class="popup" :class="{show:model}" @click.stop="loadData">
                        <div class="popup-top">
                            <div class="reload" @click.stop><img src="../images/reload.jpg"></div>
                            <img :src="'@/../static/team_pic/pic'+ item.id +'.png'">
                            <span>{{item.name}}</span>
                            <p>Owner: {{item.nick}}</p>
                            <div class="p-close" @click.stop="model=!model"><img src="../images/p-close.png"></div>
                        </div>
                        <div class="popup-content">
                            <p>You can buy the team name from the player's name by <span>{{item.price | number(5)}} ETH</span></p>
                            <p>The next person who buys this team needs a bid of <span>{{item.nextPrice | number(5)}} ETH</span>. If
                            someone buys you,you will get refunded the difference.</p>
                            <p>You can bid higher than the current team price to ensurethat you get a
                            purchase. If your bid exceeds the current price, you will get a refund.If 
                            the price is higher than your bid, your transaction may fail.</p>
                            <p>This information was updated <set-time>2 seconds</set-time> ago.</p>
                            <p>Disclaimer: the team is a collection, and no guarantee that other players
or others will buy this collection from you.</p>
                        </div>
                              
                            <div class="popup-bottom"><span>{{item.price | number(5)}} Eth</span> <button class="buy-bot" @click="buyTeam(item)">BUY</button></div>                      
                  </div>
            </div>    
    </div>
</template>


<script>
    import '@/less/national.less'
    import axios from 'axios'
    import settime from './Settime.vue'
    export default {
        components: {
        'set-time': settime,        
        },
        computed:{
            list(){
                return this.$store.state.teamList;
            },
            continents () {
                return this.$store.getters.continents;
            },
            owners(){
                return this.$store.getters.owners;
            },
            
            filteredAndOrderedList () {
                let list = [...this.list];
                //按地区过滤
                if (this.filterContinent !== '') {
                    list = list.filter(item => item.continent === this.filterContinent);
                    

                }
                //按球队拥有者过滤
                if (this.filterOwner !== '') {
                    list = list.filter(item => item.nick === this.filterOwner);
                    // list = list.map(item => item.nick);
                }
                //按价格排序
                if (this.order !== ''){
                    if(this.order === 'up'){
                        list = list.sort((a,b)=>b.price - a.price);
                    }else if(this.order === 'down'){
                        list = list.sort((a,b)=>a.price - b.price);
                    }
                }
                return list;
            }
        },
        name: "national",
        data() {
            return {
                isactive:false,
                tabIndex:0,
                bonus:'6,666.66',
                model:false,
                teamLists:[],
                chosse:[],
                flag: false,
                num: 1,
                order:'',
                filterContinent:'',
                filterOwner:'',
                buyteam:'',
                
            }
        },
        mounted(){                   
            axios.get('http://10.10.1.149:8124/index', {
                params:{
                    action: 'TBP'
                }
            })
            .then(response => {
                 this.bonus = response.data.data;
                 this.num=this.bonus.length;
         
            }, response => {
                     console.log('数据加载失败')
            }
            )
            this.loadData();
        },
        filters: {
            number(value,n) {
                var toFixedNum = Number(value).toFixed(n);
                          
                return toFixedNum;

            },
           
        },
        methods: {    
            loadData(){
                this.$store.dispatch('getTeamList');
            },       
            handleFilterContinent (continent) {
                this.filterContinent = continent;               
            },
            handleFilterOwner (owner) {
                this.filterOwner=owner;  
                this.chosse.push(owner);
                
            },                              
            removeByValue(arr,val){
                for(var i=0; i<arr.length; i++) {
                    if(arr[i] == val) {
                    arr.splice(i, 1);
                    break;
                    }
                }
            },
            closechosse(owner){
                const arr = this.chosse;
                this.removeByValue(arr,owner);
                
            },
            changeOrder(e){
                this.order = e.target.value;
            },
            ownerchosse(){
            
            },
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
