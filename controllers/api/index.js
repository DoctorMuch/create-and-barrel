const router = require('express').Router();

const userRoutes = require('./user-routes');
const whiskeyRoutes = require('./whiskey-routes');

router.use('/users', userRoutes);
router.use('/whiskeys', whiskeyRoutes);
module.exports = router;