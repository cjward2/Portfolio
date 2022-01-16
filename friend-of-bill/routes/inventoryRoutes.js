const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

router.get('/api/inventories/:id', (req, res) => {
    Inventory.find({ id: req.params.id })
    .then(inventory => {
      console.log(inventory);
      res.json({ inventory });
    }).catch(err => {
      console.log(err);
      res.status(400).json({ msg: 'Error finding Inventories', err: true });
    })
  });
  
  router.post('/api/inventory/new', (req, res) => {
    const { user, formData, isChecked } = req.body;
    let newInventory = new Inventory({
      id: user.id,
      who: formData.who,
      why: formData.why,
      fear: isChecked[0].checked && isChecked[0].type,
      selfEsteem: isChecked[1].checked && isChecked[1].type,
      security: isChecked[2].checked && isChecked[2].type,
      personalRelationship: isChecked[3].checked && isChecked[3].type,
      sexRelations: isChecked[4].checked && isChecked[4].type,
      pride: isChecked[5].checked && isChecked[5].type,
      myPart: formData.myPart
    });
    newInventory.save()
    .then(inventory => {
      console.log(inventory);
      res.json(inventory);
    }).catch(err => {
      console.log(err);
      res.status(400).json({ msg: 'Error saving Inventory', err: true });
    });
  });
  
  router.get('/api/inventory/:id', (req, res) => {
      Inventory.findById(req.params.id)
      .then(inventory => {
        console.log(inventory)
        res.json(inventory);
      }).catch(err => {
        res.status(400).json({ msg: 'Error finding inventory', err: true });
      })
  })
  
  router.put('/api/inventory/:id', (req, res) => {
    const { formData, isChecked } = req.body;
    Inventory.findByIdAndUpdate({ _id: req.params.id }, {
          who: formData.who,
          why: formData.why,
          fear: isChecked[0].checked && isChecked[0].type,
          selfEsteem: isChecked[1].checked && isChecked[1].type,
          security: isChecked[2].checked && isChecked[2].type,
          personalRelationship: isChecked[3].checked && isChecked[3].type,
          sexRelations: isChecked[4].checked && isChecked[4].type,
          pride: isChecked[5].checked && isChecked[5].type,
          myPart: formData.myPart
    })
    .then(inventory => {
      console.log(inventory, 'yoooooooo');
      res.json({ inventory })
    }).catch(err => {
      console.log(err);
      res.status(404).json({ msg: 'Error updating Inventory', err: true });
    })
  });
  
router.delete('/api/inventory/:id', (req, res) => {
    Inventory.deleteOne({ _id: req.params.id })
    .then(inventory => {
      Inventory.find({ id: req.body.id }) //If inventory is found, send back inventories to update state on front end
      .then(inventory => {
        res.json({ inventory });
      }).catch(() => {
        res.status(400).json({ msg: 'Error finding all Inventories in delet route', err: true });
      })
    }).catch(err => {
      res.status(400).json({ msg: 'Error deleting Inventory', err: true });
    })
  });

  module.exports = router;