const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;

exports.s3Uploadv3 = async (files) => {
  const s3client = new S3Client();
  const urls = [];

  const uploadPromises = files.map(async (file) => {
    const originalKey = `uploads/${uuid()}-${file.originalname}`;

    // Replace spaces with '+'
    const modifiedKey = originalKey.replace(/ /g, "+");

    // console.log(
    //   "Generated Key:",
    //   `https://nafasi.s3.amazonaws.com/${modifiedKey}`
    // );

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: originalKey,
      Body: file.buffer,
    };

    await s3client.send(new PutObjectCommand(params));

    urls.push({
      originalKey,
      url: `https://nafasi.s3.amazonaws.com/${modifiedKey}`,
    });
  });

  await Promise.all(uploadPromises);

  return urls;
};
