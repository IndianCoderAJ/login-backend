import { Schema, model} from 'mongoose';

interface Audit {
     userId:Schema.Types.ObjectId;
     details:string;
  }

  const schema = new Schema<Audit>({
    userId:{type:Schema.Types.ObjectId,ref: "User"},
    details:{type:String}
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const  AuditModel = model<Audit>('Audit', schema);

export default AuditModel
  