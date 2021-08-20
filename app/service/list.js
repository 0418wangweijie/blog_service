"use strict";

const Service = require("egg").Service;

class ListService extends Service {
  async findList() {
    const id = this.ctx.request.body.id;
    const req = this.ctx.request.body;
    try {
      const resListCount = await this.ctx.model.Article.find({
        typeId: id,
      }).count();
      const resList = await this.ctx.model.Article.find({ typeId: id })
        .skip((req.page - 1) * 10)
        .limit(10);
      return { resList, resListCount };
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }
}

module.exports = ListService;
