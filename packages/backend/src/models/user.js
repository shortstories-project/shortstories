import bcrypt from 'bcryptjs'

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 70],
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verifyToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    verifyTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  })

  User.associate = models => {
    User.hasMany(models.Story, { onDelete: 'cascade', hooks: true })
    User.hasMany(models.Reaction, { onDelete: 'cascade', hooks: true })
    User.hasMany(models.View, { onDelete: 'cascade', hooks: true })
    User.hasMany(models.Comment, { onDelete: 'cascade', hooks: true })
  }

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: {
        username: login,
      },
    })

    if (!user) {
      user = await User.findOne({
        where: {
          email: login,
        },
      })
    }

    return user
  }

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash()
  })

  // eslint-disable-next-line
  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10
    return await bcrypt.hash(this.password, saltRounds)
  }

  // eslint-disable-next-line
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
  }

  return User
}

export default user
