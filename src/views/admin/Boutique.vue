<template>
    <div class="warp">
        <top />
        <sidebar />
        <layout :type="4" />
    </div>
</template>

<script>
    import top from '../../components/admin/top.vue';
    import sidebar from '../../components/admin/sidebar.vue';
    import layout from '../../components/admin/layout.vue';
    import $ from 'jquery';
    export default {
        data(){
            return {

            }
        },
        mounted() {
        },
        methods:{

        },
        components:{
            top,
            sidebar,
            layout,
        }
    }
</script>

<style scoped lang="scss">

</style>