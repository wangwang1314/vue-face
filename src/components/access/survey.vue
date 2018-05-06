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
      <li v-for="(item,ind) in showDate" v-cloak>
        <img :src="'data:image/'+item.face_image_type+';base64,'+item.face_image_data">
        <p class="name">{{item.face_user_name}}</p>
        <p></p>
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
  </div>
</template>

<script>
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
      showDate:[]

    }
  },
  mounted(){
    this.getInout(this.id,this.fromTimeStamp,this.toTimeStamp,this.place_id);
   
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
     }


  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .sur{
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
</style>