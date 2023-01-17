const { Schema, model } = require("mongoose");

const shoppingCartSchema = new Schema(
    {
        addedProducts: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        userActive: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        totalPrice: Number
    }
)

const ShoppingCart = model("ShoppingCart", shoppingCartSchema);
module.export = ShoppingCart;