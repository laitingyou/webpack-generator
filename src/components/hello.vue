<template>
    <div>
        {{a}}
    </div>
</template>
<script>
    export default {
      data(){
        return {
            a: 123132313122
        }
      }
    }
</script>
<style lang="scss" scoped>
    div{
        @include demo;
    }

</style>
