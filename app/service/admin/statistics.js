"use strict";

const Service = require("egg").Service;

class StatisticsService extends Service {
  async findStatistics() {
    // const article = await this.ctx.model.Article.find();
    // const newStatistics = await this.ctx.model.Admin.Statistics.find();
    // for (let i = 0; i < article.length; i++) {
    //   for (let k = 0; k < newStatistics.length; k++) {
    //     if (
    //       newStatistics[k].name === article[i].title &&
    //       newStatistics[k].year !=
    //         new Date(new Date().toLocaleDateString()).getTime() &&
    //       newStatistics[k].value == article[i].visitCount
    //     ) {
    //       const statisticSave = await this.ctx.model.Admin.Statistics({
    //         year: new Date(new Date().toLocaleDateString()).getTime(),
    //         value: article[i].visitCount,
    //         name: article[i].title,
    //       });
    //       statisticSave.save();
    //     }
    //   }
    // }
    try {
      const statistics = await this.ctx.model.Admin.Statistics.find();
      statistics.sort((a, b) => {
        return a.value - b.value;
      });
      return statistics;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }
}

module.exports = StatisticsService;
