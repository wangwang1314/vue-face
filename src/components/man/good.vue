<template>
    <div class="person" >
      <div class="header">
        <span>头像</span>
          <el-upload
                class="upload-style"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="searchChange"
                :auto-upload="false"
                :show-file-list="false"
                >
                <button  class="sur-selct btn-upload">请上传图片搜头像<i></i></button>
          </el-upload>
         <span>姓名</span>
         <input type="text" name="" placeholder="请输入姓名搜索">
      </div>
       <p class="su-tit">共 <span>992</span> 条数据</p>
       <p class="sur-num">
         <span @click="addman">添加白名单</span>
         <span>删除白名单</span>
       </p>
       <p class="chose-num"><i></i>已选择<span>13</span>项</p>
       <table class="sort-tab">
             <thead>
               <tr>
                 <td><i class="not-all"></i></td>
                 <td>头像</td>
                 <td>出入人姓名</td>
                 <td>类型</td>
                 <td>入库时间</td>
                 <td>更新时间</td>
               </tr>
             </thead>
             <tbody>
               <tr @click="show">
                 <td><i></i></td>
                 <td><img src="../../assets/images/sur-bg1.png"></td>
                 <td>于文文1号</td>
                 <td>2018-03-11 22:00:00</td>
                 <td>于文文1号</td>
                 <td>
                   2018-03-11 22:00:00
                 </td>
               </tr>
               <tr @click="show">
                 <td><i class="chose"></i></td>
                 <td><img src="../../assets/images/sur-bg1.png"></td>
                 <td>于文文1号</td>
                 <td>2018-03-11 22:00:00</td>
                 <td>于文文1号</td>
                 <td>
                   2018-03-11 22:00:00
                 </td>
               </tr>
             </tbody>
           </table>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="prev, pager, next,sizes "
              :total="1000">
            </el-pagination>
          </div>
          <transition name="fade">
            <div class="slider-box" v-if="slider">
              <p class="close-p"><i @click="closeFn">×</i></p>
            </div>
        </transition>

       <!--  添加白名单 -->
       <div class="box">
          <el-dialog
          title="添加白名单"
          :visible.sync="dialogVisible"
          width="720px">
          <div class="content-up">
            <div class="img-box">
              <img src="../../assets/images/icon-tou.png">
              <div><img src="../../assets/images/camera.png"></div>
            </div>
            <p class="tit-tou"><i class="red">*</i>上传头像</p>
            <p class="name-ipt">
              <span><i class="red">*</i>姓名</span>
              <input type="text" name="" placeholder="请输入姓名，20字以内，必须填">
            </p>
          </div>
          <span slot="footer" class="dialog-footer">
            <span class="warn-box"><i></i>旧密码不正确</span>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button> 
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      value4:"",
      slider:false,
      page:0,
      dialogVisible:false,
    }
  },
  mounted(){
    
  },
  methods:{
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    show(){
      console.log(22)
    },
    addman(){
      this.dialogVisible = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.person{
    background-color: #fff;
    margin:19px;
    min-height: 700px;
    padding: 30px 32px 50px 30px;
    .header{
      background:rgba(234,234,234,1);
      height: 80px;
      line-height: 80px;
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(77,77,77,1);
      padding-left: 31px;
      input{
         height: 36px;
        width: 390px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 0;
        text-indent: 10px;
        color: #4D4D4D;
      }
    }
}
.sur-selct{
    height: 36px;
    width: 390px;
    margin-right: 59px;
  }
  .su-tit{
    font-size: 12px;
    color: #808080;
    margin:43px 0 15px 0;
    span{
      color: #378EEF;
    }
  }
  .sur-num{
    height: 56px;
    line-height: 56px;
    background:rgba(213,226,245,1);
    span{
      display: inline-block;
      width:116px;
      height:36px; 
      background:rgba(255,255,255,1);
      border-radius: 2px;
      text-align: center;
      line-height: 36px;
      font-size:14px;
      color:rgba(77,77,77,1);
      margin-left: 14px;

    }
  }

  .sort-tab{
    width: 100%;
    font-size: 12px;
    color: #4d4d4d;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #E6E6E6;
    margin-top: 18px;
    margin-bottom: 70px;
    i{
      display: inline-block;
      height: 16px;
      width: 16px;
      background: url(../../assets/images/unchose-l.png);
    }
    i.not-all{
      background: url(../../assets/images/not-all.png);
    }
    i.chose{
      background: url(../../assets/images/chose-l.png);
    }
    thead{
      tr{
         height:60px; 
          background:rgba(234,234,234,1);
          line-height: 60px;
          font-size: 14px;
          color:#1A1A1A;
      } 
    }
    tbody{
      tr{
        height: 100px;
        line-height: 100px;
        border-bottom: 1px solid #E6E6E6;
        img{
          width: 55px;
          height: 55px;
          border-radius: 50%;
          position: relative;
          top:20px;
        }
      }
      tr:hover{
        background:rgba(230,242,252,1);
      }
    }
  }
  .page{
    text-align: center;
  }
  .chose-num{
    height:34px; 
    background:rgba(206,223,246,0.3);
    border-radius: 2px;
    color: #000;
    font-size: 12px;
    line-height: 34px;
    text-indent: 8px;
     margin-top: 20px;
    i{
      display:inline-block;
      height: 18px;
      width: 18px;
      background: url(../../assets/images/th.png);
      position: relative;
      top:3px;
      margin-right: 9px;
    }
    span{
      color: #FEAD56;
    } 
  }

  .slider-box{
    width: 944px;
    height: 1056px;
    position: absolute;
    top:0;
    right: 0;
    background: #fff;
    z-index: 10;
    border: 1px solid #ccc;
    padding:40px 40px 40px 71px;
    box-sizing: border-box;
  }
  .close-p{
    text-align: right;
  }
  .close-p i{
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    text-align: center;
    line-height: 18px;
    font-size: 24px;
  }
  .fade-enter-active {
      transition: all .5s ease;
  }
  .fade-leave-active {
      transition: all .6s ease;
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(944px);
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
.box .el-dialog__footer{
  box-shadow: 0 0 4px #ccc;
}
.content-up{
  text-align: center;
   .img-box:hover{
      >div{
        display: block;
      }
    }
  .img-box{
    display: inline-block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    font-size:16px;
    color:rgba(77,77,77,1);
    position: relative;

    >div{
      width: 120px;
      height: 120px;
      position: absolute;
      background:rgba(0,0,0,1);
      opacity:0.55;
      display: none;
      top:0;
      border-radius: 50%;
      line-height: 140px;
      img{
        width: 46px;
        height: 40px;
      }
    }
    >img{
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
  }
  .tit-tou{
    color: RGBA(77, 77, 77, 1);
    font-size: 16px;
  }
  .name-ipt{
    font-size:14px;
    color:rgba(153,153,153,1);
    margin-top: 26px;
    span{
      margin-right: 10px;
    }
    input{
      width:372px;
      height:34px; 
      background:rgba(255,255,255,1);
      border-radius: 4px;
      border:1px solid RGBA(204, 204, 204, 1); 
      text-indent: 10px;
    }
  }
}
.red{
  color: RGBA(229, 56, 56, 1);
  margin-right: 3px;
}

.upload-style{
  display: inline-block;
}
.btn-upload{
  border: 1px solid #ccc;
  background: #fff;
  color: #4D4D4D;
  text-indent: 16px;
  text-align: left;
  cursor: pointer;
  i{
    display:inline-block;
    content: "";
    width: 14px;
    height: 11px;
    background: url(../../assets/images/camera-icon.png);
    float: right;
    margin-right: 15px;
    position: relative;
    top:3px;
  }
}
</style>