const mongoose = require('mongoose');
const Drone = require('../models/Drone.model');

require('../configs/db.config');

const drones = [
    {
        name: 'One',
        propellers: 4,
        maxSpeed: 18
    },
    {
        name: 'Two',
        propellers: 6,
        maxSpeed: 20
    },
    {
        name: 'Three',
        propellers: 3,
        maxSpeed: 15
    },
];

Drone.create(drones).then((dronesFromDB) => {
    console.log(`created ${dronesFromDB.length} drones`);
    mongoose.connection.close();
  }).catch((e) => {
      console.log(e);
  });
