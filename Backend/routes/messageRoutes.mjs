import express from 'express';
import { sendMessage, getMessagesBetweenUsers } from '../controllers/messageController.mjs';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/:user1/:user2', getMessagesBetweenUsers);

export default router;
