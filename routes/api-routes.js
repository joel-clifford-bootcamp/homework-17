const router = require("express").Router();
const { Workout, Exercise } = require("../models/index");

module.exports = function(app) {

  app.get("/api/workouts", ( req, res) => {
    Workout.find({})
    .sort({ date: -1 })
    .limit(1)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  });

  app.get("/api/workouts/range", ( req, res) => {
    Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    })
  });

  app.post("/api/workouts", ( { body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  });

  app.put("/api/workouts/:id", ( req, res) => {
    var workoutId = req.params.id;

    Exercise.create(req.body).then(exercise => {
      Workout.update(
        {_id: workoutId},
        {$push: {exercises: exercise}}
      )
      .then(dbWorkout => {
        res.json(dbWorkout);
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
  });
}
