module.exports = (options) => {
  return async function adminauth(ctx, next) {
    // console.log(ctx.response);
    if (ctx) {
      await next();
    } else {
      ctx.body = { data: "没有登录" };
    }
  };
};
