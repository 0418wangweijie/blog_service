"use strict";

const Controller = require("egg").Controller;
const fs = require("fs");
const pump = require("pump");

class adminHomeController extends Controller {
  async index() {
    this.ctx.body = "hi egg";
  }
  async login() {
    const resLogin = await this.service.admin.login.findUser();
    if (resLogin) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: "登录成功", openId: openId };
    } else {
      this.ctx.body = { data: "登录失败" };
    }
  }

  async type() {
    const resType = await this.service.type.findType();
    if (resType) {
      this.ctx.body = { data: resType };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }

  async addtype() {
    const resAddType = await this.service.type.addType();
    if (resAddType) {
      this.ctx.body = { data: resAddType };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }

  async updatetype() {
    const resUpdateType = await this.service.type.updateType();
    if (resUpdateType) {
      this.ctx.body = { data: resUpdateType };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }

  async deletetype() {
    const resDeleteType = await this.service.type.deleteType();
    if (resDeleteType) {
      this.ctx.body = { data: resDeleteType };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }

  async getArticle() {
    const resArticle = await this.service.article.findArticle();
    if (resArticle) {
      const newResArticle = resArticle.article.sort((a, b) => {
        return b.createTime - a.createTime;
      });
      this.ctx.body = { data: newResArticle, totle: resArticle.articleCount };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }

  async addArticle() {
    const resArticle = await this.service.article.addArticle();
    const insertId = resArticle._id;
    if (resArticle) {
      this.ctx.body = { data: resArticle, insertId: insertId };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }

  async updateArticle() {
    const resUpdateArticle = await this.service.article.updateArticle();
    const insertId = resUpdateArticle._id;
    if (resUpdateArticle) {
      console.log(resUpdateArticle);
      this.ctx.body = { data: resUpdateArticle, insertId: insertId };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }

  async deleteArticle() {
    const resDeleteArticle = await this.service.article.deleteArticleById();

    if (resDeleteArticle) {
      this.ctx.body = { success: true };
    } else {
      this.ctx.body = { success: false };
    }
  }

  async getMusic() {
    const resMusic = await this.service.music.findMusic();
    if (resMusic) {
      this.ctx.body = { data: resMusic };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }
  async addMusic() {
    const resMusic = await this.service.music.addMusic();
    if (resMusic) {
      this.ctx.body = { data: resMusic };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }
  async updateMusic() {
    const resUpdate = await this.service.music.upadteMusic();
    if (resUpdate) {
      this.ctx.body = { data: resUpdate };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }
  async deleteMusic() {
    const resDeleteMusic = await this.service.music.deleteMusic();
    if (resDeleteMusic) {
      this.ctx.body = { success: true };
    } else {
      this.ctx.body = { success: false };
    }
  }

  async statistics() {
    const resStatistics = await this.service.admin.statistics.findStatistics();
    if (resStatistics) {
      this.ctx.body = { data: resStatistics };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }

  async getPie() {
    const pie = await this.service.admin.pieStatistics.findPie();
    if (pie) {
      this.ctx.body = { data: pie };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }

  async uploadImages() {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname; // file表单的名字
      console.log(fieldname);
      // 上传图片的目录
      const dir = await this.service.upload.getUploadFile(stream.filename);
      console.log(dir);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }

    if (Object.keys(files).length > 0) {
      ctx.body = {
        code: 200,
        message: "图片上传成功",
        data: { name: "xxx.png", status: "done", url: files },
      };
    } else {
      ctx.body = {
        code: 500,
        message: "图片上传失败",
        data: {},
      };
    }
  }
  async findSlideShowList() {
    const slideShowList = await this.service.slideShow.findSlideShow();
    if (slideShowList) {
      this.ctx.body = { data: slideShowList };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }
  // 新增轮播图
  async addSlideShow() {
    const addSlideShow = await this.service.slideShow.addSlideShow();
    if (addSlideShow) {
      this.ctx.body = { data: addSlideShow };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }
  // 更新轮播图
  async updateSlideShow() {
    const updateSlideShow = await this.service.slideShow.updateSlideShow();
    if (updateSlideShow) {
      this.ctx.body = { data: updateSlideShow };
    } else {
      this.ctx.body = { data: "Service Error" };
    }
  }
  // 删除轮播图
  async deleteSlideShow() {
    const deleteSlideShow = await this.service.slideShow.deleteSlideShow();
    if (deleteSlideShow) {
      this.ctx.body = { success: true };
    } else {
      this.ctx.body = { success: false };
    }
  }
}
module.exports = adminHomeController;
