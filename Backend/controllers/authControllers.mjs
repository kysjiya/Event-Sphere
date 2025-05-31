import User from '../models/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const {name, email, password, role} = req.body;
    try{
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({msg: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword, role});

        const token = jwt.sign({id: user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(201).json({token, user});
    }
    catch (err)
    {   
        res.status(500).json({msg: 'Server Error', error: err.message});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ msg: 'Invalid Credentials'});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).json({token, user});
    }
    catch(err)
    {
        res.status(500).json({msg: 'Server Error', error: err.message});
    }
};