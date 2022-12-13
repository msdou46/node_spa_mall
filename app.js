const express = require('express');     // express 라는 라이브러리를 가지고 와서 변수에 넣어
const app = express();      // 가져온 express 라이브러리를 실제로 실행해서 app 객체를 만들어.
const port = 3000;

// route 가져오기
const goodsRouter = require("./routes/goods.js")     // ./ 라는 건 상대경로에서 지금 현재 폴더를 나타내.
const cartsRouter = require("./routes/carts.js")
const connect = require("./schemas")    // index.js 파일은 폴더를 불러오기만 해도 사용할 수 있어.
connect();   //  schemas/index.js 의 exports 모듈인 connect 는 익명함수야. 따라서 이렇게 호출을 해줘야 실행이 돼.

// 모든 app 에서 동작하는 미들웨어를 사용하기 위해 app.use 를 사용할거야. 즉 전역 미들웨어로 선언.
// req 객체 안에 있는 req.body 를 사용하기 위해선 이걸 작성을 해야지만 사용할 수 있어.
app.use(express.json());

// app.use 라는 문법을 통해서 router api 들을 등록할 수 있어.
// app.use 는 app 이라는 express 객체에게 "모든 미들웨어가 여기를 통과하게끔 전역으로 쓸거다" 라고 말해주는 거야.
// 해당 app.use 의 경우, '/api' 라는 경로로 클라이언트가 접속했다면 모두 goodsRouter 로 가라, 라는 뜻.
        // localhost:3000/api -> 이 경로로 접속하는 모든 경로는 goodsRouter 로 가라. 참고로 이건 '전역 미들웨어'
        // [goodsRouter] 이런 식으로 배열을 입력해도 괜찮아. 
        // 왜 배열이 필요할 수 있냐면, /api 라는 주소로 입력되었을 때 접속해야 하는 js 파일이 여러 개일 수도 있으니까.
app.use("/api", [goodsRouter, cartsRouter]);

app.get('/', (req, res) => {
    const q_id = req.query
    console.log('답 : ' + q_id["id"])

    const obj = {
        "keykey": q_id["id"],
        "name": "구누두B",
        "age": 28
    }

    res.status(400).json(obj);
});

app.get('/:id', (req, res) => {
    console.log(req.params)                  // { id: '가나다' }
    res.send('id는 > ' + req.params["id"])   // id는 > 가나다
})

app.post('/', (req, res) => {
    console.log(req.body);              // { id: 'lololo', user_nk: '김민수B(4기)' }
    res.send('기본 uri 의 post 메소드 : ' + JSON.stringify(req.body));
                            // 기본 uri 의 post 메소드 : {"id":"lololo","user_nk":"김민수B(4기)"}
})



app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});