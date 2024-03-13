module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title:{
      type:DataTypes.STRING,
      allowNull:false
    },
    content:{
      type:DataTypes.STRING,
      allowNull:false
    }
  });

  Post.associate = model => {
    Post.hasMany(model.Comment, {
      onDelete: 'cascade'
    })

    Post.hasMany(model.Like, {
      onDelete: 'cascade'
    })
  }


  return Post
}
