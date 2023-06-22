const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require('../models/entries');


router.get("/all-user-entries", (req, res, next)=>{
    User.find().then(users => {
        res.status(200).json({
          message: "Users are found",
          posts: users
        });
        console.log(users);
      });
});

router.get("/entries/:id", (req, res, next) => {
    User.findOne({username:req.params.id}).then(user => {
      res.status(200).json({
        message: "Users are found",
        posts: user.entries
      });
      console.log(user);
    });
  });

router.post("/login",(req,res,next)=>{
    User.findOne({ username: req.body.username }).then((user)=>{
        if (user) {
            if(user.password === req.body.password){
                const token =jwt.sign({username: user.username, password: user.password}, 'this_is_the_first_time_using_json_web_token');
                res.status(200).json({
                    token: token,
                    message: "logged in succesfully"
                });
                console.log(res.message);
            }else{
                res.status(401).json({
                    message:"Unauthorized"
                });
            }
        }
});
});

router.post("/register", (req, res, next)=>{
    const user = new User({
        username : req.body.username,
        password: req.body.password
    });
    try{
    user.save().then((createdUser)=>{
        res.status(200).json({
            message: "user added succesfully",
            posts: createdUser.entries
        });
        console.log(createdUser);
    });
    }catch(err){
        res.status(400).json({
            message: "couldn't add user"
        })
    }
});

router.post("/forgot", (req,res,next)=>{
  User.findOne({ username: req.body.username })
  .then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    user.password = req.body.password;
    return user.save();
  })
  .then(() => {
    res.status(200).json({ message: 'Password saved successfully.' });
    console.log(user.entries);
  })
  .catch((err) => {
    console.error('Error saving Password:', err);
    res.status(500).json({ message: 'An error occurred while saving the entry.' });
  });
});

router.put("/entry/:id",(req,res,next)=>{
    User.findOne({ username: req.params.id })
  .then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newEntry = {
      title: req.body.title,
      entry: req.body.entry,
      dateOfEntry: req.body.dateOfEntry
    };

    user.entries.push(newEntry);

    return user.save();
  })
  .then(() => {
    res.status(200).json({ message: 'Entry saved successfully.' });
    console.log(user.entries);
  })
  .catch((err) => {
    console.error('Error saving entry:', err);
    res.status(500).json({ message: 'An error occurred while saving the entry.' });
  });
});

router.post("/delete-entry/:id",(req,res,next)=>{
    User.findOne({ username: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const entryId = req.body._id;
      const entryIndex = user.entries.findIndex((entry) => entry._id.toString() === entryId);
  
      if (entryIndex !== -1) {
        user.entries.splice(entryIndex, 1);
        return user.save();
      } else {
        return res.status(400).json({ message: 'Entry not found.' });
      }
    })
    .then(() => {
      res.status(200).json({ message: 'Successfully deleted entry.' });
      console.log("Delete entry");
      console.log(req.body);
    })
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).json({ message: 'An error occurred while deleting the entry.' });
    });  
});

router.put("/edit-entry/:id",(req,res,next)=>{
    User.findOne({ username: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const entryId = req.body._id;
      const entry = user.entries.find((entry) => entry._id.toString() === entryId);
  
      if (!entry) {
        return res.status(404).json({ message: 'Entry not found.' });
      }
  
      entry.title = req.body.title;
      entry.entry = req.body.entry;
      console.log(req.body.entry);
      entry.dateOfEntry = req.body.dateOfEntry;
      return user.save();
    })
    .then((savedUser) => {
      console.log(savedUser);
      res.status(200).json({ message: 'Successfully edited entry.', user: savedUser });
    })
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).json({ message: 'An error occurred while editing the entry.' });
    });
});
  

module.exports = router;