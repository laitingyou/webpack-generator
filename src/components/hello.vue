<template>
    <div>
        {{a}}
    </div>
</template>
<script>
    export default {
      data(){
        return {
            a: 1231323
        }
      }
    }
</script>
<style lang="scss" scoped>
    div{
        @include demo;
    }

</style>
