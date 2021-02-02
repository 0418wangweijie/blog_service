"use strict";

const Controller = require('egg').Controller;
const TurndownService = require('turndown');
const turndownService = new TurndownService();
class HomeController extends Controller {

    /**
     * 文章@article
     * */
    // 查询文章
    async article() {
        const resArticle = await this.service.article.findArticle();
        var newResArticle = resArticle.sort((a, b) => {
            return b.createTime - a.createTime;
        });
        this.ctx.body = { data: newResArticle };
    }
    // 根据Id查询文章详情
    async articleDetails() {
        const resDetails = await this.service.article.findArticleById();
        // 将html格式转换为markdown
        // resDetails.content = turndownService.turndown(resDetails.content);
        this.ctx.body = { data: resDetails };
    }
    // 增加
    // async addArticle() {
    //     const resAddArticle = await this.service.article.addArticle();
    //     this.ctx.body = resAddArticle
    // }

    // 查询类型
    async type() {
        const resType = await this.service.type.findType();
        this.ctx.body = { data: resType };
    }

    // 根据类型id获取列表
    async list() {
        const resList = await this.service.list.findList();
        var newResList = resList.sort((a, b) => {
            return b.createTime - a.createTime;
        });
        this.ctx.body = { data: newResList };
    }

}

module.exports = HomeController;
