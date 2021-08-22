<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button type="primary" @click="increatem()">主要按钮</el-button>
    <div class="main">
      <div class="left">1</div>
      <div class="content">2</div>
      <div class="right">3</div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Bus msg="Welcome to Bus"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Bus from '@/components/Bus.vue'
import { getCodeImg } from "../api/login";

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Bus
  },
  data(){
    return {
      arrData :[1,2,3,4,4,4,4,4,5,5,5,6],
      obj: {a:1,b:2,c:3}
    }
  },
  created() {
      this.getCode();
      this.increatem();
      this.unique();
      var obj = {}
      Object.defineProperty(obj,'name',{
        get:function(){
          console.log('我被获取了')
          return val;
        },
        set:function(newVal){
          console.log('我被设置了')
        }
      })
      obj.name = 'fei'
      var val = obj.name
      console.log(val)
  },
  methods: {
    async getCode() {
        getCodeImg().then((res) => {
          console.log(res)
            // this.codeUrl = "data:image/gif;base64," + res.img;
            // this.loginForm.uuid = res.uuid;
        });
        let arr = new Set([1,1,3,3,2,2,4,4,5,6])
        //Array.from set的伪数组创建一个新的浅拷贝的数组
        console.log(Array.from(arr))
        console.log([...arr])
        let arrs = [10,20,30]
        let [a,d,c] = arr 
        let {bar, foo} = {foo:"aaa",bar:"bbb"}
        // 变量名必须与属性名同名
        // typeof只对基本数据类型有效
        console.log(typeof 1) // number
        //instanceof 检测的是原型
        console.log([] instanceof Array) // true
        // 是object原型对象上的一个方法，是toString运行时this
        //指向的对象类型
        console.log(Object.prototype.toString.call('')) // [object String]

    },
    increatem(){
        this.$store.commit('increment')
        console.log(this.$store.state.count)
    },
    unique(){
      let res = []
     // let that = this
      for(let i = 0; i < this.arrData.length; i++ ){
        if(res.indexOf(this.arrData[i])=== -1){
          res.push(this.arrData[i])
        }
      }
      console.log(res)
    },
  }
}
</script>
<style>
.main{
  width:500px;
  height:500px;
  padding: 0 100px;
  text-align: left;
}
.content{
  width:100%;
  height:100%;
  background-color:brown;
  float: left;
}
.left{
  width:100px;
  height:100%;
  background-color: cadetblue;
  margin-left:-100px;
   float: left;
}
.right{
  width:100px;
  height:100%;
  background-color: cadetblue;
  margin-right:-100px;
   float: left;
}
</style>
