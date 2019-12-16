<template>
  <!--页面的主容器-->
  <el-container style="padding: 0;margin: 0;top:0;overflow-x:hidden;">
      <!--页面上部展示数据-->
      <el-header style="height:15rem;background-color:#404040;">
          <router-link to="/"><img class="header-img" src="../assets/cover.png" alt=""></router-link>
          <div class="header-nav">
              <div class="header-nav-item">
                  <img src="../assets/navIcon1.png" @click="pass">
              </div>
              <div class="header-nav-item">
                  <img src="../assets/navIcon2.png">
              </div>
              <div class="header-nav-item">
                  <img src="../assets/navIcon3.png">
              </div>
              <div class="header-nav-text" id="navText1" :style="{height:navheight[0]}" @click="pass">编辑文章</div>
              <div class="header-nav-text" id="navText2" :style="{height:navheight[1]}">访客统计</div>
              <div class="header-nav-text" id="navText3" :style="{height:navheight[2]}">内网外入</div>
          </div>
          <div class="header-touxiang">
              <img src="../assets/touxiang.jpg" alt="">
          </div>
          <el-dropdown class="header-drop">
              <span class="header-text">
                    个人中心<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu>
                  <el-dropdown-item>数据搜集</el-dropdown-item>
                  <el-dropdown-item>在线简历</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          <div class="dataget">
              <div class="dataget-item">日访问量：{{daydata}}</div>
              <div class="dataget-item">累计访问量：{{alldata}}</div>
          </div>
      </el-header>
      <!--侧边栏-->
      <el-aside>
      </el-aside>
      <!--页面主体-->
      <el-main style="width:100%;margin-top:4rem;">
          <!--根据路由切换内容-->
          <router-view></router-view>
          <!--回到页面底部的组件-->
          <el-backtop :bottom="100" class="up-item">
              <div class="main-top">
                  UP
              </div>
          </el-backtop>
      </el-main>
      <!--页面页脚-->
      <el-footer></el-footer>
  </el-container>
</template>

<script>
export default {
    name:'todo',
    data(){
        return{
            contentWidth:'',
            navheight:["2.2rem","1.9rem","2.8rem"],
            daydata:'',
            alldata:'',
        }
    },
    created(){
        //统计访问数据
        /*this.$axios({
            url:"http://localhost:6400/guestdata",
            method:'POST',
            data:JSON.stringify({"day":this.daydata,"all":this.alldata}),
            headers:{'Content-Type':'application/json'}
        }).then(res => {
            console.log(res);
            this.alldata = res.data.alldata;
            this.daydata = res.data.daydata;
        })*/
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
    },
    methods:{
        pass(){
            this.$prompt('请输入博主密码','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    //与后台进行判断
                    this.$axios({
                        url:"http://148.70.143.4:6400/pass",
                        method:'POST',
                        data:JSON.stringify({"password":value}),
                        headers:{'Content-Type':'application/json'}
                    }).then(res => {

                        if(res.data == 'right'){
                            this.$message({
                                type:'success',
                                message:'密码正确！'
                            })
                            this.$router.push('/edit');
                        }
                        else if(!res){
                            this.$message.error('密码输入错误哦！');
                        }
                    })
                })
        },
    }
}
</script>

<style scoped>
.header-img{
    width: 100%;height: 100%;
}
.header-touxiang{
    position:relative;
    top: -35%;left: 80%;
    width: 5rem;height:5rem;
    border-radius: 50%;
    overflow: hidden;
}
.header-touxiang img{
    width: 5rem;
}
.header-drop{
    position: relative;
    top: -7.4rem;left: 59.8rem;
    width: 8rem;
}
.dataget{
    font-size: 0.8rem;
    color: white;
    position: relative;
    top: -11rem;left: 145rem;
    width: 5.8rem;
}
.dataget-item{
    margin-top: 0.6rem;
    width: 100%;
}
.header-text{
    font-size: 1.45rem;
    cursor:pointer;
    color: #E6a23d;
    font-weight: 380;
}
.main-top{
    background-color: #404040;
    box-shadow: 0.1rem 0.1rem 1rem grey;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;height:100%;
    color: #E6a23d;
}
.main-content{
    margin: 0 auto;
    height: 200rem;
    border: 1px rgb(221, 221, 221) solid;
}
.header-nav{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 21rem;
    position: absolute;
    top:11.45rem;left: 4%;
}
.header-nav-item{
    width: 4rem;height: 4rem;
    border-radius: 50%;
    background-color: white;
    margin-right: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-nav-item img{
    width: 60%;height: 60%;
}
.header-nav-text{
    background-color: #E6a23d;
    width: 4rem;height: 0rem;
    margin-right: 2rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    font-size: 0rem;
}
#navText1:hover, #navText2:hover, #navText3:hover{
    width: 4rem;height: 14rem!important;
    box-shadow: 0.1rem 0.1rem 1rem grey;
    cursor:pointer;
    font-size:2.5rem;
    color: #404040;
    font-weight: 340; 
}
.up-item{
    position: fixed;
    right: 2rem;bottom:2rem;
}
</style>