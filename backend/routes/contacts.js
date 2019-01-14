const express = require('express');

const router = express.Router();

const Contact = require('../models/contact');
const CheckAuth = require('../middleware/check-auth');

router.post('',CheckAuth, (req,res, next) =>{
  const contact = new Contact({
    name: req.body.name,
    contactNo: req.body.contactNo,
    address: req.body.address,
    creator: req.userData.userId
  });

  contact.save().then(createdContact =>{
      res.status(201).json({
      message: ' post added sucessfully ..',
      contactId: createdContact._id
    });
  });


});

router.put('/:id', CheckAuth, (req, res, next) => {

    const contact = new Contact ({
      _id: req.body.id,
      name: req.body.name,
      contactNo: req.body.contactNo,
      address: req.body.address
    });

    Contact.updateOne({_id: req.params.id, creator: req.userData.userId},contact)
    .then( result =>{
      if(result.nModified > 0){
        res.status(200).json({
          message: 'updated successfully .'
          });
      }else{
        res.status(401).json({
          message: 'Authorization failed '
        });
      }


     });
});
router.get('', CheckAuth,(req, res, next) =>{

    Contact.find({creator: req.userData.userId})
    .then(documents => {
      res.status(200).json({
        message: 'Getting response from server..',
        contacts: documents
      });
    });

});

router.get('/:id',CheckAuth, (req, res, next) => {
  Contact.findById(req.params.id).then(contact => {
    if(contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({
        message: 'Contact not found'
      });
    }
  });
})

router.delete('/:id', CheckAuth, (req, res, next) => {
  Contact.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    if(result.n > 0){
      res.status(200).json({
        message: 'Deletion successfully .'
        });
    }else{
      res.status(401).json({
        message: 'Authorization failed '
      });
    }

  });
});

module.exports = router;
