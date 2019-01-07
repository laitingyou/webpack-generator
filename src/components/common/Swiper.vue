<template>
    <transition>
        <div
                class="swiper"
                ref="swiper"
                @touchmove="onSwiper"
                @touchstart="onSwiperStart"
                @touchend="onSwiperEnd"
                :style="{width: boxWidth + 'px'}"
        >
            <div class="item-box" ref="itemBox">
                <div class="swiper-item" :style="{width: swiperItemWidth + 'px'}" v-for="(item, index) in swiperList"
                     :key="index">
                    <slot :slot-scope="item">
                        <img :src="item.img" alt="">
                    </slot>
                </div>
            </div>

        </div>
    </transition>
</template>
<script lang="ts">
    import {Vue, Component,Prop} from 'vue-property-decorator'
    import Util from '../../utils/util'
    @Component
    export default class SwiperComponent extends Vue {
        @Prop({type:Array, default: []}) readonly data!: Array<object>
        swiperList: Array<object> = []
        swiperStart: number = 0
        swiperMove: number = 0
        swiperend: number = 0
        swiperItemWidth: number = 260
        swiperInit: number = 0
        movePageX: number = 0
        currentIndex: number = 0
        swiping: boolean = false

        get boxWidth() {
            return this.swiperList.length * this.swiperItemWidth
        }

        mounted(): void {
            this.swiperList = Util.deepCopy(this.data)
            let len = this.swiperList.length
            if (len > 2) {
                this.swiperList = [this.swiperList[len - 2], this.swiperList[len - 1], ...this.swiperList, this.swiperList[0], this.swiperList[1]]
                this.$nextTick(()=>{
                    this.swipeTo(this.currentIndex)
                })
            }
            // console.log(this.boxWidth)

        }

        /*----------methods------*/
        /**
         * TODO 开始滑动
         */
        onSwiperStart(e: any): void {
            if (this.swiping) return
            this.swiperStart = e.touches[0].pageX
            let swiperStyle = (<HTMLElement>this.$refs.swiper).style
            swiperStyle.transitionDuration = 20 + 'ms'
        }

        /**
         * TODO 滑动中
         */
        onSwiper(e: any): void {
            this.movePageX = e.touches[0].pageX
            this.swiperMove = this.movePageX - (+this.swiperStart);
            let translateX: number = this.swiperMove + this.swiperend
            let swiperStyle = (<HTMLElement>this.$refs.swiper).style
            swiperStyle.transform = `translateX( ${translateX}px)`
            let childrens: any = (<HTMLElement>this.$refs.itemBox).children
            let p = Math.abs(this.swiperMove / this.swiperItemWidth)
            if (p > 0.2) {
                childrens[this.currentIndex + 2].style.transform = `scale(.8})`
            } else {
                childrens[this.currentIndex + 2].style.transform = `scale(${1 - p})`
            }
        }

        /**
         * TODO 滑动结束
         */
        onSwiperEnd(e: any): void {
            if (this.swiping) return
            if(this.swiperMove === 0) return
            this.swiping = true
            let swiperStyle = (<HTMLElement>this.$refs.swiper).style
            let end: string = swiperStyle.transform || 'translateX(0px)'
            this.swiperend = +(/\((.*)px\)/.exec(end) as Array<any>)[1]
            swiperStyle.transitionDuration = 100 + 'ms'
            let moveLen = this.swiperStart - this.movePageX
            if (moveLen > 50) {
                // let index =
                this.swipeTo(++this.currentIndex)
            } else if (moveLen < -50) {
                this.swipeTo(--this.currentIndex)
            } else {
                this.swipeTo(this.currentIndex, 100, 1)
            }

        }

        /**
         * TODO 滚动到某个tab
         * @param index
         */
        swipeTo(index: number, duration: number = 500, once?: number) {
            let swiperStyle = (<HTMLElement>this.$refs.swiper).style
            let {swiperItemWidth} = this
            this.swiperInit = -swiperItemWidth - swiperItemWidth * 0.78 - index * swiperItemWidth
            swiperStyle.transitionDuration = duration + 'ms'
            swiperStyle.transform = `translateX( ${this.swiperInit}px)`
            this.swiperend = this.swiperInit
            this.currentIndex = index
            let childrens: any = (<HTMLElement>this.$refs.itemBox).children
            for (let child of childrens) {
                child.style.transform = `scale(.8)`
            }
            childrens[2 + index].style.transform = `scale(1)`
            if (!once) {
                if (index === -1) {
                    setTimeout(() => {
                        this.swipeTo(2, 0, 1)
                    }, duration)
                    return
                } else if (index === 3) {
                    setTimeout(() => {
                        this.swipeTo(0, 0, 1)
                    }, duration)
                    return
                }
            }
            setTimeout(() => {
                this.swiping = false
                this.swiperMove = 0
                this.$emit('onSwipeIndex',index)
            }, 500)

        }


    }
</script>
<style scoped lang="scss">
    img {
        width: 100%;
    }

    .swiper {
        /*overflow-x: auto;*/
        .item-box {
        }
        .swiper-item {
            display: inline-block;
            box-sizing: border-box;
            padding: 0 3px;
            transform: scale(.8);
        }
    }
</style>
