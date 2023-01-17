const { Schema, model } = require("mongoose");

const myOrdersSchema = new Schema(
    {
        productsPurchased: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        totalProducts: Number,
        orderNumber: Number,
        finalPrice: Number
    }
)

const MyOrders = model("MyOrders", myOrdersSchema);
module.export = MyOrders;