<template>
    <div class="national">
        <div class="nation-header">
            <div class="bonus">
                <span :style="'width:'+58*num +'px;'">{{bonus}}</span><span>ETH</span>
            </div>
        </div>        
        <div class="pepole">
            <ul>
                <li 
                    v-for="item in owners" v-bind:key="item.id"
                    @click="handleFilterOwner(item)"
                    
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
                        <div class="close" @click="choose=''">×</div>
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
                        <span>{{item.price | number}} Eth</span>
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
                  <div class="popup" :class="{show:model}" @click.stop>
                        <form action="">
                              <div class="popup-top">
                                    <h2>The National team you bet / injected is:</h2>
                                    <span>{{item.name}}</span>
                                    <div class="p-close" :class="{show:model}" v-on:click.stop="model=!model">×</div>
                              </div>
                              <div class="popup-mid">
                                    <p>you can use {{item.price}}ETH to buy game1 from {{item.nick}}</p>
                                    
                                    <p>Next price:</p>
                                    <span>{{item.nextPrice}}ETH</span>
                              </div>
                              <div class="popup-bot">
                                    <div class="bet">betting: <span>{{item.price}}ETH</span></div>
                                    <div class="payment"><input type="submit" value="payment"></div>
                              </div>
                        </form>
                  </div>
            </div>
        
    
    </div>

    

</template>


<script>
    import '@/less/national.less'
    import axios from 'axios'

    export default {
        // components: {
        // 'nation-list': nationlist,        
        // },
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
                buyteam:''
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
            this.$store.dispatch('getTeamList');
        },
        filters: {
            number(value) {
                var toFixedNum = Number(value).toFixed(6);
                var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
                return realVal;
            }
        },
        methods: {
            
            handleFilterContinent (continent) {
                this.filterContinent = continent;               
            },
            handleFilterOwner (owner) {
                this.filterOwner = owner; 
               
                
                this.changeChosse(owner);                        
            },
            changeChosse(owner){             
                this.chosse.push(owner);

            },
            changeOrder(e){
                this.order = e.target.value;
            },
            ownerchosse(){
            
            },
            handlebuyTeam(buy){
                this.model=!this.model;
                this.buyteam = buy.name;
            }
        }
    }
</script>
