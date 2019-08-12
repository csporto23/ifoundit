const redis = require('redis');
const redisClient = redis.createClient('//rediscloud:a2jAMHTJTS99VAlm1mU6UW6qxZdOBBx1@redis-19615.c99.us-east-1-4.ec2.cloud.redislabs.com:19615');
const schedule = require('node-schedule');

redisClient.on('error', function (err) {
  console.log('Error' + err);
});

redisClient.on('connect', () => {
  console.log('redis connect');
});

// flush redis at midnight
schedule.scheduleJob('0 0 * * *', () => {
  redisClient.flushdb( (err, succeeded) => {
    console.log('flush done', succeeded);
  });
});

// redisClient.flushdb( function (err, succeeded) {
//   console.log('flushing DB:', succeeded); // will be true if successfull
// });

module.exports = redisClient;