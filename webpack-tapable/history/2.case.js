class SynBailcHook { //同步钩子
    constructor(args) {
        this.tasks = []
    }
    tap(name, task) { //发布
        this.tasks.push(task);

    }
    call(...args) { //订阅
        let ret; //当前函数返回值
        let index = 0;
        do {
            ret = this.tasks[index++](...args)
        } while (ret === undefined && index < this.tasks.length)
    }
}

let hook = new SynBailcHook(['name']);
hook.tap('react', function(name) {
    console.log('react', name)
        // return '停止向下执行'
})

hook.tap('node', function(name) {
    console.log('node', name)
})

hook.call('jw')