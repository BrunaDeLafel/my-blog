<template>
  <div class="main-content" :style="{width:contentWidth}" v-loading="loadCondition">
      <div class="item" v-for="(item,index) in articlelist" :key="(item,index)">
          <router-link :to="{path:'/article',query:{id:index}}" tag="div" class="item-router">
                <div class="item-title">{{item.title}}</div>
                <div class="writer">作者：Masayel</div>
                <div class="date" style="font-size:0.82rem;margin-top:0.6rem;;">日期：{{item.date}}</div>
                <div class="item-content">{{item.artinfo}}</div>
          </router-link>
         <!--文章操作
          <el-popover
              placement="right"
              width="160"
              v-model="visible"
              trigger="hover"
              style="position:relative;top:-2rem;left:60rem;"
              >
              <p>确定删除文章吗？</p>
              <div style="text-align: center; margin: 0">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteop(index)"></el-button>
                  <el-button type="info" icon="el-icon-close" circle @click="visible = false"></el-button>
              </div>
              <el-button icon="el-icon-arrow-down" slot="reference"></el-button>
          </el-popover>-->
      </div>
  </div>
</template>

<script>
export default {
    name:'articlelist',
    data(){
        return{
            contentWidth:'',
            article:'',
            articlelist:[],
            loadCondition:true,
            visible:false,
            deleteContent:''
        }
    },
    created(){
        //与后台交互，提交文章所有信息
    },
    //生命周期钩子中设置响应式布局适配
    mounted(){
        let screenWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
        if(screenWidth < 1100){
            this.contentWidth = "100%";
        }
        else{
            this.contentWidth = "1100px";
        }
        //与后台交互，提交文章所有信息
        this.$axios({
            url:"http://148.70.143.4:6400/emitlist",
            method:'POST',
            data:JSON.stringify({"name":1}),
            headers:{'Content-Type':'application/json'}
        }).then(res => {
            this.articlelist = res.data;
            this.loadCondition = false;
        })
    },
    methods:{
        deleteop(index){
           //与后台交互，提交文章所有信息
           this.$axios({
                url:"http://148.70.143.4:6400/delete",
                method:'POST',
                data:JSON.stringify({"md":this.articlelist[index].artinfo,"title":this.articlelist[index].title}),
                headers:{'Content-Type':'application/json'}
            }).then(res => {
                console.log(res);
           })
           this.visible = false;
        }
    }
}
</script>

<style scoped>
.main-content{
    margin: 0 auto;
    height: auto;
    border: 1px rgb(221, 221, 221) solid;
    display: flex;
    flex-wrap: wrap-reverse;

}
.item{
    padding: 2rem 3.4rem;
    border-radius: 0.1rem;
    margin: 0 auto;
    text-align: left;
    border-bottom: 0.8px rgb(221, 221, 221) solid;
    cursor: pointer;
    width: 100%;
}
.item-router{
    width: 100%;
    height: 100%;
}
.item-title{
    font-size: 2.5rem;
    font-weight: 600;
    color: rgb(29, 29, 29);
}
.item-content{
    width: 75%;
    margin-top: 1.9rem;
    color: gray;
    font-size: 0.8rem;
    line-height: 1.4rem;
}
.writer,.date{
    margin-top: 1.5rem;
    color: gray;
    font-size: 1rem;
}
.deletebutton{
    width: 2rem;height: 3.5rem;
    position:absolute;
    top: 0;right: 0;
}
</style>