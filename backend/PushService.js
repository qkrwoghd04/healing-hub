import express from 'express';
import { Expo } from 'expo-server-sdk';
import {
  DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  DeleteCommand,
  ScanCommand
} from '@aws-sdk/lib-dynamodb';

const router = express.Router();

// Create a new Expo SDK client
const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: true,
});

const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const EXPO_TOKEN_TABLE = process.env.DYNAMODB_EXPO_TOKEN_TABLE;

router.post('/register', async (req, res) => {
  const { user_id, pushToken } = req.body;

  // Validate Expo push token
  if (!Expo.isExpoPushToken(pushToken)) {
    return res.status(400).json({ error: 'Invalid Expo push token' });
  }

  try {
    const params = {
      TableName: EXPO_TOKEN_TABLE,
      Item: {
        user_id,
        pushToken,
        createdAt: new Date().toISOString()
      }
    };

    await ddbDocClient.send(new PutCommand(params));
    res.status(201).json({ message: 'Token registered successfully' });
  } catch (error) {
    console.error('Error registering token:', error);
    res.status(500).json({ error: 'Failed to register token' });
  }
});

router.delete('/deregister', async (req, res) => {
  const { user_id } = req.body;

  try {
    const params = {
      TableName: EXPO_TOKEN_TABLE,
      Key: { user_id }
    };

    await ddbDocClient.send(new DeleteCommand(params));
    res.json({ message: 'Token unregistered successfully' });
  } catch (error) {
    console.error('Error unregistering token:', error);
    res.status(500).json({ error: 'Could not unregister token' });
  }
});

router.post('/send', async (req, res) => {
  const { title, body, data } = req.body;

  try {
    // Fetch all tokens
    const scanParams = {
      TableName: EXPO_TOKEN_TABLE
    };
    const { Items: tokens } = await ddbDocClient.send(new ScanCommand(scanParams));

    // Prepare messages
    const messages = tokens
      .filter(tokenData => Expo.isExpoPushToken(tokenData.pushToken))
      .map(tokenData => ({
        to: tokenData.pushToken,
        sound: 'default',
        title,
        body,
        data: data || {}
      }));

    // Chunk notifications to optimize sending
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    // Send notifications
    for (let chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error('Error sending notification chunk:', error);
      }
    }

    // Optional: Handle receipts (you can expand this if needed)
    const receiptIds = tickets
      .filter(ticket => ticket.status === 'ok')
      .map(ticket => ticket.id);

    res.json({ 
      message: 'Notifications sent successfully', 
      ticketCount: tickets.length,
      successfulTickets: receiptIds.length 
    });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ error: 'Could not send notifications' });
  }
});

export default router;