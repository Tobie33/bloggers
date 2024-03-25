require('dotenv').config()

const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const accessKeyId = process.env.S3_ACCESS_KEY
const secretAccessKey = process.env.S3_SECRET_KEY
const bucketName = process.env.S3_BUCKET
const region = process.env.S3_REGION

const s3 = new S3({
  region,
  credentials:{
    accessKeyId,
    secretAccessKey
  }
})

//upload file to S3

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile


const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}

exports.getFileStream = getFileStream
