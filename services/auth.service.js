const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const UserService = require('./user.service');
const service = new UserService();
const {config} = require('../config/config');

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
      throw boom.unauthorized();

    delete user.dataValues.password;
    return user;
  }

  async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role.name
    }

    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '10min'});
    const link = `https://mypaeg.com/reset-password?token=${token}`;
    await service.update(user.id, {recoveryToken: token});


    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, //TODO: add to .env
        pass: testAccount.pass, //TODO: add to .env
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: 'test@email.com',
      to: email,
      subject: "Recover Password",
      html: `<b>Ingresa al siguinete link para recuperar tu contraseña - ${link}</b>`,
    });

    return {message: "Mail sended"};
  }


  async resetPassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const pswhash = bcrypt.hash(newPassword, 10)
      await service.update(user.id, {password: pswhash, recoveryToken: null});

      return {message: "User password updated"};
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
