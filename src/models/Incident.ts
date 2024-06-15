import mongoose, { Schema, Document } from 'mongoose';

export interface IIncident extends Document {
  institution: string;
  childName: string;
  details: string;
  signature: string;
  signatureType: 'handwritten' | 'typed';
  status: string;
  comments?: string;
  parentSignature?: string;
  parentSignatureType?: 'handwritten' | 'typed';
  signedByParent?: boolean;
  date: Date;
}

const IncidentSchema: Schema = new Schema({
  institution: { type: String, required: true },
  childName: { type: String, required: true },
  details: { type: String, required: true },
  signature: { type: String, required: true },
  signatureType: { type: String, required: true },
  status: { type: String, required: true },
  comments: { type: String },
  parentSignature: { type: String },
  parentSignatureType: { type: String },
  signedByParent: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IIncident>('Incident', IncidentSchema);
