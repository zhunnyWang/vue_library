 class KVue {
     constructor(options) {
         this.$options = options;
         this.$data = options.data;
         this.observe(this.$data);

         //创建了两个watcher和两个Dep
         //  new Watcher();
         //  this.$data.test; //依赖加进去了
         //  new Watcher();
         //  this.$data.foo.bar;

         new Compile(options.el, this);

         //created执行
         if (options.created) {
             options.created.call(this);
         }
     }

     observe(value) {
         if (!value || typeof value !== 'object') {
             return;
         }

         Object.keys(value).forEach(key => {
             this.defineReactive(value, key, value[key]);
             //代理data中的属性带vue实力上
             this.proxyData(key);
         })
     }

     defineReactive(data_obj, key, val) {
         this.observe(val); //解决数据嵌套

         const dep = new Dep();


         Object.defineProperty(data_obj, key, {
             get() {
                 Dep.target && dep.addDep(Dep.target);
                 return val;
             },
             set(newval) {
                 if (newval === val) {
                     return;
                 }
                 val = newval;
                 dep.notify()
                     //  console.log(`${key}数据变化了，需要更新`);//换成dep和wathcer方式
             }
         })
     }

     proxyData(key) {
         Object.defineProperty(this, key, {
             get() {
                 return this.$data[key];
             },
             set(newval) {
                 this.$data[key] = newval;
             }
         })
     }
 }

 //管理watcher
 class Dep {
     constructor() {
         //存放若干依赖 wathcer
         this.deps = []
     }

     addDep(dep) {
         this.deps.push(dep)
     }

     //通知每个依赖做更新
     notify() {
         this.deps.forEach(dep => dep.update())
     }
 }

 class Watcher {
     constructor(vm, key, cb) {
         this.vm = vm;
         this.key = key;
         this.cb = cb;
         //将当前watcher实例指定到Dep静态属性target
         Dep.target = this;
         this.vm[this.key]; //触发getter，添加依赖
         Dep.target = null;
     }

     update() {
         this.cb.call(this.vm, this.vm[this.key]);
     }
 }