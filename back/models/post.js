module.exports = (db, type) => {
    return db.define('Post', {
    title: {
      type: type.STRING,
      allowNull: false,
    },
    description: {
      type: type.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: type.UUID,
      allowNull: true
    },
  }, {
  })}