const Koa = require("koa");
const Router = require("koa-router");
// 生成令牌、验证令牌
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");

// 生成数字签名的秘钥
const secret = "it's a secret";

const app = new Koa();
const router = new Router();

router.get("/api/login", async ctx => {
    console.log(ctx.query);
    const { username, password } = ctx.query;
    console.log(username, password);

    if (username == "kaikeba" && password == "123") {
        // 生成令牌
        const token = jwt.sign({
                data: { name: "kaikeba" }, // 用户信息数据, 密码就没有带
                exp: Math.floor(Date.now() / 1000) + 60 * 60 // 过期时间
            },
            secret
        );
        ctx.body = { code: 1, token };
    } else {
        ctx.status = 401;
        ctx.body = { code: 0, message: "用户名或者密码错误" };
    }
});

router.get(
    "/api/userinfo",
    jwtAuth({ secret }), //验证的中间件
    async ctx => {
        ctx.body = { code: 1, data: { name: "jerry", age: 20 } };
    }
);
app.use(router.routes());
app.listen(3001);