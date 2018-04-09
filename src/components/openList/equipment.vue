<template>
  <div class="open-list">


       <div class="back-list">
          <div class="place-sett">
          	  <span>设备管理</span>
          	  <router-link  to="openlist" class="to-list"><<返回列表</router-link>
          </div>
         
          <h2>
          	深圳飞马科技有限公司（企业ID：1234）| <span>1号场地~足球场</span>
          </h2>
       </div>
       <p class="data-all">共 <span>992</span>条数据</p>
       <div class="add-del">
       	   <button type="button" @click="addequiment">添加设备</button>
     
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
		      label="摄像头ID"
		      show-overflow-tooltip
		      prop="cpnName">
		     
		    </el-table-column>

		    <el-table-column
		      prop="cpnId"
		      label="出入类型"
		      show-overflow-tooltip
		       >

           <template slot-scope="scope">
                <span v-if="inout==0" class="type-in">出</span>
                <span v-if="inout==1" class="type-out">入</span>
          </template>
		    </el-table-column>

		    <el-table-column
		      prop="cpnTel"
		      label="安装地址"
		      show-overflow-tooltip
		     >
		    </el-table-column>

		    <el-table-column
		      prop="conetTel"
		      label="经度"
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
          prop="conetName"
          label="摄像头IP"
          show-overflow-tooltip
         >
        </el-table-column>

         <el-table-column
          prop="conetName"
          label="摄像头像素高度"
          show-overflow-tooltip
         >
        </el-table-column>
         <el-table-column
          prop="conetName"
          label="摄像头像素宽度"
          show-overflow-tooltip
         >
        </el-table-column>

         <el-table-column
          prop="conetName"
          label="摄像头账号"
          show-overflow-tooltip
         >
        </el-table-column>
         <el-table-column
          prop="conetName"
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
		            <span>编辑</span>|
	                <span>删除</span>
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
      layout="prev, pager, next,sizes"
      :total="1000">
    </el-pagination>
  </div>

  <el-dialog
  class="add-equip add-user"
  title="添加设备"
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
               <input type="" class="ip-err place-set" placeholder="50个字符以内" name="">
             </td>
           </tr>
            <tr>
             <td>
             <span>出入类型</span>
             </td>
             <td class="radios">
                <template>
                  <el-radio v-model="radio" label="1">出</el-radio>
                  <el-radio v-model="radio" label="2">入</el-radio>
                </template>

             </td>
           </tr>
            <tr>
             <td>
               <span class="ms-write">安装地址</span>
             </td>
             <td>
               <input type="" class="place-set" placeholder="20个字符以内" name="">
             </td>
           </tr>
            <tr>
             <td>
               <span class="ms-write">经度</span>
             </td>
             <td>
              
            <div class="err-cont after-ip">
              <input type="" name="" class="ip-lt">
              <input type="" name="" class="ip-lt">
              <input type="" name="" class="ip-lt">
               
                <em class="h">。</em>
                <em class="s">'</em>
                <em class="mm">"</em>
        
               </div>
             </td>
           </tr>
            <tr>
             <td>
                <span class="ms-write">纬度</span>
             </td>
             <td>
               <div class="err-cont after-ip">
              <input type="" name="" class="ip-lt">
              <input type="" name="" class="ip-lt">
              <input type="" name="" class="ip-lt">
               
                <em class="h">。</em>
                <em class="s">'</em>
                <em class="mm">"</em>
        
               </div>
             </td>
           </tr>
            <tr>
             <td>
                 <span class="ms-write">摄像头IP</span>
             </td>
             <td>
               <input type="" class="place-set"  name="">
             </td>
           </tr>
            <tr>
             <td>
                <span class="ms-write">摄像头像素高度</span>
             </td>
             <td>
               <input type="" class="place-set" name="">
             </td>
           </tr>
            <tr>
             <td>
                  <span class="ms-write">摄像头像素宽度</span>
             </td>
             <td>
                 <input type="" class="place-set" name="">
             </td>
           </tr>
            <tr>
             <td>
                <span class="ms-write">摄像头账号</span>
             </td>
             <td>
               <input type="" class="place-set" name="">
             </td>
           </tr>
            <tr>
             <td>
                <span class="ms-write">摄像头密码</span> 
             </td>
             <td>
               <input type="" class="place-set"  name="">
             </td>
           </tr>
         </tbody>
       </table>
   </div>
  <span slot="footer" class="dialog-footer">
     <span class="add-err">
      <i class="el-icon-warning"></i>
       存在相同的公司名称
    </span>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
         pawerr:true,
         inout:1,
         radio:'1',
         addequiment:true,
         currentPage2: 5,
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
  
	},
	methods:{
		
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        
      },
      handleCurrentChange(val) {
       
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
  top:-13px;
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