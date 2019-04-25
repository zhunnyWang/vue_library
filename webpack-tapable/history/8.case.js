class AsyncSeriesHook {
    //同步钩子,有关联，流程控制
    constructor(args) {
        this.tasks = []
    }
    tapPromise(name, task) {
        //发布
        this.tasks.push(task)
    }
    promise(...args) {
        let [first, ...others] = this.tasks
        return others.reduce((p, n) => {
            return p.then(() => n(...args))
        }, first(...args))
    }
}

let hook = new AsyncSeriesHook(['name'])
hook.tapPromise('react', function(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name)
            resolve()
        }, 1000)
    })
})

hook.tapPromise('node', function(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name)
            resolve()
        }, 1000)
    })
})

hook.promise('jw').then(() => {
    console.log('it should be end')
})