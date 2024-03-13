module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    username:{
      type:DataTypes.STRING,
      allowNull:true,
      unique:true
    }
  });

  User.associate = model => {

    User.hasMany(model.Post, {
      onDelete: 'cascade'
    })

    User.hasMany(model.Comment, {
      onDelete: 'cascade'
    })

    User.hasMany(model.Like, {
      onDelete: 'cascade'
    })
  }

  return User
}
