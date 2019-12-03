<template>
    <div class="warp">
        <top />
        <sidebar />
        <div class="content">
            <div class="top">
                <div class="title">添加商品</div>
                <div class="btn" @click="$router.push('/admin/product')"><i class="iconfont icon-tianjiatupian"></i>商品列表</div>
            </div>
            <div class="form">
                <b-container fluid>
                    <b-row class="row">
                        <b-col md="2" class="type">商品名称:</b-col>
                        <b-col md="4">
                            <input v-model="name" type="text" class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">商品分类:</b-col>
                        <b-col md="4">
                            <select v-model="selected" @change="sku" class="select">
                                <option value="" disabled >请选择</option>
                                <option v-for="(item,index) in category" :key="index" :value="index">{{ item.name }}</option>
                            </select>
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">状态:</b-col>
                        <b-col md="4">
                            <label><input v-model="status" class="radio" name="status"  type="radio" value="1" >上架</label>
                            <label><input v-model="status" class="radio" name="status"  type="radio" value="0">下架</label>
                        </b-col>
                    </b-row>
                    <b-row  v-for="(item,index) in property" class="row">
                        <b-col md="2" class="type">{{ item }}:</b-col>
                        <b-col md="3">
                            <input v-model="attr[index]" class="sku" type="text">
                        </b-col>
                        <b-col md="1">
                            <span @click="attrFun(index)" class="add iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-"></span>
                        </b-col>
                        <b-col md="8"></b-col>
                        <b-col class="propertys" md="4" offset-md="2">
                            <span v-for="(v,k) in attrs[index]" class="property">{{ v }} <span @click="del(index,k)" class="close" >+</span></span>
                        </b-col>
                    </b-row>
                    <b-row v-if="table">
                        <b-col md="10" offset-md="2">
                            <table class="chart">
                                <tr class="tr">
                                    <th v-for="(item,index) in attrs" v-if="item != false">{{ property[index] }}</th>
                                    <th>原价</th>
                                    <th>售价</th>
                                    <th>库存</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                <tr v-for="(item,index) in skus" v-if="item.status != 3" class="tr">
                                    <td v-if="item.attr1">{{ item.attr1 }}</td>
                                    <td v-if="item.attr2">{{ item.attr2 }}</td>
                                    <td v-if="item.attr3">{{ item.attr3 }}</td>
                                    <td><input v-model="item.original_price" class="input" type="text"></td>
                                    <td><input v-model="item.price" class="input" type="text"></td>
                                    <td><input v-model="item.quantity" class="input" type="text"></td>
                                    <td>
                                        <select v-model="item.status" class="input">
                                            <option value="1">显示</option>
                                            <option value="0">隐藏</option>
                                        </select>
                                    </td>
                                    <td><span @click="delSku(index)" class="iconfont icon-icon1"></span></td>
                                </tr>
                            </table>
                        </b-col>
                    </b-row>
                     <b-row class="row">
                        <b-col md="2" class="type">标签:</b-col>
                        <b-col md="4">
                            <label v-for="(item,index) in tags"><input v-model="tagList" class="radio" name="tag"  type="checkbox" :value="index" >{{ item }}</label>
                        </b-col>
                    </b-row>
                    <b-row v-for="item in tagList" class="row">
                        <b-col md="2" class="type">{{ tags[item] }}:</b-col>
                        <b-col md="4">
                            <input v-model="tags_value[item].value" type="text" class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">排序:</b-col>
                        <b-col md="4">
                            <input v-model="sort" type="text" class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">商品描述:</b-col>
                        <b-col md="4">
                            <textarea v-model="desc" class="text"></textarea>
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="4" offset-md="2">
                            <button @click="submit" class="submit">提交</button>
                        </b-col>
                    </b-row>
                </b-container>
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
              category:[],
              tips:'',
              selected:'',
              property:'',
              name:'',
              status:1,
              sort:0,
              desc:'',
              tags:{1:'有效期',2:'促销宣传语',3:'温馨提示'},
              tagList:[],
              tags_value:{
                    1:{tag_id:1,value:'',status:1},
                    2:{tag_id:2,value:'',status:1},
                    3:{tag_id:3,value:'',status:1},
              },
              attr:{},
              table:false,
              attrs:[],
              skus:[],
              tmp:[],
          }
        },
        mounted() {
            $.ajax({
                type: 'get',
                url: this.$store.state.domainName + 'api/admin/category/query',
                dataType: 'json',
                success: (res)=>{
                    if(res.status){
                        this.category = res.data;
                    }else{
                        conosle.log(res.data);
                    }
                },
                error: (err)=>{
                    console.log(err);
                }
            })
        },
        methods:{
            stime(tips){
                this.tips = tips;
                this.$bvToast.show('example-toast');
            },
            sku(e){
                this.property = JSON.parse(this.category[e.target.value]['property']);
                for(var item in this.property){
                    this.attrs[item] = [];
                }
                this.table = false;
            },
            setSku(count,array=[],index=0){
                if(this.attrs[index].length > 0){
                    for(var  i in this.attrs[index]){
                        array[index] = i;
                        if(index < count){
                            this.setSku(count,array,index+1)
                        }else{
                            let arr = [];
                            for(var x in this.attrs){
                                if(this.attrs[x][array[x]]){
                                    arr.push(this.attrs[x][array[x]]);
                                }
                            }
                            let [a,b,c] = arr;
                            let json = {
                                attr1:a?a:null,
                                attr2:b?b:null,
                                attr3:c?c:null,
                                original_price:'0.00',
                                price:'0.00',
                                quantity:'0',
                                status:1,
                            };
                            for(var i=0;i<this.tmp.length;i++){
                                if(json.attr1 == this.tmp[i].attr1 && json.attr2 == this.tmp[i].attr2 && json.attr3 == this.tmp[i].attr3){
                                    json = this.tmp[i];
                                }
                            }
                            this.skus.push(json);
                        }
                    }
                }else{
                    if(index < count){
                        this.setSku(count,array,index+1)
                    }else{
                        let arr = [];
                        for(var x in this.attrs){
                            if(this.attrs[x][array[x]]){
                                arr.push(this.attrs[x][array[x]]);
                            }
                        }
                        let [a,b,c] = arr;
                        let json = {
                            attr1:a?a:null,
                            attr2:b?b:null,
                            attr3:c?c:null,
                            original_price:'0.00',
                            price:'0.00',
                            quantity:'0',
                            status:1,
                        };
                        for(var i=0;i<this.tmp.length;i++){
                            if(json.attr1 == this.tmp[i].attr1 && json.attr2 == this.tmp[i].attr2 && json.attr3 == this.tmp[i].attr3){
                                json = this.tmp[i];
                            }
                        }
                        this.skus.push(json);
                    }
                }
            },
            delSku(index){
                this.skus[index].status = 3;
            },
            attrFun(index){
                if(!this.attr[index]){
                    return
                }
                this.attrs[index].push(this.attr[index]);
                this.attr[index] = '';
                this.table = true;
                this.tmp = this.skus;
                this.skus = [];
                this.setSku(this.attrs.length-1);
            },
            del(index,k){
                this.attrs[index].splice(k,1);
                this.$forceUpdate();
                let tmp = false;
                for(let i in this.attrs){
                    if(this.attrs[i] != false){
                        tmp = true;
                        break;
                    }
                }
                this.table = tmp;
                this.tmp = this.skus;
                this.skus = [];
                this.setSku(this.attrs.length-1);
            },
            submit(){
                let sku = [];
                for(var i in this.skus){
                    if(this.skus[i].status != 3){
                        sku.push(this.skus[i]);
                    }
                }
                $.ajax({
                    type: 'post',
                    url: this.$store.state.domainName + 'api/admin/product/create',
                    data: {
                        product_name : this.name,
                        category_id : this.category[this.selected].id,
                        content : this.desc,
                        product_sort : this.sort,
                        product_status : this.status,
                        tags : JSON.stringify(this.tags_value),
                        sku : JSON.stringify(sku),
                    },
                    dataType: 'json',
                    success: (res)=>{
                        this.stime(res.data);
                        if(res.status){
                            this.selected = '';
                            this.property = '';
                            this.name = '';
                            this.status = 1;
                            this.sort = 0;
                            this.desc = '';
                            this.tagList = [];
                            this.tags_value = {
                                1:{tag_id:1,value:'',status:1},
                                2:{tag_id:2,value:'',status:1},
                                3:{tag_id:3,value:'',status:1},
                            };
                            this.attr = {0:'',1:'',2:''};
                            this.table = false;
                            this.attrs = [];
                            this.skus = [];
                        }
                    },
                    error: (err)=>{
                        console.log(err);
                    }
                })
            },
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

    .example-toast{
        width:250px;
        position:fixed;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
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


</style>