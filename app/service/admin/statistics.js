'use strict';

const Service = require('egg').Service;

class StatisticsService extends Service {

    async findStatistics() {
        try {
            const statistics = await this.ctx.model.Admin.Statistics.find();
            statistics.sort((a, b) => {
                return a.value - b.value;
            })
            return statistics;
        } catch (error) {
            this.ctx.body = JSON.stringify(error);
        }
    }
}

module.exports = StatisticsService;
