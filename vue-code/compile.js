 //帮浏览器把不认识的做转换
 // new Compile(el, vm)vm:vue的实例

 class Compile {
     constructor(el, vm) {
         //要遍历的宿主节点
         this.$el = document.querySelector(el);
         this.$vm = vm;

         if (this.$el) {
             //转换内部内容为片段，不用做庞大的dom操作
             this.$fragment = this.node2Fragment(this.$el);
             //执行编译
             this.compile(this.$fragment);
             this.$el.appendChild(this.$fragment);
         }
     }

     //将宿主元素中代码片段拿出来遍历，这样做比较高效
     node2Fragment(el) {
         const frag = document.createDocumentFragment();
         let child;
         while ((child = el.firstChild)) {
             frag.appendChild(child);
         }
         return frag;
     }
     compile(el) {
         const childNodes = el.childNodes;
         Array.from(childNodes).forEach(node => {
             if (this.isElement(node)) {
                 //元素
                 //  console.log('编译元素' + node.nodeName)
                 const nodeAttrs = node.attributes;
                 Array.from(nodeAttrs).forEach(attr => {
                     const attrName = attr.name;
                     const exp = attr.value;
                     if (this.isDirective(attrName)) {
                         //k-text
                         const dir = attrName.substring(2);
                         this[dir] && this[dir](node, this.$vm, exp);
                     }
                     if (this.isEvent(attrName)) {
                         const dir = attrName.substring(1); // @click
                         this.eventHandler(node, this.$vm, exp, dir);
                     }
                 })
             } else if (this.isInterpolation(node)) {
                 //文本
                 //  console.log('编译文本' + node.textContent)
                 this.compileText(node);
             }

             if (node.childNodes && node.childNodes.length > 0) {
                 this.compile(node);
             }
         })

     }

     compileText(node) {
         //  console.log(RegExp.$1);//匹配到的值
         this.update(node, this.$vm, RegExp.$1, 'text');
     }

     //更新函数
     update(node, vm, exp, dir) {
         const updaterFn = this[dir + 'Updater'];
         console.log(vm[exp])
         updaterFn && updaterFn(node, vm[exp]); //属性代理

         //依赖收集
         new Watcher(vm, exp, function(value) {
             updaterFn && updaterFn(node, value);
         })

     }

     text(node, vm, exp) {
         this.update(node, this.$vm, RegExp.$1, 'text');
     }

     textUpdater(node, value) {
         node.textContent = value;
     }

     //   双绑
     model(node, vm, exp) {
         // 指定input的value属性
         this.update(node, vm, exp, "model");

         // 视图对模型响应
         node.addEventListener("input", e => {
             vm[exp] = e.target.value;
         });
     }

     modelUpdater(node, value) {
         node.value = value;
     }

     html(node, vm, exp) {
         this.update(node, vm, exp, "html");
     }

     htmlUpdater(node, value) {
         node.innerHTML = value;
     }
     eventHandler(node, vm, exp, dir) {
         //   @click="onClick"
         let fn = vm.$options.methods && vm.$options.methods[exp];
         if (dir && fn) {
             node.addEventListener(dir, fn.bind(vm));
         }
     }

     isDirective(attr) {
         return attr.indexOf('k-') == 0;
     }

     isEvent(attr) {
         return attr.indexOf('@') == 0;
     }

     isElement(node) {
         return node.nodeType === 1;
     }

     isInterpolation(node) {
         return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
     }
 }