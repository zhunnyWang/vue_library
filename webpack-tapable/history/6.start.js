let { AsyncParallelHook } = require('tapable')
    //异步的钩子，并行
    //注册方法 同步是tap 异步是tapAsync(cb) tapPromise(注册promise)
    //
class Lesson {
    constructor() {
        this.index = 0
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        }
    }
    tap() {
        //注册监听函数
        this.hooks.arch.tapPromise('node', name => {
            return new Promise((reslove, reject) => {
                setTimeout(() => {
                    console.log('node', name)
                    reslove()
                }, 1000)
            })
        })
        this.hooks.arch.tapPromise('react', name => {
            return new Promise((reslove, reject) => {
                setTimeout(() => {
                    console.log('react', name)
                    reslove()
                }, 1000)
            })
        })
    }
    start() {
        this.hooks.arch.promise('jw').then(function() {
            console.log('end')
        })
    }
}

let l = new Lesson()

l.tap() //注册这两个事件
l.start() //触发