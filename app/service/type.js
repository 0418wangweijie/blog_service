"use strict";

const Service = require("egg").Service;

class TypeService extends Service {
  async findType() {
    try {
      const resType = await this.ctx.model.Type.find();
      return resType;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }

  async addType() {
    console.log(this.ctx.request.body);
    const newType = this.ctx.request.body;
    try {
      const resSaveType = await this.ctx.model.Type(newType);
      resSaveType.save();
      return resSaveType;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }

  async updateType() {
    const updateType = this.ctx.request.body;
    try {
      const type = await this.ctx.model.Type.updateOne(
        { _id: updateType._id },
        {
          typeName: updateType.typeName,
          sort: updateType.sort,
          icon: updateType.icon,
        }
      );
      return type;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }

  async deleteType() {
    const id = this.ctx.params.id;
    try {
      const resDeleteType = await this.ctx.model.Type.findByIdAndDelete({
        _id: id,
      });
      return resDeleteType;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }
}

module.exports = TypeService;
