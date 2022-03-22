const redis = require("redis");

export const redisClient = redis.createClient(
	process.env.REDIS_URL || "redis://localhost:6379"
);

// TODO: Para que podemos usar Redis?
// Implementation.
// const {redisClient} = require('../db/redis');
// exports.postFile = (req, res) => {
//   redisClient.rpush('files_queue', req.params.surveyId);
// };
