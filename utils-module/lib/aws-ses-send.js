const AWS = require('aws-sdk');

// Configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-2',
});

const SES = new AWS.SES();

exports.sendEmail = async (payload) => {
  const { emails, from, subject, text } = payload;

  if (!emails || !from || !subject || !text) {
    return Responses._400({
      message: 'emails, from, subject and text are all required in the body',
    });
  }

  const params = {
    Destination: {
      ToAddresses: emails,
    },
    Message: {
      Body: {
        Text: { Data: text },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };

  try {
    await SES.sendEmail(params).promise();
    return true;
  } catch (error) {
    console.log('error sending email ', error);
    return false;
  }
};
