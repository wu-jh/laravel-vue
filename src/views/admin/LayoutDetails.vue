<template>
    <div class="warp">
        <top />
        <sidebar />
        <div class="content">
             <div class="top">
                <div class="title">内容详情</div>
                <div class="btn" @click="$router.go(-1)">返回</div>
            </div>
            <div class="form">
                <div class="item">
                    <span class="title">标题名称:</span>
                    <input v-model="name" :disabled="disabled" class="input" type="text" >
                </div>
                <div class="item">
                    <span class="title">链接类型:</span>
                    <select v-model="link_type" :disabled="disabled" class="select">
                        <option disabled value="">请选择</option>
                        <option value="1">商品分类页</option>
                        <option value="2">商品详情页</option>
                        <option value="3">活动页面</option>
                        <option value="4">店铺链接</option>
                    </select>
                </div>
                <div class="item">
                    <span class="title">链接目标:</span>
                    <input v-model="link_target" :disabled="disabled" class="input" type="text" >
                </div>
                <div class="item">
                    <span class="title">状态:</span>
                    <label><input v-model="status" :disabled="disabled" class="radio" name="status"  type="radio" value="1">显示</label>
                    <label><input v-model="status" :disabled="disabled"  class="radio" name="status"  type="radio" value="0">隐藏</label>
                </div>
                <div class="item">
                    <span class="title">排序:</span>
                    <input v-model="sort" :disabled="disabled" class="input"  type="text">
                </div>
                 <div class="item">
                    <span class="title">图片:</span>
                     <div class="img-warp" v-if="change">
                         <div v-if="img_url" class="img">
                            <img  :src="$store.state.domainName + 'images/'+ img_url" width="100px">
                            <div class="del" @click="del">x</div>
                        </div>
                        <label v-else>
                            <i class="iconfont icon-tianjiatupian1"></i>
                            <input type="file" name="img" @change="img" style="display:none">
                        </label>
                    </div>
                    <div class="img-warp" v-else>
                        <img :src="img_url?$store.state.domainName + 'images/' + img_url:$store.state.domainName + '/images/timg.jpg'" width="100px">
                    </div>
                </div>
                <button v-if="change" @click="submit" class="submit">提交</button>
                <button v-if="change" @click="cancel" class="cancel">取消</button>
                <button v-else @click="edit" class="submit">修改</button>
            </div>
            <b-toast id="example-toast" no-close-button toaster="b-toaster-top-center" auto-hide-delay="2000" >{{ tips }}</b-toast>
        </div>
    </div>
</template>

<script>
    import top from '../../components/admin/top.vue';
    import sidebar from '../../components/admin/sidebar.vue';
    import $ from 'jquery';
    export default {
        data(){
          return {
              tips:'',
              name:'',
              link_type:'',
              link_target:'',
              status:1,
              sort:0,
              img_url:null,
              type_id:'',
              disabled:true,
              change:false,
          }
        },
        mounted(){
            this.id = this.$route.query.id;
            this.initialize();
        },
        methods:{
            del(){
                this.img_url = '';
            },
            img(e){
                let form = new FormData(e.target[0]);
                $.ajax({
                    url:this.$store.state.domainName + 'api/img',
                    type:'post',
                    data:form,
                    processData:false,
                    contentType:false,
                    dataType:'json',
                    success:(res)=>{
                        if(res.data){
                            this.img_url = res.data;
                        }
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                });
            },
            cancel(){
                this.change = false;
                this.disabled = true;
                this.initialize();
            },
            edit(){
                this.change = true;
                this.disabled = false;
            },
            submit(){
                $.ajax({
                    url:this.$store.state.domainName + 'api/admin/layoutEdit',
                    type:'post',
                    data:{
                        id:this.id,
                        type_id:this.type_id,
                        sort:this.sort,
                        title:this.name,
                        picture:this.img_url,
                        link_type:this.link_type,
                        link_target:this.link_target,
                        status:this.status,
                    },
                    dataType:'json',
                    success:(res)=>{
                        this.stime(res.data);
                        if(res.status){
                            this.initialize();
                            this.disabled = true;
                            this.change = false;
                        }
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                });
            },
            stime(tips){
                this.tips = tips;
                this.$bvToast.show('example-toast')
            },
            initialize(){
                $.ajax({
                    url:this.$store.state.domainName + 'api/admin/layoutFind',
                    type:'get',
                    data:{
                        id:this.id,
                    },
                    dataType:'json',
                    success:(res)=>{
                        if(res.status){
                            this.name = res.data.title;
                            this.link_type = res.data.link_type;
                            this.link_target = res.data.link_target;
                            this.status = res.data.status;
                            this.sort = res.data.sort;
                            this.img_url = res.data.picture;
                            this.type_id = res.data.type_id;
                        }
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                })
            },
        },
        components:{
            top,
            sidebar,
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

    .form{
        margin:20px 0;
        text-align: left;
        .item{
            margin:15px 0;
            font-size: 15px;
            .title{
                display: inline-block;
                width:100px;
                text-align: right;
                line-height: 35px;
                margin-right:10px;
                vertical-align: top;
            }
            .input,.select{
                width:300px;
                height: 35px;
                padding:5px 5px;
                border:solid 1px #19a97b;
                background: none;
                outline: none;
            }

            .radio{
                width:16px;
                height:16px;
                vertical-align: middle;
                margin: 0 5px 0 10px;
            }
        }

        .submit,.cancel{
            background: #11a274;
            border: 1px #0e8f61 solid;
            color: white;
            display: inline-block;
            border-radius: 2px;
            margin-left:110px;
            outline: none;
            font-size: 15px;
            padding:5px 15px;
        }
        .cancel{
            border: 1px #11a274 solid;
            background: #fff;
            color:#11a274;
        }
    }

    .img-warp{
        display:inline-block;
        label{
            display: inline;
            margin: 0;
            padding: 0;
            i{
                font-size: 50px;
            }
        }
    }
    .img{
        position: relative;
        .del{
            width:10px;
            height:10px;
            text-align: center;
            line-height: 10px;
            position: absolute;
            top:0;
            right:0;
            cursor: pointer;
            color:#f00;
        }
    }
</style>