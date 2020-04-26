const AWS = require('aws-sdk');
const bluebird = require('bluebird');

// Configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// Create S3 instance
const s3 = new AWS.S3();

exports.s3Upload = (buffer, location) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: 'application/pdf',
    Key: location,
  };
  return s3.upload(params).promise();
};
