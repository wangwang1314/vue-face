<template>
  <div class="open-list">

       <div class="cpn-name">
           公司名称
           <input type="text" placeholder="请输入公司名称" v-model="companyName"/>
       </div>
       <p class="data-all">共 <span>992</span>条数据</p>
       <div class="add-del">
       	   <button type="button" @click="dialogVisible=true">新增用户</button>
       	   <button type="button"  @click="open">删除公司</button>
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
		    :data="companyList"
		    tooltip-effect="dark"
		    class="text-center"
		    style="width: 100%"
		    @selection-change="handleSelectionChange"
            @row-click="rowFn(companyList)"
		    >
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>

		    <el-table-column
		      label="公司名称"
		      show-overflow-tooltip
		      prop="user_name">
		     <template slot-scope="scope">
             <router-link to="EuquiList" class="eq-link">{{scope.row.user_name}}</router-link>
         </template>
		    </el-table-column>

		    <el-table-column
		      prop="company_id"
		      label="企业ID"
		      show-overflow-tooltip
		       >
		    </el-table-column>

		    <el-table-column
		      prop="tel"
		      label="公司电话"
		      show-overflow-tooltip
		     >
		    </el-table-column>

		    <el-table-column
		      prop="mobile"
		      label="联系电话"
		      show-overflow-tooltip
		     >
		    </el-table-column>
		
		  <el-table-column
		      prop="person"
		      label="联系人"
		      show-overflow-tooltip
		     >
		    </el-table-column>

		    <el-table-column
		      prop="build_time"
		      label="开户时间"
		      show-overflow-tooltip
		      >
		    </el-table-column>

		     <el-table-column
		      prop="places"
		      label="场地"
		      show-overflow-tooltip
		      >
		      <template slot-scope="scope">
		          <router-link to="Places" class="eq-link">场地1</router-link>
		      </template>
		    </el-table-column>
 
             <el-table-column
		      prop="equipment"
		      label="设备"
		      show-overflow-tooltip
		    >
		     <template slot-scope="scope">
		          <router-link to="Equipment" class="eq-link">设备1</router-link>
		      </template>
		    </el-table-column>

		   </el-table>
		</template>

		 <transition name="slide-fade">
		      <div v-if="slideFlag" class="slideout">
		      	 <h3>深圳飞马科技有限公司</h3>
		      	 <div class="sli-head-cont">
			      	 <div class="li-cpnid">
			      	 	企业ID：<span>123456</span>
			      	 </div>
			      	 <div class="optime">
			      	 	 开户时间：<span>2018-03-21 08：00：00</span>
			      	 </div>
			      	 <button type="button">编辑</button>
		      	 </div>

		      	 <h4 class="sld-info-tt">公司名称</h4>
		      	 <dl>
		      	 	<dd>
		      	 		<span class="le-text ms-write">公司名称：</span>
		      	 		<span class="ri-text"  v-show="notEdite==true">深圳飞马科技有限公司</span>
		      	 		<input type="text" name="cpnname" :class="{'ip-err':cpnerr==true}">
		      	 		<span class="err"><i class="el-icon-warning"></i>存在相同的公司名称</span>
		      	 	</dd>
		      	 	<dd>
		      	 		<span class="le-text ms-write">管理密码：</span>
		      	 		<span class="ri-text" v-show="notEdite==true">123455</span>
		      	 		<input type="text" name="password" :class="{'ip-err':pawerr==true}">
		      	 		<span class="err"><i class="el-icon-warning"></i>管理密码不能为空</span>
		      	 	</dd>
		      	 	<dd>
		      	 		<span class="le-text" style="margin-left:12px">公司电话：</span>
		      	 		<span class="ri-text" v-show="notEdite==true">0775-8789443</span>
		      	 		<input type="text" name="cpmtel">
		      	 	</dd>
		      	 </dl>
		      	 <h4 class="sld-info-tt">联系人信息</h4>
		      	 <dl>
		      	 	<dd>
		      	 		<span class="le-text">联系人姓名：</span>
		      	 		<span class="ri-text" v-show="notEdite==true">于飞马</span>
		      	 		<input type="text" name="ctname">
		      	 	</dd>
		      	 	
		      	 	<dd>
		      	 		<span class="le-text">联系人号码：</span>
		      	 		<span class="ri-text" v-show="notEdite==true">0775-8789443</span>
		      	 		<input type="text" name="ctnumber">
		      	 	</dd>
		      	 </dl>

		      	 <div class="comfir-btn">
		      	 	<button type="button" class="comf-btn">确定</button>
		      	 	<button type="button" class="cal-btn">取消</button>
		      	 </div>
		      	 <i class="sld-close" @click="slideFlag=false"></i>
		      </div>
		 </transition>
        <!--  设备列表 -->
		 <transition>
		  <keep-alive>
		    <router-view></router-view>
		  </keep-alive>
		</transition>

 <div class="block pages-cont">
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="prev, pager, next,sizes"
      :total="1000">
    </el-pagination>
  </div>

  <!-- 新增用户 -->

  <el-dialog
  class="add-user"
  title="新增开户"
  :visible.sync="dialogVisible"
  width="584px"
  height="486px"
  :before-close="handleClose">
  <div class="cont-add-info">
   <h3>公司信息</h3>
   <div>
   	  <span class="mst-w">公司名称</span>
   	  <input type="" v-model="userName" maxlength="35" @keydown="showErr(1)" :class="{'bd-red':userName.length==0 && addErrtext.length>0}" placeholder="35字以内，例如：深圳一二三有限公司" name="" class="cpn-ip">
   </div>
   <div>
   	  <span class="mst-w">管理密码</span>
   	  <input type="" v-model="userPwd" maxlength="50" @keydown="showErr(2)" placeholder="请输入管理密码" name="" class="cpn-ip">
   </div>
    <div>
   	  <span>公司电话</span>
   	  <input type="" v-model="tel" maxlength="20" placeholder="请输入公司座机" name="" class="cpn-ip">
   </div>

     <h3 class="ct-info">联系人信息</h3>
     <div>
     	<span>联系人姓名</span>
     	 <input type="" v-model="person" maxlength="10" placeholder="请输入姓名" name="" class="person-ip">
     </div>
      <div>
     	<span>联系人号码</span>
     	 <input type="" v-model="mobile" maxlength="20" placeholder="请输入座机或手机号" name="" class="person-ip">
     </div>

  </div>
  <span slot="footer" class="dialog-footer">
    <span class="add-err">
    	<i class="el-icon-warning" v-show="errWorn==true"></i>
    	 {{addErrtext}}
    </span>
     <el-button type="primary" @click="comfirmAdd">确 定</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
  
  </span>
</el-dialog>

 
  <el-dialog
  class="del-dialog"
  title="删除公司"
  :visible.sync="delet"
  width="460px"
 
  :before-close="handleClose">
  <p>确定删除选择的公司吗？</p>
  <span slot="footer" class="dialog-footer">
    <span class="will-del">
    	已选择<em>22</em>家公司
    </span>
     <el-button type="primary" @click="delet = false">确 定</el-button>
    <el-button @click="delet = false">取 消</el-button>
  
  </span>
</el-dialog>





  </div>
</template>
<script>
export default{

	data(){

      return {
         companyName:"",
         slideFlag:false,
         notEdite:false,
         cpnerr:true,
         pawerr:true,
         userId:'admin',//通过用户的ID去查询列表
         dialogVisible:false,
         currentPage2: 5,
         delet:false,
         userName:"",//开户接口，公司名称
         userPwd:'',//密码
         tel:'',//公司电话
         person:"",//联系人姓名
         mobile:"",//联系电话
         addErrtext:"",
         errWorn:false,
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
        companyList:[], //列表
        multipleSelection: []
      }
      

	},
	mounted(){
    this.initList();
	},
	methods:{
		
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      rowFn(item){
      	this.slideFlag = !this.slideFlag;
      	console.log(item);
      },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClose(){

      },
       open() {
        this.$alert('请至少选择1家公司进行操作！', '删除公司', {
          confirmButtonText: '知道了',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      //初始化开户列表
      initList(){
        this.$api.post("/admin_query_api",{"user_id":this.userId},su=>{
            console.log(su);
            if(su.code==200){
              this.companyList = su.data;
            }else{
               this.$message.error(su.msg);
            }
        },err=>{
            this.$message.error(su.msg);
        })
      },
      //开户
      comfirmAdd(){
         if(!this.userName){
            this.errWorn=true;
            this.addErrtext="公司名称不能为空";
            return
         }
         if(!this.userPwd){
            this.errWorn=true;
            this.addErrtext="管理密码不能为空";
            return
         }

         this.$api.post('/admin_register_api',{
             user_name:this.userName,
             user_pwd:this.userPwd,
             tel:this.tel,
             person:this.person,
             mobile:this.mobile
         },su=>{
          console.log(su)
          if(su.code==200){
              this.dialogVisible = false;
              this.$message({
              message: '开户成功！',
              type: 'success'
            });
          }
         },err=>{
             this.$message.error('开户失败，请稍后再试！');
         },)

      },
      //添加错误
      showErr(){
            this.errWorn=false;
            this.addErrtext="";
        
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


.pages-cont{
  text-align: center;
  margin:38px 0 64px 0;
}

.cont-add-info h3{
	font-size: 14px;
	color:#1A1A1A;
	margin-bottom: 23px;
	height:16px;
	margin-top:10px;

	
}
.cont-add-info h3:before{
  content: "";
  display: inline-block;
  width: 4px;
  height:16px;
  background-color: #378EEF;
  margin-right: 7px;
  vertical-align: middle;
  position: relative;
  top:-1px;

}
.cont-add-info div{
	padding-left:20px;
	height:34px;
	line-height: 34px;
	margin-bottom: 12px;
}

.cont-add-info div span{
	font-size: 14px;
	color:#4D4D4D;
	margin-right:15px;
	position: relative;
}
.mst-w:before{
	content: "*";
	position: absolute;
	left:-10px;
	top:-5px;
	color:red;


}
.cont-add-info div input{
	border:1px solid #ccc;
	padding: 0;
	border-radius: 4px;
	text-indent: 10px;
}
.cont-add-info div input::-webkit-input-placeholder{
	color:#CCCCCC;
}

.cpn-ip{
	width:410px;
	height:32px;

}
.person-ip{
	width:396px;
	height:32px;
}

.add-err{
	color:#F84C4C;
	float:left;
	font-size: 12px;
}
.ct-info{
	padding-top:20px;
}


.will-del{
	float:left;
	position: relative;
	top:8px;
	font-size:14px;
	color:#999999;
}
.will-del em{
	color:#378EEF;
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
</style>