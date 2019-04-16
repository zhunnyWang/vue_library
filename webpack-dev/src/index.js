import { name, B, gen } from './a.js';
require('./index.css');
require('./index.less');
require('@babel/polyfill') //es7的补丁

//引入图片的三种方式
//（1）通过js引入图片
const logo = require('./01.jpg') //把图片引入，返回的结构是一个新的图片地址
const image = new Image();
console.log(logo); //用到file-loader 默认会在内部生成一张图片，到build目录下 把生成的图片的名字返回回来
image.src = logo;
document.body.appendChild(image)


let fn = () => {
    console.log('fn');
}
fn();

@log
class A {
    a = 1
}
let a = new A();

function log(target) {
    console.log(target, '23')
}
'aaa'.includes('a')

let b = new B()
console.log(gen().next());
console.log(b.b)
console.log(a.a);
console.log("hello")
console.log(name)
console.log('aaa'.includes('a'))