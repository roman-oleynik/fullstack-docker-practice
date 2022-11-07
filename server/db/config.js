require('dotenv').config()

module.exports = {
  aws_table_name: 'todos',
  aws_local_config: {
    // to be filled
  },
  aws_remote_config: {
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
    region: 'us-east-1',
  }
};