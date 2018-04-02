<template>
  <div class="rec">
       <div class="header">
           <span>头像</span>
           <el-select v-model="value4" clearable placeholder="请选择" class="sur-selct">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>场地名称</span>
           <el-select v-model="value4" clearable placeholder="请选择" class="sur-selct">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>设备地址</span>
           <el-select v-model="value4" clearable placeholder="请选择" class="sur-selct">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br>
           <span>姓名</span>
           <el-select v-model="value4" clearable placeholder="请选择" class="sur-selct">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
           <span>拍摄时间</span>
           <el-date-picker
            v-model="value3"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="data-class"
            >
          </el-date-picker>
          <span class="add-cou">增加过滤条件</span>
       </div>
       <p class="su-tit">共 <span>992</span> 条数据</p>
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
           <tr>
             <td>2018-03-11 22:00:00</td>
             <td><img src="../../assets/images/sur-bg1.png"></td>
             <td>2018-03-11 22:00:00</td>
             <td>于文文1号</td>
             <td>
               <span class="red">出</span>
               <span class="green">绿</span>
             </td>
             <td>篮球场</td>
           </tr>
               <tr>
             <td>2018-03-11 22:00:00</td>
             <td><img src="../../assets/images/sur-bg1.png"></td>
             <td>2018-03-11 22:00:00</td>
             <td>于文文1号</td>
             <td>
               <span class="red">出</span>
               <span class="green">绿</span>
             </td>
             <td>篮球场</td>
           </tr>
               <tr>
             <td>2018-03-11 22:00:00</td>
             <td><img src="../../assets/images/sur-bg1.png"></td>
             <td>2018-03-11 22:00:00</td>
             <td>于文文1号</td>
             <td>
               <span class="red">出</span>
               <span class="green">绿</span>
             </td>
             <td>篮球场</td>
           </tr>
               <tr>
             <td>2018-03-11 22:00:00</td>
             <td><img src="../../assets/images/sur-bg1.png"></td>
             <td>2018-03-11 22:00:00</td>
             <td>于文文1号</td>
             <td>
               <span class="red">出</span>
               <span class="green">绿</span>
             </td>
             <td>篮球场</td>
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
  
  },
  methods:{
     handleSizeChange(){

    },
    handleCurrentChange(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
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
</style>