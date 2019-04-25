class SyncLoopHook { //同步钩子,有关联，流程控制
    constructor(args) {
        this.tasks = []
    }
    tap(name, task) { //发布
        this.tasks.push(task);

    }
    call(...args) { //订阅
        this.tasks.forEach(task => {
            let ret;
            do {
                ret = task(...args)
            } while (ret !== undefined)
        })
    }
}

let hook = new SyncLoopHook(['name']);
let total = 0;
hook.tap('react', function(name) {
    console.log('react', name)
    return ++total == 3 ? undefined : '继续学'
})

hook.tap('node', function(name) {
    console.log('node', name)
})

hook.call('jw')