<template>
    <div class="top">
        <div class="title">
            <img :src="img" alt="后台管理" height="60px">
        </div>
        <div class="right">
            <div class="site">
                <div class="iconfont icon-ai64" title="站点首页"></div>
            </div>
            <div class="exit">
                <div class="iconfont icon-084tuichu" title="退出登录"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'top',
        data(){
            return {
                img:require('../../../public/images/admin_logo.png'),
            }
        },
    }
</script>

<style scoped lang="scss">
    .top{
        width:100%;
        height:60px;
        background-image: linear-gradient(to right,#99de83,#62c4f8);
        line-height: 50px;
        color:#fff;
        position: fixed;
        top:0;
        left:0;
        z-index: 1;
    }

    .title{
        float:left;
        text-align: left;
    }

    .right{
        float:right;
        margin-right:50px;
        .site{
            float:left;
        }

        .exit{
            float:left;

        }
    }
    .iconfont{
        font-size:30px;
        line-height: 60px;
        margin:0px 30px;
        cursor: pointer;
    }
</style>