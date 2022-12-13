const express = require("express")
const router = express.Router();

// mongoDB 스키마 모델 가져오기
const Cart = require("../schemas/cart.js")
const Goods = require('../schemas/goods.js')


// 경로 : localhost:3000/api/carts          장바구니에 있는 데이터들을 가져온다.
router.get('/carts', async (req, res) => {
    console.log("carts get api 진입 완료")
    const carts = await Cart.find({});  // 장바구니에 담아 둔 목록들.
    // [{goodsId, quantity}]
    const goodsIds = carts.map((cart) => {
        return cart.goodsId     
                // [2, 11, 4] 이런 식으로 나오겠지. 장바구니에 담겨있는 데이터들의 goodsId 만 가져 오는거야.
                // 이게 왜 필요한가? Goods 전체 리스트에서 장바구니에 담겨있는 물품들의 상세 정보만 쉽게 빼올려고.
    })

    const goods = await Goods.find({goodsId: goodsIds});
    // Goods 에 해당하는 모든 정보를 가져올 건데, goodsIds 배열 안에 존재하는 값일 때만 조회하라.[{}, {}, {}]

    const results = carts.map((cart) => {
        return {
            quantity: cart.quantity,
            goods: goods.find((item) => item.goodsId === cart.goodsId)  
                        // 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환
        }
    })

    res.json({"carts": results})
});







module.exports = router
