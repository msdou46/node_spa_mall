const express = require('express');     // express 라이브러리를 express 라는 변수에 할당.
const router = express.Router();        // express 안에 있는 router() 라는 함수를 실행한 값을 router 에 담아.

const Goods = require('../schemas/goods.js')	// 몽고DB에 입력할 스키마 모델. 즉 mysql 로 치면 정형화된 sql문을 불러와.
const Cart = require('../schemas/cart.js')

// 경로 : localhost:3000/api
router.get('/', (req, res) => {
    res.send("default url for goods.js Get Method");
});

// 경로 : localhost:3000/api/about
router.get('/about', (req, res) => {
    res.send("goods.js about PATH");
});

// 경로 : localhost:3000/api/goods
router.get('/goods', (req, res) => {
    res.status(200).json({goods});      
        // 이러면 {"goods": goods} 이렇게 보낸 것과 같아. 같은 이름으로 키 이름이 설정된다고. 세상에;;
})

// 경로 : localhost:3000/api/goods/goods_id
router.get('/goods/:goodsId', (req, res) => {
    const {goodsId} = req.params;
    console.log("값은 잘 넘어옴? " + goodsId)
    let pick_good = {};

    for (const obj of goods) {
      if (obj["goodsId"] === Number(goodsId)) {
        pick_good = obj;
      }
    }

    res.status(200).json({"goods": pick_good});
})

// 경로 : localhost:3000/api/goods/		goods 정보를 입력받았을 때 post 로 받아서 몽고db에 insert
router.post('/goods/', async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;
	
	const goods = await Goods.find({goodsId});	// 데이터가 있으면 [] 안에 {}가 담겨서 들어올 거야.

	if ( goods.length ) {
		return res.status(400).json({succecc: false, errorMessage: "이미 존재하는 GoodId 입니다"})
	}
	
	const createdGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price});	// {}

	res.json({goods: createdGoods});
})

// 경로 : localhost:3000/api/goods/:goodsId/cart 		장바구니에 상품 추가 API
router.post('/goods/:goodsId/cart', async (req, res) => {
	const {goodsId} = req.params;
	const {quantity} = req.body;

	const existsCarts = await Cart.find({goodsId});
	if (existsCarts.length) {
		return res.status(400).send({succecc: false, errorMessage: "이미 장바구니에 상품이 존재 합니다."})
	}

	await Cart.create({goodsId, quantity})
	
	res.json({"result": "success"})
})

// 경로 : localhost:3000/api/goods/:goodsId/cart 		장바구니의 상품을 수정
router.put('/goods/:goodsId/cart', async (req, res) => {
	const {goodsId} = req.params;
	const {quantity} = req.body;

	const existsCarts = await Cart.find({goodsId});	// 먼저 장바구니에 실제로 해당하는 값이 정말 존재하냐 확인.
	if (existsCarts.length) {
		await Cart.updateOne({goodsId: goodsId}, {$set: {quantity:quantity}})
				// goodsId(필드) 가 goodsId(변수) 에 해당하는 도큐먼트가 있다면,
				// 해당 도큐먼트의 quantity(필드)의 값을 quantity(변수) 로 수정하겠다.
	}

	res.status(200).json({success: true})
})

// 경로 : localhost:3000/api/goods/:goodsId/cart 		장바구니의 상품을 삭제
router.delete('/goods/:goodsId/cart', async (req, res) => {
	const {goodsId} = req.params;

	const existsCarts = await Cart.find({goodsId});	// 먼저 장바구니에 실제로 해당하는 값이 정말 존재하냐 확인.
	if (existsCarts.length) {
		await Cart.deleteOne({goodsId})
	}

	res.json({result: "success"})
})






module.exports = router;        // 바깥에서 접근할 수 있도록 exports. 즉 이 파일에 접근하면 router 를 반환하는거야.


// /routes/goods.js
const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
  ];



