const { AWS } = require('../../config/keys');
exports.fileUploade = (req, res, next) => {
  console.log(req.files);
  const { files } = req;
  console.log(files);

  const s3Client = AWS.s3.s3Client;
  const params = AWS.s3.uploadParams;
  params.Key = files[0].originalname;
  params.Body = files[0].buffer;
  s3Client.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error -> ' + err });
    }
    console.log(data.Location);

    return res.json({
      message: 'File uploaded successfully! -> keyname = ' + data.Location,
    });
  });
};
const uploadeFile