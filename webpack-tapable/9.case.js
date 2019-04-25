class AsyncSeriesWaterfallHook {
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
        let next = (err, data) => {
            if (!err) {
                let task = this.tasks[index]
                if (!task) {
                    return finalCallback()
                }
                if (index === 0) {
                    task(...args, next)
                } else {
                    task(data, next)
                }
                index++
            } else {
                return finalCallback()
            }
        }
        next()
    }
}

let hook = new AsyncSeriesWaterfallHook(['name'])
hook.tapAsync('react', function(name, cb) {
    setTimeout(() => {
        console.log('react', name)
        cb(null, 'result')
    }, 1000)
})

hook.tapAsync('node', function(data, cb) {
    setTimeout(() => {
        console.log('node', data)
        cb()
    }, 1000)
})

hook.callAsync('jw', function() {
    console.log('end')
})