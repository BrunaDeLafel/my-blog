<template>
  <div class="main-text" :style="{width:contentWidth}">
      <!--保存提示框-->
      <div class="main-text-button">
          <el-button :type="buttonType" :loading="buttonCondition" plain>{{buttonText}}</el-button>
      </div>
      <!--mark down 富文本编辑器-->
      <mavon-editor v-model="value" @change="hasEdit"/>
      <!--提交，存草稿，删除操作-->
      <div class="buttonItems">
          <div class="bItem" @click="edit">提交文章</div>
          <div class="bItem" id="rub" @click="saveEdit">存草稿</div>
          <div class="bItem" id="delete" @click="deleteEdit">删除文章</div>
      </div>
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    name:'editarticle',
    components:{mavonEditor},
    data(){
        return{
            contentWidth:'',
            value:'',
            article:'',
            buttonCondition:false,
            buttonText:'已保存',
            buttonType:'success'
        }
    },
    methods:{
        //markdown富文本编辑器的保存操作
        hasEdit(markdown,html){
            //开始保存文章
            this.article = markdown;
            this.buttonCondition = true;
            this.buttonType = 'info';
            this.buttonText = '自动保存...';
            setTimeout(() => {
                this.buttonCondition = false;
                this.buttonType = 'success';
                this.buttonText = '已保存';
            }, 1500);
        },
        //提交文章
        edit(){
            this.$prompt('请输入文章标题','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                //确定日期
                var today = new Date()
                this.$message({
                    type: 'success',
                    message: '你的文章名是: ' + value
                });
                //与后台交互，提交文章所有信息
                this.$axios({
                    url:"http://148.70.143.4:6400/receiveArt",
                    method:'POST',
                    data:JSON.stringify({"name":value,"md":this.article,"date":today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate()}),
                    headers:{'Content-Type':'application/json'}
                }).then(res => {
                    console.log(res);
                })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        //存草稿
        saveEdit(){

        },
        //删除文章
        deleteEdit(){
            if(this.article != ''){
                this.$confirm('您确定是否要删除？还是留在当前页面','提示信息',{
                        distinguishCancelAndClose: true,
                        confirmButtonText: '取消',
                        cancelButtonText: '删除文章'
                    })
                    .then(() => {

                    })
                    .catch(action => {
                        this.$message({
                            type: 'info',
                            message: action === 'cancel'
                                ? '已删除该文章'
                                : '停留在当前页面'
                        })
                        if(action === 'cancel'){
                            this.value = '';
                            this.article = '';
                        }
                    })
            }
            else{
                this.$message({
                    type:'warning',
                    message:'不能删除空文章哦~'
                })
            }
        }
    },
    //生命周期钩子中设置响应式布局适配
    mounted(){
        let screenWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
        if(screenWidth < 1700){
            this.contentWidth = "100%";
        }
        else{
            this.contentWidth = "1700px";
        }
    }
}
</script>

<style scoped>
.main-text{
    margin: 0 auto;
    border: 1px rgb(221, 221, 221) solid;
}
.main-text-button{
    position: absolute;
    top: -2.4rem;left: 70%;
    z-index:999;
}
.buttonItems{
    margin: 0 auto;
    position: relative;
    margin-top: 2.5rem;
    width: 86%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.bItem{
    width: 6.8rem;height: 3rem;
    border-radius: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: WHITE;
    background-color: #66b1ff;
    font-size: 0.9rem;
    cursor: pointer;
}
#rub{
    background: white;
    color: #66b1ff;
    border: #66b1ff solid 0.1rem;
}
#delete{
    background: WHITE;
    color: #66b1ff;
    border:0.1rem solid #66b1ff;
}
</style>