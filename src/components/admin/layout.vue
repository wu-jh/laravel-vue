<template>
    <div class="content">
         <div class="top">
             <div class="title">{{ title[type] }}</div>
             <div class="btn" @click="add"><i class="iconfont icon-tianjiatupian"></i>添加</div>
        </div>
        <ul class="table">
            <li class="li">
                <div class="th">标题名称</div>
                <div class="th">图片</div>
                <div class="th">链接类型</div>
                <div class="th">链接目标</div>
                <div class="th">排序</div>
                <div class="th">状态</div>
                <div class="th">操作</div>
            </li>
            <li class="li" v-if="data == ''">
                <div class="td">暂无数据...</div>
            </li>
            <li class="li" v-for="item in data" :key="item.id">
                <div class="td">{{ item.title }}</div>
                <div class="td"><img :src="item.picture?$store.state.domainName + 'images/' + item.picture:$store.state.domainName + '/images/timg.jpg'" width="50px"></div>
                <div class="td">{{ item.link_type }}</div>
                <div class="td">{{ item.link_target }}</div>
                <div class="td">{{ item.sort }}</div>
                <div class="td">{{ item.status == 1?'显示':'隐藏' }}</div>
                <div class="td">
                    <button class="btn" @click="details(item.id)">详情</button>
                    <button class="btn" @click="del(item.id)">删除</button>
                </div>
            </li>
        </ul>
        <b-toast id="example-toast" no-close-button toaster="b-toaster-top-center" auto-hide-delay="2000" >{{ tips }}</b-toast>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        name:'layout',
        props:['type'],
        data(){
            return {
                tips:'',
                title:{1:'顶部导航',2:'banner图',3:'icon导航',4:'精品推荐'},
                link:{1:'商品分类',2:'商品详情',3:'活动页面',4:'店铺链接'},
                data:null,
            }
        },
        mounted(){
          this.initialize();
        },
        methods:{
            del(id){
                if(!confirm('您确定要删除吗?')){
                    return;
                }
                $.ajax({
                    url:this.$store.state.domainName + 'api/admin/layoutDel',
                    type:'post',
                    data:{
                        id:id,
                    },
                    dataType: 'json',
                    success:(res)=>{
                        this.stime(res.data);
                        if(res.status){
                            this.initialize();
                        }
                    }
                })
            },
            add(){
                this.$router.push({path:'/admin/layoutAdd',query:{type:this.type}});
            },
            details(id){
                this.$router.push({path:'/admin/layout/details',query:{id:id}});
            },
            initialize(){
                $.ajax({
                    url:this.$store.state.domainName + 'api/admin/layoutQuery',
                    type:'get',
                    data:{
                        type_id:this.type,
                    },
                    dataType:'json',
                    success:(res)=>{
                        if(res.status){
                            this.data = res.data;
                        }
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                })
            },
            stime(tips){
                this.tips = tips;
                this.$bvToast.show('example-toast');
            },
        }
    }
</script>
<style scoped lang="scss">
    .content{
        width:calc(100% - 210px);
        height:100vh;
        padding:60px 20px 0px;
        float:left;
        position: relative;
        overflow: auto;
        &::-webkit-scrollbar{
            display: none;
        }
        .top{
            height:40px;
            text-align: left;
            border-bottom:solid 1px #b6b6b6;
            margin-top:20px;
            font-weight:bold;
            color:#19a97b;
            .title{
                float:left;
                margin-left:10px;
                font-size: 20px;
                line-height: 40px;
            }
            .btn{
                float:right;
                margin-right:10px;
                cursor: pointer;
                font-size:14px;
                border:solid 1px #d2d2d2;
                padding:5px 10px;
                background: #f8f8f8;
                border-radius: 0;
                color:#19a97b;
                i{
                    margin-right:5px;
                    font-size: 12px;
                }
            }
        }
    }
    .table{
        width:100%;
        font-size:15px;
        margin-top:20px;
        cursor:pointer;
        .li{
            display: flex;
            &:nth-child(2n+1){
                background: #f8f8f8;
            }
            &:hover{
                background: #f8f8f8;
            }
        }
        .th,.td{
            text-align: center;
            border:solid 1px #ccc;
            padding:10px;
            flex:1;
            margin-left:-1px;
            margin-top:-1px;
            display: flex;
            justify-content: center;
            align-items: center;
             a:hover{
                text-decoration: none;
              }
            .btn{
                background:none;
                border:solid 1px #19a97b;
                padding:0 5px;
                margin:0 10px;
                color:#19a97b;
                outline: none;
                border-radius: 0;
            }
        }

        .th{
            font-weight: bold;
        }

        .status{
            font-size:20px;
            color:#19a97b;
        }
    }
</style>