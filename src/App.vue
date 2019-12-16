<template>
  <div id="app">
    <indexview></indexview>
  </div>
</template>

<script>

//局部注册组件
import todo from './components/todo'

export default {
  name: 'App',
  components:{
    "indexview":todo
  },
  //在create函数中设置rem适配
  created(){
    document.documentElement.style.fontSize = 20*document.documentElement.clientWidth/3200 + 'px';
    window.onresize = function() {
      document.documentElement.style.fontSize = 20*document.documentElement.clientWidth/3200 + 'px';
    };
    //console.log(document.documentElement.style.fontSize);
  }
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
