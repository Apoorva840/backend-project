const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: { type: Number, unique: true, sparse: true},
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation
          },
          message: (props) => `${props.value} is not a valid email!`,
        },
      },
    first_name: { type: String },
    last_name: { type: String },
    contact: { type: String, match: /^[0-9]{10}$/ },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    isLoggedIn: { type: Boolean, default: false },
    uuid: { type: String, default: '' },
    accesstoken: { type: String, default: '' },
    coupens: [{
        id: { type: Number },
        discountValue: { type: Number }
    }],
    bookingRequests: [{
        reference_number: { type: Number },
        coupon_code: { type: Number },
        show_id: { type: Number },
        tickets: [Number]
    }]
});
///^[^\s@]+@[^\s@]+\.[^\s@]+$/, /.+\@.+\..+/,,  
module.exports = mongoose.model('users', userSchema);