const User = require('./User');
const Whiskey = require('./Whiskey')

User.hasMany(Whiskey, {
  foreignKey: 'user_id'
});

Whiskey.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Whiskey };
