<template>
  <div class="article-content" :style="{width:contentWidth}" v-loading="load">
    <mavon-editor v-model="article" 
    :subfield="false"                                    
    :boxShadow="false"                                    
    defaultOpen="preview"                                    
    :toolbarsFlag="false" />
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    name:'article',
    components:{mavonEditor},
    data(){
      return {
        id:'',
        contentWidth:'',
        article:'',
        load:true
      }
    },
    created(){
      //接受目标参数（文章的索引）
      this.id = this.$route.query.id;
      //与后台交互
      this.$axios({
          url:"http://148.70.143.4:6400/emitmd",
          method:'POST',
          data:JSON.stringify({"artindex":this.id}),
          headers:{'Content-Type':'application/json'}
      }).then(res => {
          this.article = res.data.md;
          this.load = false;
      })
    },
    mounted(){
      //做响应式适配
      let screenWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
        if(screenWidth < 1100){
            this.contentWidth = "100%";
        }
        else{
            this.contentWidth = "1100px";
        }
    }
}
</script>

<style scoped>
.article-content{
    margin: 0 auto;
    height: auto;
    border: 1px rgb(221, 221, 221) solid;
}
</style>