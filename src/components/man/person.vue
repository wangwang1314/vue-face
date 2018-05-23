<template>
    <div class="person" >
         <transition name="fade">
            <div class="slider-box" v-if="slider" @click.stop="">
              <p class="close-p"><i @click="closeFn">×</i></p>
              <div class="info">
                <img :src="setobj.img">
                <div>
                  <p class="name">{{setobj.name}}</p>
                  <img v-if="setobj.face_type!=1" src="../../assets/images/fk.png">
                  <img v-else src="../../assets/images/vip.png">
                  <div>
                    <p>
                      <span>入库时间：</span>
                      {{setobj.build_time}}
                    </p>
                    <p>
                      <span>更新时间：</span>
                      {{setobj.build_time}}
                    </p>
                    <button @click="editman">编辑</button>
                  </div>
                </div>
              </div>
              <div>
                 <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="线路轨迹" name="first">
                   <!-- <div class="time-div over-auto">
                        <p>
                          <span>出入时间 ：</span>
                           <span >2018-03-10</span>
                        </p>
                        <div style="overflow:auto">
                          <span>线路轨迹 :</span> 
                            <div class="line-class">
                              <div class="ad-box">
                                <p class="in-out">入</p>
                                <p class="address">汇通大厦</p>
                                <p class="time">09:29:01</p>
                              </div>
                              <img src="../../assets/images/jtou.png">
                            </div>
                        </div>
                    </div> -->
                     <div style="text-align:center;margin-top:100px;" v-show="totaldata.length==0">
                      <img src="../../assets/images/no-num.png">
                      <p style="margin-top:44px;color:#999999;font-size:18px;">抱歉！~暂无数据~</p>
                    </div>
                    <div style="overflow:auto;max-height:700px;padding:0 5px;">
                      <template v-for="item in totaldata">
                        <div class="time-div over-auto">
                          <p>
                            <span>出入时间 ：</span>
                             <span v-for="(child,index) in item.data" v-show="index==0">{{child.timeStamp.split(" ")[0]}}</span>
                          </p>
                          <div style="overflow:auto">
                            <span>线路轨迹 :</span>
                            <template v-for="(child,ind) in item.data">
                              <div class="line-class">
                                <div class="ad-box">
                                  <p class="in-out" v-if="child.device_id%2!=0">入</p>
                                  <p class="in-out" v-else>出</p>
                                  <p class="address" :class="{'add-out':child.device_id%2==0}">{{child.device_address}}</p>
                                  <p class="time">{{child.timeStamp.split(" ")[1]}}</p>
                                </div>
                                <img src="../../assets/images/jtou.png" v-if="ind!=(item.data.length-1)"> 
                              </div>
                            </template>
                          </div>
                        </div>
                      </template>
                    </div>
                    
                  </el-tab-pane>
                  <el-tab-pane label="出入记录" name="second">
                    <div style="text-align:center;margin-top:100px;" v-show="totaldata.length==0">
                      <img src="../../assets/images/no-num.png">
                      <p style="margin-top:44px;color:#999999;font-size:18px;">抱歉！~暂无数据~</p>
                    </div>
                    <div style="overflow:auto;max-height:700px;padding:0 5px;">
                      <template v-for="item in totaldata">
                        <div class="time-div record" v-for="(child,index) in item.data">
                          <p>
                            <span>出入时间 ：</span>
                             {{child.timeStamp}}
                          </p>
                          <div>
                            <p>设备地址 ： {{child.device_address}}</p>
                            <p>场地名称 ： {{item.place_address}}</p>
                            <p>出入类型 ： <span class="reder" v-if="child.device_id%2!=0">出</span><span class="reder" v-else>入</span></p>
                            <img src="../../assets/images/out.png" v-if="child.device_id%2!=0">
                            <img src="../../assets/images/to.png" v-else>
                          </div>
                        </div>
                      </template>
                    </div>  
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
                  <el-tab-pane label="出入权限" name="third">
                    <div style="text-align:center;margin-top:100px;" v-show="rightcontent.length==0">
                      <img src="../../assets/images/no-num.png">
                      <p style="margin-top:44px;color:#999999;font-size:18px;">抱歉！~暂无数据~</p>
                    </div>
                  <div style="overflow:auto;max-height:700px;padding:0 5px;">
                    <template v-for="(item,index) in rightcontent">
                    <div class="edit-class">权限{{index+1}}
                      <button @click="delright(item)">删除</button>     
                    </div>
                    <div class="rep-class">
                        <p class="per-p">
                          <i></i>
                          <span>出入时间段</span> 
                          <span style="font-size:14px;color:#303133;font-weight:500;">{{item.data[0].fromTimeStamp}} 至 {{item.data[0].toTimeStamp}}</span>
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
      <!-- <div class="header">
        <span>头像</span>
         <el-select v-model="value4" clearable placeholder="请选择" class="sur-selct">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
         <span @click="addFn">新增人员</span>
         
        <el-upload
            class="upload-style"
            action="https://jsonplaceholder.typicode.com/posts/"
            ref="uploadimg"
            :on-change="changeList"
            :file-list="imglist"
            :show-file-list="false"
            :auto-upload="false"
            :limit="100"
            multiple
            :on-exceed="handleExceed"
            >
            <span>批量导入照片</span>
        </el-upload>
         <span @click="delMan">删除人员</span>
         <!-- <span @click="setMan">设置权限</span> -->
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
            height="700"
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
            <el-table-column
              label="类型"
              >
              <template slot-scope="scope">
                <span v-if="scope.row.face_type==1">VIP</span>
                <span v-else>访客</span>
              </template>
            </el-table-column>
             <el-table-column
              label="入库时间"
              prop="build_time"
              show-overflow-tooltip>
            </el-table-column>
             <el-table-column
              label="更新时间"
              prop="build_time"
              show-overflow-tooltip>
            </el-table-column>
             <el-table-column
              label="操作"
              width="300">
              <template slot-scope="scope">
                <el-button type="text" @click.stop="addright(scope)">添加权限</el-button>
                <el-button type="text" @click.stop="clearright(scope)">清除权限</el-button>
              </template>
            </el-table-column>
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

         

       <!--  添加人员 -->
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
              <input type="text" name="" maxlength="20" placeholder="请输入姓名，20字以内，必须填" :class="{'uncheck':check.input}" v-model="name">
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
       <!--  编辑人员 -->
       <div class="box" @click.stop="">
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
                <img :src="setobj.img" >
              </div>
          <!--   <p class="tit-tou">上传头像</p> -->
            <p class="name-ipt">
              <span><i class="red">*</i>姓名</span>
              <input type="text" name="" disabled placeholder="请输入姓名，20字以内，必须填" :class="{'uncheck':check.input}" v-model="setobj.name">
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

      <!--删除人员-->
      <el-dialog
        :visible.sync="deldialog"
        width="460px">
        <span slot="title" class="del-tit">删除人员</span>
        <div>确定删除选择的人员吗？</div>
        <span slot="footer" class="dialog-footer">
          <span class="del-box" >已选择<i>{{selectval.length}}</i>位人员</span>
          <el-button type="primary" @click="delFn">确 定</el-button>
          <el-button @click="deldialog = false">取 消</el-button> 
        </span>
      </el-dialog>
      
      <!--批量导入人员-->
      <el-dialog
        :visible.sync="numdialog"
        width="460px">
        <span slot="title" class="del-tit">批量导入照片结果</span>
        <div class="pic-cla"><i></i>新增导入 {{info.sunum}} 人，失败<span style="color:#F84C4C;"> {{info.fanum}} </span> 人</div>
        <span slot="footer" class="dialog-footer">
          <!-- <span class="del-box" >已选择<i>{{selectval.length}}</i>位人员</span> -->
          <el-button type="primary" @click="numdialog = false">知道了</el-button>
        <!--   <el-button @click="deldialog = false">取 消</el-button>  -->
        </span>
      </el-dialog>

        <!--  添加权限 -->
       <div class="box">
          <el-dialog
          title="添加权限"
          :visible.sync="setdialog"
          width="736px">
          <span slot="title" >添加<span style="color:#378eef">&nbsp;{{setobj.name}}&nbsp;</span>权限</span>
          <div class="content-set">
                <!-- <p class="select-p">共选择添加 <span>{{selectval.length}}</span> 位人员：</p> -->
              <!--   <div class="select-div">
                  <el-tag
                    :key="tag.face_id"
                    v-for="tag in selectval"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag.name}}
                  </el-tag>
                </div>
                <p class="select-p">添加出入权限：</p> -->

                <div class="rep-class">
                    <div class="pad-class" :class="{'pad-warn':rightwarn.time}">
                      <p class="per-p">
                        <i></i>
                        <span>出入时间段</span> 
                       <!--  <el-date-picker
                          v-model="value3"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          value-format="yyyy-M-d hh:mm:ss"
                          end-placeholder="结束日期">
                        </el-date-picker> -->
                        <el-date-picker
                          v-model="value1"
                          type="datetime"
                          value-format="yyyy-M-d hh:mm:ss"
                          placeholder="选择开始时间">
                        </el-date-picker>
                        <span style="margin:0 18px;font-size:16px;color: #606266;font-weight:normal;">至</span>
                        <el-date-picker
                          v-model="value2"
                          type="datetime"
                          value-format="yyyy-M-d hh:mm:ss"
                          placeholder="选择结束时间">
                        </el-date-picker>
                      </p>
                    </div>
                    <div class="pad-class" :class="{'pad-warn':rightwarn.in}">
                      <p class="per-p">
                        <i></i>
                        <span>入口权限</span> 
                      </p>
                      <div class="con-box">
                        <p><el-checkbox  v-model="placelistin.ischeck" @change="changeall(placelistin)">全选</el-checkbox></p>
                        <div style="margin-left:15px;">
                          <template v-for="item in placelistin">
                            <p><el-checkbox  v-model="item.ischeck" @change="changepl(item,placelistin)">{{item.place_address}}</el-checkbox></p>
                            <div class="check-box">
                              <p v-for="child in item.data"><el-checkbox  v-model="child.ischeck" @change="changede(child,item,placelistin)">{{child.device_address}}</el-checkbox></p>
                            </div>
                          </template>
                        </div>
                      </div>
                     </div>
                    <div class="pad-class" :class="{'pad-warn':rightwarn.out}">  
                      <p class="per-p">
                        <i></i>
                        <span>出口权限</span> 
                      </p>
                      <div class="con-box">
                        <p><el-checkbox  v-model="placelistout.ischeck" @change="changeall(placelistout)">全选</el-checkbox></p>
                        <div style="margin-left:15px;">
                          <template v-for="item in placelistout">
                            <p><el-checkbox  v-model="item.ischeck" @change="changepl(item,placelistout)">{{item.place_address}}</el-checkbox></p>
                            <div class="check-box">
                              <p v-for="child in item.data"><el-checkbox  v-model="child.ischeck" @change="changede(child,item,placelistout)">{{child.device_address}}</el-checkbox></p>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>  
                </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <span class="warn-box" v-show="err"><i></i>{{errtit}}</span>
            <el-button type="primary" @click="addrightFn">确 定</el-button>
            <el-button @click="setdialog = false">取 消</el-button> 
          </span>
        </el-dialog>
      </div>
      <div style="text-align:center;margin-top:216px;" v-show="total==0&&ajax">
        <img src="../../assets/images/no-num.png">
        <p style="margin-top:44px;color:#999999;font-size:18px;">抱歉！~暂无数据~</p>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {

  data () {
    return {
      value1:"",
      value2:"",
      value4:"",
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
      data:[],
      selectval:[],
      total:0,
      deldialog:false,
      setdialog:false,
      htmlTitle:"人员管理",
      imglist:[],
      numlist:0,
      info:{
        sunum:0,
        fanum:0
      },
      numdialog:false,
      setobj:{},
      placelistin:[],
      placelistout:[],
      page:1,
      pagesize:20,
      realdata:[],
      rightwarn:{
        time:false,
        in:false,
        out:false
      },
      editdialog:false,
      totaldata:[],
      rightcontent:[],
      ajax:false
    }
  },
  mounted(){
      this.id = Number(sessionStorage.getItem("users"));
      this.getList();
  },
  computed:{
    ...mapState({
      slider:function(state){    
        return state.slider;
      }
    })
  },
  watch:{
    isShow:function(){
     // console.log(11111)
    }
  },
  methods:{
    handleSizeChange(val){
      this.pagesize = val;
      //console.log(this.page,this.pagesize)
      this.dataFn();
    },
    handleCurrentChange(val){
      //console.log(this.page,this.pagesize)
      this.dataFn();
    },
    show(){
      this.$store.state.slider = true;
     
    },
    getrecord(){
      this.$api.post("/client_query_face_id_record_api",{
          company_id:this.id,
          face_id:this.setobj.face_id,
          place_id:0,
          fromTimeStamp:"2018-1-1 00:22:22",
          toTimeStamp:"2100-1-1 00:22:22"
        },
        su=>{
          if(su.code==200){
            su.total_data.forEach((val,index)=>{
              val.place_address="";
              this.getplacename(val.place_id,index);
            })
            this.totaldata = su.total_data;
          }
        },
        err=>{

      })
    },
    closeFn(){
       this.$store.state.slider = false;
    },
    handleClick(){

    },
    addFn(){
      this.check.img = false;
      this.check.input = false;
      this.name = "";
      this.type = "1";
      this.title = "新增人员";
      // this.btntext = "上传头像";
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
          // that.btntext = "重新上传";
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
            
            if(su.num>0){
              let that = this;
              su.data.forEach(function(val,index){
                  val.img = "";
                  val.name = "";
                  that.getImg(val,index)
              })
            }
            this.data = su.data;
            this.total = su.num;
            if(su.num==0){
              this.ajax = true;
              this.realdata = [];
            }
            this.dataFn()
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
      this.$api.post("/client_mng_add_face_api",
        {
          company_id:this.id,
          face_type:Number(this.type),
          face_user_name:this.name,
          face_image_type:this.imgtype,
          face_image_data:img
        },
        su=>{
          if(su.code==200){
            this.dialogVisible = false;
            this.getList();
            this.$message({
              message: "操作成功",
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
          this.$message.error(err.msg);
      })
    },
    handleSelectionChange(val){
      this.selectval = val;
    },
    sliderShow(row,event){
      this.totaldata = [];
      this.rightcontent = [];
      event.cancelBubble = true;
      this.setobj = row;
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
          company_id:this.id,
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
    getplacename(val,index){
      this.$api.post("/common_query_place_api",{
        company_id:this.id,
        place_id:val
      },su=>{
        if(su.code==200){
         // console.log("huoqu",this.rightcontent[index])
          this.totaldata[index].place_address = su.place_address;
        }
      },err=>{

      })
    },
    delMan(){
      if(this.selectval.length<=0){
        this.$alert('请至少选择1位人员进行操作！', '删除人员', {
          confirmButtonText: '知道了',
          callback: action => {
            
          }
        });
      }else{
        this.deldialog = true;
      }
    },
    handleExceed(){
        this.$message.warning(`图片不能超过100张`);
    },
    delFn(){
      let arr = [];
      for(let value of this.selectval){
        arr.push(value.face_id)
      }
      let num = arr.length;
      //console.log(22222)
      for(let i=0;i<arr.length;i++){
        this.$api.post("/client_mng_del_face_api",{
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
    setMan(){
       if(this.selectval.length<=0){
        this.$alert('请至少选择1位人员进行操作！', '设置权限', {
          confirmButtonText: '知道了',
          callback: action => {
            
          }
        });
      }else{
        this.setdialog = true;
      }
    },
    addright(val){
         this.err = false;
         this.value1 = "";
         this.value2 = "";
         this.rightwarn.time = false;
         this.rightwarn.in = false;
         this.rightwarn.out = false;
         this.setobj = val.row;
         //console.log(this.setobj);
         this.setdialog = true;
         this.getright();
    },
    getright(){
        this.$api.post("/common_query_company_api",{
          company_id:this.id
        },su=>{
          if(su.code===200){
            let obj = su.data;
            obj.ischeck = false;
            obj.forEach((val,index)=>{
                val.data = [];
                val.ischeck = false;
                this.delist(val.place_id,index);
            })
            //console.log(obj);
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
                message: su.msg,
                type: 'warning'
            });
        })
    },
    delist(vals,index){     
        this.$api.post("/common_query_place_api",{
          company_id:this.id,
          place_id:vals
        },su=>{
          if(su.code==200&&su.data.length>0){
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
    changeList(file,filelist){
      this.info.sunum=0;
      this.info.fanum=0;
      this.$nextTick(()=>{
        let len = filelist.length;
        //console.log(file,"mowei",JSON.stringify(filelist),this)
       // this.$refs.uploadimg.clearFiles()
          let name = "";
          let imgtype = ""
          if(file.name.indexOf(".")!=-1){
            let arr = file.name.split(".");
            imgtype = arr[arr.length-1];
            name = arr[0];
          }
          //创建blob对象
          let blob = new Blob([file.raw],{type:file.raw.type});
          //this.imgtype = 
          let that = this;
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = function (e) {
              // 图片的 base64 格式, 可以直接当成 img 的 src 属性值      
             let img = reader.result;
             img = img.split(",")[1];
              that.$api.post("/client_mng_add_face_api",
              {
                company_id:that.id,
                face_type:1,
                face_user_name:name,
                face_image_type:imgtype,
                face_image_data:img
              },
              su=>{
                if(su.code==200){
                 that.info.sunum++;
                }else{
                 that.info.fanum++;
                }
                if((that.info.sunum+that.info.fanum)==len){
                   that.infoFn();
                   that.getList();
                }
              },
              err=>{
                // that.$message.error(err.msg);
                that.info.fanum++;
                if((that.info.sunum+that.info.fanum)==len){
                   that.infoFn();
                   that.getList();
                }
              })
          };
      })
       
    },
    handleClose(){
     // console.log("sss")
    },
    infoFn(){
      this.numdialog = true;
      this.$refs.uploadimg.clearFiles();
    },
    changeall(val){
      if(val.ischeck){
        val.forEach((item)=>{
          item.ischeck = true;
          this.changepl(item,val)
        })
      }else{
        val.forEach((item)=>{
          item.ischeck = false;
          this.changepl(item,val)
        })
      }
    },
    changepl(val,list){
      let i = 0;  
      list.forEach((val,index)=>{
        if(val.ischeck){
          i++
        }
      })
      if(i==list.length){
        list.ischeck = true;
      }else{
        list.ischeck = false;
      }
     // console.log(val,"ssss");
      if(val.ischeck){
        val.data.forEach((val)=>{
          val.ischeck = true;
        })
      }else{
        val.data.forEach((val)=>{
          val.ischeck = false;
        })
      }
    },
    changede(val,list,all){
      //console.log(val,list,all);
      let i = 0;
      list.data.forEach((val,index)=>{
        if(val.ischeck){
          i++
        }
      })
      if(i==list.data.length){
        list.ischeck = true;
      }else{
        list.ischeck = false;
      }
      let j = 0;
      all.forEach((val,index)=>{
        if(val.ischeck){
          j++
        }
      })
      if(j==all.length){
        all.ischeck = true;
      }else{
        all.ischeck = false;
      }
    },
    addrightFn(){
      this.err = false;
      this.rightwarn.time = false;
      this.rightwarn.in = false;
      this.rightwarn.out = false;
     // console.log(this.value3);
      if(!this.value1){
        this.err = true;
        this.errtit = "请选择开始时间";
        // this.errtit = "入口权限不能为空";
        // this.errtit = "出口权限不能为空";
        this.rightwarn.time = true;
        return
      }
       if(!this.value2){
        this.err = true;
        this.errtit = "请选择结束时间";
        // this.errtit = "入口权限不能为空";
        // this.errtit = "出口权限不能为空";
        this.rightwarn.time = true;
        return
      }
      var time1 = new Date(this.value1).getTime();
      var time2 = new Date(this.value2).getTime();
      if(time1>=time2){
        this.err = true;
        this.errtit = "开始时间不能晚于结束时间";
        // this.errtit = "入口权限不能为空";
        // this.errtit = "出口权限不能为空";
        this.rightwarn.time = true;
        return
      }
      //console.log(this.placelistin,this.placelistout)
      // this.placelistin.forEach((val,index)=>{

      // })
      let data = [];
      let outnum = [];
      let innum =[];
      for(let i =0;i<this.placelistin.length;i++){
        let devicein = this.placelistin[i].data;
        let deviceout = this.placelistout[i].data;
        let placeid = this.placelistin[i].place_id;
        for(let j = 0;j< devicein.length;j++){
          if(devicein[j].ischeck){
            if(innum.indexOf(placeid)==-1){
              innum.push(placeid);
            }
            if(deviceout.length<=0){
              this.err = true;
              this.errtit = "请选择出口权限";
              return
            }
            let juge = 0;
            for(let x = 0;x< deviceout.length;x++){
              if(deviceout[x].ischeck){
               data.push(this.placelistin[i].place_id+"-"+devicein[j].device_id+"-"+deviceout[x].device_id)
                juge++;
              }
            }
            if(juge==0){
              this.err = true;
              this.errtit = "请选择出口权限";
              return
            }
          }

        }
       
        for(let y = 0;y< deviceout.length;y++){
          //console.log(deviceout[y],"444");

          if(deviceout[y].ischeck&&outnum.indexOf(placeid)==-1){
            outnum.push(placeid);
          }
        }
      }
      //console.log(outnum,innum)
      if(data.length<=0||outnum.length!=innum.length){
        this.err = true;
        this.errtit = "请选择入口权限";
        return
      }
         //console.log(this.setobj)
        this.$api.post("/client_add_auth_api",{
          company_id:this.id,
          face_id:this.setobj.face_id,
          fromTimeStamp:this.value1,
          toTimeStamp:this.value2,
          acPkCode:data
        },
        su=>{
          if(su.code==200){
            this.setdialog = false;
            this.$message({
              message: "操作成功",
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
    editman(){
      this.editdialog = true;
      console.log(this.setobj.face_type);
      this.type = this.setobj.face_type.toString();
    },
    editConfirm(){
      this.$api.post("/client_mng_modify_face_api",{
          company_id:this.id,
          face_id:this.setobj.face_id,
          face_type:Number(this.type)
        },
        su=>{
          if(su.code==200){
            this.setobj.face_type = this.type;
            this.editdialog = false;
            this.getList();
            this.$message({
              message: "操作成功",
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
    clearright(val){
        //console.log(row)
         this.$confirm('确定清除该人员权限吗？', '清除权限', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
                this.$api.post("/client_del_person_auth_api",{
                  company_id:this.id,
                  face_id:val.row.face_id
                },
                su=>{
                  if(su.code==200){
                    
                    //this.getRights();
                    this.$message({
                      message: "操作成功",
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
          }).catch(() => {
                   
          });
    },
    delright(val){
          //console.log(val)
          this.$confirm('确定删除该条权限吗？', '删除权限', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
                this.$api.post("/client_del_one_auth_api",{
                  company_id:this.id,
                  face_id:this.setobj.face_id,
                  face_record_id:val.face_record_id
                },
                su=>{
                  if(su.code==200){
                    
                    this.getRights();
                    this.$message({
                      message: "操作成功",
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
          }).catch(() => {
                   
          });
    }


  }
}
</script>

<style lang='scss' scoped>
.person{
    min-width: 950px;
    background-color: #fff;
    margin:19px;
    min-height: 966px;
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
    height: 1046px;
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
    margin: 0 3px;
  }
  .add-out{
     border:1px solid red;
  }
  .in-out{
    text-align:center;
  }
  .time{
    text-align:center;
  }
}
</style>








<style lang='scss'>
 .el-main .el-table::before {
    content: '';
    position: absolute;
    background-color: #fff;
    z-index: 1;
}
.text-center{
  text-align: center;
 }
.el-main .el-table th{
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
   .el-main .el-table__body{
      text-align: center;
    }
</style>