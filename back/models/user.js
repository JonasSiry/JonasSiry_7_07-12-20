module.exports = (db, type) => {
  return db.define('User', {
    firstName: {
      type: type.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: type.STRING(50),
      allowNull: false
    },
    email: {
      type: type.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: type.STRING(100),
      allowNull: false
    }
  }, {
  })
}