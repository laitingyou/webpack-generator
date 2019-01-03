<template>
    <div>
        {{message}}
        <demo ref="demo"></demo>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator'
    import {Getter} from 'vuex-class'
    import Dome from './demo.vue'
    // import gg from 'gg'
    // import Component from "vue-class-component";
    @Component(
        {
            components: {
                demo: Dome
            },
        }
    )
    export default class hello extends Vue {
        // $refs!: {
        //     [propName: string]: string;
        // }
        message: String = 'Hello!'
        onClick(): void {
            // window.alert(this.message)
        }

        mounted(): void {
            console.log(this.$refs.demo)
        }

    }
</script>
<style lang="scss" scoped>
    div {
        @include demo;
    }

</style>
