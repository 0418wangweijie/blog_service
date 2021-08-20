/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  // _1607762008981_5171
  config.keys = appInfo.name + "";

  // add your middleware config here
  config.middleware = [];

  // 数据库配置

  // Mongodb: wangweijie: wang0418 @localhost: 27017

  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1/blog",
      options: {
        useNewUrlParser: true,
        mongos: true,
      },
      plugins: [],
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.cors = {
    // 那些可以跨域访问
    // origin: ['http://localhost:3000', 'http://localhost:9000'],
    origin: "*",
    // 允许Cook跨域请求
    credentials: true,
    // 那些请求可以跨域
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  // 取消安全证书
  config.security = {
    csrf: { enable: false },
    domainWhiteList: ["*"],
  };

  // 保存文件地址配置
  config.uploadDir = "app/public/images";

  return {
    ...config,
    ...userConfig,
  };
};
