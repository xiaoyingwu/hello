<template>
    <div class="golden">
        <div class="pepole">
            <ul>
                <li date-numeber="">Cristiano Ronaldo</li>
                <li>Cristiano Ronaldo</li>
                <li>Cristiano Ronaldo</li>
                <li>Cristiano Ronaldo</li>
                <li>Cristiano Ronaldo</li>
                <li>Cristiano Ronaldo</li>
            </ul>
        </div>
        <div class="local">
            <ul>
                <li class="active">All</li>
                <li>Europe</li>
                <li>S.America</li>
                <li>N,America</li>
                <li>Africa</li>
                <li>Asia</li>
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
        
        <div class="golden-list">
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

    export default {
        name: "golden"
    }
</script>
