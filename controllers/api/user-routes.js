const router = require('express').Router();
const { User, Whiskey } = require('../../models');

router.get('/', (req, res) => {
  User.findAll()
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData){
      res.status(404).json( {message: 'User not found.' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  User.create(req.body)
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]){
      res.status(404).json({ message: 'User not found!'})
      return;
    }
    res.json(dbUseData)})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })

  
});

router.delete('/:id', (req, res) => {});


module.exports = router;
