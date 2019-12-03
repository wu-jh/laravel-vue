<template>
    <div class="warp">
        <top />
        <sidebar />
        <div class="content">
             <div class="top">
                <div class="title">添加分类</div>
                <div class="btn" @click="$router.push('/admin/category')">分类列表</div>
            </div>
            <div class="form">
                <div class="item">
                    <span class="title">分类名称:</span>
                    <input class="input"  v-model="name"  type="text" >
                </div>
                <div class="item">
                    <span class="title">分类属性:</span>
                    <input class="input" v-model="property"  type="text" >
                    <button class="add-btn" @click="addPer">添加</button>
                    <div class="propertys">
                        <span v-for="(item,index) in propertys" class="property">{{ item }} <span @click="del(index)" class="close" >+</span></span>
                    </div>
                </div>
                <div class="item">
                    <span class="title">状态:</span>
                    <label><input v-model="status" class="radio" name="status"  type="radio" value="1">显示</label>
                    <label><input v-model="status"  class="radio" name="status"  type="radio" value="0">隐藏</label>
                </div>
                <div class="item">
                    <span class="title">排序:</span>
                    <input class="input"  type="text" v-model="sort">
                </div>
                <button @click="submit" class="submit">提交</button>
            </div>
            <b-toast id="example-toast" no-close-button toaster="b-toaster-top-center" auto-hide-delay="2000" >{{ tips }}</b-toast>
        </div>
    </div>
</template>

<script>
    import top from '../../components/admin/top.vue';
    import page from '../../components/admin/page.vue';
    import sidebar from '../../components/admin/sidebar.vue';
    import $ from 'jquery';
    export default {
        data(){
          return {
              property:'',
              propertys:[],
              name:'',
              sort:0,
              status:1,
              tips:'',
          }
        },
        mounted(){

        },
        methods:{
            addPer(){
                if(this.property == ''){
                    return
                }
                if(this.propertys.length >= 3){
                    this.stime('最多只能添加三个属性');
                    this.property = '';
                    return
                }
                this.propertys.push(this.property);
                this.property = '';
            },
            submit(){
                if(!this.name){
                    this.stime('分类名称不能为空');
                    return;
                }
                $.ajax({
                    type:'post',
                    url:this.$store.state.domainName + 'api/admin/category/create',
                    data:{
                        name:this.name,
                        property:this.propertys.join(','),
                        sort:this.sort,
                        status:this.status,
                    },
                    dataType:'json',
                    success:(res)=>{
                        this.stime(res.data);
                        if(res.status){
                            this.name = '';
                            this.propertys = [];
                            this.property = '';
                            this.status = 1;
                            this.sort = 0;
                        }
                    },
                    error:(err)=>{
                        conosle.log(err);
                    }
                })
            },
            del(index){
                this.propertys.splice(index,1);
            },
            stime(tips){
                this.tips = tips;
                this.$bvToast.show('example-toast')
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
            }
            .input{
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

        .submit{
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
    }

    .propertys{
        margin-left:110px;
        margin-top:10px;
        .property{
            margin-right:10px;
            border:solid 1px #19a97b;
            color:#19a97b;
            padding:3px 8px;
            position: relative;
            .close{
                width:10px;
                height: 10px;
                text-align: center;
                line-height: 10px;
                position: absolute;
                top:0;
                right:0 ;
                font-size: 13px;
                cursor: pointer;
                transform: rotateZ(45deg);
            }
        }
    }

    .add-btn{
        width:50px;
        height:34px;
        background: #11a274;
        border: none;
        color: white;
        display: inline-block;
        margin-left:-50px;
        outline: none;
        font-size: 15px;
    }

</style>