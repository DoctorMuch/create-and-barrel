const router = require('express').Router();
const { User, Whiskey } = require('../../models');

router.get('/', (req, res) => {
  Whiskey.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbWhiskeyData => res.json(dbWhiskeyData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Whiskey.create(req.body)
  .then(dbWhiskeyData => res.json(dbWhiskeyData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;