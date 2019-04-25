let fs = require('fs')
let path = require('path')
let babylon = require('babylon')
let t = require('@babel/types')
let traverse = require('@babel/traverse').default
let generator = require('@babel/generator').default
let ejs = require('ejs')

//babylon 主要把源码转换成AST
//babel-traverse遍历节点
//babel-types
class Compiler {
    constructor(config) {
        this.config = config;
        this.entryId;
        //保存所有的模块依赖
        this.modules = {};
        //入口路径
        this.entry = config.entry;
        //工作路径
        this.root = process.cwd()
    }
    getSouce(modulePath) {
            let content = fs.readFileSync(modulePath, 'utf8');
            return content
        }
        //解析源码
    parse(source, parentPath) { //AST解析语法树
        //生成语法树
        let ast = babylon.parse(source)
        let deps = []
        traverse(ast, {
            CallExpression(p) {
                let node = p.node;
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__'
                    let moduleName = node.arguments[0].value
                    moduleName += (path.extname(moduleName) ? '' : '.js')
                    moduleName = './' + path.join(parentPath, moduleName)
                    deps.push(moduleName)
                    node.arguments = [t.stringLiteral(moduleName)];
                }
            }
        })
        let sourceCode = generator(ast).code
        return { sourceCode, deps }
    }

    // 构建模块
    buildModule(modulePath, isEntry) {
        //拿到模块的原始文件内容
        let source = this.getSouce(modulePath);
        //模块id modulePath-this.root
        let moduleName = './' + path.relative(this.root, modulePath);
        //解析需要把source源码进行改造 返回一个依赖列表
        if (isEntry) {
            this.entryId = moduleName; //保存入口名
        }
        let { sourceCode, deps } = this.parse(source, path.dirname(moduleName))

        //把相对路径和模块中的内容对应
        this.modules[moduleName] = sourceCode;
        deps.forEach(dep => {
            this.buildModule(path.join(this.root, dep), false)
        })



    }
    emitFile() {
        //用数据渲染我们的模版
        //拿到输出到那个目录下
        let main = path.join(this.config.output.path, this.config.output.filename);
        //模版的路径
        let templateStr = this.getSouce(path.join(__dirname, 'main.ejs'));
        let code = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules })
        this.assets = {}
        this.assets[main] = code
        console.log(main)
        fs.writeFileSync(main, this.assets[main])
    }
    run() {
        //执行 并且创建模块的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true)
        console.log(this.modules, this.entryId)
            //发射一个文件 打包后的文件
        this.emitFile()
    }
}
module.exports = Compiler