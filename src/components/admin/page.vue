<template>
    <div class="page">
        <span class="count">共{{ page.total }}条数据{{ page.to }}/{{ page.page_count }}页</span>
        <span class="btn" @click="$emit('click',page.first_page_url)">第一页</span>
        <span class="btn" @click="$emit('click',page.prev_page_url?page.prev_page_url:page.first_page_url)">上一页</span>
        <span class="btn" @click="$emit('click',page.next_page_url?page.next_page_url:page.last_page_url)">下一页</span>
        <span class="btn" @click="$emit('click',page.last_page_url)">最后一页</span>
    </div>
</template>

<script>
    export default {
        name:'page',
        props:['page'],
    }
</script>

<style scoped lang="scss">
    .page{
        text-align: right;
        margin:10px 0;
        .count{
            margin-right:5px;
        }
        .btn{
            background: #19a97b;
            color:#fff;
            padding:3px 8px;
            margin:0 5px;
            font-size: 14px;
            cursor:pointer;
            border-radius: 0;
        }
    }
</style>