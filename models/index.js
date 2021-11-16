// import models
const User = require('./User');
const Whiskey = require('./Whiskey');

// Whiskey belongs to User
Whiskey.belongsTo(User, {
    foreignKey: 'Whiskey_id'
})
// Users have many whiskeys
User.hasMany(Whiskey, {
    foreignKey: 'User_id'
});

module.exports ={
    User,
    Whiskey,
};