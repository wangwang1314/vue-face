<template> 
<div @click="closedia">
    <el-container class="container-warp">
   <el-aside width="239px">
    <div class="slider-lt">
      <img src="../../assets/images/slider-logo.png">
    </div>
    <ul class="slider-ul">
      <router-link to="/home" tag="li">首页</router-link>
      <router-link to="/acc" tag="li">出入管理</router-link>
      <router-link to="/man" tag="li">人员管理</router-link>      
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
              <p>欢迎进入管理平台（出入系统）！</p> 
              <p >
                <span @click.stop="changeFn">{{data.user_name}}
                    <i class="rotate" >›
                    </i>
                    <div class="change" v-show="change">
                        <p @click.stop="reset">修改密码</p>
                    </div>
                </span>
              </p>
            </div> 
            <a class="adm-ri" @click="exit">退出</a>
          </div>
        </div>
      </div>
      <slot name="nav"></slot>
    </el-header>
    <el-main>
      <slot name="main"></slot>
    </el-main>
    <div class="box">
      <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="550px">
        <table class="tab-dalog">
          <tr>
            <td >旧密码</td>
            <td><input type="password" name="" placeholder="请输入你的原始登录密码" v-model="reseted.pass" :class="{'border-red':check.pass}"></td>
          </tr>
          <tr>
            <td>新密码</td>
            <td><input type="password" name="" maxlength="50" placeholder="请输入你的新密码，50个字符以内" v-model="reseted.new" :class="{'border-red':check.new}"></td>
          </tr>
          <tr>
            <td>重复新密码</td>
            <td><input type="password" name="" maxlength="50" placeholder="请再次输入你的新密码，50个字符以内"  v-model="reseted.res" :class="{'border-red':check.res}"></td>
          </tr>
        </table>
        <span slot="footer" class="dialog-footer">
          <span class="warn-box" v-show="err"><i></i>{{errtit}}</span>
          <el-button type="primary" @click="changecon">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button> 
        </span>
      </el-dialog>
    </div>
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
      dialogVisible:false,
      id:"",
      change:false,
      err:false,
      errtit:"",
      reseted:{
        pass:"",
        new:"",
        res:""
      },
      check:{
        pass:false,
        new:false,
        res:false
      }
    }
  },
  methods:{
    routerFn(){
    
    },
    exit(){
       this.$confirm('确定要退出当前账号吗？', '退出账号', {
                confirmButtonText: '确定',     
                cancelButtonText: '取消', 
                type: ''
              }).then(() => {
                  sessionStorage.removeItem("users");
                  this.$router.push({path:"/login"})  
                  
              }).catch(()=>{
               
              });
    },
    reset(){
      this.dialogVisible = true;
      this.change = false;
      this.initcheck();
    },
    changeFn(){
      this.change = true;
    },
    closedia(){
      this.change = false;
      this.$store.state.slider = false;
     // console.log(1111)
    },
    initcheck(){
      this.err = false;
      this.check.pass = false;
      this.check.new = false;
      this.check.res = false;
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
    changecon(){
      this.initcheck();
      if(!this.reseted.pass){
          this.err = true;
          this.errtit = "请输入旧密码";
          this.check.pass = true;
          return
      }
      if(!this.reseted.new){
          this.err = true;
          this.errtit = "请输入新密码";
          this.check.new = true;
          return
      }
      if(/\s/g.test(this.reseted.new)){
            this.err = true;
            this.errtit = "密码中不能含有空格";
            this.check.new = true;
            return
          }
      if(!this.reseted.res){
          this.err = true;
          this.errtit = "请重复密码";
          this.check.res = true;
          return
      }
      if(this.reseted.res!=this.reseted.new){
          this.err = true;
          this.errtit = "两次密码输入不一致";
          return
      }
      this.$api.post("/client_mng_passwd_api",
        {
          company_id:this.id,
          old_passwd:this.reseted.pass,
          new_passwd:this.reseted.new
        }
      ,su=>{
          if(su.code==200){
            this.$message({
              message: su.msg,
              type: 'success'
            });
            sessionStorage.removeItem("users");
            setTimeout(()=>{
               this.$router.push({path:"/login"})
            },1500)    
          }else{
            this.err = true;
            this.errtit = su.msg;
          }
      },
      err=>{

      })
    }
  },
  mounted(){
      this.id = Number(sessionStorage.getItem("users"));
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
      background-color: RGBA(31, 165, 255, 1);
    }
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
    float: left;
    width: 30px;
    height: 24px;
    font-weight: 700;
    color: #378eef;
    margin-top: 36px;
    cursor: pointer;
}
.adm-le p, .adm-ri {
    font-size: 14px;
    line-height: 1;
}
.adm-le>p {
    color: #2f323a;
    margin-top: 8px;
    text-align: right;
    margin-right:28px;
    white-space:nowrap;
    span{
      position: relative;
    } 
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
.tab-dalog{
  font-size:14px;
  color:rgba(77,77,77,1);
  line-height: 50px;
  td:first-child{
    width:80px;
    text-align: right;
  }
  td:nth-child(2){
    text-align:left;
    padding-left:16px;
    input{
      width: 410px;
      height: 34px;
      border: 1px solid #ccc;
      border-radius: 4px;
      text-indent: 8px;
    }
    input.border-red{
      border-color:red;
    } 
  }
}
.box .el-dialog__footer{
  box-shadow: 0 0 4px #ccc;
}
.warn-box{
  font-size: 12px;
  color: #F84C4C;
  float: left;
  position: relative;
  top:13px;
  i{
    display: inline-block;
    width: 20px;
    height: 20px;
    background:url(../../assets/images/err-icon.png);
    margin-right: 12px;
    position: relative;
    top:4px;
  }
}
.rotate{
    transform: rotate(90deg);
    display: inline-block;
    font-size: 22px;
    margin-left: 14px;
    width: 12px;
    height: 23px;
}
.adm-le .change{
    width: 128px;
    height: 60px;
    position: absolute;
    border: 1px solid #ccc;
    background: #fff;
    right: 0;

    >p{
      height: 44px;
      line-height: 44px;
      text-align: center;
      cursor: pointer;
      width: 100%;
    }
    >p:hover{
      color: #fff;
      margin-top: 2px;
      background: #378eef;
    }
}
</style>