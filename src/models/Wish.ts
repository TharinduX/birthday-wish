import mongoose, { Schema } from 'mongoose';

const WishSchema = new Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    wish: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Wish = mongoose.models.Wish || mongoose.model('Wish', WishSchema);

export default Wish;
