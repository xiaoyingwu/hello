<template>
  <div class="content">
        <section class="tab-list">
            <ul>
                <li v-for="(item, index) in tabLists" v-bind:key="item.id">
                    <a 
                        :class="{
                            'router-link-active': index === tabIndex
                        }"
                        @click="changeTab(index, $event)"
                    >
                        {{ item.text }}
                    </a>
                </li>        
            </ul>
        </section>
        <com-nation v-if="componentName === 'national'"></com-nation> 
        <com-golden v-if="componentName === 'golden'"></com-golden>
    </div>
</template>
<script>
import national from '@/components/National'
import golden from '@/components/Golden'

export default {
    components: {
        'com-nation': national,
        'com-golden': golden
    },
   
    data() {
        return {
            componentName: '',
            tabIndex: 0,
            tabLists:[
                {id:1,text:'National Team',name:'national', endTime:'2018-04-18 16:02'},
                {id:0,text:'Guessing Competition',name:'competition', endTime : '2018-04-31 16:02'},
                {id:2,text:'The Goldeb Boot',name:'golden', endTime : '2018-05-31 16:02'},
                {id:3,text:'2020 Qatar World Cup',name:'knockout', endTime : '2018-06-31 16:02'},
             
            ]
        }
    },
    // created() {
    //     const { tabLists, time } = this;
    //     const nowTime = new Date();
    //     const futureTabList = tabLists.filter((list) => {
    //         return new Date(list.endTime) > nowTime
    //     })
    //     const outTimeList = tabLists.filter((list) => {
    //         return new Date(list.endTime) <= nowTime
    //     })
    //     this.tabLists = [...futureTabList, ...outTimeList]
    // },
    mounted() {
        this.changeVisible();
      
    },
    methods: {
        changeTab (index, e) {
            e.preventDefault();
            this.tabIndex = index
            this.changeVisible(index)
        },
        changeVisible (index = 0) {
            this.componentName = this.tabLists[index].name;
        },
       
        
    },

}
</script>