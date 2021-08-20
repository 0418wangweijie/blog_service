"use strict";

const Service = require("egg").Service;

class LoginService extends Service {
  async findUser() {
    console.log(this.ctx.request);
    const username = this.ctx.request.body.username;
    const password = this.ctx.request.body.password;
    try {
      const resLogin = await this.ctx.model.Admin.Login.findOne({
        username: username,
        password: password,
      });
      return resLogin;
    } catch (error) {
      this.ctx.body = JSON.stringify(error);
    }
  }
}
module.exports = LoginService;
