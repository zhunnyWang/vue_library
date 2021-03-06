class SyncWaterfallHook { //同步钩子,有关联，流程控制
    constructor(args) {
        this.tasks = []
    }
    tap(name, task) { //发布
        this.tasks.push(task);

    }
    call(...args) { //订阅
        let [first, ...others] = this.tasks;
        let ret = first(...args);
        others.reduce((prv, next) => {
            next(prv)
        }, ret)
    }
}

let hook = new SyncWaterfallHook(['name']);
hook.tap('react', function(name) {
    console.log('react', name)
    return 'react学的不错'
})

hook.tap('node', function(name) {
    console.log('node', name)
})

hook.call('jw')