class AsyncParallelHook {
    //同步钩子,有关联，流程控制
    constructor(args) {
        this.tasks = []
    }
    tapAsync(name, task) {
        //发布
        this.tasks.push(task)
    }
    callAsync(...args) {
        const finalCallback = args.pop() //类似于promise.all
        let index = 0
        const len = this.tasks.length

        function done() {
            index++
            if (index === len) {
                finalCallback()
            }
        }
        this.tasks.forEach(task => {
            task(...args, done)
        })
    }
}

let hook = new AsyncParallelHook(['name'])
let total = 0
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