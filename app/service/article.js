"use strict";

const Service = require("egg").Service;

class ArticleService extends Service {
  // 查找全部
  async findArticle() {
    console.log(this.ctx.query);
    console.log(this.ctx.request.body);
    const queryData = this.ctx.query;
    if (this.ctx.query.page) {
      queryData.page = Number(queryData.page);
      queryData.limit = Number(queryData.limit);
      queryData.title = queryData.title;
      queryData.typeId = queryData.typeId;
    }
    let data = null;
    if (queryData.page) {
      data = queryData;
    } else {
      data = this.ctx.request.body;
    }
    if (queryData.title) {
      data.title = queryData.title;
    }
    try {
      let articleCount, article;
      if (data.title || data.typeId) {
        const typeId = data.typeId;
        let _filter = {};
        if (typeId && !data.title) {
          _filter = {
            typeId: typeId,
          };
        } else if (!typeId && data.title) {
          _filter = {
            title: { $regex: new RegExp(data.title) },
          };
        } else if (typeId && data.title) {
          _filter = {
            title: { $regex: new RegExp(data.title) },
            typeId: typeId,
          };
        }
        console.log(_filter);
        articleCount = await this.ctx.model.Article.find(_filter).count();
        article = await this.ctx.model.Article.find(_filter)
          .sort({ createTime: -1 })
          .skip((data.page - 1) * 10)
          .limit(data.limit);
      } else {
        articleCount = await this.ctx.model.Article.find().count();
        article = await this.ctx.model.Article.find()
          .sort({ createTime: -1 })
          .skip((data.page - 1) * 10)
          .limit(data.limit);
      }
      return { article, articleCount };
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }

  //  根据id来查找文章
  async findArticleById() {
    const id = this.ctx.params.id;
    try {
      const articleId = await this.ctx.model.Article.findById(id);
      if (articleId) {
        articleId.visitCount = articleId.visitCount + 1;
        const articleDeticles = await this.ctx.model.Article.updateOne(
          { _id: articleId._id },
          { visitCount: articleId.visitCount }
        );
        const statisticFind = await this.ctx.model.Admin.Statistics.find({
          name: articleId.title,
          year: new Date(new Date().toLocaleDateString()).getTime(),
          value: articleId.visitCount - 1,
        });
        if (statisticFind[0]?._id) {
          await this.ctx.model.Admin.Statistics.updateOne(
            { _id: statisticFind[0]._id },
            {
              value: articleId.visitCount,
            }
          );
        } else {
          const statisticSave = await this.ctx.model.Admin.Statistics({
            year: new Date(new Date().toLocaleDateString()).getTime(),
            value: articleId.visitCount,
            name: articleId.title,
          });
          statisticSave.save();
        }

        const findPie = await this.ctx.model.Admin.Pie.findOne({
          typeId: articleId.typeId,
        });

        if (findPie) {
          const Pie = await this.ctx.model.Admin.Pie.updateOne(
            { typeId: articleId.typeId },
            { value: findPie.value + 1 }
          );
          console.log(Pie);
        } else {
          //  计算初次新增分类访问量
          const resType = await this.ctx.model.Type.find();
          for (let i = 0; i < resType.length; i++) {
            if (resType[i]._id === articleId.typeId) {
              const savePie = await this.ctx.model.Admin.Pie({
                value: articleId.visitCount,
                name: resType[i].typeName,
                typeId: resType[i]._id,
              });
              savePie.save();
            }
          }
        }

        if (articleDeticles.ok === 1) {
          const updateArticle = await this.ctx.model.Article.findById(
            articleId._id
          );
          return updateArticle;
        }
        return articleId;
      }
      return articleId;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }

  // 新增文章
  async addArticle() {
    const newArticle = this.ctx.request.body;
    try {
      const article = await this.ctx.model.Article(newArticle);
      article.save();
      return article;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }

  // 修改文章
  async updateArticle() {
    const olderArticle = this.ctx.request.body;
    try {
      const article = await this.ctx.model.Article.updateOne(
        { _id: olderArticle._id },
        {
          title: this.ctx.request.body.title,
          content: this.ctx.request.body.content,
          introduce: this.ctx.request.body.introduce,
          typeId: this.ctx.request.body.typeId,
          createTime: this.ctx.request.body.createTime,
        }
      );
      return article;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }

  async deleteArticleById() {
    const id = this.ctx.params.id;
    try {
      const resDeleteArticle = await this.ctx.model.Article.findByIdAndDelete({
        _id: id,
      });
      return resDeleteArticle;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }
}
module.exports = ArticleService;
