const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    goodsId: {
        type: Number,
        required: true,   // not null 과 같아
        unique: true       // 유니크한, 즉 중복이 없는 값이어야 한다.
    },
    quantity: {         // 해당 굿즈를 몇 개 담아뒀는가. 
        type: Number,
        required: true
    }
});


module.exports = mongoose.model("Cart", cartSchema);