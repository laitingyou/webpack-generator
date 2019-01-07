<template>
    <div :class="['w-button',{border: border}]" :style="styles">
        <slot></slot>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator'

    @Component
    export default class Botton extends Vue {
        @Prop({default: '#FFFFFF'}) color!: string
        @Prop({default: '#1DD489'}) bgColor!: string
        @Prop({default: 'radial-gradient(50% 109%, #09D0A7 10%, rgba(29,212,135,0.00) 100%)'}) bgImg!: string
        @Prop({default: '180px'}) width!: string
        @Prop({default: '17px'}) fontSize!: string
        @Prop({default: false}) border!: boolean

        styles: object = {}

        mounted(): void {
            let {width, bgColor, bgImg, color, fontSize} = this
            this.styles = {
                width,
                backgroundImage: bgImg,
                backgroundColor: bgColor,
                color,
                fontSize
            }
        }
    }
</script>
<style scoped lang="scss">
    .w-button {
        line-height: 40px;
        border-radius: 20px;
        box-shadow: 0 0 10px 0 rgba(38, 255, 121, 0.35);
        background: #1DD489;
        background-image: radial-gradient(50% 109%, #09D0A7 10%, rgba(29, 212, 135, 0.00) 100%);
        text-align: center;
    }
    .border{
        border: 2px solid #1DD489;
    }
</style>
