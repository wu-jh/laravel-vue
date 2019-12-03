<template>
    <div class="warp">
        <top />
        <sidebar />
        <div class="content">
            <div class="top">
                <div class="title">分类详情</div>
                <div class="btn" @click="$router.go(-1)">返回</div>
            </div>
            <div class="form">
                <div class="item">
                    <span class="title">分类名称:</span>
                    <input class="input"  type="text" :disabled="disabled" v-model="name">
                </div>
                <div class="item">
                    <span class="title">属性:</span>
                    <div class="propertys">
                        <div class="add-per" v-if="edit">
                            <input  class="input" v-model="property"  type="text" >
                            <button class="add-btn" @click="addPer">添加</button>
                        </div>
                        <span v-for="(item,index) in propertys" class="property">{{ item }}<span v-show="edit" @click="del(index)" class="close" >+</span></span>
                    </div>
                </div>
                <div class="item">
                    <span class="title">状态:</span>
                    <label><input v-model="status" class="radio" name="status"  type="radio" value="1" :disabled="disabled">显示</label>
                    <label><input v-model="status" class="radio" name="status"  type="radio" value="0" :disabled="disabled">隐藏</label>
                </div>
                <div class="item">
                    <span class="title">排序:</span>
                    <input  class="input" type="text" :disabled="disabled"  v-model="sort">
                </div>
                <div v-if="!edit" class="item">
                    <span class="title">创建时间:</span>
                    <input  class="input" type="text" disabled  v-model="created_at">
                </div>
                <div  v-if="!edit" class="item">
                    <span class="title">修改时间:</span>
                    <input  class="input" type="text" disabled  v-model="updated_at">
                </div>
                <div class="button">
                    <button v-if="!edit" @click="change"  class="change">编辑</button>
                    <button v-if="edit"  @click="submit" class="submit">提交</button>
                    <button v-if="edit" @click="cancel" class="cancel">取消</button>
                </div>
            </div>
            <b-toast id="example-toast" no-close-button  toaster="b-toaster-top-center" auto-hide-delay="2000" >{{ tips }}</b-toast>
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
                property:'',
                propertys:[],
                name:'',
                sort:0,
                status:1,
                tips:'',
                edit:false,
                updated_at:'',
                created_at:'',
                disabled:true,
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            this.initialize()
        },
        methods:{
            change(){
                this.edit = true;
                this.disabled = false;
            },
            cancel(){
                this.edit = false;
                this.disabled = true;
                this.initialize();
            },
            del(index){
                this.propertys.splice(index,1);
            },
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
            stime(tips){
                this.tips = tips;
                this.$bvToast.show('example-toast')
            },
            submit(){
                if(!this.name){
                    this.stime('分类名称不能为空');
                    return;
                }
                $.ajax({
                    type:'post',
                    url:this.$store.state.domainName + 'api/admin/category/edit?id=' + this.id,
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
                            setTimeout(()=>{
                                this.initialize();
                                this.disabled = true;
                                this.edit = false;
                            },2000)

                        }

                    },
                    error:(err)=>{
                        conosle.log(err);
                    }
                })
            },
            initialize(){
                $.ajax({
                    type:'get',
                    url:this.$store.state.domainName + 'api/admin/category/find?id=' + this.id,
                    dataType:'json',
                    success:(res)=>{
                        if(res.status){
                            this.propertys = res.data[0].property;
                            this.name = res.data[0].name;
                            this.sort = res.data[0].sort;
                            this.status = res.data[0].status;
                            this.created_at = res.data[0].created_at;
                            this.updated_at = res.data[0].updated_at;
                        }else{
                            alert(res.data);
                        }
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                });
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
                color:#19a97b;
                border-radius: 0;
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
    }

    .propertys{
        display:inline-block;
        .property{
            display: inline-block;
            margin-right:10px;
            border:solid 1px #19a97b;
            color:#19a97b;
            margin-top:5px;
            padding:0 8px;
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

    .button{
        margin-left:110px;
        button{
            background: #11a274;
            border: 1px #0e8f61 solid;
            color: white;
            display: inline-block;
            border-radius: 2px;
            outline: none;
            font-size: 15px;
            padding:5px 15px;
            margin-right:30px;
        }
        .cancel{
            background: #fff;
            border-color: #11a274;
            color:#11a274;
        }
    }

    .add-per{
        margin-bottom: 5px;
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

    .example-toast{
        width:250px;
        position:fixed;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
</style>