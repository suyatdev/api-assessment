module.exports = {
  ENVIRONMENT: 'develop',
  TARGET_URL: 'http://localhost:3000/api',
  MONGODB_DATABASE: 'assessment_api',
  MONGODB_HOST: 'localhost',
  MONGODB_URI: 'mongodb://assessment_api:assessment_123@nodecluster-shard-00-00-xyyjk.mongodb.net:27017,nodecluster-shard-00-01-xyyjk.mongodb.net:27017,nodecluster-shard-00-02-xyyjk.mongodb.net:27017',
  OPTIONS: 'ssl=true&replicaSet=nodeCluster-shard-0&authSource=admin&retryWrites=true',
  SECRET: 'SUPER_12345',
  TOKEN_LIFE: 1000 * 60 * 60 * 24,
  SALT_ROUNDS: 10,
};
