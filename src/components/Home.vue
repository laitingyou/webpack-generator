<template>
    <div class="container">
        <div class="banner">
            <img src="//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/index_banner.png" alt="">
        </div>
        <swiper :data="prizzas" @onSwipeIndex="onSwipeIndex">
            <template slot-scope="props">
                <div class="swiper-item">
                    <img class="item-header" src="//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/index_talk.png" alt="">
                    <img :src="props.slotScope.img" alt="">
                    <w-button @click.native.prevent="onselect(props.slotScope)" class="select-btn">就选它</w-button>
                </div>
            </template>
        </swiper>
        <div class="tips">
            <img src="//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/index_tips.png" alt="">
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator'
    import {Getter} from 'vuex-class'
    import Swiper from './common/Swiper.vue'
    import axios from 'axios'
    @Component(
        {
            components: {
                swiper: Swiper
            },
        }
    )
    export default class HomeComponent extends Vue {
        prizzas: Array<Object> = [
            {
                img: '//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/index_card1.png'
            },
            {
                img: '//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/index_card1.png'
            },
            {
                img: '//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/index_card1.png'
            },
            // {
            //     img: '//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/index_card1.png'
            // }
        ]

        onClick(): void {
            // window.alert(this.message)
        }

        mounted(): void {

            document.body.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, { passive: false });
            axios.get('/qq').then((res:Object)=>{
                console.log(res)
            })
            // this.$toast('23432')
            // this.$showLoading('2432')
            // console.log(this.$refs.demo)
        }

        onSwipeIndex(index:number){
            console.log(index)
        }

        onselect(item: any){
            console.log(item)
        }

    }
</script>
<style lang="scss" scoped>
    .container {
        height: 100%;
        width: 100%;
        background-image: url("//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/indx_bg.png");
        background-repeat: no-repeat;
        background-size: cover;
        overflow-x: hidden;
    }
    img{
        width: 100%;
    }
    .banner{
        padding-top: 20px;
    }
    .swiper-item{
        width: 100%;
        position: relative;
        .item-header{
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            width: 75%;
        }
        .select-btn{
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .tips{
        width: 80%;
        margin: 40px auto 30px;
    }

</style>
