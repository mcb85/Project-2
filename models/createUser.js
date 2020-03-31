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
  return User;
};
