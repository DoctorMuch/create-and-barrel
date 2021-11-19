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

router.get('/:id', (req, res) => {
  Whiskey.findOne({
    where: {
      id: req.params.id
    },
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
  req.body.user_id = req.session.user_id;
  Whiskey.create(req.body)
  .then(dbWhiskeyData => res.json(dbWhiskeyData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;