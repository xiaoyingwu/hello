<template>
    <div class="national">
        <div class="nation-header">
            <div class="bonus">
                <span :style="'width:'+58*num +'px;'">{{bonus}}</span><span>ETH</span>
            </div>
        </div>        
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
        <nation-list></nation-list>
        
    </div>
</template>


<script>
    import nationlist from '@/components/NationList'
    import '@/less/national.less'
    import axios from 'axios'

    export default {
        components: {
        'nation-list': nationlist,
        
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
                personLists:[
                    {name:'Cristiano Ronaldo1',color:'#ff0000'},
                    {name:'Cristiano Ronaldo2',color:'#ff0000'},
                    {name:'Cristiano Ronaldo3',color:'#ff0000'},
                    {name:'Cristiano Ronaldo4',color:'#ff0000'},
                    {name:'Cristiano Ronaldo5',color:'#ff0000'},
                    {name:'Cristiano Ronaldo6',color:'#ff0000'}
                ],
                teamLists:[],
                num: 1
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
           
        },
        methods: {
            changeActive(index){
                this.tabIndex = index;
            }
        }
    }
</script>
