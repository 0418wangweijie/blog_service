"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  require("./router/default")(app);
  require("./router/admin")(app);
};
/**
 * console.log(app.controller)
  const { router, controller } = app;
  router.get('/', controller.default.home.index)
 * */
