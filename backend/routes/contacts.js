const express = require('express');

const router = express.Router();

const Contact = require('../models/contact');
const CheckAuth = require('../middleware/check-auth');

router.post('',CheckAuth, (req,res, next) =>{
  const contact = new Contact({
    name: req.body.name,
    contactNo: req.body.contactNo,
    address: req.body.address
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

    Contact.updateOne({_id: req.params.id},contact)
    .then( result =>{
      console.log(result);
      res.status(200).json({
      message: 'updated successfully .'
      });
    // }).catch(err => {
    //   res.status(200).json({
    //     error: err
    //   });
     });
});
router.get('', CheckAuth,(req, res, next) =>{

    Contact.find()
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
  Contact.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'contacts deleted .'
    });

  });
});

module.exports = router;
