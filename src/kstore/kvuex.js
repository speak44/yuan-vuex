let Vue;
Vue
// 声明一个store类
class Store{
  constructor(options){
    // console.log(options.state, 'options')
    // store 里面需要有一个state
    // this.state= new Vue({
    //   data() { // new Vue 里面的data 其实就是响应式的，所以完全可以利用这一点来实现state
    //     return options.state // 为什么options里面还有.state；因为在index.js 中export default new Vuex.Store({ // 里面的是vuex 的配置选项state: { counter:0}, .....})
    //     // 直接return出去， 相当于外部去调用的时候就是 $store.state.counter
    //   },
    // })
    // 上面写法也是对的，但是源码觉得绝少保护，所以写法如下：
    this._vm =new Vue({
      // 里面内容不发生代理
      data:{
        // $$state 这个的定义也是为了让它单一性，不和外部冲突；源码是这样做，去避免的
        $$state: options.state
      }
    })
    
    // 直接可以获取到mutations; 因为在export default new Vuex.Store({....}) 就直接可以获取到
    // 保存下mutations 为了commit的时候用
    this._mutations =options.mutations
    // 同理 保存actions
    this._actions =options.actions

    // 锁死 this 使this不跟随调用的地方，或者是作用域而修改了 锁死 commit，dispatch函数的this锁死
    // 源码写法
    const store =this
    const{commit, dispatch} =store
    this.commit = function boundCommit(type,payload){
      commit.call(store, type, payload)
    }
    this.dispatch = function boundDispatch(type, payload){
      dispatch.call(store,type,payload)
    }
  }
  // 通过一个存储器，让它变成只读
  get state(){ // 外部就是从这里获取的。state
    console.log(this._vm, 'sdsdsds') // 可以从这个console.log(his._vm) 就可以看到，vue定义的data 获取上是_data
    return this._vm._data.$$state
  }
  set state(v){
    console.error('不能直接修改state')
  }
  // commit 修改状态
  commit (type, payload){
    // console.log(payload,' payload')
    // 1.修改 方法名，执行修改
    // 获取 moutions
    const entry =this._mutations[type]
    if(!entry){
      console.error('没有这个mutation')
      return; // 没有必要在执行下去了，所以直接return
    }
    entry(this.state,payload)
  }
  // dispatch  执行异步任务，或者复杂逻辑，发送commit
  dispatch (type, payload){ // type 是一个字符串，在调用的时候传入的是字符串，和cimmit的type 同理
    // 获取 actions
    const entry = this._actions[type]
    console.log(entry,'entry')
    if(!entry) {
      console.error('没有这个actions')
      return
    }
    // entry(this,payload) 不可以直接这样去使用，上面锁死了this就可以这样使用了
    // 因为如果调用this.commit 的时候；settimeoit 里面包裹了commit事件；那么调用this 的commit this指向就会出现问题 // 函数嵌套this就会发生改变 
    entry(this,payload) 
  }
}
// install方法  Vue.use(Vuex) use 调用的就是插件的install 方法
// 不可以和之前 写vuerouter 直接在 vuerouter.install= function(){} 
// 因为在使用的时候，在 index.js 中 “export default new Vuex.Store({....})” 将Store放在了Vuex上。所以写法是：
 function install(_Vue) { // export default new Vuex 会找到install方法，
   Vue=_Vue
   // 挂在$store方法
   Vue.mixin({ // 全局
     beforeCreate(){ // 需要尽早的执行，因为其他的组建可能会用到 $store这个属性； 用create 生命周期也是可以的
      // console.log(this.$options)
        if(this.$options.store){ // 在main.js中 new Vue({store, render: h => h(App)}).$mount('#app') //看是否存在了store
          Vue.prototype.$store= this.$options.store
        }
     }
   })

 }

//导出 倒出一个对象，作为Vuex //导出的是这个对象的 install 方法
export default {Store, install}  // 把Store, install 都进行导出
// {Store, install}作为插件导出
// 插件上会有 install 方法