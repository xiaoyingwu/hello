<template>
    <div class="national">
        <div class="bonus"><span>{{bonus}}</span><span>ETH</span></div>
        <div class="pepole">
            <ul>
                <li>Cristiano Ronaldo1</li>
                <li>Cristiano Ronaldo2</li>
                <li>Cristiano Ronaldo3</li>
                <li>Cristiano Ronaldo4</li>
                <li>Cristiano Ronaldo5</li>
                <li>Cristiano Ronaldo6</li>
            </ul>
        </div>
        <div class="local">
            <ul>
                <li 
                    v-for="(item, index) in localLists" v-bind:key="item.index"
                    :class="{
                        'active':index === tabIndex
                    }" 
                    @click="changeActive(index)"
                >
                     {{ item.text }}
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
                <select name="sort" id="sort">
                    <option value="">Price Ascending</option> 
                    <option value="">Price Descending</option> 
                </select>
                <em></em>
            </div>
        </div>
        
        <div class="nation-list">
            <ul>
                <li>
                    <div class="top">
                        <div class="country-icon">
                            <img src="@/images/icon1.png">
                        </div>
                        <div class="country-pic">
                            <img src="@/images/pic1.png">
                        </div>
                        <p>Russia</p>
                        <span>Owner:Crisriano Ronaldo</span>
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
                        <span>800.62577 Eth</span>
                        <button class="buy-bot">BUY</button>
                    </div>
                </li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
</template>


<script>
    import '@/less/national.less'
    import axios from 'axios'

    export default {
        name: "national",
        data() {
            return {
                isactive:false,
                tabIndex:0,
                bonus:2,
                localLists:[
                    {text:'All',name:'all'},
                    {text:'Europe',name:'europe'},
                    {text:'S.America',name:'sa'},
                    {text:'N,America',name:'na'},
                    {text:'Africa',name:'africa'},
                    {text:'Asia',name:'asia'}
                    
                ],
                personLists:[
                    {name:'Cristiano Ronaldo1',color:'#ff0000'},
                    {name:'Cristiano Ronaldo2',color:'#ff0000'},
                    {name:'Cristiano Ronaldo3',color:'#ff0000'},
                    {name:'Cristiano Ronaldo4',color:'#ff0000'},
                    {name:'Cristiano Ronaldo5',color:'#ff0000'},
                    {name:'Cristiano Ronaldo6',color:'#ff0000'}
                ],
                teamLists:[]
            }
        },
        mounted(){
            var _this = this;
            axios.get('http://10.10.1.149:8124/index?action=TBP')
            .then(function (response) {
                 _this.bonus = response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        methods: {
            changeActive(index){
                this.tabIndex = index;
            }
        }
    }
</script>
