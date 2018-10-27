'use strict';

const tessel = require('tessel');
const servolib = require('servo-pca9685');

const servo = servolib.use(tessel.port['A']);
const servo1 = 1; // We have a servo plugged in at position 1

const settings = {
  minDutyCycle: 0.05,
  maxDutyCycle: 0.12,
  duration: 500,
};

servo.on('ready', () => {
  servo.configure(servo1, settings.minDutyCycle, settings.maxDutyCycle, () => {
    servo.read(servo1, (err, reading) => {
      console.log('Initial Reading: ', reading);
    });

    servo.move(servo1, 1);

    setTimeout(() => {
      servo.move(servo1, 0);

      servo.read(servo1, (err, reading) => {
        console.log('Final Reading: ', reading);
      });
    }, 500);
  });
});
