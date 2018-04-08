<template>
    <div class="person" >
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
         <span>姓名</span>
         <input type="text" name="" placeholder="请输入姓名搜索">
      </div>
       <p class="su-tit">共 <span>992</span> 条数据</p>
       <p class="sur-num">
         <span>导出数据</span>
         <span>批量导入照片</span>
         <span>删除人员</span>
         <span>设置权限</span>
       </p>
       <p class="chose-num"><i></i>已选择<span>13</span>项</p>
       <table class="sort-tab">
             <thead>
               <tr>
                 <td><i class="not-all"></i></td>
                 <td>头像</td>
                 <td>出入人姓名</td>
                 <td>类型</td>
                 <td>入库时间</td>
                 <td>更新时间</td>
               </tr>
             </thead>
             <tbody>
               <tr @click="show">
                 <td><i></i></td>
                 <td><img src="../../assets/images/sur-bg1.png"></td>
                 <td>于文文1号</td>
                 <td>2018-03-11 22:00:00</td>
                 <td>于文文1号</td>
                 <td>
                   2018-03-11 22:00:00
                 </td>
               </tr>
               <tr @click="show">
                 <td><i class="chose"></i></td>
                 <td><img src="../../assets/images/sur-bg1.png"></td>
                 <td>于文文1号</td>
                 <td>2018-03-11 22:00:00</td>
                 <td>于文文1号</td>
                 <td>
                   2018-03-11 22:00:00
                 </td>
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

          <transition name="fade">
            <div class="slider-box" v-if="slider">
              <p class="close-p"><i @click="closeFn">×</i></p>
              <div class="info">
                <img src="../../assets/images/sur-bg1.png">
                <div>
                  <p class="name">鹿晗</p>
                  <img src="../../assets/images/fk.png">
                  <div>
                    <p>
                      <span>入库时间：</span>
                      2018-03-21 08：00：00
                    </p>
                    <p>
                      <span>更新时间：</span>
                      2018-03-21 08：00：00
                    </p>
                    <button>编辑</button>
                  </div>
                </div>
              </div>
              <div>
                 <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="线路轨迹" name="first">
                    <div class="time-div">
                      <p>
                        <span>出入时间 ：</span>
                         2018-03-10
                      </p>
                      <div>
                        <span>线路轨迹 :</span>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="出入记录" name="second">
                    <div class="time-div record">
                      <p>
                        <span>出入时间 ：</span>
                         2018-03-10
                      </p>
                      <div>
                        <p>设备地址 ： B口</p>
                        <p>场地名称 ： 足球场</p>
                        <p>出入类型 ： <span class="red">出</span></p>
                        <img src="../../assets/images/out.png">
                      </div>
                    </div>
                    <div class="time-div record">
                      <p>
                        <span>出入时间 ：</span>
                         2018-03-10
                      </p>
                      <div>
                        <p>设备地址 ： B口</p>
                        <p>场地名称 ： 足球场</p>
                        <p>出入类型 ： <span class="red">入</span></p>
                        <img src="../../assets/images/to.png">
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="出入权限" name="third"></el-tab-pane>
                </el-tabs>
              </div>
            </div>
         </transition>
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
      value4:"",
      slider:false,
      page:0,
      activeName:"first"
    }
  },
  mounted(){
    
  },
  methods:{
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    show(){
      this.slider = true;
    },
    closeFn(){
       this.slider = false;
    },
    handleClick(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.person{
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
      margin-left: 14px;

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
  }
  .chose-num{
    height:34px; 
    background:rgba(206,223,246,0.3);
    border-radius: 2px;
    color: #000;
    font-size: 12px;
    line-height: 34px;
    text-indent: 8px;
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
    height: 1037px;
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
    >p{
      height:39px; 
      background:rgba(237,237,237,1);
      color: #4D4D4D;
      text-indent: 29px;
      line-height: 39px;
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
        .red{
          color: #F84C4C;
        }
        .green{
          color: #98C56B;
        }
      }
    }
  }
</style>