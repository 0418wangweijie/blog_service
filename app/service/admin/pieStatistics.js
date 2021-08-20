"use strict";

const Service = require("egg").Service;

class PieService extends Service {
  async findPie() {
    const article = await this.ctx.model.Article.find();
    const type = await this.ctx.model.Type.find();
    let technologyType = [],
      liveType = [];
    let typeIdOne = type[0]._id;
    article.forEach((item) => {
      if (item.typeId == typeIdOne) {
        technologyType.push(item);
      } else {
        liveType.push(item);
      }
    });
    let technologyNumber = 0,
      liveNumber = 0;
    technologyType.forEach((item) => {
      technologyNumber = technologyNumber + item.visitCount;
    });
    liveType.forEach((item) => {
      liveNumber = liveNumber + item.visitCount;
    });
    try {
      const findPie = await this.ctx.model.Admin.Pie.find();
      return findPie;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }
}

module.exports = PieService;
