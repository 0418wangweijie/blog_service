"use strict";

const Service = require("egg").Service;
const path = require("path");
const mkdirp = require("mkdirp");
const moment = require("moment");
class UploadService extends Service {
  /**
   * 获取文件上传目录
   * @param{*} filename
   * */
  async getUploadFile(filename) {
    // 获取当前日期
    const today = moment(new Date()).format("YYYY-MM-DD");
    const dir = path.join(this.config.uploadDir, today);
    // 不存在创建目录
    await mkdirp(dir);
    // const date = Date.now();
    // 返回图片保存路径
    const uploadDir = path.join(dir, filename);
    return {
      uploadDir,
      saveDir: this.ctx.origin + uploadDir.slice(3).replace(/\\/g, "/"),
    };
  }
}
module.exports = UploadService;
