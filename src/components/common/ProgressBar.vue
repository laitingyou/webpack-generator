<template>
    <div class="progress-bar">
        <span>20000</span>
        <div class="bar-container">
            <div class="tips" :style="{left: left + '%'}">已砍至{{tmpValue}}豆</div>
            <div class="active" :style="{width: width + '%'}"></div>
            <div class="bar-bg"></div>
        </div>
        <span>0</span>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator'
    @Component
    export default class ProgressBar extends Vue{
        // @Prop({default: 0}) width!: number
        left:number = 0
        width:number = 0
        value:number = 6501
        max:number = 20000
        tmpValue:number = 0
        timer:number = 0
        mounted(){
            let p = (this.max - this.value) * 100 / this.max
            this.tmpValue = this.max
            setTimeout(()=>{
                this.width = p
                this.left = p
                this.toValue()
            },500)

        }

        toValue(){
            this.timer = setTimeout(()=>{
                this.tmpValue = this.tmpValue -100
                if(this.tmpValue < this.value){

                    this.tmpValue = this.value
                    clearTimeout(this.timer)
                    return
                }
                this.toValue()
            },10)
        }

    }
</script>
<style lang="scss" scoped>
    .progress-bar{
        margin-top: 70px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        .bar-container{
            width: 75%;
            position: relative;
        }
        .bar-bg{
            background: rgba(255,184,0,0.50);
            opacity: 0.6;
            height: 12px;
            border-radius: 5px;

        }
        .active{
            height: 100%;
            width: 0;
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 5px;
            opacity: 0.6;
            background-image: linear-gradient(-90deg, #FFDD00 0%, #FFB800 100%);
            transition: width 2s;
            &:after{
                content: '';
                width: 20px;
                height: 20px;
                display: block;
                border-radius: 50%;
                background: rgb(255, 27, 0);
                position: absolute;
                top: 50%;
                right: 0;
                transform: translate(40%, -50%);
            }
        }
        .tips{
            transition: all 2s;
            opacity: 0.6;
            background-image: linear-gradient(-90deg, #FFDD00 0%, #FFB800 100%);
            /*box-shadow: 0 0 10px 0 rgba(99,30,206,0.40);*/
            border-radius: 30px;
            font-size: 12px;
            position: absolute;
            width: 120px;
            top: -49px;
            line-height: 30px;
            text-align: center;
            transform: translateX(-50%);
            &:after{
                content: "";
                position: absolute;
                left: 54px;
                bottom: -10px;
                width: 0;
                height: 0;
                border-right: 5px solid transparent;
                border-top: 10px solid #ffbf13;
                border-left: 5px solid transparent;
            }
        }
    }
</style>
