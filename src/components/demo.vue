<template>
    <div>
        {{message}}
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    @Component
    export default class demo extends Vue {
        // name: String = 'demo'
        message: String = 'Word'


    }
</script>

