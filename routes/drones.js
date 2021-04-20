const express = require('express');

const Drones = require('../models/Drone.model');

const router = express.Router();

router.get('/drones', async (req, res, next) => {
  try{
    const dronesFromDB = await Drones.find();
    console.log(dronesFromDB);
    res.render('drones/list', {dronesFromDB});

  }catch(e) {
    res.render('error');
    console.log(`An error cocurred ${e}`);
  }
});

router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form');
});

router.post('/drones/create', async (req, res, next) => {
  try {
    const { name, propellers, maxSpeed } = req.body;
    await Drones.create({name, propellers, maxSpeed});

    res.redirect('/drones/list');

  } catch(e) {
    res.render('error');
    console.log(`An error cocurred ${e}`);
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  const drone = await Drones.findById(req.params.id);
  res.render('drones/update-form', {drone});
});

router.post('/drones/:id/edit', async (req, res, next) => {
  try {
    const droneId = await Drones.findById(req.params.id);
  
    const{name, propellers, maxSpeed} = req.body;
  
    await Drones.findByIdAndUpdate(droneId, {name, propellers, maxSpeed});
  
    res.redirect('/drones');
  }catch(e){
    res.render('error');
    console.log(`An error cocurred ${e}`);
  }
});

router.post('/drones/:id/delete', async (req, res, next) => {
  await Drones.findByIdAndDelete(req.params.id);
  res.redirect('/drones');
});

module.exports = router;
