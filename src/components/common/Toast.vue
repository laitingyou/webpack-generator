<template>
    <transition>
        <div :class="['toast-box',{'show': visible}]">
            <div class="text" v-html="text">
            </div>

        </div>
    </transition>
</template>
<script lang="ts">
    import {Vue, Component, Watch} from 'vue-property-decorator'
    @Component
    export default class Toast extends Vue {
        visible: boolean = false
        timer: number = 0
        text: string =  '加载中...'
        @Watch('visible')
        visibleChange(value: boolean) {
            if (value) {
                window.clearTimeout(this.timer)
                this.timer = setTimeout((_:any) => {
                    this.visible = false
                }, 3000)
            }
        }
    }
</script>
<style scoped lang="scss">
    .toast-box {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 90;
        width: 100%;
        height: 100%;
        text-align: center;
        visibility: hidden;
        opacity: 0;
        transition: all .3s;
        /*display: flex;*/
        /*justify-content: center;*/
        .text {
            background: rgba(0, 0, 0, 0.75);
            border-radius: 6px;
            color: #ffffff;
            display: inline-block;
            margin-top: 60%;
            padding: 10px 39px;
            text-align: center;
        }
    }

    .show {
        visibility: visible;
        opacity: 1;
    }
</style>
