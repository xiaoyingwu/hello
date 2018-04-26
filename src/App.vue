<template>
  <div id="app">
     <header>
            <nav>
                <div class="log"><router-link to=""><img src="./images/logo.png"></router-link></div>
                <ul class="nav-left">
                    <li><router-link to="">HOME</router-link></li>
                    <li><router-link to="faq">FAQ</router-link></li>
                    <li><router-link to="rules">RULES</router-link></li>
                    <li><router-link to="Contact">Contact</router-link></li>
                </ul>
                <ul class="nav-right">
                    <li><img :src="'@/../static/'+statues+'.png'"></li> 
                    <li><a href="">My Asset</a></li>
                    <li><a href="" @click.prevent="setOnenick">{{name}}</a></li>
                              
                </ul>
                <div class="overlay" v-show="setname" @click.stop="setname=false">
                    <div class="setname" @click.stop>
                        <label><input type="text" value="name" v-model="newNick"></label>
                        <button @click.stop="setname=false">cancel</button><button @click="setNick">ok</button>
                    </div>
                </div>
            </nav>
            <div class="tips" v-if="flag">{{message}}</div>
      </header>
       <div>
   
       <router-view></router-view>
   
       </div>
  </div>
</template>

<script>
    export default {
        name:'app',
        data(){
            return{
                flag: false,
                message:'',
                name:'',
                islive: false,
                setname: false,
                newNick:'',
                statues:'leave'
            }
        },
        mounted(){
            App.detectWallet((msg)=>{
                if(msg == "noWeb3"){
                    this.message = "请使用web3浏览器并安装metamask";
                    this.flag = true;
                }else if(msg == "unlockWalletFirst"){
                    this.message = "需要解锁metamask";
                    
                }else if(msg == "unknowErr"){
                    this.message = "未知错误";
                    this.flag = true;
                }else if(msg.search("wrongNetwork") !==-1){
                    this.message = "网络错误";
                    this.flag = true;
                }else if(msg == "success"){  
                    this.statues = "live";                
                    App.getNick((error,name)=>{
                        if(error!=null){
                            if(App.getAddress()!=""){
                                let address =  App.getAddress();
                                this.name = address.substring(address.length-6);
                            }           
                        }else{
                            this.name = name;
                        }
                        
                                             
                    })                    
                }                           
            });
            
        },
        methods:{
            setOnenick(){
                this.setname = true;               
                
            },
            setNick(){   
                this.setname= false;        
                App.setNick(this.newNick,(error,value)=>{                   
                    if(value=true){
                        this.name = this.newNick;
                    }
                });

            }
            

        }
    }
</script>

<style lang="less" scoped>

.nav-left{
    a{
        display: block;
        height: 51px;
        padding: 0 20px;
    }
}
.router-link-exact-active{
    border-bottom: 3px solid #fff;
}
.log a{
    border:none;
}
</style>


