"use strict";

const Service = require("egg").Service;

class MusicService extends Service {
  async findMusic() {
    try {
      const resMusic = await this.ctx.model.Music.find();
      return resMusic;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }
  async addMusic() {
    const newMusic = this.ctx.request.body;
    try {
      const resAddMusic = await this.ctx.model.Music(newMusic);
      resAddMusic.save();
      return resAddMusic;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }
  async upadteMusic() {
    const newMusic = this.ctx.request.body;
    try {
      const resUpdateMusic = await this.ctx.model.Music.updateOne(
        { _id: newMusic._id },
        {
          name: newMusic.name,
          artist: newMusic.artist,
          url: newMusic.url,
          cover: newMusic.cover,
        }
      );
      return resUpdateMusic;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }
  async deleteMusic() {
    const id = this.ctx.params.id;
    try {
      const resDeleteMusic = await this.ctx.model.Music.findByIdAndDelete({
        _id: id,
      });
      return resDeleteMusic;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }
}
module.exports = MusicService;
