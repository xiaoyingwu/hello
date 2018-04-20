<template>
  <div id="app">
     <header>
            <nav>
                <ul class="nav-left">
                    <li><a href="">Home</a></li>
                    <li><a href="">Faq</a></li>
                    <li><a href="">Rules</a></li>
                    <li><a href="">Provably</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
                <ul class="nav-right">
                    <li><a href="">Register</a></li>
                    <li><a href="">{{name}}</a></li>           
                </ul>
                <div class="popup">
                    <button>setNick</button>
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
                islive: false
            }
        },
        mounted(){
            App.detectWallet(msg=>{
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
                    
                    this.flag = false;
                }
                console.log(msg)               
            })   
            App.getNick(cd=>{
                if(cd == undefined){
                    let address = App.getAddress();
                    this.name = address.substring(address.length-6);
                }

            })

        },
        
        
    }
</script>

