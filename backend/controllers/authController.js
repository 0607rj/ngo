import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name,email,password,role } = req.body;
  try{
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name,email, role: role || 'donor' });
    if(password){
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export const login = async (req,res)=>{
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: 'Invalid credentials' });
    if(!user.password) return res.status(400).json({ msg: 'No local password set for this user' });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export const getMe = async (req,res)=>{
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
