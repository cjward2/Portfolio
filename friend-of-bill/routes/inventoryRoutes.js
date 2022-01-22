const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

//Get route for all inventories
router.get('/api/inventories/:id', (req, res) => {
    Inventory.find({ id: req.params.id })  //Pass in user id from req.params so i can find all inventories with that id. That is how im relating data to a specific user
    .then(inventory => {
      res.json({ inventory });  //Send up all inventories
    }).catch(err => {
      res.status(400).json({ msg: 'Error finding Inventories', err: true });  //Alert front end in case of error
    })
  });
  
  //Post route for new inventories
  router.post('/api/inventory/new', (req, res) => {
    const { user, formData, isChecked } = req.body;  //Destructure what i want out out req.body object
    let newInventory = new Inventory({
      id: user.id, //Save user id in document so i can form relationship
      who: formData.who,
      why: formData.why,
      fear: isChecked[0].checked && isChecked[0].type,  //If isChecked.checked is true, set type name in DB, otherwise it will be false
      selfEsteem: isChecked[1].checked && isChecked[1].type,
      security: isChecked[2].checked && isChecked[2].type,
      personalRelationship: isChecked[3].checked && isChecked[3].type,
      sexRelations: isChecked[4].checked && isChecked[4].type,
      pride: isChecked[5].checked && isChecked[5].type,
      myPart: formData.myPart
    });
    newInventory.save()  //Save new inventory
    .then(inventory => {
      res.json(inventory);  //Send it back to front end to change state
    }).catch(err => {
      res.status(400).json({ msg: 'Error saving Inventory', err: true });
    });
  });
  
  //GET route for specific inventory
  router.get('/api/inventory/:id', (req, res) => {
      Inventory.findById(req.params.id)  //Find specific inventory based of route params
      .then(inventory => {
        res.json(inventory);  //When its found send it back to front end
      }).catch(err => {
        res.status(400).json({ msg: 'Error finding inventory', err: true }); //If error occurs alert front end
      })
  });
  
  //PUT route for inventory editing
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
      res.json({ inventory })
    }).catch(err => {
      res.status(404).json({ msg: 'Error updating Inventory', err: true });
    })
  });
  
  //Delete route for inventory
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