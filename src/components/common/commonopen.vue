<template> 
  <div>
    <el-container class="container-warp">
   <el-aside width="239px">
    <div class="slider-lt">
      <img src="../../assets/images/slider-logo.png" alt="祺眼logo">
    </div>
    <ul class="slider-ul">
      <router-link to="/openListindex" tag="li">开户管理</router-link>
    </ul>
  </el-aside>
  <el-container>
    <el-header>
      <div class="nav-tit">
        <slot name="title"></slot>
        <!-- <span class="tit">考官及培训师管理</span> -->
        <div class="super-adm">
          <div class="admin-name">
            <div class="adm-le">
              <p>欢迎进入祺眼平台管理（出入系统）</p> 
              <p><span>{{id}}</span> <a class="adm-ri chose-open" @click="exit">退出</a></p>
            </div> 
           
          </div>
        </div>
      </div>
     <!--  <ul class="nav-class">
        <li><router-link to="/userman" tag="a">用户管理</router-link></li> 
     
        <li><router-link to="/organizational/list" tag="a">会员列表</router-link></li> 
        <li><router-link to="/teacher/list" tag="a">套餐交易流水</router-link></li>
        <li><a href="#/home/idset" class="router-link-active">会员身份配置</a></li> 
        <li><a href="#/home/growset" class="">成长体系</a></li> 
        <li><a href="#/home/interests" class="">权益配置</a></li>
      </ul> -->
      <slot name="nav"></slot>
    </el-header>
    <el-main>
      <slot name="main"></slot>
    </el-main>
  </el-container>
</el-container>
  </div>
  

</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      arr:['1','2','3'],
      id:""
    }
  },
  methods:{
    routerFn(){
    
    },
    exit(){
       this.$confirm('确定要退出吗？', '', {
                confirmButtonText: '确定',     
                cancelButtonText: '取消', 
                type: ''
              }).then(() => {
                  sessionStorage.removeItem("users");
                  this.$router.push({path:"/login"})  
                  
              }).catch(()=>{
               
              });
    },
     getInfo(){
      this.$api.post("/common_query_company_api",
        {
          "company_id":this.id
         }
      ,su=>{
        if(su.code==200){
          this.$store.state.data = su;
        }
      },
      err=>{

      })
    },
  },
  mounted(){
      this.id = sessionStorage.getItem("users");
      if(JSON.stringify(this.$store.state.data)=="{}"){
        this.getInfo();
      }
  },
  watch:{
    
  },
  computed:{
    ...mapState({   
      data:"data"
    })
  }
}
</script>
<style lang='scss'>
.container-warp.el-container{
  height:100vh;
  background-color: #eee;
}
.container-warp {
  .el-header{
    text-align: left;
    background-color: #fff;
    height: 140px!important;
    border-bottom: 2px solid #378EEF;
    z-index: 3;
  }
  .el-aside {
    width:240px;
    background:rgba(47,50,58,1);
    color:#fff;
  }
  .el-main {
    color: #333;
    overflow: auto;
  }

  .slider-lt{
    height:74px; 
    background:#2f323a;
    text-align:center;
    line-height:90px;
    padding-top:16px;
    
  }
  .slider-ul{
    li{
      height:50px;
      line-height:50px;
      font-size:14px;
      text-indent:40px;
      text-align:left;
      cursor: pointer;

    }
    li.router-link-active{
      background-color: #378EEF;
    }
  }
  
  .slider-ul li:hover{
      background-color: #378EEF;
  }

}

.nav-tit {
    font-size: 20px;
    color: #000;
    height: 90px;
    line-height: 90px;
    position: relative;
    .tit{
      font-weight: bold;
    }
}
.super-adm {
    position: absolute;
    width: 270px;
    height: 52px;
    right: 18px;
    bottom: 0;
}
.admin-img {
    float: left;
    width: 52px;
    height: 52px;
  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
  }
}
.adm-le {
    width: 222px;
    float: left;
}
.adm-ri {
    width: 30px;
    height: 24px;
    font-weight: 700;
    color: #378eef;
    margin-top: 30px;
    cursor: pointer;
     margin-left: 10px;
}
.adm-le p, .adm-ri {
    font-size: 14px;
    line-height: 1;
}
.adm-le p {
    color: #2f323a;
    margin-top: 8px;
    text-align: right;
    white-space:nowrap; 
}
.nav-class {
    li {
        width: 120px;
        height: 61px;
        float: left;
        color: #4d4d4d;
        font-size: 14px;
        a.router-link-active {
          background:url('../../assets/images/chose.png') center bottom no-repeat;
          background-size: cover;
          color: #fff;
          font-weight: bold;
        }
         a {
          display: block;
          height: 60px;
          line-height: 50px;
          text-align: center;
          text-decoration: none;
          color: #4d4d4d;
      }
    }

}
</style>