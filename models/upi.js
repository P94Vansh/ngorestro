const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  upiId: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Please enter a valid UPI ID']

  },
}, { timestamps: true });


const Payment = mongoose.models.payment || mongoose.model('Payment', paymentSchema);

export default Payment;