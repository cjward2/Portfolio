const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Inventory = require('../models/inventory');
const DeletedInventory = require('../models/deletedInventory');



//Inventory Routes!

//GET for user/inventory
router.get('/user/inventory', ensureAuthenticated, (req, res) => {
    //Only display inventory for specific user
    Inventory.find({ id: req.user.id }, (error, inventories) => {
        if(error) {
            console.log('Error in GET /user/inventory', error);
        } else {
            res.render('inventory.ejs', {inventories});
        }
    });
});


//GET for new inventory
router.get('/user/inventory/new', ensureAuthenticated, (req, res) => {
    res.render('new.ejs');
});

//POST route for submitting inventory
router.post('/user/inventory', ensureAuthenticated, (req, res) => {
    //Take data from req.body and Save to database
    let theInventory = new Inventory({
        id: req.user._id,
        who: req.body.who,
        why: req.body.why,
        fear: req.body.fear,
        selfEsteem: req.body.selfEsteem,
        security: req.body.security,
        personalRelationship: req.body.personalRelationship,
        sexRelations: req.body.sexRelations,
        pride: req.body.pride,
        myPart: req.body.myPart
    });
    theInventory.save((error, inventory) => {
        if(error) {
            console.log('Error saving inventory in POST /inventory route', error);
            res.render('new.ejs');
        } else {
            res.redirect(`/user/inventory/${inventory._id}`);
        }
    });
});

router.get('/user/inventory/:id', ensureAuthenticated, (req, res) => {
    Inventory.findById(req.params.id, (error, inventory) => {
        if(error) {
            console.log('Error in Shhow route at GET /inventory/:id', error);
            res.redirect('/user/inventory');
        } else {
            // console.log(inventory);
            res.render('show.ejs', {inventory});
        }
    });
});

//Edit route
router.get('/user/inventory/edit/:id', ensureAuthenticated, (req, res) => {
    Inventory.findById(req.params.id, (error, inventory) => {
        if(error){
            console.log('Error in Edit route at GET /user/inventory/edit/:id', error);
            res.redirect('/user');
        } else {
            res.render('edit.ejs', {inventory});
        }
    });
});

//PUT route for editing inventory
router.put('/user/inventory/:id', (req, res) => {
    Inventory.findByIdAndUpdate({ _id: req.params.id }, {
        who: req.body.who,
        why: req.body.why,
        fear: req.body.fear,
        selfEsteem: req.body.selfEsteem,
        security: req.body.security,
        personalRelationship: req.body.personalRelationship,
        sexRelations: req.body.sexRelations,
        pride: req.body.pride,
        myPart: req.body.myPart
    }, (error, inventory) => {
        if(error) {
            console.log('Error in PUT route /user/inventory/:id', error);
        } else {
            res.redirect(`/user/inventory/${inventory._id}`);
        }
    });
});

//Detroy Route
router.delete('/user/inventory/:id', (req, res) => {
    Inventory.findById({ _id: req.params.id }, (error, inventory) => {
        if(error){
            console.log('error deleting inventory', error);
        } else {
            DeletedInventory.insertMany([inventory], (error, deletedInventory) => {
                if(error) {
                    console.log('Error moving Inventory', error);
                } else {
                    console.log('Successfully moved', deletedInventory);
                }
                
            });
        }
        Inventory.deleteOne({ _id: req.params.id }, (error, deletedInventory) => {
            if(error) {
                console.log('error deleting Inventory', error);
                req.flash('error_msg', `An error occured. Please try again later.`);
                res.redirect('/user/inventory');
            } else {
                console.log('inventory deleted', deletedInventory);
                req.flash('success_msg', `Inventory successfully deleted!`);
                res.redirect('/user/inventory');
            }
        });
    });
});

module.exports = router;