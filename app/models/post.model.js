module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("posts", {
      title: {
        type: DataTypes.STRING
      },
      text: {
        type: DataTypes.STRING
      },
      idMedia: {
        type: DataTypes.STRING
      }
    });
    return Posts;
  };