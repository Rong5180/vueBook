<template>
  <div>
    <div class="grid">
      <div class="book">
        <div>
          <label for="id">
            编号：
          </label>
          <input type="text" id="id"  v-model="id" :disabled="flag" v-focus>
          <label for="name">
            名称：
          </label>
          <input type="text" id="name" v-model="name">
          <el-button type="danger" size="mini" @click="handle" :disabled="flagSubmit">提交</el-button>
        </div>
      </div>
      <div class="total">
        <span>图书总数：</span>
        <span>{{total}}</span>
      </div>
      <table>
        <thead>
        <tr>
          <th>编号</th>
          <th>名称</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in books" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.date|format}}</td>
          <td>
            <a href="" @click.prevent @click="toEdit(item.id)">修改</a>
            <!--         禁止a标签默认行为-->
            <span> | </span>
            <a href="" @click.prevent @click="deleteBook(item.id)">删除</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "About",
    data() {
      return {
        flag:false,
        flagSubmit:false,
        id:'',
        name:'',
        books:[{
          id:1,
          name:'三国演义',
          date:new Date()
        },
          {
            id:2,
            name:'水浒传',
            date:new Date()
          },
          {
            id:3,
            name:'西游记',
            date:new Date()
          }]
      }
    },
    methods:{
      //添加图书
      handle(){
        if(this.flag===true)
        {
          this.books.some(item=> {
            if(item.id===this.id)
            {
              item.name=this.name;
              return true;
            }
          })
          this.flag=false;
          
        }else {
          let book = {};
          book.id = this.id;
          book.name = this.name;
          book.date=new Date();
          this.books.push(book);
        }
        
        this.id='';
        this.name='';
      },
      toEdit(id){
        let book= this.books.filter(function (item) {
          return item.id===id;
        });
        this.id=book[0].id;
        this.name=book[0].name;
        this.flag=true;
      },
      deleteBook(id){
        // 方法一 findIndex加下标
        // let index=this.books.findIndex(function (item) {
        //   return item.id===id;
        // });
        // this.books.splice(index,1);
        // 方法二 filter函数
        this.books= this.books.filter(function (item) {
          return item.id!==id;
        });
      },
    },
    //过滤器
    filters:{
      //过滤时间
      format(value){
        return value.getFullYear()+'-'+value.getMonth()+'-'+value.getDate()+' '+value.getHours()+':'+
            value.getMinutes()+':'+value.getSeconds();
      },
    },
    //自定义指令
    directives:{
      //获取焦点函数
      focus: {
        // 指令的定义
        inserted: function (el) {
          // 聚焦元素
          el.focus()
        }
      },
    },
    //计算属性
    computed:{
      total(){
        return this.books.length;
      }
    },
    //侦听属性
    watch:{
      name(val){
        let flag=this.books.some(function(item){
          return item.name===val;
        });
        this.flagSubmit = flag === true;
      }
    }
    
  }
</script>

<style scoped>
  .grid{
    margin:10px auto;
    width: 550px;
    text-align: center;
  }
  
  .grid .total{
    height: 30px;
    line-height: 30px;
    background-color: orange;
    border-top: 2px solid #000000;
  }
  
  .grid table{
    width: 100%;
    /*border-collapse: collapse;*/
  }
  
  .grid th,td{
    padding: 10px;
    border: 1px solid orange;
    height: 35px;
    line-height: 35px;
  }
  .grid th{
    background: orange;
  }
  .grid .book {
    padding-bottom: 10px;
    padding-top: 5px;
    background: orange;
  }
</style>