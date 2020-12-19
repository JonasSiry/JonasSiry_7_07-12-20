module.exports = (db, type) => {
    return db.define('Com', {
    comment: {
      type: type.TEXT,
      allowNull: false,
    },
  }, {
  })}