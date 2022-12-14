/**
 * json-server 模拟中间件
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports = (req, res, next) => {
  console.log("req.path --- ", req.path);
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "super-admin" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          name: "super-admin",
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "用户名或者密码错误" });
    }
  }

  if (req.method === "GET" && req.path === "/me") {
    if (req) {
      return res.status(200).json({
        user: {
          name: "super-admin",
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "token已过期" });
    }
  }

  next();
};
