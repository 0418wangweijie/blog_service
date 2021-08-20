"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  /**
   * 文章@article
   * const TurndownService = require('turndown');
   *
   */ // 、、const turndownService = new TurndownService();
  // 查询文章
  async article() {
    const resArticle = await this.service.article.findArticle();
    const newResArticle = resArticle.article.sort((a, b) => {
      return b.createTime - a.createTime;
    });
    this.ctx.body = { data: newResArticle, total: resArticle.articleCount };
  }

  // 根据Id查询文章详情
  async articleDetails() {
    const resDetails = await this.service.article.findArticleById();
    // 将html格式转换为markdown
    // resDetails.content = turndownService.turndown(resDetails.content);
    this.ctx.body = { data: resDetails };
  }
  // // 模糊查询文章
  // async articleFuzzyFind() {

  // }
  // 查询类型
  async type() {
    const resType = await this.service.type.findType();
    this.ctx.body = { data: resType };
  }

  // 根据类型id获取列表
  async list() {
    const resList = await this.service.list.findList();
    const newResList = resList.resList.sort((a, b) => {
      return b.createTime - a.createTime;
    });
    this.ctx.body = { data: newResList, totle: resList.resListCount };
  }
}

module.exports = HomeController;
