import express from 'express';
import cors from 'cors';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, ScanCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 8080;

// AWS 클라이언트 설정
const s3Client = new S3Client({ region: process.env.AWS_REGION });
const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const corsOptions = {
  origin: process.env.CORS_ALLOW_ORIGIN,
  optionsSuccessStatus: 200
};

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors(corsOptions));
app.use(express.json());



// 제품 목록 조회
app.get('/products', async (req, res) => {
  const params = {
    TableName: DYNAMODB_TABLE_NAME
  };

  try {
    const { Items } = await ddbDocClient.send(new ScanCommand(params));
    res.json(Items);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Could not retrieve products' });
  }
});


// 제품 추가
app.post('/products', upload.single('image'), async (req, res) => {
  const { name, price, category, popularity, description } = req.body;
  const id = uuidv4();
  const imageKey = `${id}.jpg`;

  try {
    // S3에 이미지 업로드
    await s3Client.send(new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: imageKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }));

    // DynamoDB에 제품 정보 저장
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Item: {
        id,
        name,
        price,
        popularity,
        category,
        description,
        image: `https://${S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`
      }
    };

    await ddbDocClient.send(new PutCommand(params));

    res.status(201).json({ id, name, price, image: params.Item.image });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Could not add product' });
  }
});


// 제품 삭제
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // S3에서 이미지 삭제
    await s3Client.send(new DeleteObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: `${id}.jpg`
    }));

    // DynamoDB에서 제품 정보 삭제
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Key: { id }
    };

    await ddbDocClient.send(new DeleteCommand(params));

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Could not delete product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});