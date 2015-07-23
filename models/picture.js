'use strict';
module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define('Picture', {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Picture.belongsTo(models.User, { foreignKey : 'user_id', targetKey : 'id'});
      }
    },
    tableName : 'pictures',
    underscored : true
  });
  return Picture;
};