// 声明一个store类
class Store{

}
// install方法  Vue.use(Vuex) use 调用的就是插件的install 方法
// 不可以和之前 写vuerouter 直接在 vuerouter.install= function(){} 
// 因为在使用的时候，在 index.js 中 “export default new Vuex.Store({....})” 将Store放在了Vuex上。所以写法是：
 function install(_vue) { // export default new Vuex 会找到install方法，
   
 }

//导出 倒出一个对象，作为Vuex //导出的是这个对象的 install 方法
export default {Store, install}  // 把Store, install 都进行导出
// {Store, install}作为插件导出
// 插件上会有 install 方法