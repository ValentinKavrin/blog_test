module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      login: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      secondName: {
        type: Sequelize.STRING
      },
      password:{
        type: Sequelize.STRING
      }
    });
    return Users;
  };