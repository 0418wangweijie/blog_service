'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
// 跨域
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.csrf = {
  enable: false,
};
