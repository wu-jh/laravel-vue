<template>
    <div class="warp">
        <top />
        <sidebar />
        <div class="content">
            <div class="top">
                <div class="title">修改商品</div>
                <div class="btn" @click="$router.go(-1)"><i class="iconfont icon-tianjiatupian"></i>返回</div>
            </div>
            <div class="form">
                <b-container fluid>
                    <b-row class="row">
                        <b-col md="2" class="kind">基本信息:</b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">商品名称:</b-col>
                        <b-col md="4">
                            <input v-model="data.name" type="text" class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">所属分类:</b-col>
                        <b-col md="4">
                            <input v-model="data.category.name" type="text" disabled  class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">状态:</b-col>
                        <b-col md="4">
                            <label><input v-model="data.status"  class="radio" name="status"  type="radio" value="1" >上架</label>
                            <label><input v-model="data.status"  class="radio" name="status"  type="radio" value="0">下架</label>
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">销量:</b-col>
                        <b-col md="4">
                            <input v-model="data.sale_num" type="text" disabled class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">排序:</b-col>
                        <b-col md="4">
                            <input v-model="data.sort" type="text"  class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">商品描述:</b-col>
                        <b-col md="4">
                            <textarea v-model="data.content"  class="text"></textarea>
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="kind">标签:</b-col>
                    </b-row>
                    <b-row v-for="item in data.tag" class="row">
                        <b-col md="2" class="type">{{ tags[item.tag_id] }}:</b-col>
                        <b-col md="4">
                            <input v-model="item.value" type="text" class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="kind">SKU:</b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="10" offset-md="1">
                            <table class="chart">
                                <tr class="tr">
                                    <th v-if="data.sku[0].attr1">{{ property[0] }}</th>
                                    <th v-if="data.sku[0].attr2">{{ property[1] }}</th>
                                    <th v-if="data.sku[0].attr3">{{ property[2] }}</th>
                                    <th>原价</th>
                                    <th>售价</th>
                                    <th>库存</th>
                                    <th>状态</th>
                                </tr>
                                <tr v-for="(item,index) in data.sku" :key="index" class="tr">
                                    <td v-if="item.attr1">{{ item.attr1 }}</td>
                                    <td v-if="item.attr2">{{ item.attr2 }}</td>
                                    <td v-if="item.attr3">{{ item.attr3 }}</td>
                                    <td>{{ item.original_price }}</td>
                                    <td>{{ item.price }}</td>
                                    <td>{{ item.quantity }}</td>
                                    <td>{{ item.status==1?'显示':'隐藏' }}</td>
                                </tr>
                            </table>
                        </b-col>
                    </b-row>
                </b-container>
             </div>
            <div class="tips" id="property">{{ tips }}</div>
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
              tips : '',
              data:{
                  category:{
                      name:'',
                  },
                  sku:[
                      {attr1:'',attr2:'',attr3:'',original_price:'',price:'',quantity:''}
                  ]
              },
              tags:{1:'有效期',2:'促销宣传语',3:'温馨提示'},
              property:'',
              tagList:[],
          }
        },
        mounted() {
            this.id = this.$route.query.id;
            $.ajax({
                type : 'get',
                url : this.$store.state.domainName + 'api/admin/product/find?id=' + this.id,
                dataType : 'json',
                success : (res)=>{
                    if(res.status){
                        console.log(res.data);
                        this.data = res.data;
                        this.property = JSON.parse(this.data.category.property);
                    }else{
                        this.stime(res.data);
                        setTimeout(()=>{
                            this.$router.go(-1);
                        },1000);

                    }
                },
                error : (err)=>{
                    console.log(err);
                }
            })
        },
        methods:{
            stime(tips){
                $('#property').show();
                this.tips = tips;
                setTimeout(()=>{
                    $('#property').hide();
                },2000);
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
        padding:60px 20px 20px;
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

    #property{
        display:none;
    }

    .tips{
        width:240px;
        height:120px;
        padding:20px;
        text-align: center;
        line-height: 80px;
        position:fixed;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        border: solid 1px #ccc;
        background: #fff;
        box-shadow: 0 0 8px 0 #ccc;
        font-size: 16px;
        border-radius: 5px;
    }

    .form{
        margin-top:20px;
        text-align: left;
    }

    .row{
        margin:15px 0;
    }

    .type{
        text-align: right;
        height:35px;
        line-height: 35px;
        vertical-align: middle;
    }
    .input,.select,.text{
        width:100%;
        height: 35px;
        padding:5px 5px;
        border:solid 1px #19a97b;
        background: none;
        outline: none;
        font-size: 14px;
        color:#333;
    }

    .sku{
        width:100%;
        height: 35px;
        padding:5px 5px;
        border:solid 1px #19a97b;
        background: none;
        outline: none;
        font-size:14px;
    }

    .add{
        font-size:30px;
        vertical-align: top;
        line-height: 35px;
        text-align: left;
        color:#19a97b;
        cursor: pointer;
    }

    .text{
        height: 70px;
        resize: none;
    }

    .radio{
        width:16px;
        height:16px;
        vertical-align: middle;
        margin: 0 5px 0 10px;
    }

    .icon{
        font-size:45px;
    }

    .hide{
        display:none;
    }

    .submit{
        background: #11a274;
        border: 1px #0e8f61 solid;
        color: white;
        display: inline-block;
        border-radius: 2px;
        outline: none;
        font-size: 15px;
        padding:5px 15px;
    }

    .propertys{
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

    .chart{
        width:100%;
        .tr{
            display:flex;
            height:35px;
            td,th{
                border:solid 1px #19a97b;
                flex:1;
                text-align: center;
                line-height: 34px;
                margin-top:-1px;
                margin-left:-1px;
                .input{
                    width:80%;
                    height:25px;
                    border:solid 1px #aaa;
                    padding:0;
                    padding-left: 5px;
                }
                .iconfont{
                    cursor:pointer;
                }
            }
        }
    }
    .kind{
        font-weight: bold;
    }

</style>