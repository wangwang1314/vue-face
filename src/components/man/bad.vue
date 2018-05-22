<template>
    <div class="person" >
      <!-- <div class="header">
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
      </div> -->
       <p class="su-tit" v-if="total">共 <span>{{total}}</span> 条数据</p>
       <p class="sur-num">
         <span @click="addman">添加黑名单</span>
         <span @click="delMan">删除黑名单</span>
       </p>
       <p class="chose-num"><i></i>已选择<span> {{selectval.length}} </span>项</p>
          <el-table
            ref="multipleTable"
            :data="realdata"
            tooltip-effect="dark"
            style="width: 100%"
            v-show="total!=0"
            @selection-change="handleSelectionChange"
            @row-click="sliderShow"
            id="pdf"
            align="center"
            >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="头像"
             >
             <template slot-scope="scope">
               <img class="img-size" v-if="scope.row.img" :src="scope.row.img">
             </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
             >
            </el-table-column>
           <!--  <el-table-column
              label="类型"
              >
              <template slot-scope="scope">
                <span v-if="scope.row.face_type==1">VIP</span>
                <span v-else>访客</span>
              </template>
            </el-table-column> -->
             <el-table-column
              label="录入时间"
              prop="build_time"
              show-overflow-tooltip>
            </el-table-column>
            <!--  <el-table-column
              label="出入记录"
              prop="num"
              show-overflow-tooltip>
            </el-table-column> -->
          </el-table>

          <div class="page" v-show="total!=0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page"
              :page-sizes="[20]"
              :page-size="pagesize"
              layout="prev, pager, next,sizes"
              :total="total">
            </el-pagination>
          </div>
          <div style="text-align:center;margin-top:216px;" v-show="total==0&&ajax">
            <img src="../../assets/images/no-num.png">
             <p style="margin-top:44px;color:#999999;font-size:18px;">抱歉！~暂无数据~</p>
          </div>
          <!--侧边栏-->
        <transition name="fade">
            <div class="slider-box" v-if="slider">
              <p class="close-p"><i @click="closeFn">×</i></p>
              <div class="info">
                <img :src="setobj.img">
                <div style="margin-top:30px;">
                  <p class="name">{{setobj.name}}</p>
                  <!-- <img v-if="setobj.face_type!=1" src="../../assets/images/fk.png">
                  <img v-else src="../../assets/images/vip.png"> -->
                  <div>
                    <p>
                      <span>入库时间：</span>
                      {{setobj.build_time}}
                    </p>       
                  </div>
                </div>
              </div>
              <div style="margin-top:58px;position:relative;">
                  <img :src="choseimg" class="show-class" v-show="imgshow" @click="hideFn">
                 <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="出入记录" name="second">
                  <template v-for="item in chosere">
                      <div class="time-div record" v-for="child in item.data">
                        <p>
                          <span>出入时间 ：</span>
                           {{child.timeStamp}}
                        </p>
                        <div>
                          <p>设备地址 ： {{child.device_addres}}</p>
                          <p>场地名称 ： {{child.device_addres}}</p>
                          <p>出入类型 ： <span class="reder" v-if="child.device_id%2==0">出</span><span v-else class="reder">入</span></p>
                          <img v-if="child.device_id%2==0" src="../../assets/images/out.png">
                          <img v-else src="../../assets/images/to.png">
                          <p class="img-cla">抓拍实图 ：<img :src="setobj.img" @click="choseFn(setobj.img)"></p>
                        </div>
                      </div>
                  </template>
                    
                   <!--  <div class="time-div record">
                      <p>
                        <span>出入时间 ：</span>
                         2018-03-10
                      </p>
                      <div>
                        <p>设备地址 ： B口</p>
                        <p>场地名称 ： 足球场</p>
                        <p>出入类型 ： <span class="reder">入</span></p>
                        <img src="../../assets/images/to.png">
                      </div>
                    </div> -->
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
         </transition>

       <!--  添加黑名单 -->
       <div class="box">
          <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          width="720px">
          <div class="content-up">
           <!--  <div class="img-box">
              <img :src="img" v-if="img">
              <img src="../../assets/images/icon-tou.png" v-else :class="{'uncheck':check.img}">
            </div> -->
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :auto-upload="false"
              :show-file-list="false"
              >
             <!--  <el-button size="small" type="primary" class="tit-tou">{{btntext}}</el-button> -->
              <div class="img-box">
                <img :src="img" v-if="img">
                <img src="../../assets/images/icon-tou.png" v-else :class="{'uncheck':check.img}">
              </div>
            </el-upload>
          <!--   <p class="tit-tou">上传头像</p> -->
            <p class="name-ipt">
              <span><i class="red">*</i>姓名</span>
              <input type="text" name="" maxlength="20" placeholder="请输入姓名，20字以内，必须填" :class="{'uncheck':check.input}" v-model="name" style="margin-bottom:60px;">
            </p>
          </div>
          <span slot="footer" class="dialog-footer">
            <span class="warn-box" v-show="err"><i></i>{{errtit}}</span>
            <el-button type="primary" @click="addConfirm">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button> 
          </span>
        </el-dialog>
      </div>



      <!--删除人员-->
      <el-dialog
        :visible.sync="deldialog"
        width="460px">
        <span slot="title" class="del-tit">删除黑名单</span>
        <div>确定删除选择的黑名单数据吗？</div>
        <span slot="footer" class="dialog-footer">
          <span class="del-box" >已选择<i>{{selectval.length}}</i>条黑名单数据</span>
          <el-button type="primary" @click="delFn">确 定</el-button>
          <el-button @click="deldialog = false">取 消</el-button> 
        </span>
      </el-dialog>

       
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
      searchimg:"",
      title:"添加黑名单",
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
      selectval:[],
      data:[],
      total:0,
      deldialog:false,
      page:1,
      pagesize:20,
      realdata:[],
      setobj:{},
      activeName:"second",
      chosere:[{data:[1]}],
      choseimg:"",
      imgshow:false,
      ajax:false
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
      console.log(22)
    },
    addman(){
      this.check.img = false;
      this.check.input = false;
      this.name = "";
     // this.title = "新增人员";
      // this.btntext = "上传头像";
      this.img = "";
      this.err = false;
      this.dialogVisible = true;
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
    addConfirm(){
      this.err = false;
      this.check.img = false;
      this.check.input = false;
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
       let img = this.img.split(",")[1];
      this.$api.post("/client_mng_add_back_list_api",
        {
          company_id:this.id,
          face_user_name:this.name,
          face_image_type:this.imgtype,
          face_image_data:img
        },
        su=>{
          if(su.code==200){
            this.dialogVisible = false;
            this.$message({
              message: "操作成功",
              type: 'success'
            });
            this.getList();
          }else{
            this.$message({
              message: su.msg,
              type: 'warning'
            });
          }
        },
        err=>{
          this.$message.error(err.msg);
      })
    },
    getList(){
      this.$api.post("/client_mng_query_back_list_api",{
          company_id:this.id
        },
        su=>{
          if(su.code==200){
            
            if(su.num>0){
              let that = this;
              su.data.forEach(function(val,index){
                  val.img = "";
                  val.name = "";
                  that.getImg(val,index);
                  //that.getrecord(val,index);
              })
            }
            this.data = su.data;
            this.total = su.num;
             if(su.num==0){
              this.ajax = true;
              this.realdata = [];
            }
            this.dataFn();
          }
        },
        err=>{

      })
    },
    dataFn(){
      let start = (this.page-1)*this.pagesize;
      let end = this.page*this.pagesize;
      this.realdata = this.data.slice(start,end);
    },
    getrecord(val,index){
       this.$api.post("/client_query_face_id_record_api",{
          company_id:this.id,
          face_id:val.face_id,
          place_id:0,
          fromTimeStamp:"2018-1-1 00:00:00",
          toTimeStamp:"2100-1-2 00:00:00"
        },
        su=>{
          if(su.code==200){
            //data:image/jpeg;base64,
            // this.data[index].img = "data:image/"+su.face_image_type+";base64,"+su.face_image_data;
            // this.data[index].name = su.face_user_name;
            let num=0;
            su.total_data.forEach((val,index)=>{
              val.data.forEach(()=>{
                num++;
              })
            })
            this.data[index].num = (num>0)?num:"";
          }
        },
        err=>{

      })
    },
    getImg(val,index){
        this.$api.post("/client_get_face_image_api",{
          company_id:this.id,
          face_id:val.face_id
        },
        su=>{
          if(su.code==200){
            //data:image/jpeg;base64,
            this.data[index].img = "data:image/"+su.face_image_type+";base64,"+su.face_image_data;
            this.data[index].name = su.face_user_name;
          }
        },
        err=>{

      })
    },
    handleSelectionChange(val){
      this.selectval = val;
    },
    sliderShow(val){
      return;
      if(val.num>0){
        this.editdialog = true;
        this.setobj = val;
        this.$api.post("/client_query_face_id_record_api",{
          company_id:this.id,
          face_id:val.face_id,
          place_id:0,
          fromTimeStamp:"2018-1-1 00:00:00",
          toTimeStamp:"2100-1-1 00:00:00"
        },
        su=>{
          if(su.code==200){
            //data:image/jpeg;base64,
            this.chosere = su.total_data;
          }
        },
        err=>{

        })
      }
    },
    delMan(){
      if(this.selectval.length<=0){
        this.$alert('请至少选择1条黑名单数据进行操作！', '删除黑名单', {
          confirmButtonText: '知道了',
          callback: action => {
            
          }
        });
      }else{
        this.deldialog = true;
      }
    },
    delFn(){
      let arr = [];
      for(let value of this.selectval){
        arr.push(value.face_id)
      }
      let num = arr.length;
      //console.log(22222)
      for(let i=0;i<arr.length;i++){
        this.$api.post("/client_mng_del_back_list_api",{
          company_id:this.id,
          face_id:arr[i]
        },su=>{
          if(su.code==200){
            if((i+1)==num){
              this.$message({
                  message: "操作成功",
                  type: 'success'
              });
              this.getList();
              this.deldialog = false;
            }
          }else{
             if((i+1)==num){
                this.$message({
                    message: su.msg,
                    type: 'warning'
                });
              }

          }
        },err=>{
          if((i+1)==num){
            this.$message({
                message: su.msg,
                type: 'warning'
            });
          }
        })
      }
      
    },
    closeFn(){
       this.slider = false;
    },
    choseFn(val){
      if(!this.imgshow){
        this.imgshow = true; 
      }else{
        this.imgshow = false; 
      }
       
       this.choseimg = val;
    },
    hideFn(){
      this.imgshow = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.person{
    min-width: 950px;
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
    margin:8px 0 15px 0;
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
      cursor: pointer;
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
    margin-top: 50px;
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
    margin-bottom: 12px;
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
      >p.img-cla{
        height: 68px;
        line-height: 68px;
        img{
          height: 50px;
          width: 50px;
          border-radius: 4px;
          position: relative;
          top:20px;
          cursor: pointer;
        }
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
    cursor: pointer;
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
.img-size{
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.del-tit{
  font-size:18px; 
  color:rgba(77,77,77,1);                          
}
.del-box{
  float: left;
  font-size: 14px;
  color: #999999;
  position: relative;
  top:6px;
  i{
    color: #378EEF;
    margin: 0 3px;
  }
}
.select-p{
  color: #4D4D4D;
  font-size: 14px;
}
.select-div{
  width:678px;
  height:104px;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px 16px;
  box-sizing:border-box;
  .el-tag{
    margin:0 12px 12px 0;
  } 
}
</style>








<style>
.el-table{
  border-right: 1px solid #E6E6E6;
  border-left: 1px solid #E6E6E6;
}
.text-center{
  text-align: center;
 }
.el-table th{
  height:60px;
  background-color:#EAEAEA;
  color:#1A1A1A;
  text-align: center;
  font-size:14px;
 }
 .person .el-table td{
  font-size:12px;
  color:#1A1A1A;
  height: 102px;
 }

 .err{
  color:#F84C4C;
  font-size: 12px;
 }
  .err i{margin:0 11px 0 16px;}

  .ip-err{
    border:1px solid #F84C4C !important;
  }
  .add-user .el-dialog__body{
    padding:0 20px 0 36px;
  }
  .add-user .el-dialog__footer{
    padding:20px 26px;
    border-top:1px solid #CCCCCC;
    margin-top:25px;
  }
    .add-user .el-button{
      width: 78px;
      height:32px;
    }

    .add-err{
      margin-top:10px;
    }
    .bd-red{
      border:1px solid #F84C4C !important;
    }
    .el-table__body{
      text-align: center;
    }
    .show-class{
      z-index: 10;
      width: 260px;
      height: 260px;
      position: fixed;
      top:50%;
      left: 50%;
      margin:-130px 0 0 -130px;
    }
</style>