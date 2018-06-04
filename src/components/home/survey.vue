<template>
  <div class="sur">
    <div class="left">
      <p class="sur-tit">常用入口</p>
      <ul class="sur-ul">
        <li @click="go('/acc/accsurvey')">
          <p>出入管理</p>
          <p>出入概况</p>
        </li>
        <li @click="go('/acc/accrecord')">
          <p>出入管理</p>
          <p>出入记录</p>
        </li>
        <li @click="go('/man/person')">
          <p>人员管理</p>
          <p>普通人员列表</p>
        </li>
         <li @click="go('/man/good')">
          <p>人员管理</p>
          <p>白名单列表</p>
        </li>
        <li @click="go('/man/bad')">
          <p>权限管理</p>
          <p>黑名单列表</p>
        </li>
      </ul>
      <div class="sur-new">
        <div>
          <p class="tit">产品最新动态</p>
          <p class="info"></p>
          <p class="con" >尊敬的用户，您好<br>欢迎使用人脸识别出入平台产品！</p>
        </div>
        <div>
          <p class="tit">使用帮助中心</p>
        </div>
      </div>
    </div>
    <div class="right">
      <p class="com">{{data.user_name}}</p>
      <p class="info">企业信息</p>
      <div class="con-info">
        <p>
          <span>企&ensp;业&ensp;ID：</span>{{id}}
        </p>
        <p>
          <span>公司名称：</span>{{data.user_name}}
        </p>
        <p>
          <span>公司电话：</span>{{data.tel}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      id:sessionStorage.getItem("users")
    }
  },
  mounted(){
     // this.getInfo();
  },
  methods:{
    go(val){
      this.$router.push({path:val})
    }
  },
  computed:{
    ...mapState({   
      data:"data"
    })
  }
}
</script>
<style lang='scss' scoped>
  .sur{
      margin:19px;
      padding-left: 32px;
      background-color: #fff;
      display: flex;
      min-width: 800px;
      flex: 1;
      align-self:stretch;
    
      .left{
        flex: 3;
        border-right:1px solid #ccc;
        align-self:stretch;
      }
      .right{
        min-width: 300px;
        flex: 1;
        align-self:stretch;
        .com{
          font-size:20px;
          font-weight: bold;
          color:rgba(55,142,239,1);
          text-align: center;
          margin-top: 68px;
          margin-bottom: 49px;
        }
        .info{
          font-size:16px;
          font-weight: bold;
          color:rgba(26,26,26,1);
          text-indent: 32px;
          margin-bottom: 12px;
        }
        .con-info{
          font-size:14px;
          color:rgba(74,74,74,1);
          line-height:24px;
          padding-left: 51px;
          span{
            margin-right: 27px;
          }
        }
      }
  }
  .sur-tit{
    font-size:18px;
    font-weight: bold;
    color:rgba(77,77,77,1);
    margin-top: 35px;
    margin-bottom: 38px;
  }
  .sur-ul{
    overflow: hidden;
    margin-bottom: 129px;
    li{
      width: 276px;
      height: 146px;
      float: left;
      margin:0 18px 32px 0;
      cursor: pointer;
      p:first-child{
        font-size:16px;
        font-weight: bold;
        color:rgba(255,255,255,1);
        margin-top: 20px;
        text-indent: 22px;
      }
      p:last-child{
        font-size:22px;
        font-weight: bold;
        color:rgba(255,255,255,1);
        margin-top: 26px;
        text-indent: 130px;
      }
    }
    li:first-child{
      background: url(../../assets/images/sur-bg1.png) center no-repeat;
      background-size: cover;
    }
     li:nth-child(2){
      background: url(../../assets/images/sur-bg2.png) center no-repeat;
      background-size: cover;
    }
     li:nth-child(3){
      background: url(../../assets/images/sur-bg3.png) center no-repeat;
      background-size: cover;
    }
     li:nth-child(4){
      background: url(../../assets/images/sur-bg4.png) center no-repeat;
      background-size: cover;
    }
     li:nth-child(5){
      background: url(../../assets/images/sur-bg5.png) center no-repeat;
      background-size: cover;
    }
   
  }
  .sur-new{
    margin-right: 36px;
    margin-bottom: 50px;
    overflow: hidden;
    div{
      width: 48%;
      height: 292px;
      float: left;
      border-radius: 6px ;
      border:1px solid #ccc;
      box-sizing: border-box;
      .tit{
        height:60px; 
        background:rgba(238,238,238,1);
        font-size:16px;
        font-weight: bold;
        color:rgba(26,26,26,1);
        line-height:60px;
        text-indent: 22px;
        border-radius: 6px 6px 0 0;
      }
      .info{
        font-size: 16px;
        color: #1A1A1A;
        margin-top: 28px;
        padding-left: 36px;
        margin-bottom: 10px;
      }
      .con{
        padding-left: 36px;
        font-size: 14px;
        line-height: 24px;
        color: #4d4d4d;
      }     
    }
    div:first-child{
      margin-right: 2%;
    }
    div:last-child{
      float: right;
    }

  }
</style>