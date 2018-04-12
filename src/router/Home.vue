<template>
  <div>
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
        <com-before v-if="componentName === 'national'"></com-before> 
        <!-- <com-pvp v-if="componentName === 'pvp'"></com-pvp> -->
    </div>
</template>
<script>
import national from '@/components/National'
// import pvp from '@/components/pvp'

export default {
    components: {
        'com-before': national,
        // 'com-pvp': pvp
    },
   
    data() {
        return {
            componentName: '',
            tabIndex: 0,
            tabLists:[
                {id:1,text:'National Team',name:'national', endTime:'2018-04-18 16:02'},
                {id:0,text:'Guessing Competition',name:'pvp', endTime : '2018-04-31 16:02'},
                {id:2,text:'The Goldeb Boot',name:'group', endTime : '2018-05-31 16:02'},
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
        computeEndTime(status) {
            const { tabLists } = this;
            return tabLists.find(list => list.name === status).endTime
        },
        
    },
    
//   computed: {
//       tabLists () {
//           return this.$store.state.tabLists
//       }
//   }
}
</script>