<template>
  <div>
    <h2>品牌案例</h2>
    <div class="nav">
      <label for="name">品牌名称:</label>
      <el-input
              id="name"
              class="nav-input"
              size="small"
              placeholder="请输入内容"
              v-model="name"
              clearable>
      </el-input>
      <el-button class="nav-btn" type="warning" size="small" @click="add">提交</el-button>
      <label for="search">检索:</label>
      <el-input
              @change="search"
              id="search"
              class="nav-input"
              size="small"
              placeholder="请输入内容"
              v-model="keywords"
              clearable>
      </el-input>
    </div>
  <el-table
          height="400"
          size="medium"
          :data="search()"
          style="width:100%">
    <el-table-column
            label="ID"
            width="300">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
            label="日期"
            width="300">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.ctime|format}}</span>
      </template>
    </el-table-column>
    <el-table-column
            label="车名"
            width="300">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>ID: {{ scope.row.id }}</p>
          <p>车名: {{ scope.row.name }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
                size="mini"
                type="danger"
                @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--    分页-->
    <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[5]"
            :page-size="pagedata"
            layout="total, sizes, prev, pager, next, jumper"
            :total="list.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name:'Brand',
    data() {
      return {
        list:[],//品牌数据
        name:'',//品牌名称
        keywords:'',//查询关键字
        pagedata:5,//每页数据
        currentPage:1,//当前页数
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      //获取数据
      async getList(){
      const {data}=await this.$http.get('getprodlist')
      if(data.status===0)this.list=data.message;
      },
      //增加数据
      async add(){//添加新品牌
        if(this.name.trim().length<=0)alert("品牌名不能为空");
        else {
         const {data}=await this.$http.post('addproduct',{name:this.name.trim()});
         if(data.status===0)
         this.getList();
         this.name='';
        }
      },
      //删除数据
      async del(id){
        const {data} =await this.$http.get('delproduct/'+id);
        if(data.status===0)
          this.getList();
      },
      //查询
      search(){
        //查询满足条件的值
        let res1=[];
        for (let i = 0; i <this.list.length ; i++) {
          if(this.list[i].name.indexOf(this.keywords)!==-1)
            res1.push(this.list[i])
        }
        //分页
        let res=[];
        let pagelist=(this.currentPage-1)*this.pagedata;
        if(pagelist+this.pagedata<res1.length){
          for(let i=pagelist;i<pagelist+5;i++)
            res.push(res1[i]);
        }else{
          for(let i=pagelist;i<res1.length;i++)
            res.push(res1[i]);
        }
        // console.log(res);
        return res;
      },
      
      //获取每页数据
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagedata=val;
      },
      //获取当前是第几页
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage=val;
    }
    },
    //时间过滤器
    filters:{
      //过滤时间
      format(value){
        let time =new Date(value)
        return time.getFullYear()+'-'+time.getMonth()+'-'+time.getDate()+' '+time.getHours()+':'+
            time.getMinutes()+':'+time.getSeconds();
      },
    },
    //生命周期函数
    created() {
      this.getList();
    }
  }
</script>
.nav
<style scoped>
.nav{
  padding-bottom: 5px;
  border-bottom: 1px solid #000000;
}
.nav label{
  font-weight: bolder;
  margin-left: 5px;
}
  .nav .nav-input{
    width:150px;
    margin-left: 5px;
  }
.nav .nav-btn{
  margin-left: 5px;
  width: 80px;
}
</style>