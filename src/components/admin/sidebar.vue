<template>
    <div class="sidebar">
        <ul>
            <li class="li">
                <div class="dt">
                    <i class="left iconfont icon-shangpinfenlei"></i>分类管理<i class="right iconfont icon-tubiaozhizuo-"></i>
                </div>
                <div class="dl">
                    <div class="dd" @click="router('category')">分类列表</div>
                    <div class="dd" @click="router('categoryAdd')">添加分类</div>
                </div>
            </li>
            <li class="li">
                <div class="dt">
                    <i class="left iconfont icon-shangpinguanli"></i>商品管理<i class="right iconfont icon-tubiaozhizuo-"></i>
                </div>
                <div class="dl">
                    <div class="dd" @click="router('product')">商品列表</div>
                    <div class="dd" @click="router('productAdd')">添加商品</div>
                </div>
            </li>
            <li class="li">
                <div class="dt">
                    <i class="left iconfont icon-ziliaoneirongguanli_huaban"></i>内容管理<i class="right iconfont icon-tubiaozhizuo-"></i>
                </div>
                <div class="dl">
                    <div  class="dd" @click="router('nav')">顶部导航</div>
                    <div  class="dd" @click="router('banner')">banner图</div>
                    <div  class="dd" @click="router('icon')">icon导航</div>
                    <div  class="dd" @click="router('boutique')">精品推荐</div>
                </div>

            </li>
            <li class="li">
                <div class="dt">
                    <i class="left iconfont icon-xiugaiziliao"></i>订单管理<i class="right iconfont icon-tubiaozhizuo-"></i>
                </div>
            </li>
            <li class="li">
                <div class="dt">
                    <i class="left iconfont icon-wode1"></i>会员管理<i class="right iconfont icon-tubiaozhizuo-"></i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        name:'sidebar',
        data(){
            return {
                url:'',
            }
        },
        mounted(){
            this.url = this.$route.path.replace(/\/admin\//,'');
            $('.dt').click(function(){
                $(this).siblings().slideToggle(500);
            });
        },
        methods:{
            router(arg){
                if(this.url == arg){
                    return false;
                }
                this.$router.push('/admin/' + arg);
            }
        }
    }
</script>

<style scoped lang="scss">
    .sidebar{
        width:210px;
        height:100vh;
        box-sizing: border-box;
        padding-top:60px;
        background: #fbfbfb;
        border-right:solid 2px #ccc;
        color:#333;
        float:left;
        overflow: auto;
        &::-webkit-scrollbar{
            display: none;
        }
        .li{
            width:100%;
            box-sizing: border-box;
            line-height: 50px;
            cursor: pointer;
            text-align: left;
            font-size: 15px;
            .left{
                font-size: 16px;
                margin-right:10px;
                margin-left:10px;
            }
            .right{
                font-size: 16px;
                float: right;
                margin-right:20px;
            }
        }
    }
    .dt{
        font-weight: bold;
        border-bottom:solid 1px #ccc;
    }
    .dd{
        padding-left: 36px;
        border-bottom:dashed 1px #ccc;
    }

    .dl{
        display:none;
    }
</style>