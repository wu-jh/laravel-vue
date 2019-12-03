<template>
    <div class="warp">
        <top />
        <sidebar />
        <div class="content">
            <div class="top">
                <div class="title">商品详情</div>
                <div class="btn" @click="$router.go(-1)">返回列表</div>
            </div>
            <div class="form">
                <b-container fluid>
                    <b-row class="row">
                        <b-col md="2" class="kind">基本信息:</b-col>
                        <b-col md="4" class="kind">
                            <button class="btn1" @click="basic_disabled = false" v-if="basic_disabled">编辑</button>
                            <button class="btn1 submit" @click="basic_disabled = true" v-if="!basic_disabled">取消</button>
                            <button class="btn1" @click="basic_change"  v-if="!basic_disabled">提交</button>
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">商品名称:</b-col>
                        <b-col md="4">
                            <input v-model="data.name" type="text" :disabled="basic_disabled" class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">所属分类:</b-col>
                        <b-col md="4">
                            <input v-model="data.category.name" type="text" disabled class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">状态:</b-col>
                        <b-col md="4">
                            <label><input v-model="data.status" :disabled="basic_disabled" class="radio" name="status"  type="radio" value="1" >上架</label>
                            <label><input v-model="data.status" :disabled="basic_disabled" class="radio" name="status"  type="radio" value="0">下架</label>
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
                            <input v-model="data.sort" type="text" :disabled="basic_disabled" class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="2" class="type">商品描述:</b-col>
                        <b-col md="4">
                            <textarea v-model="data.content" :disabled="basic_disabled" class="text"></textarea>
                        </b-col>
                    </b-row>
                    <b-row class="row separator">
                        <b-col md="2" class="kind">标签:</b-col>
                        <b-col md="4" class="kind">
                            <button class="btn1" @click="tag_disabled = false" v-if="tag_disabled">编辑</button>
                            <button class="btn1 submit" @click="tag_disabled = true" v-if="!tag_disabled">取消</button>
                            <button class="btn1" @click="tag_change()"  v-if="!tag_disabled">提交</button>
                        </b-col>
                    </b-row>
                    <b-row class="row" v-if="!tag_disabled">
                        <b-col md="2" class="type">添加标签:</b-col>
                        <b-col md="4">
                            <label  v-for="(item,index) in tags" v-if="testing(index)"><input v-model="add_tag" class="radio" name="tag"  type="checkbox" :value="index" >{{ item }}</label>
                        </b-col>
                    </b-row>
                    <b-row v-if="data.tag == false && tag_disabled" class="row">
                        <b-col md="4" offset-md="2">暂未添加标签...</b-col>
                    </b-row>
                    <b-row v-else v-for="item in data.tag" class="row">
                        <b-col md="2" class="type">{{ tags[item.tag_id] }}:</b-col>
                        <b-col md="4">
                            <input v-model="item.value" type="text" :key="item.id" :disabled="tag_disabled" class="input">
                        </b-col>
                        <b-col v-if="!tag_disabled" md="1">
                            <span @click="tag_del(item.id)" class="iconfont icon-shanchu del"></span>
                        </b-col>
                    </b-row>
                    <b-row v-if="!tag_disabled" v-for="item in add_tag" class="row">
                        <b-col md="2" class="type">{{ tags[item] }}:</b-col>
                        <b-col md="4">
                            <input v-model="tags_value[item].value" type="text" class="input">
                        </b-col>
                    </b-row>
                    <b-row class="row separator">
                        <b-col md="2" class="kind">SKU:</b-col>
                        <b-col md="4" class="kind">
                            <button class="btn1" @click="sku_disabled = false" v-if="sku_disabled">编辑</button>
                            <button class="btn1 submit" @click="cancel" v-if="!sku_disabled">取消</button>
                            <button class="btn1" @click="sku_change" v-if="!sku_disabled">提交</button>
                        </b-col>
                    </b-row>
                    <b-row v-if="!sku_disabled"  v-for="(item,index) in this.property" class="row">
                        <b-col md="2" class="type">{{ item }}:</b-col>
                        <b-col md="3">
                            <input v-model="pop[index]"  class="sku" type="text">
                        </b-col>
                        <b-col md="1">
                            <span @click="add_pro(index)" class="add iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-"></span>
                        </b-col>
                        <b-col md="8"></b-col>
                        <b-col class="propertys" md="6" offset-md="2">
                            <span v-for="(pro,key) in pros[index]" class="property">{{ pro }}<span @click="del_pro(index,key)" class="close" >+</span></span>
                        </b-col>
                    </b-row>
                    <b-row class="row">
                        <b-col md="10" offset-md="2">
                            <table v-if="sku.length > 0" class="chart">
                                <tr class="tr">
                                    <th v-if="sku[0].attr1">{{ property[0] }}</th>
                                    <th v-if="sku[0].attr2">{{ property[1] }}</th>
                                    <th v-if="sku[0].attr3">{{ property[2] }}</th>
                                    <th>原价</th>
                                    <th>售价</th>
                                    <th>库存</th>
                                    <th>状态</th>
                                    <th v-if="!sku_disabled">操作</th>
                                </tr>
                                <tr v-for="(item,index) in sku" :key="index" v-if="item.status != 3" class="tr">
                                    <td v-if="item.attr1">{{ item.attr1 }}</td>
                                    <td v-if="item.attr2">{{ item.attr2 }}</td>
                                    <td v-if="item.attr3">{{ item.attr3 }}</td>
                                    <td><input :disabled="sku_disabled" v-model="item.original_price" class="input" type="text"></td>
                                    <td><input :disabled="sku_disabled" v-model="item.price" class="input" type="text"></td>
                                    <td><input :disabled="sku_disabled" v-model="item.quantity" class="input" type="text"></td>
                                    <td>
                                        <select :disabled="sku_disabled" v-model="item.status" class="input">
                                            <option value="1">显示</option>
                                            <option value="0">隐藏</option>
                                        </select>
                                    </td>
                                    <td v-if="!sku_disabled"><a href="javascript:void(0)" class="cha" @click="del_sku(index)">删除</a></td>
                                </tr>
                            </table>
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
                        {attr1:null,attr2:null,attr3:null,original_price:'',price:'',quantity:''}
                    ]
                },
                tags:{1:'有效期',2:'促销宣传语',3:'温馨提示'},
                property:'',
                basic_disabled:true,
                sku_disabled:true,
                tag_disabled:true,
                add_tag:[],
                tags_value:{
                    1:{tag_id:1,value:'',status:1},
                    2:{tag_id:2,value:'',status:1},
                    3:{tag_id:3,value:'',status:1},
                },
                pros:[
                    [],
                    [],
                    [],
                ],
                pop:['','',''],
                sku:[
                        {attr1:null,attr2:null,attr3:null,original_price:'',price:'',quantity:''}
                    ],
                tmp:[],
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            this.initialize()
        },
        methods:{
            initialize(){
                $.ajax({
                    type : 'get',
                    url : this.$store.state.domainName + 'api/admin/product/find?id=' + this.id,
                    dataType : 'json',
                    success : (res)=>{
                        if(res.status){
                            this.data = res.data;
                            this.sku = JSON.parse(JSON.stringify(this.data.sku));
                            this.property = JSON.parse(this.data.category.property);
                            for(var item of res.data.sku){
                                if($.inArray(item.attr1, this.pros[0]) == -1 && item.attr1){
                                    this.pros[0].push(item.attr1);
                                }
                                if($.inArray(item.attr2, this.pros[1]) == -1 && item.attr2){
                                    this.pros[1].push(item.attr2);
                                }
                                if($.inArray(item.attr3, this.pros[2]) == -1 && item.attr3){
                                    this.pros[2].push(item.attr3);
                                }
                            }
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
            stime(tips){
                this.tips = tips;
                this.$bvToast.show('example-toast');
            },
            basic_change(){
                $.ajax({
                    type:'post',
                    url:this.$store.state.domainName + 'api/admin/product/basicEdit?id=' + this.id,
                    data:{
                        name:this.data.name,
                        content:this.data.content,
                        sort:this.data.sort,
                        status:this.data.status,
                    },
                    dataType: 'json',
                    success:(res)=>{
                        this.stime(res.data);
                        if(res.status){
                            this.basic_disabled = true;
                            this.sku_disabled = true;
                            this.tag_disabled = true;
                            this.initialize()
                        }
                    },
                    error:(err)=>{
                        console.log(err)
                    }
                });
            },
            tag_del(id){
                if(!confirm('你确定要删除吗?')){
                    return false;
                }
                $.ajax({
                    type:'post',
                    url:this.$store.state.domainName + 'api/admin/product/deleteTag',
                    data:{
                        id:id,
                    },
                    dataType:'json',
                    success:(res)=>{
                        this.stime(res.data);
                        if(res.status){
                            this.initialize();
                            this.tag_disabled = true;
                        }
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                });
            },
            testing(index){
                for(var item of this.data.tag){
                    if(index == item.tag_id){
                        return false
                        break;
                    }
                }
                return true;
            },
            tag_change(){
                var json = [];
                for(var i in this.tags_value){
                    if(this.tags_value[i].value){
                        json.push(this.tags_value[i]);
                    }
                }
                for(var i in this.data.tag){
                    if(this.data.tag[i].value){
                        json.push(this.data.tag[i]);
                    }
                }
                $.ajax({
                    url: this.$store.state.domainName + 'api/admin/product/tagEdit',
                    type:'post',
                    data:{
                        id:this.id,
                        tags:JSON.stringify(json),
                    },
                    success:(res)=>{
                        this.stime(res.data);
                        if(res.status){
                            this.initialize();
                            this.basic_disabled = true;
                            this.sku_disabled = true;
                            this.tag_disabled = true;
                            this.add_tag = [];
                            this.tags_value = {
                                1:{tag_id:1,value:'',status:1},
                                2:{tag_id:2,value:'',status:1},
                                3:{tag_id:3,value:'',status:1},
                            };
                        }
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                });
            },
            del_sku(index){
                this.sku[index].status = 3;
            },
            add_pro(index){
                if(this.pop[index] == ''){
                    return;
                }
                this.pros[index].push(this.pop[index]);
                this.pop[index] = '';
                this.tmp = JSON.parse(JSON.stringify(this.sku));
                this.sku = [];
                this.setSku(2);
            },
            del_pro(index,key){
                this.pros[index].splice(key,1);
                this.$forceUpdate();
                this.tmp = JSON.parse(JSON.stringify(this.sku));
                this.sku = [];
                this.setSku(2);
            },
            setSku(count,array=[],index=0){
                if(this.pros[index].length > 0){
                    for(var  i in this.pros[index]){
                        array[index] = i;
                        if(index < count){
                            this.setSku(count,array,index+1)
                        }else{
                            let arr = [];
                            for(var x in this.pros){
                                if(this.pros[x][array[x]]){
                                    arr.push(this.pros[x][array[x]]);
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
                                status:'1',
                            };
                            for(var i=0;i<this.tmp.length;i++){
                                if(json.attr1 == this.tmp[i].attr1 && json.attr2 == this.tmp[i].attr2 && json.attr3 == this.tmp[i].attr3){
                                    json = this.tmp[i];
                                }
                            }
                            this.sku.push(json);
                        }
                    }
                }else{
                    if(index < count){
                        this.setSku(count,array,index+1)
                    }else{
                        let arr = [];
                        for(var x in this.pros){
                            if(this.pros[x][array[x]]){
                                arr.push(this.pros[x][array[x]]);
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
                            status:'1',
                        };
                        for(var i=0;i<this.tmp.length;i++){
                            if(json.attr1 == this.tmp[i].attr1 && json.attr2 == this.tmp[i].attr2 && json.attr3 == this.tmp[i].attr3){
                                json = this.tmp[i];
                            }
                        }
                        this.sku.push(json);
                    }
                }
            },
            sku_change(){
                let sku = [];
                for(var i in this.sku){
                    if(this.sku[i].status != 3){
                        sku.push(this.sku[i]);
                    }
                }
                $.ajax({
                    url:this.$store.state.domainName + 'api/admin/product/skuEdit',
                    type:'post',
                    dataType:'json',
                    data:{
                        id:this.id,
                        sku:sku,
                    },
                    success:(res)=>{
                        this.stime(res.data);
                        if(res.status){
                            this.initialize();
                            this.basic_disabled = true;
                            this.sku_disabled = true;
                            this.tag_disabled = true;
                        }
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                });
            },
            cancel(){
                this.sku_disabled = true;
                this.sku = JSON.parse(JSON.stringify(this.data.sku));
            }
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

    .kind{
        line-height: 35px;
        font-weight: bold;
        margin:20px 0;
        .btn1{
            background: #11a274;
            border: 1px #0e8f61 solid;
            color: white;
            display: inline-block;
            border-radius: 2px;
            outline: none;
            font-size: 15px;
            padding:0 15px;
            margin-right:15px;
            :focus{
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0)
            }
        }
        .submit{
            border:solid 1px #11a274;
            background: none;
            color: #11a274;
        }
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
            padding:0 10px;
            position: relative;
            display:inline-block;
            margin-bottom:5px;
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
    .del{
        line-height: 35px;
        font-size:25px;
        color:#e3342f;
        cursor:pointer;
    }
    .separator{
        margin-top:30px;
    }

    .cha{
        color:#333;
        &:hover{
            text-decoration: none;
            color: #e3342f;
        }
    }

</style>