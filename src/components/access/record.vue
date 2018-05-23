<template>
  <div class="rec">
       <div class="header">
           <span style="margin-right:10px;"><el-radio v-model="isselect" :label="false">条件一</el-radio></span>
           <span>场地名称</span>
           <select class="select-class" v-model="selectvalue2" :disabled="isselect">
            <option :value="0">全部</option>
            <template v-for="item in selectlist">
              <option :value="item.place_id">{{item.place_address}}</option>
            </template>
           </select>
           <span>拍摄时间</span>
           <el-date-picker
            v-model="value3"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="data-class"
            value-format="yyyy-MM-dd hh:mm:ss"
            :disabled="isselect"
            >
          </el-date-picker>
           <span>过滤时间</span>
           <el-date-picker
            v-model="value4"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="data-class"
            value-format="yyyy-MM-dd hh:mm:ss"
            :disabled="isselect"
            >
          </el-date-picker>
          <el-button type="primary" v-if="(!isselect)&&value3&&value3.length>0" @click="searchFn1">查&nbsp;&nbsp;询</el-button>
          <el-button type="info"  v-else disabled>查&nbsp;&nbsp;询</el-button> 
          <br>
          <span style="margin-right:10px;"><el-radio v-model="isselect" :label="true">条件二</el-radio></span>
           <span>人员头像</span>
           <div class="up-box">
              <img v-if="imgtype&&searchimg" :src="'data:image/'+imgtype+';base64,'+searchimg" class="img-tit">
              <el-upload
                class="upload-style"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="searchChange"
                :auto-upload="false"
                :show-file-list="false"
                >
                <button  class="sur-selct btn-upload" :disabled="!isselect"><span :style="{'opacity':searchimg?0:1}">请上传图片搜头像</span><i></i></button>
            </el-upload>
          </div>  
          <span>场地名称</span>
          <select class="select-class" v-model="selectvalue1" :disabled="!isselect">
            <option :value="0">全部</option>
            <template v-for="item in selectlist">
              <option :value="item.place_id">{{item.place_address}}</option>
            </template>
          </select>
         <!--   <el-select  placeholder="请选择" class="select-class" v-model="selectvalue1" :disabled="!isselect">
            <el-option :value="0" :label="全部"></el-option>
            <el-option
              v-for="item in selectlist"
              :label="item.place_address"
              :value="item.place_id">
            </el-option>
          </el-select> -->
          <span>拍摄时间</span>
           <el-date-picker
            v-model="value5"
    
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="data-class"
            value-format="yyyy-MM-dd hh:mm:ss"
            :disabled="!isselect"
            >
          </el-date-picker>
           <el-button type="primary" v-if="isselect&&value5&&value5.length>0&&searchimg" @click="searchFn">查&nbsp;&nbsp;询</el-button>
           <el-button type="info" v-else disabled>查&nbsp;&nbsp;询</el-button>
          
        <!--   <div class="ftime">
             
             <p v-for="(item,ind) in filtTime">
                   <el-date-picker
              v-model="item.val"
              @change="filterTimes"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="data-class"
          
              >
            </el-date-picker>
             </p>
           
            
          </div> -->
       </div>
      <div v-show="!(total_num == 0 && ajax)">
       <p class="su-tit">共 <span>{{total_num}}</span> 条数据</p>
       <p class="sur-num">
         <span @click="getnum">导出数据</span>
       </p>
       <div style="height:0;overflow:hidden">
         <table class="sort-tab" id="pdf" >
           <thead>
             <tr>
               <td>拍摄时间</td>
               <td>出入人头像</td>
               <td>出入人姓名</td>
               <td>出入类型</td>
               <td>场地名称</td>
               <td>设备地址</td>
             </tr>
           </thead>
           <tbody>
             <tr v-for="(item,ind) in showDate">
               <td>{{item.timeStamp}}</td>
               <td> <img v-if="item.face_image_data" :src="'data:image/'+item.face_image_type+';base64,'+item.face_image_data"></td>
               <td>{{item.face_user_name}}</td>
               <td>
                 <span class="red" v-if="item.device_id%2==0">出</span>
                 <span class="green" v-else>入</span>
               </td>
               <td>
                 
                 {{item.place_address}}
            </p>
               </td>
               <td>{{item.device_address}}</td>
             </tr>      
           </tbody>
         </table>
      </div>
      <!--  <table class="sort-tab"  >
           <thead>
             <tr>
               <td>拍摄时间</td>
               <td>出入人头像</td>
               <td>出入人姓名</td>
               <td>出入类型</td>
               <td>场地名称</td>
               <td>设备地址</td>
             </tr>
           </thead>
           <tbody>
             <tr v-for="(item,ind) in realdata">
               <td>{{item.timeStamp}}</td>
               <td> <img v-if="item.face_image_data" :src="'data:image/'+item.face_image_type+';base64,'+item.face_image_data"></td>
               <td>{{item.face_user_name}}</td>
               <td>
                 <span class="red" v-if="item.device_id%2==0">出</span>
                 <span class="green" v-else>入</span>
               </td>
               <td>
                 
                 {{item.place_address}}
            </p>
               </td>
               <td>{{item.device_address}}</td>
             </tr>      
           </tbody>
        </table> -->
             <el-table
            ref="multipleTable"
            :data="realdata"
            tooltip-effect="dark"
            style="width: 100%"
            align="center"
            height="700"
            >
            <el-table-column
              label="拍摄时间"
              prop="timeStamp"
             >
            <!--  <template slot-scope="scope">
               <img class="img-size" v-if="scope.row.img" :src="scope.row.img">
             </template> -->
            </el-table-column>
            <el-table-column
              
              label="出入人头像"
             >
             <template slot-scope="scope">
               <img v-if="scope.row.face_image_data" :src="'data:image/'+scope.row.face_image_type+';base64,'+scope.row.face_image_data">
             </template> 
            </el-table-column>
             <el-table-column
              label="出入人姓名"
              prop="face_user_name"
              show-overflow-tooltip>
            </el-table-column>
             <el-table-column
              label="出入类型"
              
              show-overflow-tooltip>
               <template slot-scope="scope">
                  <span class="red" v-if="scope.row.device_id%2==0">出</span>
                   <span class="green" v-else>入</span>
               </template>
            </el-table-column>
             <el-table-column
              label="场地名称"
               prop="place_address"
              >
             
            </el-table-column>
             <el-table-column
              label="设备地址"
               prop="device_address"
              >
             
            </el-table-column>
          </el-table>
      </div>
      <div style="text-align:center;margin-top:216px;" v-show="total_num == 0 && ajax">
        <img src="../../assets/images/no-num.png">
        <p style="margin-top:44px;color:#999999;font-size:18px;">抱歉！~暂无数据~</p>
     </div>  
      <div class="page" v-if="!(total_num == 0 && ajax)">
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[20]"
      :page-size="pagesize"
      layout="prev, pager, next,sizes"
      :total="total_num">
    </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      isselect:false,
      id:parseInt(sessionStorage.getItem("users")),
      fromTimeStamp:'2018-1-1 00:22:22',
      toTimeStamp:"2119-1-2 00:22:22",
      name:"",
      filtTime:[],
      place_id:0,
      dataList:[],
      total_num:0,
      mydata:[],
      ajax:false,
      showDate:[],
      place_name:"",//场地名称
      dv_address:"",//设备地址
      us_name:"",//姓名
      tstart:0,
      tend:0,
      value4:[],
      value3:[],
      page:1,
      pagesize:20,
      realdata:[],
      selectlist:[],
      value5:[],
      selectvalue1:0,
      selectvalue2:0,
      imgtype:"",
      searchimg:""
    }
  },
  mounted(){
      //获取信息
    
      this.fromTimeStamp = this.GMTToStr(this.value3[0]);
      this.toTimeStamp   = this.GMTToStr(this.value3[1]);
      this.getInout();
      this.getpalce();
  },
  methods:{
    dataFn(){
      let start = (this.page-1)*this.pagesize;
      let end = this.page*this.pagesize;
      this.realdata = this.showDate.slice(start,end);
    },
     handleSizeChange(){

    },
    handleCurrentChange(val){
      this.page =val;
      this.dataFn()
    },
    getnum(){
      //console.log(this.$getpdf);
      this.$getpdf.getPdf("pdf","#pdf")
    },
   getInout(){
       this.mydata = [];
       this.showDate = [];
        this.$api.post("/client_query_time_record_api",{
          company_id:this.id,
          fromTimeStamp:"2000-01-01 00:00:00",
          toTimeStamp:"2100-01-01 00:00:00",
          place_id:0
        },su=>{
           console.log(su)
           if(su.code==200){
              if(su.total_num>0){
              this.dataList = su.total_data;
              this.total_num = su.total_num;
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
              }else{
                  this.realdata = [];
                  this.total_num = 0;
                  this.ajax = true;
              }   
           }else{
              this.realdata = [];
              this.total_num = 0;
              this.ajax = true;
           }

        },err=>{
             this.realdata = [];
              this.total_num = 0;
              this.ajax = true;
        })

      },
      //
     searchChange(file){
      let blob = new Blob([file.raw],{type:file.raw.type});
      let that = this;
      let reader = new FileReader();
     
       //let imgtype = "";
      if(file.name.indexOf(".")!=-1){
            let arr = file.name.split(".");
            this.imgtype = arr[arr.length-1];
            name = arr[0];
          }
      reader.readAsDataURL(blob);
      reader.onload = function (e) {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值     
          //console.log(imgtype); 
          //that.searchimg = reader.result;
          that.searchimg= reader.result.split(",")[1];
            
      };
    },
      //根据人脸图片查询进出记录
    
      //根据faceID查询进出记录
     byfaceId(id,faceid,placeId,fromTimeStamp,toTimeStamp){
          this.$api.post("/client_query_face_id_record_api",{
              "company_id":parseInt(id),
              "face_id":faceid,
              "place_id":placeId,
              "fromTimeStamp":fromTimeStamp,
              "toTimeStamp":toTimeStamp
          },su=>{
            if(su.code==200){

            }

          },err=>{

          })
      },

  //拍摄时间
    GMTToStr(time){
    let date = new Date(time);
    let hour = date.getHours();
    let mit = date.getMinutes();
    let sec = date.getSeconds();

    if(hour<10){
        hour = "0"+hour+":"
    }else{
        hour = hour+":" 
    }

    if(mit<10){
        mit = "0"+mit+":"
    }else{
        mit = mit+":"
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
       this.filtTime = [];
       console.log(v);
       if(v){
           console.log("时间",v);
           this.fromTimeStamp = this.GMTToStr(v[0]);
           this.toTimeStamp = this.GMTToStr(v[1]);
           console.log(this.fromTimeStamp);
           console.log(this.toTimeStamp);
           this.getInout(this.id,this.fromTimeStamp,this.toTimeStamp,this.place_id,[]);
        }
       },

       //聚焦
       optionNow(v){
          if(v==1){
             this.dv_address = "";
             this.us_name = "";
          }else if(v==2){
              this.place_name = "";
              this.us_name = "";
          }else if(v==3){
             this.place_name = "";
             this.dv_address = "";
          }
       },
      //过滤数据
      filterDate(v,num){
          this.showDate = [];
          
          if(v){
            this.mydata.forEach((el,ind)=>{
             if(num==1){
                if(el.place_address == v){
                   this.showDate.push(el);
                }
             }else if(num == 2){
                
                 if(el.device_address== v){
                   this.showDate.push(el);
                }
             }else if(num == 3){
                  
                  if(el.face_user_name== v){
                   this.showDate.push(el);
                }
             }
          })
          }else{
             this.showDate = this.mydata;
          }
          
          this.total_num = this.showDate.length;
          if(this.total_num==0){
              this.ajax = true;
          }


          this.dataFn()

      },
     addfilter(){
          this.filtTime.push({
             val:[],
             begin_time:"",
             end_time:""
          })
       },
     filterTimes(){
       let arr = [];
       console.log("time",this.filtTime);
       this.filtTime.forEach((el,ind)=>{
             if(el.val!==null){
                let tstart = this.GMTToStr(el.val[0]);
                let tend = this.GMTToStr(el.val[1]);
                el.begin_time = tstart;
                el.end_time = tend;
              console.log(el);      
            arr.push({
            begin_time:el.begin_time,
            end_time:el.end_time
           })        
         }       
        
       })
       console.log(arr);
        this.getInout(this.id,this.fromTimeStamp,this.toTimeStamp,this.place_id,arr);
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
              }

             },err=>{

             })
        })
       
       this.$nextTick(function(){
        this.showDate = d;
        this.dataFn()
         // console.log("我的数据",this.showDate)
       })
    },
    getpalce(){  
     
             this.$api.post('/common_query_company_api',{
                "company_id":this.id,
             },su=>{        
              if(su.code==200&&su.num>0){
                this.selectlist = su.data;
              }else{
                this.selectlist = []
              }
             },err=>{

             })
    },
    searchFn(){
        let data = {}
        // {
        //         "company_id":this.id,
        //         fromTimeStamp:this.value3[0],
        //         toTimeStamp:this.value3[1],
        //         place_id:this.selectvalue2
        //  }
     
        this.dataList = [];
        this.realdata = [];
        this.showDate = [];
        this.mydata = [];
         this.$api.post('/client_query_face_image_record_api',{
            company_id:this.id,
            face_image_type:this.imgtype,
            face_image_data:this.searchimg,
            fromTimeStamp:this.value5[0],
            toTimeStamp:this.value5[1],
            place_id:this.selectvalue1
          },su=>{        
            if(su.code==200){
              if(su.total_num>0){
              this.dataList = su.total_data;
              this.total_num = su.total_num;
              //设置imgsrc属性
              let face_id =su.face_id;
              let user_name = su.face_user_name;
              this.dataList.forEach((el,ind)=>{     
                       let place_address = el.place_address;
                       el.data.forEach((e,i)=>{
                           this.$set(e,"face_id",face_id);
                           this.$set(e,"face_user_name",user_name);
                           this.$set(e,"place_address",place_address);
                           this.mydata.push(e);
                           console.log(this.mydata);
                        
                       })
                 
              })
              this.$nextTick(function(){
                 this.getface(this.mydata);
              })
                this.total_num = su.total_num;
              }else{
                  this.realdata = [];
                  this.total_num = 0;
                  this.ajax = true;
              }

           }else{
              this.realdata = [];
                  this.total_num = 0;
                  this.ajax = true;
           }
         },err=>{
              this.realdata = [];
              this.total_num = 0;
              this.ajax = true;
         })
    },
    searchFn1(){
        let data = {}
        // {
        //         "company_id":this.id,
        //         fromTimeStamp:this.value3[0],
        //         toTimeStamp:this.value3[1],
        //         place_id:this.selectvalue2
        //  }
        if(this.value4&&this.value4.length>0){
          data = {
            company_id:this.id,
            fromTimeStamp:this.value3[0],
            toTimeStamp:this.value3[1],
            place_id:this.selectvalue2,
            except_date:[
            {
              begin_time:this.value4[0],
              end_time:this.value4[1]
            }]
          }
        }else{
          data = {
            company_id:this.id,
            fromTimeStamp:this.value3[0],
            toTimeStamp:this.value3[1],
            place_id:this.selectvalue2
          }
        }
        this.dataList = [];
        this.realdata = [];
        this.showDate = [];
        this.mydata = [];
         this.$api.post('/client_query_time_record_api',data,su=>{        
            if(su.code==200){
              if(su.total_num>0){
              this.dataList = su.total_data;
              this.total_num = su.total_num;
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
              }else{
                  this.realdata = [];
                  this.total_num = 0;
                  this.ajax = true;
              }   
           }else{
            this.realdata = [];
                  this.total_num = 0;
                  this.ajax = true;
           }
         },err=>{
             this.realdata = [];
            this.total_num = 0;
              this.ajax = true;
         })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.ipt-inline{
  display:inline-block;
  width:390px;
  margin-right:59px;
}
 .rec{
    background-color: #fff;
    margin:19px;
    min-height: 700px;
    padding: 30px 32px 50px 30px;
    min-width: 1844px;
    .header{
      padding: 15px;
      line-height: 46px;
      background:rgba(234,234,234,1);
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(77,77,77,1);
      padding-left: 31px;
      >span{
        margin-right: 10px;
      }
      .add-cou{
        font-size:14px;
        color:rgba(55,142,239,1);
        cursor: pointer;
      }
    }
  }
  .sur-selct{
    height: 36px;
    width: 390px;
    margin-right: 59px;
  }
  .data-class{
    height: 36px;
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
    margin-bottom: 18px;
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
      margin-left: 11px; 
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
  .red{
    color: #F84C4C;
  }
  .green{
    color: #98C56B;
  }
  .page{
    text-align: center;
  }
  .sur-selct{
    height: 36px;
    width: 400px;
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

  .upload-style{
  display: inline-block;
}
.btn-upload{
  border: 1px solid #ccc;
  background: #fff;
  color: #ccc;
  text-indent: 10px;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;

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
.ftime{
  padding-left:568px;
}
.select-class{
  height: 36px;
  width: 400px;
  margin-right: 59px;
  border: 1px solid #ccc;
  color: #ccc;
  border-radius: 4px;
  text-indent: 10px;
}
.btn-upload:disabled,select:disabled{
  background: #dcdcdc;
}
</style>


<style lang='scss'>
 .el-table::before {
    content: '';
    position: absolute;
    background-color: #fff;
    z-index: 1;
}
.text-center{
  text-align: center;
 }
 .el-table img{
      width: 55px;
      height: 55px;
      border-radius: 50%;
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

    .rec .el-table td {
        font-size: 12px;
        color: #1A1A1A;
        height: 102px;
    }
    .up-box{
      display: inline-block;
      position: relative;
      .img-tit{
        border-radius: 50%;
        height: 28px;
        width: 28px;
        position: absolute;
        top:9px;
        left: 5px;
      }
    }
</style>
<style lang='scss'>
  .el-range-editor.is-disabled{
    background-color:#dcdcdc;
    border-color: #CCCCCC ;
    color: #CCCCCC;
  }
  .el-range-editor{
     border-color: #CCCCCC ;
      color: #CCCCCC;
  }
  .el-range-editor.is-disabled input{
     background-color:#dcdcdc;
    color: #CCCCCC;
  }
</style>