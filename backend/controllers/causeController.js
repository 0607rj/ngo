import Cause from '../models/Cause.js';

export const getAll = async (req,res) =>{
  try{
    const causes = await Cause.find({}).sort({ createdAt: -1 });
    res.json(causes);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export const getOne = async (req,res) =>{
  try{
    const cause = await Cause.findOne({ slug: req.params.slug });
    if(!cause) return res.status(404).json({ msg: 'Cause not found' });
    res.json(cause);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export const create = async (req,res) =>{
  try{
    const data = req.body;
    const cause = new Cause(data);
    await cause.save();
    res.json(cause);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export const update = async (req,res) =>{
  try{
    const updated = await Cause.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export const remove = async (req,res) =>{
  try{
    await Cause.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
