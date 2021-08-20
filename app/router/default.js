"use strict";

module.exports = (app) => {
  const { router, controller } = app;
  router.get("/article", controller.default.home.article);
  // 增加
  router.get("/article/details/:id", controller.default.home.articleDetails);
  // 查询类型
  router.get("/type", controller.default.home.type);
  // 查询文章列表
  router.get("/list", controller.default.home.list);
};
