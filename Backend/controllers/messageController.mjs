import Message from '../models/Message.mjs';

export const sendMessage = async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;
        const newMessage = await Message.create({ sender, receiver, message });
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to send message', error: err.message });
    }
};

export const getMessagesBetweenUsers = async (req, res) => {
    try {
        const { user1, user2 } = req.params;
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to get messages', error: err.message });
    }
};
