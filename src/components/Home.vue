<template>
    <div class="container">
        <div class="banner">
            <img src="//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/index_banner.png" alt="">
        </div>
        <swiper></swiper>
        <!--//mmgr.gtimg.com/gjsmall/sdi/activity/2019010217544611351/index_card1.png-->
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
        onClick(): void {
            // window.alert(this.message)
        }

        mounted(): void {
            axios.get('/qq').then((res:Object)=>{
                console.log(res)
            })
            // this.$toast('23432')
            // this.$showLoading('2432')
            // console.log(this.$refs.demo)
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

</style>
