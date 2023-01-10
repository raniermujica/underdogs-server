const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    }, 
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
      }
    ],
    address: String,
    apartment: String,
    city: String,
    zipCode: Number,
    phone: Number
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
