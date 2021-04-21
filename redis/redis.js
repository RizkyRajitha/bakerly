const redis = require("redis");

const redisHost = process.env.redisHost || require("../config/env").redisHost;
const redisPort = process.env.redisPort || require("../config/env").redisPort;
const redisPass = process.env.redisPass || require("../config/env").redisPass;
const redisClient = redis.createClient({
  host: redisHost,
  port: redisPort,
  password: redisPass,
});

redisClient.on("connect", (conn) => {
  console.error("connected to redis");
});
redisClient.on("error", function (error) {
  console.error(error);
});

function setSession(userId, time) {
  return new Promise((resolve, reject) => {
    redisClient.setex(
      userId,
      3600,
      JSON.stringify({ userId, status: true }),
      (err, reply) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        console.log(reply);
        resolve(reply);
      }
    );
  });
}

module.exports.redisClient = redisClient;
module.exports.setSession = setSession;
