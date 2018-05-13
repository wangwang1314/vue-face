<template>
  <div class="rec">
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
          <span>场地名称</span>
          <el-input @blur="filterDate(place_name,1)" @focus="optionNow(1)" class="ipt-inline" v-model="place_name" placeholder="请输入场地名称"></el-input>
          <span>设备地址</span>
           <el-input @blur="filterDate(dv_address,2)" @focus="optionNow(2)" class="ipt-inline" v-model="dv_address" placeholder="请输入设备地址"></el-input>
          <br>
           <span>姓名</span>
           <el-input  @blur="filterDate(us_name,3)" @focus="optionNow(3)" class="ipt-inline" v-model="us_name" placeholder="请输入姓名"></el-input>
           <span>拍摄时间</span>
           <el-date-picker
            v-model="value3"
            @change="logTimeChange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="data-class"
            >
          </el-date-picker>
          <span class="add-cou">增加过滤条件</span>
       </div>
       <p class="su-tit">共 <span>{{total_num}}</span> 条数据</p>
       <p class="sur-num">
         <span>导出数据</span>
       </p>
       <table class="sort-tab">
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
             <td> <img :src="'data:image/'+item.face_image_type+';base64,'+item.face_image_data"></td>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      id:sessionStorage.getItem("users"),
      fromTimeStamp:'2018-1-1 00:22:22',
      toTimeStamp:"2119-1-2 00:22:22",
      name:"",
      place_id:0,
      dataList:[],
      total_num:0,
      mydata:[],
      showDate:[],
      place_name:"",//场地名称
      dv_address:"",//设备地址
      us_name:"",//姓名
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
        value4: '',
        value3:"",
        page:0
    }
  },
  mounted(){
      //获取信息
     this.getInout(this.id,this.fromTimeStamp,this.toTimeStamp,this.place_id);
  },
  methods:{
     handleSizeChange(){

    },
    handleCurrentChange(){

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
           }

        },err=>{

        })

      },
      //
      searchChange(file){
      let blob = new Blob([file.raw],{type:file.raw.type});
      let that = this;
      let reader = new FileReader();
     
       let imgtype = "";
      if(file.name.indexOf(".")!=-1){
            let arr = file.name.split(".");
            imgtype = arr[arr.length-1];
            name = arr[0];
          }
      reader.readAsDataURL(blob);
      reader.onload = function (e) {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值     
          console.log(imgtype); 
          that.searchimg = reader.result;
          let img = that.searchimg.split(",")[1];
            that.$api.post("/client_query_face_image_record_api",{
              "company_id":parseInt(that.id),
              "face_image_type":imgtype,
              "face_image_data":img,
              "place_id":0,
              "fromTimeStamp":that.fromTimeStamp,
              "toTimeStamp":that.toTimeStamp
          },su=>{
            if(su.code==200){
               that.showDate = [];
               if(su.face_id){
                 that.mydata.forEach((el,ind)=>{
                   if(el.face_id == su.face_id){
                       that.showDate.push(el);
                   }
                })
               }else{
                  that.showDate = that.mydata;
               }
               
            }

          },err=>{

          })
          console.log(img);
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
           //this.getInout(this.id,this.fromTimeStamp,this.toTimeStamp,this.place_id);
        }
       }
       ,
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
          console.log("我的数据",this.showDate)
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
    min-width: 1644px;
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
    margin-bottom: 80px;
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