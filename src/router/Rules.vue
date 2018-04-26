<template>
    <div class="rules">
        <div class="rules-tip">
            <img src="../images/rules.png">
        </div>
        <div class="rules-card">
            <div class="questions">Champion team rules</div>
            <div class="answer">
                
                <p>1. Anyone can buy their own team. If someone buys at a higher price, you will lose the ownership of the team.<br>
                2. Each transaction, the owner will receive a pro rata earnings, R & D side will be a small number of R & D division, the remaining funds will be injected into the team award pool.<br>
                3. The so-called champion team owner is the real owner of both teams at the beginning of the finals.<br>4. The final prize pool will be awarded to all the champion team owners.
                </p>
                
            
            </div>  
        </div>
        <div class="rules-card">
            <div class="questions">Competition guessing rules</div>
            <div class="answer">
                <p>1. Anyone can bet on any game with ETH, and the bet option is only "able" or "no".<br>
                2. The bet will end at the end of the game and the contract will not be allowed to bet.<br>
               3. According to the contract contents and actual match results, the amount of the bet on the wrong option will be allocated proportionately to the bet of the correct option.<br>4. The R & D team will share 2% of the total bet.
                </p>
                
            
            </div>  
        </div>
        <div class="rules-card">
            <div class="questions">Golden Boot rules</div>
            <div class="answer">
                <p>1. Anyone can buy their own players. If someone buys at a higher price, you will lose the right to own the player.<br>
                2. Each transaction, the owner will receive a pro rata earnings, R & D side will be a small number of R & D division, the remaining funds will be injected into the pool of players award.<br>
               3. The so-called Golden Boot players are the players who actually play at the beginning of the finals.<br>4. The final prize pool will be awarded to all the champion players.
                </p>
            
            </div>  
        </div>
        <div class="rules-num">
            <div class="growth">Price growth</div>
            <div class="rules-table">
                <table style="table-layout:fixed;width:100%;">
                    <thead>
                        <tr>
                            <th>Grow Hierarchy</th>
                            <th>Price Range</th>
                            <th>Price Growth</th>
                            <th>Divide into research and development</th>
                            <th>Rate of return</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <th>(0.04,5)</th>
                            <th>50%</th>
                            <th>5%</th>
                            <th>20%</th>                           
                        </tr>
                        <tr>
                            <th>2</th>
                            <th>(5,20)</th>
                            <th>25%</th>
                            <th>4%</th>
                            <th>10%</th>                           
                        </tr>
                        <tr>
                            <th>3</th>
                            <th>(20,100)</th>
                            <th>15%</th>
                            <th>3%</th>
                            <th>6%</th>                           
                        </tr>
                        <tr>
                            <th>4</th>
                            <th>(100,300)</th>
                            <th>10%</th>
                            <th>2%</th>
                            <th>5%</th>                           
                        </tr>
                        <tr>
                            <th>5</th>
                            <th>(300,800)</th>
                            <th>8%</th>
                            <th>2%</th>
                            <th>4%</th>                           
                        </tr>
                        <tr>
                            <th>6</th>
                            <th>(800,∞)</th>
                            <th>5%</th>
                            <th>1%</th>
                            <th>3%</th>                           
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="metamask"><img src="../images/metamask.png"></div>
    </div>
</template>
<style lang="less" scoped>
.rules{
    padding-top: 51px;
    &-tip{
        margin: 15px 0;       
    }
    .questions{
        width: 1260px;
        height: 52px;
        background: url(../images/faq-bg.jpg);
        line-height: 52px;
        font-family: myfont;
        font-size: 20px;
        padding-left: 20px;
    }
    .answer{
        background: #fff;
        width: 1260px;
        padding: 20px 20px;
        font-size: 14px;
    }
    &-card{
        margin-bottom: 15px;
    }
    &-table{
        color: #464646;
        font-size: 14px;
    }
    &-num{
        padding-bottom: 20px;
    }
}
.growth{
    background: url(../images/nav-bg.jpg) no-repeat;
    height: 51px;
    color: #fff;
    line-height: 51px;
    font-family: myfont;
    font-size: 20px;
    padding-left: 20px;
}
thead{
    background: #fff;
}
tbody{
    background: #e6e4df;
}
th{
    height: 43px;
}
table, th, td
  {
      border-collapse:collapse;
    border: 1px solid #fff;
  }
  .metamask{
      float: right;
      margin: 200px 0 50px;
      width: 623px;
      height: 196px;
      background: #f2f2f2;
      
  }
  .metamask img{
      width: 118px;
      display: block;
      margin: 30px auto;
      
  }
</style>

