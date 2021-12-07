const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const http = require("../services/httpService");
const dbURL = config.get("dbEndpoint") + "/user";

const userArray = [
  {
    name: "admin",
    email: "admin@admin.com",
    password: "$2b$10$2nqIaxdFY9s57nrrMjEM2.5gD.KQ3NF7/wU7taPNAC.lVf7bZbbYS",
    isAdmin: true,
  },
  {
    name: "admin",
    email: "admin1@admin.com",
    password: "admin12345",
    isAdmin: true,
  },
];

class User {
  static async findByEmail(email) {
    const { data: user } = await http.get(dbURL + "/search?", {
      params: {
        email: email,
      },
    });
    return user[0];
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log("In 'findByEmail()', EMAIL: ", email);
    //     const userIndex = _.findIndex(userArray, function (u) {
    //       return u.email == email;
    //     });
    //     if (userIndex >= 0) resolve(userArray[userIndex]);
    //     resolve(false);
    //   }, 300);
    // });
  }

  static async addNew(name, email, password,isadmin) {
    console.log("Inside AddNew")
    const { data } = await http.post(dbURL + "/add", {
      name: name,
      email: email,
      userpassword: password,
      isadmin: isadmin
    });
    return data[0];
    // return "A"
    
  }




  

  static async getCount() {
    const { data: count } = await http.get(dbURL + "/numberOfAVUsers");
    console.log("UserCount: ", count);
    return count;
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(300);
    //   }, 300);
    // });
  }

  static generateAuthToken(name, email, isadmin) {
    const isAdmin = isadmin == "true" ? true : false;
    const token = jwt.sign(
      {
        name: name,
        email: email,
        isadmin: isAdmin,
      },
      config.get("jwtPrivateKey")
    );
    return token;
  }

  static validate(user) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });
    return schema.validate(user);
  }
}

module.exports.User = User;
