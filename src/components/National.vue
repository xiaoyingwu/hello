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
                    v-for="item in owners" v-bind:key="item.index"
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
                        <button class="buy-bot">BUY</button>
                    </div>
                </li>
                
            </ul>
        </div>
            
        <!-- <nation-list></nation-list> -->
              
        
        
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
                localLists:[
                    {text:'All',name:'all'},
                    {text:'Europe',name:'europe'},
                    {text:'S.America',name:'sa'},
                    {text:'N,America',name:'na'},
                    {text:'Africa',name:'africa'},
                    {text:'Asia',name:'asia'}
                    
                ],
                teamLists:[],
                num: 1,
                order:'',
                filterContinent:'',
                filterOwner:''
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
            },
            changeOrder(e){
                this.order = e.target.value;
            }
        }
    }
</script>
