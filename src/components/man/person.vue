<template>
    <div class="person" >
      <div class="header">
        <span>头像</span>
        <!--  <el-select v-model="value4" clearable placeholder="请选择" class="sur-selct">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
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
         <span @click="addFn">新增人员</span>
         <span>批量导入照片</span>
         <span>删除人员</span>
         <span>设置权限</span>
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
            
               <tr @click="show" v-for="item in data">
                 <td><i :class="chose"></i></td>
                 <td><img src="../../assets/images/sur-bg1.png"></td>
                 <td>{{item.name}}</td>
                 <td>
                   <span v-if="item.face_type==1">VIP</span>
                   <span v-else>访客</span>
                 </td>
                 <td>{{item.build_time}}</td>
                 <td>
                   
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
              <div class="info">
                <img src="../../assets/images/sur-bg1.png">
                <div>
                  <p class="name">鹿晗</p>
                  <img src="../../assets/images/fk.png">
                  <div>
                    <p>
                      <span>入库时间：</span>
                      2018-03-21 08：00：00
                    </p>
                    <p>
                      <span>更新时间：</span>
                      2018-03-21 08：00：00
                    </p>
                    <button>编辑</button>
                  </div>
                </div>
              </div>
              <div>
                 <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="线路轨迹" name="first">
                    <div class="time-div">
                      <p>
                        <span>出入时间 ：</span>
                         2018-03-10
                      </p>
                      <div>
                        <span>线路轨迹 :</span>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="出入记录" name="second">
                    <div class="time-div record">
                      <p>
                        <span>出入时间 ：</span>
                         2018-03-10
                      </p>
                      <div>
                        <p>设备地址 ： B口</p>
                        <p>场地名称 ： 足球场</p>
                        <p>出入类型 ： <span class="red">出</span></p>
                        <img src="../../assets/images/out.png">
                      </div>
                    </div>
                    <div class="time-div record">
                      <p>
                        <span>出入时间 ：</span>
                         2018-03-10
                      </p>
                      <div>
                        <p>设备地址 ： B口</p>
                        <p>场地名称 ： 足球场</p>
                        <p>出入类型 ： <span class="red">入</span></p>
                        <img src="../../assets/images/to.png">
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="出入权限" name="third">
                    <div class="edit-class">权限1
                      <button>删除</button>
                      <button class="color">编辑</button>             
                    </div>
                    <div class="rep-class">
                        <p class="per-p">
                          <i></i>
                          <span>出入时间段</span> 
                          <el-date-picker
                            v-model="value3"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                          </el-date-picker>
                        </p>
                        <p class="per-p">
                          <i></i>
                          <span>入口权限</span> 
                        </p>
                        <div class="con-box">
                          <p><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></p>
                          <div style="margin-left:15px;">
                            <p><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">场地名称1</el-checkbox></p>
                            <div class="check-box">
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                            </div>
                            <p><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">场地名称2</el-checkbox></p>
                            <div class="check-box">
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                            </div>
                          </div>
                        </div>
                        <p class="per-p">
                          <i></i>
                          <span>出口权限</span> 
                        </p> 
                         <div class="con-box">
                          <p><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></p>
                          <div style="margin-left:15px;">
                            <p><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">场地名称1</el-checkbox></p>
                            <div class="check-box">
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                            </div>
                            <p><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">场地名称2</el-checkbox></p>
                            <div class="check-box">
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                              <p><el-checkbox  v-model="checkAll" @change="handleCheckAllChange">设备管理</el-checkbox></p>
                            </div>
                          </div>
                        </div> 
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
         </transition>

       <!--  添加白名单 -->
       <div class="box">
          <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          width="720px">
          <div class="content-up">
            <div class="img-box">
              <img :src="img" v-if="img">
              <img src="../../assets/images/icon-tou.png" v-else :class="{'uncheck':check.img}">
            </div>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :auto-upload="false"
              :show-file-list="false"
              >
              <el-button size="small" type="primary" class="tit-tou">{{btntext}}</el-button>
            </el-upload>
          <!--   <p class="tit-tou">上传头像</p> -->
            <p class="name-ipt">
              <span><i class="red">*</i>姓名</span>
              <input type="text" name="" placeholder="请输入姓名，20字以内，必须填" :class="{'uncheck':check.input}" v-model="name">
            </p>
            <p class="name-ipt">
              <span><i class="red"></i>类型</span>
              <el-radio v-model="type" label="1">VIP</el-radio>
              <el-radio v-model="type" label="2">访客</el-radio>
            </p>
          </div>
          <span slot="footer" class="dialog-footer">
            <span class="warn-box" v-show="err"><i></i>{{errtit}}</span>
            <el-button type="primary" @click="addConfirm">确 定</el-button>
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
      activeName:"first",
      value3:"",
      isIndeterminate:true,
      checkAll:false,
      dialogVisible:false,
      type:'1',
      title:"新增人员",
      img:"",
      btntext:"上传头像",
      searchimg:"",
      check:{
        img:false,
        input:false
      },
      err:false,
      errtit:"",
      name:"",
      imgtype:"",
      id:"",
      choseArr:[],
      data:[]
    }
  },
  mounted(){
      this.id = Number(sessionStorage.getItem("users"));
      this.getList();
  },
  methods:{
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    show(){
      this.slider = true;
    },
    closeFn(){
       this.slider = false;
    },
    handleClick(){

    },
    addFn(){
      this.check.img = false;
      this.check.input = false;
      this.name = "";
      this.type = "1";
      this.title = "新增人员";
      this.btntext = "上传头像";
      this.img = "";
      this.err = false;

      this.dialogVisible = true;
    },
    handleChange(file,fileList){
      if(file.name.indexOf(".")!=-1){
        let arr = file.name.split(".");
        this.imgtype = arr[arr.length-1];
      }
      //创建blob对象
      let blob = new Blob([file.raw],{type:file.raw.type});
      //this.imgtype = 
      let that = this;
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function (e) {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值      
          that.img = reader.result;
          that.btntext = "重新上传";
      };
    },
    handleCheckAllChange(){

    },
    searchChange(file){
      let blob = new Blob([file.raw],{type:file.raw.type});
      let that = this;
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function (e) {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值      
          that.searchimg = reader.result;
      };
    },
    getList(){
      this.$api.post("/client_mng_query_face_api",{
          company_id:this.id
        },
        su=>{
          if(su.code==200){
            this.data = su.data;
          }
        },
        err=>{

      })
    },
    addConfirm(){
      if(!this.img){
        this.err = true;
        this.errtit = "请上传头像";
        this.check.img = true;
        return
      }
      if(!this.name){
        this.err = true;
        this.errtit = "请填写姓名";
        this.check.input = true;
        return
      }
      this.$api.post("/client_mng_add_face_api",
        {
          company_id:Number(this.id),
          face_type:Number(this.type),
          face_user_name:this.name,
          face_image_type:this.imgtype,
          face_image_data:this.img
        },
        su=>{
          if(su.code==200){
            this.dialogVisible = false;
            this.$message({
              message: su.msg,
              type: 'success'
            });
          }else{
            this.$message({
              message: su.msg,
              type: 'warning'
            });
          }
        },
        err=>{

      })
    }
  }
}
</script>

<style lang='scss' scoped>
.person{
    min-width: 1027px;
    background-color: #fff;
    margin:19px;
    min-height: 700px;
    padding: 30px 32px 50px 30px;
    position: relative;
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
    width: 922px;
    min-height: 1037px;
    position: absolute;
    top:0;
    right: 0;
    background: #fff;
    z-index: 10;
    border: 1px solid #ccc;
    padding:33px 33px 33px 71px;
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
  .info{
    >img{
      width: 170px;
      height: 170px;
      border-radius: 50%;
    }
    >div{
      display: inline-block;
      vertical-align: top;
      margin-left: 31px;
      .name{
        margin-top: 27px;
        font-size:24px;
        color:rgba(26,26,26,1);
      }
      >img{
        width: 59px;
        height: 26px;
        margin-top: 16px;
      }
      >div{
        margin-top: 29px;
        width: 388px;
        p{
          color: #4D4D4D;
          font-size: 14px;
          line-height: 22px;
          span{
            color: #999999;
          }
        }
        button{
          width: 106px;
          height: 36px;
          background:#378EEF;
          border: none;
          outline: none;
          cursor: pointer;
          border-radius: 2px;
          color: #fff;
          float: right;
         position: relative;
         top:-36px;
        }
      }
    }
  }
  .time-div{
    margin-top: 25px;
    border: 1px solid #ccc;
    >p{
      height:39px; 
      background:rgba(237,237,237,1);
      color: #4D4D4D;
      text-indent: 29px;
      line-height: 39px;
    }
    >div{
      line-height: 116px;
      >span{
        padding-left: 29px;
      }
    }
  }
  .record{
    >div{
      padding: 5px;
      >img{
        float: right;
        position: relative;
        top:-82px;
        right: 34px;
      }
      >p{
        line-height: 34px;
        text-indent: 29px;
        .red{
          color: #F84C4C;
        }
        .green{
          color: #98C56B;
        }
      }
    }
  }
  .edit-class{
    height:60px; 
    background:rgba(241,243,244,1);
    border-radius: 2px;
    line-height: 60px;
    text-indent: 22px;
    margin-top: 12px;
    color: #000;
    button{
      width:106px;
      height:36px; 
      background:rgba(255,255,255,1);
      border-radius: 2px;
      color: #4D4D4D;
      float: right;
      position: relative;
      top:12px;
      border: 1px solid #ccc;
      margin-right: 12px;
      cursor: pointer;
    }
    button.color{
      border: 1px solid #378EEF;
      color: #fff;
      background: #378EEF;
    } 
  }
  .rep-class{
    padding-left: 23px;
  }
  .per-p{
    font-size:16px;
    font-weight: bold;
    color:rgba(26,26,26,1);
    line-height: 40px;
    margin-top: 18px;
    >i{
      display: inline-block;
      width:4px;
      height:16px; 
      background:rgba(55,142,239,1);
      margin-right: 12px;
    }
    >span{
      margin-right: 18px;
    }
  }
  .con-box{
    margin-left: 15px;
    p{
      margin-top: 20px;
    }
  }
  .check-box{
    width:600px;
    height:160px; 
    border-radius: 4px;
    border: 1px solid #CCCCCC;
    overflow: auto;
    margin:17px 0 5px 15px;
    line-height: 43px;
    padding: 0 29px;
    box-sizing: border-box;
    >p{
      display: inline-block;
      margin-right: 54px;
    }
    >p:nth-child(4n){
      margin-right: 0;
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
    >img{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 2px solid transparent;
    }
    >img.uncheck{
      border: 2px solid #F84C4C;
    }
  }
  .tit-tou{
    color: RGBA(77, 77, 77, 1);
    font-size: 16px;
    background: #fff;
    border: none;
  }
  .name-ipt{
    font-size:14px;
    color:rgba(153,153,153,1);
    margin-top: 26px;
    text-align: left;
    span{
      margin-right: 10px;
      margin: 0 10px 0 140px;
    }
    input{
      width:372px;
      height:34px; 
      background:rgba(255,255,255,1);
      border-radius: 4px;
      border:1px solid RGBA(204, 204, 204, 1); 
      text-indent: 10px;
    }
    input.uncheck{
      border:1px solid #F84C4C; 
    }
  }
}
.red{
  color: RGBA(229, 56, 56, 1);
  margin-right: 3px;
  display: inline-block;
  width: 12px;
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