<template>
  <div class="open-list">
       <div class="back-list">
          <div class="place-sett">
          	  <span>场地设置</span>
          	  <router-link  to="openlist" class="to-list"><<返回列表</router-link>
          </div>
         
          <h2>
          	深圳飞马科技有限公司（企业ID：1234）
          </h2>
       </div>
       <p class="data-all">共 <span>992</span>条数据</p>
       <div class="add-del">
       	   <button type="button" @click="showAddPlace">添加场地</button>
     
       </div>
       <div class="has-slect">
       	  	<i class="icon-worning"></i>
       	  	已选择
       	  	<span>15</span>
       	  	项
       </div>

       <template>
		  <el-table
		    ref="multipleTable"
		    :data="tableData3"
		    tooltip-effect="dark"
		    class="text-center"
		    style="width: 100%"
		    @selection-change="handleSelectionChange"
        
		    >

		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>

		    <el-table-column
		      label="场地编号"
		      show-overflow-tooltip
		      prop="cpnName">
		     
		    </el-table-column>

		    <el-table-column
		      prop="cpnId"
		      label="场地名称"
		      show-overflow-tooltip
		       >
		    </el-table-column>

		    <el-table-column
		      prop="cpnTel"
		      label="经度"
		      show-overflow-tooltip
		     >
		    </el-table-column>

		    <el-table-column
		      prop="conetTel"
		      label="联系电话"
		      show-overflow-tooltip
		     >
		    </el-table-column>
		
		  <el-table-column
		      prop="conetName"
		      label="纬度"
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
		            <span>编辑</span>|
	                <span>删除</span>|
	                <span>设备管理</span>
		          	
		          </div>
		      </template>
		    </el-table-column>
 
		   </el-table>
		</template>
 <div class="block pages-cont">
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout=" prev, pager, next,sizes"
      :total="1000">
    </el-pagination>
  </div>


  <!-- 添加场地 -->

  <el-dialog
  class="add-user"
  title="添加场地"
  :visible.sync="dialogVisible"
  width="584px"
  height="486px"
  :before-close="handleClose">
  <div class="cont-add-info addplace-dl">
     <table>
         <tr>
           <td> 
             <span>场地编号</span>
            </td>
           <td>
            <div class="err-cont">
                <input placeholder=""  v-model="place_id" class='place-set' :class="{'ip-err':pliderr==true}"/>
                <span v-show="pliderr==true">
                  <i class="el-icon-warning"></i>
                  {{plerrtxt}}
                </span>
            </div>
           </td>
         </tr>
          <tr>
           <td>
            <span>场地名称</span> 
            </td>
           <td>
           <div class="err-cont">
             <input  class='place-set' v-model="place_address" placeholder="" :class="{'ip-err':plname==true}"/>
               <span v-show="plname==true">
                  <i class="el-icon-warning"></i>
                  场地名称不能为空
                </span>  
           </div>
         
           </td>
         </tr>
          <tr>
           <td> 
           <span>经度</span>
            </td>
           <td>
           <div class="err-cont after-ip">
              <input type="" name="" v-model="place_latitude.lat1" class="ip-lt" :class="{'ip-err':longerr==true}">
              <input type="" name="" v-model="place_latitude.lat2" class="ip-lt" :class="{'ip-err':longerr==true}">
              <input type="" name="" v-model="place_latitude.lat3" class="ip-lt" :class="{'ip-err':longerr==true}">
               <span v-show="longerr==true">
                  <i class="el-icon-warning"></i>
                  经度不能为空

                </span>
                <em class="h">。</em>
                <em class="s">'</em>
                <em class="mm">"</em>
           </div>
              
           </td>
         </tr>
         <tr>
           <td> 
           <span>纬度</span>
            </td>
           <td>
            <div class="err-cont after-ip">
                <input type="" name=""  v-model="place_longitude.long1" class="ip-lt" :class="{'ip-err':laterr==true}">
              <input type="" name="" v-model="place_longitude.long2" class="ip-lt" :class="{'ip-err':laterr==true}">
              <input type="" name=""  v-model="place_longitude.long3" class="ip-lt" :class="{'ip-err':laterr==true}">
               <span v-show="laterr==true">
                  <i class="el-icon-warning"></i>
                  纬度不能为空
                </span>
                <em class="h">。</em>
                <em class="s">'</em>
                <em class="mm">"</em>
            </div>
            
           </td>
         </tr>
     </table>
      
  </div>
  <span slot="footer" class="dialog-footer">
    
     <el-button type="primary" @click="addPlace">确 定</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
  
  </span>
</el-dialog>



  </div>
</template>
<script>
export default{

	data(){

      return {
         companyName:"",
         notEdite:false,
         cpnerr:true,
         currentPage2: 5,
         pawerr:true,
         dialogVisible:false,
         id:0,
         pliderr:false,//地点ID错误
         plerrtxt:"",//id错误提示语
         plname:false,//地点错误
         longerr:false,//经度错误
         laterr:false,//纬度错误，
         place_id:"",//地点ID
         place_address:"",//地点
         place_latitude:{
            lat1:"",
            lat2:"",
            lat3:""
         },//经度
         place_longitude:{
            long1:"",
            long2:"",
            long3:""
         },

         tableData3: [
           {
           	cpnName:"飞马科技sdfsdfsdfsdfsdf",
           	cpnId:110,
           	cpnTel:"0775-8789443",
           	conetTel:13686800944,
           	conetName:"jack",
           	openTime:"2018-01-21 08:00:00",
           	places:"宝体",
           	equipment:"摄像头"
           },
           {
           	cpnName:"飞马科技",
           	cpnId:110,
           	cpnTel:"0775-8789443",
           	conetTel:13686800944,
           	conetName:"jack",
           	openTime:"2018-01-21 08:00:00",
           	places:"宝体",
           	equipment:"摄像头"
           },
           {
           	cpnName:"飞马科技",
           	cpnId:110,
           	cpnTel:"0775-8789443",
           	conetTel:13686800944,
           	conetName:"jack",
           	openTime:"2018-01-21 08:00:00",
           	places:"宝体",
           	equipment:"摄像头"
           },
           {
           	cpnName:"飞马科技",
           	cpnId:110,
           	cpnTel:"0775-8789443",
           	conetTel:13686800944,
           	conetName:"jack",
           	openTime:"2018-01-21 08:00:00",
           	places:"宝体",
           	equipment:"摄像头"
           }
         ],
        multipleSelection: []
      }
      

	},
	mounted(){
    this.id = this.$route.params.id;
    this.initList();
    console.log(this.id);
	},
	methods:{
		
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      initList(){
         this.$api.post("/common_query_company_api",{
           "company_id":parseInt(this.id),
         },su=>{
          console.log(su);
         },err=>{

         })
      },
      //添加场地
      showAddPlace(){
         this.pliderr=false;
         this.plerrtxt="";
         this.plname=false;
         this.longerr=false;
         this.laterr=false;
         this.place_id = "";
         this.place_address = "";
          this.place_latitude = {
            lat1:"",
            lat2:"",
            lat3:""
         },//经度
         this.place_longitude = {
            long1:"",
            long2:"",
            long3:""
         },

         this.dialogVisible = true;

      },
      addPlace(){

        if(!this.place_id){
           this.pliderr=true,
           this.plerrtxt="场地编号不能为空";
           return
        }

        if(!this.place_address){
           this.plname=true;
           return
        }


        if(!this.place_latitude.lat1 || !this.place_latitude.lat2){
           this.longerr=true;
           return
        }

        if(!this.place_longitude.long1 || !this.place_longitude.long2){
           this.laterr=true;
           return
        }

        let lats= this.place_latitude.lat1+'.'+this.place_latitude.lat2;
        let longs = this.place_longitude.long1+'.'+this.place_longitude.long2;
        this.$api.post("/admin_add_place_api",{

            company_id:parseInt(this.id),
            place_address:this.place_address,
            place_latitude:lats,
            place_longitude:longs,
            place_id:parseInt(this.place_id)

        },su=>{
           if(su.code==200){
               this.dialogVisible = false;
                this.$message({
                message: '添加场地成功！',
                type: 'success'
              });
           }else{
              this.$message.error('添加场地失败，请稍后再试！');
           }

        },err=>{
            this.$message.error('添加场地失败，请稍后再试！');
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


.pages-cont{
  text-align: center;
  margin:38px 0 64px 0;
}
.addplace-dl{
  padding-bottom: 40px;
}
.addplace-dl td{
    width: 70px;
    padding:17px 0;
  }
  .place-set{
    width:410px;
    height:32px;
    border:1px solid #ccc;
    border-radius: 4px;
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
.err-cont span{
   position:absolute;
   bottom: -25px;
   color:#F84C4C;
   font-size:12px;
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
  top:-13px;
  font-size:16px;
}
.after-ip em.mm{
  position: absolute;
  left:400px;
  top:-13px;
  font-size:16px;
}

.addplace-dl td:nth-child(1) span:before{
   content: "*";
   color:red;
   position: relative;
   top:2px;
   left:-5px;
}
.addplace-dl input{
  text-indent: 10px;

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

  

</style>