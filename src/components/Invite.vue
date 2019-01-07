<template>
    <div class="container">
        <div class="banner">
            <img src="//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/invite_card.png" alt="">
        </div>
        <div class="running-show">
            <div class="title">
                <img src="//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/invite_title.png" alt="">
            </div>
            <div class="timer">还剩 <span>5天2小时4分</span> 结束</div>
            <progress-bar></progress-bar>
        </div>

    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator'
    import {Getter} from 'vuex-class'
    import axios from 'axios'
    import ProgressBar from './common/ProgressBar.vue'
    @Component(
        {
            components: {
                ProgressBar: ProgressBar
            },
        }
    )
    export default class HomeComponent extends Vue {


        mounted(): void {

            document.body.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, { passive: false });
            axios.get('/qq').then((res:Object)=>{
                console.log(res)
            })
        }



    }
</script>
<style lang="scss" scoped>
    .container {
        height: 100%;
        width: 100%;
        background-image: url("//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/invite_bg.png");
        background-repeat: no-repeat;
        background-size: cover;
        overflow-x: hidden;
    }
    img{
        width: 100%;
    }
    .banner{
        padding-top: 140px;
        width: 97%;
        margin: 0 auto;
    }
    .running-show{
        .title{
            width: 60%;
            margin: 0 auto 20px;
        }
        .timer{
            text-align: center;
            color: #7F7F7F;
            font-size: 13px;
        }
    }

</style>
