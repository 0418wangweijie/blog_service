const Service = require("egg").Service;

class SlideShowService extends Service {
  async findSlideShow() {
    try {
      const resSlideShow = await this.ctx.model.SlideShow.find().sort({
        sort: -1,
      });
      return resSlideShow;
    } catch (err) {
      this.ctx.body = JSON.stringify(err);
    }
  }
  async addSlideShow() {
    const newSlideShow = this.ctx.request.body;
    try {
      const resAddSlideShow = await this.ctx.model.SlideShow(newSlideShow);
      resAddSlideShow.save();
      return resAddSlideShow;
    } catch (err) {
      this.ctx.body = JSON.stringify(err);
    }
  }
  async updateSlideShow() {
    const updateSlideShow = this.ctx.request.body;
    try {
      const resUpdateSlideShow = await this.ctx.model.SlideShow.updateOne(
        { _id: updateSlideShow._id },
        updateSlideShow
      );
      return resUpdateSlideShow;
    } catch (err) {
      this.ctx.body = JSON.stringify(err);
    }
  }
  async deleteSlideShow() {
    const id = this.ctx.params.id;
    try {
      const resDeleteSlideShow =
        await this.ctx.model.SlideShow.findByIdAndDelete({ _id: id });
      return resDeleteSlideShow;
    } catch (err) {
      this.ctx.body = JSON.stringify(error);
    }
  }
}
module.exports = SlideShowService;
