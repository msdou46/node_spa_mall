const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,   // not null 과 같아
    unique: true       // 유니크한, 즉 중복이 없는 값이어야 한다.
  },
  name: {
    type: String,
    required: true,    
    unique: true
  },
  thumbnailUrl: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
  }
});

module.exports = mongoose.model("Goods", goodsSchema);
            // 콜렉션(테이블) 명을 Goods 라고 할 거야.
            // goodsSchema 실제로 데이터가 들어갈 스키마. 즉 도큐먼트=레코드 의 필드 설정.
            // 이 goods.js 파일은 기본적으로 몽고DB에 어떤 형태로 데이터를 넣을 것이냐에 대한 템플릿을 설정해 주는 파일이야.
            // Goods 라는 모델을 만든거지. 이 모델을 사용해서 상품을 만들고 insert 해볼거야.