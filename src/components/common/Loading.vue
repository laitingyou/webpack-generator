<template>
    <transition>
        <div :class="['loading-box',{'show': visible, twoBg: type === 2}]">
            <div :class="['text',{two: type === 2}]">
                <img v-if="type === 1" src="//mmgr.gtimg.com/gjsmall/sdi/activity/2018120316505511204/loading.gif"
                     alt="">
                <div v-else>
                    <svg class="lds-spinner" width="40px" height="40px" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"
                         style="background: none;">
                        <g transform="rotate(0 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                         begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(30 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                         begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(60 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s"
                                         repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(90 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                         begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(120 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                         begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(150 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s"
                                         repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(180 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                         begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(210 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                         begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(240 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s"
                                         repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(270 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                         begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(300 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s"
                                         begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(330 50 50)">
                            <rect x="47" y="23" rx="9.4" ry="4.6000000000000005" width="6" height="16" fill="#8a8a8a">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s"
                                         repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                    </svg>
                </div>
                <div>{{text}}</div>
            </div>

        </div>
    </transition>
</template>
<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator'
    @Component
    export default class Loading extends Vue {
        visible: boolean = false
        text: string = '加载中...'
        @Prop({default: 1}) type! : number
        mounted(){
            // console.log(this.type)
        }
    }
</script>
<style scoped lang="scss">
    .loading-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        visibility: hidden;
        opacity: 0;
        transition: all .3s;
        background: #FDF6EE;
        z-index: 999;
        .text {
            margin-top: 30%;
            text-align: center;
            img {
                transform: translateX(8%);
                width: 120px;
            }

        }
        .two {
            margin-top: 53%;
        }
    }

    .twoBg {
        background: transparent;
        .text {
            background: rgba(0, 0, 0, 0.75);
            border-radius: 6px;
            color: #ffffff;
            display: inline-block;
            margin-top: 50%;
            padding: 25px 25px;
            text-align: center;
        }
    }

    .show {
        visibility: visible;
        opacity: 1;
    }
</style>
