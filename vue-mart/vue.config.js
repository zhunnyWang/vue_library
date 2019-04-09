module.exports = {
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': []
            }
        }
    },
    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: false
        }
    },
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:3001/",
                    changOrigin: true
                }
            },
        }

        // devServer: {
        //     hotOnly: true,
        //     before(app) {
        //         // 模拟后台服务器express
        //         app.get("/api/login", function(req, res) {
        //                 console.log(req.query);
        //                 const { username, password } = req.query;
        //                 console.log(username, password);

        //                 if (username == "kaikeba" && password == "123") {
        //                     res.json({ code: 1, token: "jilei" });
        //                 } else {
        //                     res.status(401).json({ code: 0, message: "用户名或者密码错误" });
        //                 }
        //             })
        //             // 保护接口中间件
        //         function auth(req, res, next) {
        //             if (req.headers.token) {
        //                 // 已认证
        //                 next()
        //             } else {
        //                 // 用户未授权
        //                 res.sendStatus(401)
        //             }
        //         }

        //         app.get('/api/userinfo', auth, function(req, res) {
        //             res.json({ code: 1, data: { name: "tom", age: 20 } });
        //         })
        //     }
        // }

    }
}