module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    location: DataTypes.STRING
  });
  return Events;
};
