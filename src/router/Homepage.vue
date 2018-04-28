<template>
    <div class="homepage">
        <div class="banner">
            <div class="topnav">
                <img src="../images/logo.png" alt="log">
                <ul class="nav-right">
                    <li></li> 
                    <li><a href="">My Asset</a></li>
                    <li></li>
                              
                </ul>
            </div>
            <div class="enter"><router-link to="home">enter</router-link></div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.homepage{
    background: url(../images/hbanner.jpg) no-repeat;
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 99999999;
    height: 708px;
    background-size: cover;
}
.enter{
    width: 258px;
    height: 40px;
    background: url(../images/whitebar.png) no-repeat;
    line-height: 40px;
    color: #0f417c;
    position: absolute;
    left: 50%;
    text-align: center;
    top: 70%;
    

}
</style>
