<template>
 <div>
 <div class="grid">
   <div class="book">
     <div>
       <label for="id">
         编号：
       </label>
       <input type="text" id="id"  v-model="id">
       <label for="name">
         名称：
       </label>
       <input type="text" id="name" v-model="name">
       <el-button type="danger" size="mini" @click="handle">提交</el-button>
     </div>
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
       <td>{{item.date}}</td>
       <td>
         <a href="" @click.prevent>删除</a>
<!--         禁止a标签默认行为-->
         <span> | </span>
         <a href="" @click.prevent>修改</a>
       </td>
     </tr>
     </tbody>
   </table>
 </div>
 </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        flag:false,
        id:'',
        name:'',
        books:[{
          id:1,
          name:'三国演义',
          date:''
        },
          {
            id:2,
            name:'水浒传',
            date:''
          },
          {
            id:3,
            name:'西游记',
            date:''
          }]
      }
    },
    methods:{
      //添加图书
      handle(){
      
      },
    },
  }
</script>

<style scoped>
  .grid{
    margin:10px auto;
    width: 550px;
    text-align: center;
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