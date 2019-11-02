const { AWS } = require('../../config/keys');
exports.fileUploade = async (req, res, next) => {
  try {
    const { files } = req;
    const promises = [];
    files.forEach(file => {
      promises.push(fileUploadeToS3(file));
    });
    const images = await Promise.all(promises);
    return res.status(200).json({
      images,
    });
  } catch (err) {
    return res.status(500).json({ errors: 'Error -> ' + err });
  }
};
const fileUploadeToS3 = file =>
  new Promise((resolove, reject) => {
    const s3Client = AWS.s3.s3Client;
    const params = AWS.s3.uploadParams;
    params.Key = file.originalname;
    params.Body = file.buffer;
    const req = s3Client.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolove(data.Location);
    });
  });
