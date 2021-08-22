<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>{{count}}</span>
    <span>{{doneTodosCount}}</span>
  </div>
</template>
<script>
// @ is an alias to /src
import { getCodeImg } from "../api/login";
import { mapState, mapGetters, mapMutations} from "vuex";

export default {
  name: 'About',
  components: {
  },
  computed:{
    localComputed () { /* ... */ },
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      // ...
      count:state => state.count
    }),
    //   ...mapGetters([
    //     'doneTodosCount'
    //  ]),
    // 将getter属性另取一个名字，写成对象的形式
  ...mapGetters({
      doneCount: 'doneTodosCount'
   }),
    // doneTodosCount (){
    //   return this.$store.getters.doneTodosCount
    // }
  },
  created() {
      this.increatem();
  },
  methods: {
    increatem(){
        console.log(this.$store.state.count)
        console.log(this.$store.getters.doneTodos)
        console.log(this.$store.getters.getTodoById(2))
    },
    ...mapMutations({
      add: 'increatem' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    git(){
      console.log("wo是学习的人啊！加油赚钱啊！")
    }
  }
}
</script>
