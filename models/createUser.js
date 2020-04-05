const bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
  // create user model
  let User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });
  // create table with user model
  User.sync()
    .then(() => console.log("Oh yeah!User table created successfully"))
    .catch(err =>
      err.console.log("BTW, did you enter wrong database credentials ? ")
    );

  User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
