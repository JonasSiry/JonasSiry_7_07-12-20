module.exports = (db, type) => {
    return db.define('Com', {
      text: {
      type: type.TEXT,
      allowNull: false,
    },
  }, {
  })}