<template>
  <div class="login">
    <img src="../../assets/images/tit-logo.png" class="tit-logo">
    <div class="content-login">
      <p class="tit">登录</p>
      <div class="ipt-con">
          <div  class="el-input el-input--prefix" :class="{'red-bo':check.isphone}">
            <input autocomplete="off" placeholder="请输入账号" type="text" rows="2"  class="el-input__inner" v-model="phone" maxlength="11">
          <span class="el-input__prefix">
          <i 
           class="el-input__icon telico"></i>
          </span>
          </div>
          <div class="el-input el-input--prefix mar-10">
              <input  placeholder="请输入密码" type="password" rows="2" validateevent="true" class="el-input__inner" v-model="password" :class="{'red-boed':check.ispass||check.pass}" @keyup.enter="submitFn" autocomplete="new-password">
              <span class="el-input__prefix"><i  class="el-input__icon pswico"></i><!----></span>
          </div>
          <p class="tip-p">
            <span class="tip-span" v-show="err"><i></i>{{errtit}}</span>
          </p>
          <el-button type="primary" class="sub-class"  round @click="submitFn">登录</el-button>
          <p class="remb">
            <span @click="rembFn()"><i :class="{'chose':ischose}"></i>记住账户</span>
            <!-- <a href="">忘记密码?</a> -->
          </p>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      phone:"",
      check:{
        isphone:false,
        ispass:false,  
      },
      errtit:"",
      password:"",
      err:false,
      ischose:false
    }
  },
  mounted(){
      this.phone = localStorage.getItem("phone",this.phone);
  },
  methods:{
    submitFn(){
      this.err = false;
      if(!this.phone){
          this.err = true;
          this.errtit = "请输入账号"
          return
      }
      if(!this.password){
          this.err = true;
          this.errtit = "请输入请输入密码"
          return
      }
      //1是客流，2出入出台的日常业务管理系统，10000表示平台运营系统
      this.$api.post("/common_login_api",{
          "user_id":this.phone,
          "passwd":this.password
        },su=>{
          if(this.ischose){
            localStorage.setItem("phone",this.phone)
          }else{
            localStorage.removeItem("phone")
          }
          if(su.code===200){
            let code = su.author_app[0].type;
            sessionStorage.setItem("users",this.phone);
            sessionStorage.setItem("type",code);
            this.$store.state.data = {};
            if(code==1){

            }else if(code==2){
              this.$router.push({path:"/home"})
            }else if(code==10000){

              this.$router.push({path:"/openListindex/openlist"})
            }
          }else{
            this.err = true;
            this.errtit = su.msg
          }
          
        },er=>{
            this.err = true;
            this.errtit = su.msg
        })
    },
    rembFn(){
      if(this.ischose){
        this.ischose = false;
      }else{
        this.ischose = true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.login{
  height: 100vh;
  background:url("../../assets/images/bg-color.png") center no-repeat;
  background-size: cover;
}
.tit-logo{
  margin-top: 76px;
  margin-left: 108px;
}
.content-login{
  width:378px;
  height: 330px;
  background-color: #fff;
  position: absolute;
  top:50%;
  left: 50%;
  margin:-165px 0 0 -189px;
  border-radius: 4px;
  box-shadow: 0 0 13px #000;
  .tit{
    background:url("../../assets/images/login-p.png") center no-repeat;
    background-size: cover;
    width: 221px;
    height: 46px;
    font-size: 22px;
    color: #fff;
    line-height: 46px;
    text-align: center;
    letter-spacing: 3px;
    position: absolute;
    top:-23px;
    left: 79px;
  }
}


.telico{
  background:url("../../assets/images/pson.png") center center no-repeat;
  background-size:14px auto; 
}
.pswico{
  background:url("../../assets/images/pswico.png") center center no-repeat;
  background-size:14px auto; 
}

.el-input--prefix .el-input__inner{
  height:36px;
}
.pswico,.telico{
  display: inline-block;
  width: 20px;
  height:20px;
  position: relative;
  top:8px;
}
.ipt-con{
  margin:55px 52px 42px 52px;
}
.mar-10{
  margin-top: 10px;
}
.sub-class{
  width: 100%;
  border-radius: 6px;
  margin-top: 5px;
}
.tip-p{
  height: 50px;
  line-height: 60px;
}
.tip-span{
  
  font-size: 12px;
  color: #F84C4C;
  i{
    display: inline-block;
    width: 20px;
    height: 20px;
    background:url(../../assets/images/err-icon.png) center no-repeat;
    background-size: cover;
    margin-right: 5px;
    position: relative;
    top:5px;
  }
}
.remb{
  font-size: 14px;
  color:#1A1A1A;
  margin-top: 16px;
  i{
    display: inline-block;
    width: 16px;
    height: 16px;
    background:url(../../assets/images/unchose-l.png) center no-repeat;
    background-size: cover;
    margin-right: 12px;
    position: relative;
    top:2px;
    cursor: pointer;
  }
  i.chose{
    background:url(../../assets/images/chose-l.png) center no-repeat;
    background-size: cover;
  }
  a{
    color: #999999;
    float: right;
    position: relative;
    top:3px;
  }
  a:hover{
    color: #378EEF;
  }
}
</style>
