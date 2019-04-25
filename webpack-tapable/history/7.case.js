class AsyncSeriesHook {
    //同步钩子,有关联，流程控制
    constructor(args) {
        this.tasks = []
    }
    tapAsync(name, task) {
        //发布
        this.tasks.push(task)
    }
    callAsync(...args) {
        let finalCallback = args.pop()
        let index = 0
        let next = () => {
            if (index === this.tasks.length) {
                return finalCallback()
            }
            let task = this.tasks[index++]
            task(...args, next)
        }
        next()
    }
}

let hook = new AsyncSeriesHook(['name'])
hook.tapAsync('react', function(name, cb) {
    setTimeout(() => {
        console.log('react', name)
        cb()
    }, 1000)
})

hook.tapAsync('node', function(name, cb) {
    setTimeout(() => {
        console.log('node', name)
        cb()
    }, 1000)
})

hook.callAsync('jw', function() {
    console.log('end')
})