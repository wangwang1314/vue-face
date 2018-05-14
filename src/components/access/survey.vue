<template>
  <div class="sur">

    <div class="header">
      <span class="time">拍摄时间</span>
       <div class="pick-block">
        <el-date-picker
          v-model="value3"
          @change="logTimeChange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <div class="tit">共<span>{{total_num}}</span>人</div>
    <ul class="list">
      <li v-for="(item,ind) in showDate" v-cloak @click="sliderShow(item,$event)">
        <img v-if="item.face_image_data" :src="'data:image/'+item.face_image_type+';base64,'+item.face_image_data">
        <div v-else style="width:150px;height:150px;"></div>
        <p class="name">{{item.face_user_name}}</p>
        <p>{{item.timeStamp}}</p>
        <div class="hover-class">
          <p class="first-p">
            <span>拍摄时间：</span>{{item.timeStamp}}
          </p>
          <p>
            <span>摄像头ID：</span>{{item.device_id}}
          </p>
           <p>
            <span>拍摄地点：</span>{{item.device_address}}
          </p>
           <p>
            <span>场地名称：</span>{{item.place_address}}
          </p>
        </div>
      </li>
      
    </ul>
    <div class="no-num" v-show="nomun">
      <img src="../../assets/images/no-num.png">
      <p>抱歉！~暂无数据~</p>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[20, 50, 100]"
        :page-size="100"
        layout="prev, pager, next,sizes "
        :total="showDate.length">
      </el-pagination>
    </div>
    <!--侧边栏-->
    <transition name="fade">
            <div class="slider-box" v-if="slider" @click.stop="">
              <p class="close-p"><i @click="closeFn">×</i></p>
              <div class="info">
                <img :src="'data:image/'+';base64,'+setobj.face_image_data">
                <div>
                  <p class="name">{{setobj.face_user_name}}</p>
                  <img v-if="setobj.face_type!=1" src="../../assets/images/fk.png">
                  <img v-else src="../../assets/images/vip.png">
                  <div>
                    <p>
                      <span>入库时间：</span>
                      {{setobj.timeStamp}}
                    </p>
                    <p>
                      <span>更新时间：</span>
                      {{setobj.timeStamp}}
                    </p>
                    <button @click="editman">编辑</button>
                  </div>
                </div>
              </div>
              <div>
                 <el-tabs v-model="activeName" >
                  <el-tab-pane label="线路轨迹" name="first">
                    <template v-for="item in totaldata">
                      <div class="time-div over-auto">
                        <p>
                          <span>出入时间 ：</span>
                           <span v-for="(child,index) in item.data" v-show="index==0">{{child.timeStamp.split(" ")[0]}}</span>
                        </p>
                        <div style="overflow:auto">
                          <span>线路轨迹 :</span>
                          <template v-for="(child,index) in item.data">
                            <div class="line-class">
                              <div class="ad-box">
                                <p class="in-out" v-if="child.device_id%2!=0">入</p>
                                <p class="in-out" v-else>出</p>
                                <p class="address">{{child.device_address}}</p>
                                <p class="time">{{child.timeStamp.split(" ")[1]}}</p>
                              </div>
                              <img src="../../assets/images/jtou.png" v-if="index!=(item.length-1)"> 
                            </div>
                          </template>
                        </div>
                      </div>
                    </template>
                    
                  </el-tab-pane>
                  <el-tab-pane label="出入记录" name="second">
                    <template v-for="item in totaldata">
                      <div class="time-div record" v-for="(child,index) in item.data">
                        <p>
                          <span>出入时间 ：</span>
                           {{child.timeStamp}}
                        </p>
                        <div>
                          <p>设备地址 ： {{child.device_address}}</p>
                         <!--  <p>场地名称 ： 足球场</p> -->
                          <p>出入类型 ： <span class="reder" v-if="child.device_id%2!=0">出</span><span class="reder" v-else>入</span></p>
                          <img src="../../assets/images/out.png" v-if="child.device_id%2!=0">
                          <img src="../../assets/images/to.png" v-else>
                        </div>
                      </div>
                    </template>  
                  </el-tab-pane>
                  <el-tab-pane label="出入权限" name="third">
                  <div style="overflow:auto;height:700px;">
                    <template v-for="(item,index) in rightcontent">
                    <div class="edit-class">权限{{index+1}}
                      <button @click="delright(item)">删除</button>     
                    </div>
                    <div class="rep-class">
                        <p class="per-p">
                          <i></i>
                          <span>出入时间段</span> 
                          {{item.data[0].fromTimeStamp}} 至 {{item.data[0].toTimeStamp}}
                        </p>
                        <p class="per-p">
                          <i></i>
                          <span>入口权限</span> 
                        </p>
                        <div class="con-box">
                          <div style="margin-left:15px;" v-for="child in placelistin">
                            <p>{{child.place_address}}</p>
                            <div class="check-box select-box">

                              <p v-for="children in child.data" :class="{'chose':item.data[0].code.indexOf(children.placestring)!=-1}"><i></i><span>{{children.device_address}}</span></p>
                            </div>                   
                          </div>
                        </div>
                        <p class="per-p">
                          <i></i>
                          <span>出口权限</span> 
                        </p> 
                         <div class="con-box">
                          <div style="margin-left:15px;" v-for="child in placelistout">
                            <p>{{child.place_address}}</p>
                            <div class="check-box select-box">
                                 <p v-for="children in child.data" :class="{'chose':item.data[0].code.indexOf(children.placestring)!=-1}"><i></i><span>{{children.device_address}}</span></p>
                            </div>
    
                          </div>
                        </div> 
                    </div>
                    </template>
                  </div> 
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
         </transition>

           <!--  编辑人员 -->
           <div class="box">
              <el-dialog
              title="编辑人员资料"
              :visible.sync="editdialog"
              width="720px">
              <div class="content-up">
               <!--  <div class="img-box">
                  <img :src="img" v-if="img">
                  <img src="../../assets/images/icon-tou.png" v-else :class="{'uncheck':check.img}">
                </div> -->
           
                 <div class="img-box">
                    <img :src="'data:image/'+setobj.face_image_type+';base64,'+setobj.face_image_data" >
                  </div>
              <!--   <p class="tit-tou">上传头像</p> -->
                <p class="name-ipt">
                  <span><i class="red">*</i>姓名</span>
                  <input type="text" name="" disabled placeholder="请输入姓名，20字以内，必须填"  v-model="setobj.name">
                </p>
                <p class="name-ipt">
                  <span><i class="red"></i>类型</span>
                  <el-radio v-model="type" label="1">VIP</el-radio>
                  <el-radio v-model="type" label="2">访客</el-radio>
                </p>
              </div>
              <span slot="footer" class="dialog-footer">
                <!-- <span class="warn-box" v-show="err"><i></i>{{errtit}}</span> -->
                <el-button type="primary" @click="editConfirm">确 定</el-button>
                <el-button @click="editdialog = false">取 消</el-button> 
              </span>
            </el-dialog>
          </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data () {
    return {
      id:sessionStorage.getItem("users"),
      value3:"",
      nomun:false,
      page:0,
      fromTimeStamp:'2018-1-1 00:22:22',
      toTimeStamp:"2019-1-2 00:22:22",
      place_id:0,
      dataList:[],
      total_num:0,
      mydata:[],
      showDate:[],
      setobj:{},
      placelistin:[],
      placelistout:[],
      editdialog:false,
      type:"1",
      activeName:"first",
      totaldata:[],
      rightcontent:[]

    }
  },
  mounted(){
    this.getInout(this.id,this.fromTimeStamp,this.toTimeStamp,this.place_id);
   
  },
  computed:{
    ...mapState({
      slider:function(state){    
        return state.slider;
      }
    })
  },
  methods:{
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    GMTToStr(time){
    let date = new Date(time);
    let hour = date.getHours();
    let mit = date.getMinutes();
    let sec = date.getSeconds();

    if(hour<10){
        hour = "0"+hour+":"
    }

    if(mit<10){
        mit = "0"+mit+":"
    }

    if(sec<10){
        sec = "0"+sec
    }
    let Str=date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' + 
    date.getDate() + ' ' + hour + mit +sec;
    return Str
    },
    logTimeChange(v){
       console.log(v);
       if(v){
           this.fromTimeStamp = this.GMTToStr(v[0]);
           this.toTimeStamp = this.GMTToStr(v[1]);
           console.log(this.fromTimeStamp);
           this.getInout(this.id,this.fromTimeStamp,this.toTimeStamp,this.place_id);
       }
      
    },

    getInout(id,fromTimeStamp,toTimeStamp,place_id){
       this.mydata = [];
       this.showDate = [];
        this.$api.post("/client_query_time_record_api",{
          company_id:parseInt(id),
          fromTimeStamp:fromTimeStamp,
          toTimeStamp:toTimeStamp,
          place_id:place_id
        },su=>{
           console.log(su)
           if(su.code==200){

              this.dataList = su.total_data;
              //设置imgsrc属性
              this.dataList.forEach((el,ind)=>{
                   let face_id = el.face_id;
                   let user_name = el.face_user_name;
                   el.face_data.forEach((ele,index)=>{
                       let place_address = ele.place_address;
                       ele.data.forEach((e,i)=>{
                           this.$set(e,"face_id",face_id);
                           this.$set(e,"face_user_name",user_name);
                           this.$set(e,"place_address",place_address);
                           this.mydata.push(e);
                           console.log(this.mydata);
                        
                       })
                   })

              })
            this.$nextTick(function(){
                 this.getface(this.mydata);
             })
              this.total_num = su.total_num;
           }

        },err=>{

        })

      },

     /* 获取图片*/
     getface(d){  
       d.forEach((el,ind)=>{
             this.$api.post('/client_get_face_image_api',{
                "company_id":parseInt(this.id),
                "face_id":el.face_id,
             },su=>{
         
              if(su.code==200){
                 this.$set(el,"face_image_type",su.face_image_type);
                 this.$set(el,"face_image_data",su.face_image_data);
                 console.log("我的数据",el)
               
              }

             },err=>{

             })
        })
       
       this.$nextTick(function(){
        this.showDate = this.mydata
       
       })
     },
     sliderShow(val,event){
        event.cancelBubble = true;
        this.setobj = val;
        console.log("我的参数",this.setobj);

        //console.log(this.setobj);
        this.$store.state.slider = true;
        this.getrecord();
        //获取已经添加的权限
        this.getRights();
        //获取所有出入口
        this.getright();
     },
    getRights(){
        this.$api.post("/client_query_person_auth_api",
        {
          company_id:parseInt(this.id),
          face_id:this.setobj.face_id
        },
        su=>{
          if(su.code==200){
            //console.log(222)
            if(su.num==0){
              this.rightcontent = [];
              return
            }
            su.total_data.forEach((val,idx)=>{
             
                val.data.forEach((value,index)=>{
                  
                  let num = [];
                  value.acPkCode.forEach((place,i)=>{
                   
                     let arr = place.split("-");

                     num.push(arr[0]+"-"+arr[1]);
                     num.push(arr[0]+"-"+arr[2]);
                     
                  })
                  value.code = num;
                })
            })
            this.rightcontent = su.total_data;
            //console.log(this.rightcontent,"ssssss")
          }
        },err=>{

        })
      },
       getrecord(){
        this.$api.post("/client_query_face_id_record_api",{
            company_id:parseInt(this.id),
            face_id:this.setobj.face_id,
            place_id:0,
            fromTimeStamp:"2018-1-1 00:22:22",
            toTimeStamp:"2100-1-1 00:22:22"
          },
          su=>{
            if(su.code==200){

              this.totaldata = su.total_data;
            }
          },
          err=>{

        })
      },
      getright(){
        this.$api.post("/common_query_company_api",{
          company_id:parseInt(this.id)
        },su=>{
          if(su.code===200){

            let obj = su.data;

            obj.ischeck = false;
         
            obj.forEach((val,index)=>{

                if(val.data){
                   val.data = [];
                }else{
                   this.$set(val,"data",[])
                }
                  
                if(val.ischeck){
                   val.ischeck = false;
                }else{
                   this.$set(val,"ischeck",false)
                }
                
                 console.log(val.place_id,index);
                this.delist(val.place_id,index);
            })
             
             console.log(obj);
            this.placelistin = obj;
            this.placelistout = JSON.parse(JSON.stringify(obj));
            this.placelistout.ischeck = false;
          }else{
            this.$message({
                message: su.msg,
                type: 'warning'
            });
          }
        },err=>{
            this.$message({
                message:"error",
                type: 'warning'
            });
        })
      },
      closeFn(){
       this.$store.state.slider = false;
      },
       delist(vals,index){     
        this.$api.post("/common_query_place_api",{
          company_id:parseInt(this.id),
          place_id:vals
        },su=>{
          if(su.code==200&&su.data.length>0){
              console.log();
              this.placelistin[index].data = [];
              this.placelistout[index].data = [];
              su.data.forEach((val)=>{
                  val.ischeck = false;
                  val.placestring = vals+"-"+val.device_id;
                  //console.log(val,"ssssssss")
                  if(parseInt(val.device_id)%2!=0){
                    this.placelistin[index].data.push(val);
                  }else{
                    this.placelistout[index].data.push(val);
                  } 
              })
              //console.log(su.data)
              // this.placelistin[index].data = su.data;
              // this.placelistout[index].data = JSON.parse(JSON.stringify(su.data));
          }
        },err=>{
              
        })
 
    },
      editman(){
        console.log("mm",this.setobj);
        this.editdialog = true;
        console.log(this.setobj.face_image_type);
        this.type = this.setobj.face_image_type.toString();
      },
       editConfirm(){
          this.$api.post("/client_mng_modify_face_api",{
              company_id:parseInt(this.id),
              face_id:this.setobj.face_id,
              face_type:Number(this.type)
            },
            su=>{
              if(su.code==200){
                this.setobj.face_image_type = this.type;
                this.editdialog = false;
                this.getList();
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
            },err=>{
               this.$message.error(err.msg);
            })
        },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .sur{
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
      .time{
        margin-right: 11px;
      }
    }
  }
  .pick-block{
    display: inline-block;
  }
  .tit{
    border-left: 4px solid #378EEF;
    height: 16px;
    font-size: 16px;
    color: #1A1A1A;
    padding-left: 12px;
    line-height: 16px;
    margin-top:47px;
    span{
      color: #FD8F53;
    }
  }
  .no-num{
    margin:130px 0 130px 0;
    text-align: center;
    p{
      margin-top: 44px;
      font-size:18px;
      color:rgba(153,153,153,1);
    }
  }
  .page{
    text-align: center;
  }
  .list{
    overflow: hidden;
    padding-bottom: 70px;
    li{
      float: left;
      margin:24px;
      position: relative;
      img{
        height: 150px;
        width: 150px;
        border: 2px solid transparent;
        box-sizing: border-box;
      }
      p{
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;
        color: #999999;
      }
      p.name{
        font-size: 14px;
        margin:19px 0 11px 0;
        color: #4d4d4d;
      }
      .hover-class{
        position: absolute;
        top:150px;
        width: 214px;
        height: 126px;
       background: url(../../assets/images/bg-cur.png) center no-repeat; 
        background-size: cover;
        z-index: 100;
        display: none;
        .first-p{
          margin-top: 20px;
        }
        p{
          color: #fff;
          font-size: 12px;
          text-align: left;
          margin-bottom: 12px;
          text-indent: 14px;
        }
      }
    }
    li:hover .hover-class{
      display: block;
    }
    li:hover img{
      border: 2px solid #378EEF;
      box-sizing: border-box;
    }
  }

  [v-cloak] {
  display: none;
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
    font-size: 12px;
    white-space:nowrap;
    >p{
      height:39px; 
      background:rgba(237,237,237,1);
      color: #4D4D4D;
      text-indent: 29px;
      line-height: 39px;
      font-size: 14px;
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
        .reder{
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
    margin-bottom: 
    27px;
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
  .select-box{
    >p{
      i{
        display:inline-block;
        width:16px;
        height:16px;
        background:url(../../assets/images/unchose-l.png);
        background-size: cover;
        margin-right:5px;
        position:relative;
        top:2px;
      }
    }
    >p.chose{
      color:#409EFF;
      i{
        display:inline-block;
        width:16px;
        height:16px;
        background:url(../../assets/images/chose-l.png);
        background-size: cover;
      }
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
.pic-cla i{
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url(../../assets/images/tip-warn.png);
  margin-right: 16px;
  position: relative;
  top:8px;
}
.pad-class{
  padding: 6px;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-bottom: 18px;
}
.pad-warn{
   border: 1px solid #F84C4C;
}
.content-set{
  height: 600px;
  overflow: auto;
}
::-webkit-scrollbar{
      background-color:white !important;
      width: 5px;
      height:8px;

     
}
::-webkit-scrollbar-thumb{
    background-color:rgba(186,190,193,1);
    width: 5px !important;
    border-radius: 2px 2px 2px 2px;
    height:5px;
  
}

::-webkit-scrollbar-button{
  height:5px;
  background-color: white;
}
.over-auto{
  overflow:auto;
}
.line-class{
  display:inline-block;
  position:relative;
  white-space:nowrap;
  line-height:30px;
}
.ad-box{
  height: 110px;
  white-space:nowrap;
  display:inline-block;
  position:relative;
  top:33px;
  .address{
    padding:10px 20px;
    min-width:30px;
    line-height:20px;
    border:1px solid #ff9900;
  }
  .in-out{
    text-align:center;
  }
  .time{
    text-align:center;
  }
}
</style>