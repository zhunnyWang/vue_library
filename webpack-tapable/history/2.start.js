let { SyncBailHook } = require('tapable') //SyncBailHook同步熔断钩子 Bail是保险的意思

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncBailHook(['name']),
        }
    }
    tap() { //注册监听函数
        this.hooks.arch.tap('node', function(name) {
            console.log('node', name);
            // return '想停止学习'
            return undefined //返回不是undefined的值就会停止执行下去
        });
        this.hooks.arch.tap('react', function(name) {
            console.log('react', name)

        })
    }
    start() {
        this.hooks.arch.call('jw')
    }
}

let l = new Lesson();

l.tap(); //注册这两个事件
l.start(); //触发