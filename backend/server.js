const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const PORT = process.env.PORT || 3000;

// AWS 설정
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

app.use(cors());
app.use(express.json());

// 제품 목록 조회
app.get('/api/products', async (req, res) => {
  const params = {
    TableName: DYNAMODB_TABLE_NAME
  };

  try {
    const data = await dynamodb.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Could not retrieve products' });
  }
});

// 제품 추가
app.post('/api/products', upload.single('image'), async (req, res) => {
  const { name, price, description } = req.body;
  const id = uuidv4();
  const imageKey = `${id}.jpg`;

  try {
    // S3에 이미지 업로드
    await s3.putObject({
      Bucket: S3_BUCKET_NAME,
      Key: imageKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }).promise();

    // DynamoDB에 제품 정보 저장
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Item: {
        id,
        name,
        price,
        description,
        image: `https://${S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`
      }
    };

    await dynamodb.put(params).promise();

    res.status(201).json({ id, name, price, image: params.Item.image });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Could not add product' });
  }
});


// 제품 삭제
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // S3에서 이미지 삭제
    await s3.deleteObject({
      Bucket: S3_BUCKET_NAME,
      Key: `${id}.jpg`
    }).promise();

    // DynamoDB에서 제품 정보 삭제
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Key: { id }
    };

    await dynamodb.delete(params).promise();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Could not delete product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});