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

/**
 * create a session in redis
 * @param {string} userId
 * @param {number} time
 * @returns object
 */
function setSession(userId, time) {
  return new Promise((resolve, reject) => {
    redisClient.setex(
      userId,
      3600,
      JSON.stringify({ userId, status: true }),
      (err, reply) => {
        if (err) {
          console.log(err);
          reject({
            reply: err,
            message: "error in session creating",
            success: false,
          });
          return;
        }
        console.log(reply);
        resolve({ reply, message: "session created", success: true });
      }
    );
  });
}
/**
 * get a stored session in redis
 * @param {string} userId
 * @returns object
 */
function getSession(userId) {
  return new Promise((resolve, reject) => {
    redisClient.get(userId, (err, reply) => {
      if (err) {
        console.log(err);
        reject({
          reply: err,
          message: "invalid session",
          success: false,
        });
        return;
      }
      console.log(reply);
      resolve({ reply, message: "valid session", success: true });
    });
  });
}

/**
 * get all stored sessions in redis
 * @returns [userId]
 */
function getAllSession() {
  return new Promise((resolve, reject) => {
    redisClient.keys("*", (err, reply) => {
      if (err) {
        console.log(err);
        reject({
          reply: err,
          message: "error getting sessions",
          success: false,
        });
        return;
      }
      console.log(reply);
      resolve({ sessions: reply, success: true });
    });
  });

  // redisClient.keys("*", (err, reply) => {
  //   console.log(err);
  //   console.log(reply);
  // });
}

// getAllSession();

module.exports.redisClient = redisClient;
module.exports.setSession = setSession;
module.exports.getAllSession = getAllSession;
