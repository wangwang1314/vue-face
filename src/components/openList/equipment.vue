<template>
  <div class="open-list">


       <div class="back-list">
          <div class="place-sett">
              <span>设备管理</span>
              <router-link  :to="{name:'openlist'}" class="to-list"><<返回列表</router-link>
          </div>
         
          <h2>
            {{cname}}（企业ID：{{cid}}）| <span>{{eqplace}}</span>
          </h2>
       </div>
       <p class="data-all">共 <span>{{totalList}}</span>条数据</p>
       <div class="add-del">
           <button type="button" @click="addequimentFn(1)">添加设备</button>
     
       </div>
      

       <template>
      <el-table
        ref="multipleTable"
        :data="realdata"
        tooltip-effect="dark"
        class="text-center"
        style="width: 100%"
        v-show="totalList>0"
        @selection-change="handleSelectionChange"   
        >
        <el-table-column
          label="摄像头ID"
          show-overflow-tooltip
          prop="device_id">
         
        </el-table-column>

        <el-table-column
          prop="device_id"
          label="出入类型"
          show-overflow-tooltip
           >

           <template slot-scope="scope">
              
                <span v-if="scope.row.device_id%2==0" class="type-in">出</span>
                <span v-if="scope.row.device_id%2==1" class="type-out">入</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="device_address"
          label="安装地址"
          show-overflow-tooltip
         >
        </el-table-column>

        <el-table-column
          prop="device_latitude"
          label="经度"
          show-overflow-tooltip
         >
        </el-table-column>
    
      <el-table-column
          prop="device_longitude"
          label="纬度"
          show-overflow-tooltip
         >
        </el-table-column>

         <el-table-column
          prop="device_ip"
          label="摄像头IP"
          show-overflow-tooltip
         >
        </el-table-column>

         <el-table-column
          prop="device_heigh"
          label="摄像头像素高度"
          show-overflow-tooltip
         >
        </el-table-column>
         <el-table-column
          prop="device_width"
          label="摄像头像素宽度"
          show-overflow-tooltip
         >
        </el-table-column>

         <el-table-column
          prop="device_login"
          label="摄像头账号"
          show-overflow-tooltip
         >
        </el-table-column>
         <el-table-column
          prop="device_pwd"
          label="摄像头密码"
          show-overflow-tooltip
         >
        </el-table-column>

       
         <el-table-column
          prop="places"
          label="操作"
          show-overflow-tooltip
          >
          <template slot-scope="scope">
              <div class="opartion">
                  <span  @click="addequimentFn(2,scope.row)">编辑</span>|
                  <span @click="delPlace(scope.row.device_id)">删除</span>
              </div>
          </template>
        </el-table-column>
 
       </el-table>
    </template>
    <div style="text-align:center;margin-top:216px;" v-show="totalList == 0 && ajax">
        <img src="../../assets/images/no-num.png">
        <p style="margin-top:44px;color:#999999;font-size:18px;">抱歉！~暂无数据~</p>
    </div>
    <div class="block pages-cont" v-show="totalList>0">
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[20]"
      :page-size="pagesize"
      layout=" prev, pager, next,sizes"
      :total="totalList">
    </el-pagination>
  </div>

  <el-dialog
  class="add-equip add-user"
  :title="dtitle"
  :visible.sync="addequiment"
  width="616px"
  :before-close="handleClose">
   <div class="add-eq-cont">
       <table>
         <tbody>
           <tr>
             <td>
               <span class="ms-write">摄像头ID</span>
             </td>
             <td>
          
               <input  v-show="dtitle == '添加设备'" oninput="this.value=this.value.replace(/\D/g,'')" type="" class="place-set"  v-model="device_id" @blur="inoutFn" @keyup="errhide" placeholder="50个字符以内" maxlength="50" :class="{'ip-err':deverr1==true}" name="">
               <span v-show="dtitle == '编辑设备'">{{device_id}}</span>
             </td>
           </tr>
            <tr>
             <td>
             <span>出入类型</span>
             </td>
             <td class="radios">
                <template>
                  <el-radio v-if="radio!=''" :disabled="radio==1"   v-model="radio" label="2">出</el-radio>
                  <el-radio v-else  disabled   v-model="radio" label="2">出</el-radio>
                  <el-radio v-if="radio!=''" :disabled="radio==2"  v-model="radio" label="1">入</el-radio>
                   <el-radio v-else disabled  v-model="radio" label="1">入</el-radio>
                </template>

             </td>
           </tr>
            <tr>
             <td>
               <span class="ms-write">安装地址</span>
             </td> 
             <td>
               <input type="" class="place-set"  v-model="device_address"  @keyup="errhide" :class="{'ip-err':deverr2==true}" maxlength="20" placeholder="20个字符以内" name="">
             </td>
           </tr>
            <tr>
             <td>
               <span class="ms-write">经度</span>
             </td>
             <td>
              
            <div class="err-cont after-ip">
              <input type="" name=""  oninput="this.value=this.value.replace(/\D/g,'')" placeholder="请输入度" maxlength="3" class="ip-lt" v-model = "lat1"  @keyup="errhide" :class="{'ip-err':deverr3==true}">
              <input type=""  oninput="this.value=this.value.replace(/\D/g,'')" placeholder="请输入分" maxlength="2"  name="" class="ip-lt" v-model = "lat2"  @keyup="errhide" :class="{'ip-err':deverr3==true}">
               
                <em class="h">。</em>
                <em class="s">'</em>
            
        
               </div>
             </td>
           </tr>
            <tr>
             <td>
                <span class="ms-write">纬度</span>
             </td>
             <td>
               <div class="err-cont after-ip">
              <input type="" oninput="this.value=this.value.replace(/\D/g,'')"  placeholder="请输入度" maxlength="2"  name="" class="ip-lt"  v-model = "long1" @keyup="errhide"  :class="{'ip-err':deverr4==true}">
              <input type="" oninput="this.value=this.value.replace(/\D/g,'')" name="" placeholder="请输入分" maxlength="2" class="ip-lt"  v-model = "long2" @keyup="errhide" :class="{'ip-err':deverr4==true}">
                <em class="h">。</em>
                <em class="s">'</em>
               </div>
             </td>
           </tr>
            <tr>
             <td>
                 <span class="ms-write">摄像头IP</span>
             </td>
             <td>
               <input type="" class="place-set" placeholder="50个字符以内" maxlength="50"  v-model="device_ip" name=""  @keyup="errhide" :class="{'ip-err':deverr5==true}">
             </td>
           </tr>
            <tr>
             <td>
                <span class="ms-write">摄像头像素高度</span>
             </td>
             <td>
               <input type=""  placeholder="50个字符以内" maxlength="50" class="place-set" v-model="device_heigh" @keyup="errhide"  name="" :class="{'ip-err':deverr6==true}">
             </td>
           </tr>
            <tr>
             <td>
                  <span class="ms-write">摄像头像素宽度</span>
             </td>
             <td>
                 <input type="" placeholder="50个字符以内" maxlength="50"  class="place-set" v-model="device_width"  @keyup="errhide" name="" :class="{'ip-err':deverr7==true}">
             </td>
           </tr>
            <tr>
             <td>
                <span class="ms-write">摄像头账号</span>
             </td>
             <td>
               <input type="" placeholder="50个字符以内" maxlength="50"  class="place-set" name="" v-model="device_login" @keyup="errhide"  :class="{'ip-err':deverr8==true}">
             </td>
           </tr>
            <tr>
             <td>
                <span class="ms-write">摄像头密码</span> 
             </td>
             <td>
               <input type="" placeholder="50个字符以内" maxlength="50"  class="place-set"  v-model="device_pwd" name=""  @keyup="errhide" :class="{'ip-err':deverr9==true}">
             </td>
           </tr>
         </tbody>
       </table>
   </div>
  <span slot="footer" class="dialog-footer">
     <span class="add-err" v-show="isErr==true">
      <i class="el-icon-warning"></i>
       {{errtx}}
    </span>
    <el-button @click="addequiment = false">取 消</el-button>
    <el-button type="primary" @click="comfirmFn">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="删除设备"
  :visible.sync="isDel"
  width="460px"
  :before-close="handleClose">
  <span>确定删除选择的设备吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="delFn">确 定</el-button>
     <el-button @click="isDel = false">取 消</el-button>
  </span>
</el-dialog>

  </div>
</template>
<script>
export default{

  data(){

      return {
         companyName:"",
         cid:'',
         pid:"",
         notEdite:false,
         cpnerr:true,
         pawerr:true,
         inout:1,
         radio:'',
         cname:"",
         addequiment:false,
         currentPage2: 5,
         isErr:false,
         totalList:0,
         eqplace:"",
         ajax:false,
         errtx:"",
        //经度
            lat1:"",
            lat2:"",
            lat3:"",//经度
      
            long1:"",
            long2:"",
            long3:""
         ,//纬度
         tableData3: [
           
         ],
         device_id:"",
         device_address:"",
         device_latitude:"",
         device_longitude:"",
         device_ip:"",
         device_heigh:"",
         device_width:"",
         device_login:"",
         device_pwd:"",
          //表单错误
         deverr1:false,
         deverr2:false,
         deverr3:false,
         deverr4:false,
         deverr5:false,
         deverr6:false,
         deverr7:false,
         deverr8:false,
         deverr9:false,
         contNum:0,
         user_name:"",
         dtitle:"",
         isDel:false,
         delId:'',
        multipleSelection: [],
        page:1,
        pagesize:20,
        realdata:[]
      }
      

  },
  mounted(){
    this.cid = parseInt(this.$route.params.id);
    this.pid = parseInt(this.$route.params.pid);
    this.cname = this.$route.params.cname;
    this.initList();
  },

   watch:{
     lat1:function(val,oldVal){
          if(parseInt(val)>180){
              this.lat1 = oldVal;
          }
      },
      lat2:function(v,o){
          if(parseInt(v)>60){
              this.lat2 = o;
          }
      },
      long1:function(val,o){
         if(parseInt(val)>90){
              this.long1 = o;
          }
      },
      long2:function(v,o){
          if(parseInt(v)>60){
              this.long2 = o;
          }
      },
  }
  ,
  methods:{
      dataFn(){
        let start = (this.page-1)*this.pagesize;
        let end = this.page*this.pagesize;
        this.realdata = this.tableData3.slice(start,end);
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        
      },
      handleCurrentChange(val) {
        this.page = val;
        this.dataFn()
      },
      handleClose(){
         this.addequiment = false;
      },

      //添加设备
      addequimentFn(v,d){
        this.radio = "";
         if(v==1){
          this.dtitle="添加设备";
         //经度
            this.lat1 = "";
            this.lat2 = "";
            this.lat3 = "";//经度
            this.long1 = "";
            this.long2 = "";
            this.long3 = "";//纬度
         this.device_id="";
         this.device_address="";
         this.device_latitude="";
         this.device_longitude="";
         this.device_ip="";
         this.device_heigh="";
         this.device_width="";
         this.device_login="";
         this.device_pwd="";

         }else{

           this.dtitle="编辑设备";
            let  latarr = d.device_latitude.split(".");
            let  lonarr = d.device_longitude.split(".");
            this.lat1 = latarr[0];
            this.lat2 = latarr[1];
           
        //经度
         
            this.long1 = lonarr[0];
            this.long2 = lonarr[1];

         this.device_id=d.device_id;
         this.device_address=d.device_address;
         this.device_latitude=d.device_latitude;
         this.device_longitude=d.device_longitude;
         this.device_ip=d.device_ip;
         this.device_heigh=d.device_heigh;
         this.device_width=d.device_width;
         this.device_login=d.device_login;
         this.device_pwd=d.device_pwd;

          if(this.device_id%2==0){
              this.radio = "2"
            }else if(this.device_id%2==1){
              this.radio = "1"
            }
         }
          

         this.isErr = false;
         this.deverr1 = false;
         this.deverr2 = false;
         this.deverr3 = false;
         this.deverr4 = false;
         this.deverr5 = false;
         this.deverr6 = false;
         this.deverr7 = false;
         this.deverr8 = false;
         this.deverr9 = false;
         this.addequiment = true;
      },

      initList(){
         this.$api.post("/common_query_place_api",{
           "company_id":this.cid,
           place_id:this.pid

         },su=>{
          console.log(su);
          if(su.code==200){
               this.tableData3 = su.data;
               this.totalList = su.num;
               this.contNum = su.mobile;
               this.eqplace = su.place_address;
               this.user_name = su.user_name;
               this.dataFn();
               if(su.num==0){
                 this.ajax = true;
               }
          }else{
              this.totalList = 0;
               this.ajax = true;
          }
         },err=>{

         })
      },
      inoutFn(){
         if(this.device_id){
            if(this.device_id%2==0){
              this.radio = "2"
            }else if(this.device_id%2==1){
              this.radio = "1"
            }
         }else{
          this.radio = "";
         }
      },
      errhide(){
         
         this.deverr1 = false,
         this.deverr2 = false,
         this.deverr3 = false,
         this.deverr4 = false,
         this.deverr5 = false,
         this.deverr6 = false,
         this.deverr7 = false,
         this.deverr8 = false,
         this.deverr9 = false,
         this.isErr =false;
      },
      //添加设备
      comfirmFn(){
          if(!this.device_id){
             this.deverr1 = true;
             this.isErr =true;
             this.errtx = "摄像头ID不能为空"
             return
          }

          if(!this.device_address){
             this.deverr2 = true;
             this.isErr =true;
             this.errtx = "安装地址不能为空"
             return
          }

           if(!this.lat1 || !this.lat2){
             this.deverr3 = true;
             this.isErr =true;
             this.errtx = "经度不能为空"
             return
          }
           if(!this.long1 || !this.long2){
             this.deverr4 = true;
             this.isErr =true;
             this.errtx = "纬度不能为空"
             return
          }
           if(!this.device_ip){
             this.deverr5 = true;
             this.isErr =true;
             this.errtx = "摄像头IP不能为空"
             return
          }
           if(!this.device_heigh){
             this.deverr6 = true;
             this.isErr =true;
             this.errtx = "摄像头像素高度不能为空"
             return
          }
           if(!this.device_width){
             this.deverr7 = true;
             this.isErr =true;
             this.errtx = "摄像头像素宽度不能为空"
             return
          }
           if(!this.device_login){
             this.deverr8 = true;
             this.isErr =true;
             this.errtx = "摄像头账号不能为空"
             return
          }
           if(!this.device_pwd){
             this.deverr9= true;
             this.isErr =true;
             this.errtx = "摄像头密码不能为空"
             return
          }
          let lats= this.lat1+'.'+this.lat2;
          let longs = this.long1+'.'+this.long2;
          let url = "";
          if(this.dtitle == "添加设备"){
             url = "/admin_add_device_api";
          }else{
            url = "/admin_update_device_api";
          }

          this.$api.post(url,{
             company_id:this.cid,
             place_id:this.pid,
             device_id:this.device_id,
             device_address:this.device_address,
             device_latitude:lats,
             device_longitude:longs,
             device_ip:this.device_ip,
             device_heigh:parseInt(this.device_heigh),
             device_width:parseInt(this.device_width),
             device_login:this.device_login,
             device_pwd:this.device_pwd
          },su=>{
              console.log(su)
              if(su.code==200){
                  this.addequiment = false;
                  this.initList ();
                  this.$message({
                  message: '添加场地成功！',
                  type: 'success'
              });
            }else if(su.code==408){
                this.deverr1 = true;
                this.isErr =true;
                this.errtx = "存在相同的摄像头ID"
            }else{
               this.$message.error('添加场地失败，请稍后再试！');
            }
          },err=>{
             this.$message.error('添加场地失败，请稍后再试！');
          })

      },
       //删除询问
      delPlace(v){
        console.log(v);
        this.delId = v;
        this.isDel = true;

      },
       //删除场地方法
      delFn(){
          this.$api.post("/admin_del_device_api",{
             company_id:this.cid,
             place_id:this.pid,
             device_id:this.delId
          },su=>{
            console.log(su);
            if(su.code==200){
              this.isDel = false;
              this.initList();
              this.$message({
                message: '删除设备成功！',
                type: 'success'
              });
            
            }else{
               this.$message.error('删除场地失败，请稍后再试！');
            }

          },err=>{
               this.$message.error('删除场地失败，请稍后再试！');
          })

      }
      
  }

}

</script>

<style scoped>
  .open-list{
     padding:30px 32px;
     background-color:white;
     min-height:1000px;
     position: relative;
  }
  .cpn-name{
  height:80px;
  background-color:#EAEAEA;
  line-height:80px;
  text-indent: 31px;
  color:#4D4D4D;
  }
  .cpn-name input{
    margin-left:11px;
    width: 388px;
    height:34px;
    border:1px solid #ccc;
    text-indent: 16px;
    font-size: 12px;
    border-radius: 4px;
  }
   .cpn-name input::-webkit-input-placeholder{
    font-size:12px;
    color:ccc;
   }
   .data-all{
    color:#808080;
    font-size:12px;
    margin:40px 0 15px 0;
   }
   .data-all span{color:#378EEF;}
   .add-del{
    height:56px;
    background-color:#D5E2F5;
    line-height: 56px;
    margin:15px 0 20px 0;
   }
   .add-del button{
    width: 114px;
    height:34px;
    border:1px solid #CCCCCC;
    color:#4D4D4D;
    font-size: 14px;
    background-color: white;
    cursor: pointer;
    border-radius: 2px;
   }
   .add-del button{
    margin:0 14px 0 11px;
   }
   .has-slect{
    height:34px;
    background-color:#CEDFF6;
    line-height: 34px;
    color:#000000;
    font-size:12px;
    margin:20px 0 12px 0;
   }
   .has-slect span{
    color:#FEAD56;
 
   }
 .has-slect i{
  display: inline-block;
  width: 18px;
  height:18px;
  margin:8px 9px 8px 11px;
  float:left;
  background:url(../../assets/images/wornings.png) 0 0  no-repeat;
  
 }

 .slideout{
  position: absolute;
  width:922px;
  height:100%;
  transform: translateX(0);
  right:0;
  top:0;
  background-color:white;
  border:1px solid #999;
  box-sizing: border-box;
  z-index: 9999;
  padding:99px 71px;
 }
 .slide-fade-enter-active,.slide-fade-leave-active{
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
 
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(992px);
  opacity: 0;
}

.slideout h3{
  font-size:24px;
  color:#1A1A1A;
  margin-bottom: 33px;
}

.sli-head-cont{
  border-bottom: 1px solid #E6E6E6;
  position: relative;
  margin-bottom: 20px;
}
.sli-head-cont .li-cpnid{
  font-size:18px;
  color:#999999;
  margin-bottom: 15px;
}
.sli-head-cont .li-cpnid span{
  color:#4D4D4D;
}
.sli-head-cont .optime{
  font-size:14px;
  color:#999;
  margin-bottom: 27px;
}
.sli-head-cont .optime span{
   color:#4D4D4D;
}
.sli-head-cont button{
  width: 104px;
  height:34px;
  border:1px solid #5194E1;
  background-color:#378EEF;
  color:white;
  text-align: center;
  font-size:14px;
  border-radius:2px; 
  position: absolute;
  right:30px;
  bottom: 27px;
  cursor: pointer;
}

.sld-info-tt{
 font-size:14px;
 color:#1A1A1A;
 margin-bottom: 23px;
 margin-top:26px;

}
.sld-info-tt:before{
  content: "";
  display: inline-block;
  width:4px;
  height:16px;
  background-color: #378EEF;
  margin-right:5px;
  position: relative;
  top:2px;
}
 
 .slideout dd{
  font-size:14px;
  margin-bottom: 12px;
  height:34px;
  line-height: 34px;

 }
 .slideout dd input{
   width: 410px;
   height:32px;
   border:1px solid #CCCCCC;
   color:#1A1A1A;
   font-size:14px;
   text-indent:15px; 
   padding: 0;
   border-radius: 4px;
  }
 .le-text{
  color:#999999;
 }
 .ri-text{
  color:#1A1A1A;
  margin-left:12px;
 }
 .sld-close{
  display: inline-block;
  width: 16px;
  height:16px;
  background:url(../../assets/images/close.png) 0 0 no-repeat;
  position: absolute;
  right:18px;
  top:30px;
  cursor: pointer;
 }

 .comfir-btn{
  padding-top:20px;
  border-top: 1px solid #E6E6E6;
    margin-top:41px;
 }
 .comfir-btn button{
  width: 80px;
  height:34px;
  border-radius: 2px;
  box-sizing: border-box;
  font-size:14px;
  border:none;
  float:left;
  cursor: pointer;

 }
 .comfir-btn button:nth-child(1){
  background-color:#378EEF;
  color:white;
 }
 .comfir-btn button:nth-child(2){
  border:1px solid #999999;
    background-color:white;
    color:white;
    color:#4D4D4D;
    margin-left:20px;
 }
   
.ms-write:before{
  content: "*";
  display: inline-block;
  color:#F84C4C;
  position: relative;
  top:2px;
  margin-right:5px;
}   

.eq-link{
  
  color:#378EEF;
  font-size:12px;
}

.opartion{
  color:#378EEF;
  font-size:12px;
}
.opartion span{padding:0 5px;cursor: pointer;}
.back-list{
position: relative;
}
.back-list div{
  position: absolute;
  left:0;
  top:0;
}
.back-list div span{
  font-size:18px;
  color:#1A1A1A;
  margin-right:25px;
}
.back-list h2{
  text-align: center;
  color:#317DD2;
  font-size:22px;
  height:36px;
  line-height: 36px;
  min-width: 1000px;

}
.back-list h2 span{
  color:#FC9132;
}

.to-list{
  display: inline-block;
  width: 114px;
  height:34px;
  line-height: 34px;
  text-align: center;
  border:1px solid #378EEF;
  color:#378EEF;
  text-decoration: none;
  border-radius: 2px;

}
.type-in{
  color:#98C56B;
  font-size:12px;
}
.type-out{
  color:#F84C4C;
  font-size:12px;
}

.pages-cont{
  text-align: center;
  margin:38px 0 64px 0;
}
</style>
<style>
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
 .el-table td{
  font-size:12px;
  color:#1A1A1A;
 }

 .err{
  color:#F84C4C;
  font-size: 12px;
 }
  .err i{margin:0 11px 0 16px;}

  .ip-err{
    border:1px solid #F84C4C !important;
  }

  .after-ip em.h{
  position: absolute;
  left:122px;
  top:-20px;
  font-size:16px;
}
.after-ip em.s{
  position: absolute;
  left:260px;
  top:-9px;
  font-size:16px;
}
.after-ip em.mm{
  position: absolute;
  left:400px;
  top:-13px;
  font-size:16px;
}

.ip-lt{
    width: 108px;
    height:32px;
    border:1px solid #ccc;
    border-radius: 4px;
    margin-right:22px;
  }
 .err-cont{
    position: relative;
  }
.add-eq-cont{
  padding-left:15px;
}
.add-eq-cont input{
  text-indent: 10px;
  padding:0;
}
.add-eq-cont td{
  padding:7px 0;
}
.add-eq-cont td:nth-child(2){
  text-indent: 20px;
}
.place-set{
    width:410px;
    height:32px;
    border:1px solid #ccc;
    border-radius: 4px;
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
  color:#F84C4C;
  float:left;
  font-size: 12px;
  margin-top:10px;
}
.radios .el-radio{
  position: relative;
  left:-22px;
}
.radios .el-radio+.el-radio{
  margin-left: 0;
}


</style>