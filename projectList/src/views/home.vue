<template>
    <p>{{testData.tab}}11</p>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            // tettt: '11'
        }
    },
    computed: {
        ...mapGetters({
            testData: 'testDataGet'
        })
    },
    mounted () {
        this.$store.dispatch('gettestData')
    },
    methods: {
    }
}
</script>
<style lang='scss' scoped>

</style>