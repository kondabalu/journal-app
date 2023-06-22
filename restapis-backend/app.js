const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const userRoute = require("./routes/user");



mongoose.connect('mongodb+srv://balubp:6IXoEJ6PQ7IFNDZo@cluster-soccertracker.81mxens.mongodb.net/journalapp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to database!');
  })
  .catch((err) => {
    console.log(err);
  });

const User = require('./models/entries');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With ,Content-Type,Authorization ,Accept",
    "HTTP/1.1 200 OK",
    "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS,PUT"
  );
  next();
});

app.use("/api/journal",userRoute);

module.exports = app;

// app.post("/api/soccer-tracker/save", (req, res, next) => {
//   const soccerTracker = new SoccerTracker({
//     playername: req.body.playername,
//     clubname: req.body.clubname,
//     youthclub: req.body.youthclub,
//     position: req.body.position,
//     goals: req.body.goals,
//     assists: req.body.assists,
//     yellowcards: req.body.yellowcards,
//     redcards: req.body.redcards,
//     tackles: req.body.tackles,
//     saves: req.body.saves,
//     dateOfBirth: req.body.dateOfBirth
//   });
//   soccerTracker.save().then(createdProfile => {
//     res.status(201).json({
//       message: 'Player Profile Added Successfully',
//       posts: createdProfile
//     });

//   });

// });

// app.put("/api/soccer-tracker/update/:id", (req, res, next) => {
//   const soccerTracker = new SoccerTracker({
//     _id: req.body._id,
//     playername: req.body.playername,
//     clubname: req.body.clubname,
//     youthclub: req.body.youthclub,
//     position: req.body.position,
//     goals: req.body.goals,
//     assists: req.body.assists,
//     yellowcards: req.body.yellowcards,
//     redcards: req.body.redcards,
//     tackles: req.body.tackles,
//     saves: req.body.saves,
//     dateOfBirth: req.body.dateOfBirth
//   });
//   SoccerTracker.updateOne({ _id: req.params.id }, soccerTracker).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Update Successful !" });
//   });
// });

// app.get("/api/soccer-tracker/profiles/:id", (req, res, next) => {
//   SoccerTracker.findById(req.params.id).then(profile => {
//     if (profile) {
//       res.status(200).json({
//         message: 'Profile found!',
//         posts: profile
//       });
//     } else {
//       res.status(200).json({ message: 'profile not found' });
//     }
//   });
// });