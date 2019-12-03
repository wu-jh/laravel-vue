<template>
    <div class="warp">
        <top />
        <sidebar />
        <div class="content">
            <div class="top">
                <div class="title">分类列表</div>
                <div class="btn" @click="add"><i class="iconfont icon-tianjiatupian"></i>添加分类</div>
            </div>
            <ul class="table">
                <li class="li">
                    <div class="th">分类名称</div>
                    <div class="th">属性</div>
                    <div class="th">展示</div>
                    <div class="th">操作</div>
                </li>
                <li class="li" v-if="categorys == false">
                    <div class="td">暂无数据</div>
                </li>
                <li v-else class="li" v-for="(item,index) in categorys" :key="index">
                    <div class="td">{{ item.name }}</div>
                    <div class="td">{{ item.property }}</div>
                    <div class="td"><a href="javascript:void(0)" @click="status(item.id,item.status)" :class="['status','iconfont',item.status ==1 ? 'icon-duigou':'icon-icon1']"></a></div>
                    <div class="td">
                        <button class="btn" @click="details(item.id)">详情</button>
                        <button class="btn" @click="del(item.id)">删除</button>
                    </div>
                </li>
            </ul>
            <page :page="page" @click="paging($event)"/>
        </div>
        <b-toast id="example-toast" no-close-button toaster="b-toaster-top-center" auto-hide-delay="2000" >{{ tips }}</b-toast>
    </div>
</template>

<script>
    import top from '../../components/admin/top.vue';
    import page from '../../components/admin/page.vue';
    import sidebar from '../../components/admin/sidebar.vue';
    import $ from 'jquery';
    export default  {
        data(){
            return {
                categorys:'',
                page:'',
                tips:'',
            }
        },
        mounted(){
            this.initialize(this.$store.state.domainName + 'api/admin/category/select');
        },
        methods:{
            alert(tips){
                this.tips = tips;
                this.$bvToast.show('example-toast');
            },
            initialize(url){
                $.ajax({
                    type: 'get',
                    url: url,
                    dataType: 'json',
                    success: (res)=>{
                        if(res.status){
                            this.categorys = res.data.data;
                            this.page = {
                                total: res.data.total,
                                to: res.data.current_page,
                                page_count: res.data.last_page,
                                first_page_url: res.data.first_page_url,
                                last_page_url: res.data.last_page_url,
                                prev_page_url: res.data.prev_page_url,
                                next_page_url: res.data.next_page_url,
                            };
                        }else{
                            alert(res.data);
                        }
                    },
                    error: (err)=>{
                        console.log(err);
                    }
                })
            },
            paging(event){
               this.initialize(event)
            },
            status(id,status){
                $.ajax({
                    type:'post',
                    url:this.$store.state.domainName + 'api/admin/category/edit?id=' + id,
                    data:{
                        status:status == 1?0:1,
                    },
                    dataType:'json',
                    success:(res)=>{
                        this.initialize(this.$store.state.domainName + 'api/admin/category/select?page=' + this.page.to);
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                })
            },
            del(id){
                if(!confirm('您确定要删除吗')){
                    return
                }
                $.ajax({
                    type:'post',
                    url:this.$store.state.domainName + 'api/admin/category/delete?id=' + id,
                    data:{
                        status:2,
                    },
                    dataType:'json',
                    success:(res)=>{
                        this.alert(res.data);
                        if(res.status){
                            this.initialize(this.$store.state.domainName + 'api/admin/category/select?page=' + this.page.to);
                        }
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                })
            },
            details(id){
                this.$router.push({path:'/admin/category/details',query:{id:id}});
            },
            add(){
                this.$router.push('/admin/categoryAdd');
            }
        },
        components:{
            top,
            sidebar,
            page,
        }
    }

</script>

<style scoped lang="scss">
    .content{
        width:calc(100% - 210px);
        height:100vh;
        padding:60px 20px 0px;
        float:left;
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