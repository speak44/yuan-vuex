# yuan-vuex
手写实现vuex
Vuex 官网理解：
Vuex 集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以可预测的方式发生变化。

核心概念
state 状态、数据 
mutations 更改状态的函数 
actions 异步操作
store 包含以上概念的容器


vuex原理解析 任务分析
实现一个插件:声明Store类，挂载$store Store具体实现:
创建响应式的state，保存mutations、actions和getters 
实现commit根据用户传入type执行对应mutation 
实现dispatch根据用户传入type执行对应action，同时传递上下文 
实现getters，按照getters定义对state做派生

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
