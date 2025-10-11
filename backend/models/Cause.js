import mongoose from 'mongoose';

const CauseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String },
  image: { type: String },
  goalAmount: { type: Number, default: 0 },
  raisedAmount: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const Cause = mongoose.model('Cause', CauseSchema);
export default Cause;
