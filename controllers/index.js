const router = require('express').Router();

const apiRoutes = require('./api/user-routes');

router.use('/api', apiRoutes);

module.exports = router;