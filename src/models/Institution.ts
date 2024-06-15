import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IInstitution extends Document {
  name: string;
  email: string;
  password: string;
}

const institutionSchema = new Schema<IInstitution>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

institutionSchema.pre('save', async function (this: IInstitution, next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const Institution = mongoose.model<IInstitution>('Institution', institutionSchema);
export default Institution;
