const mongoose = require("mongoose")        // npm 으로 다운받은 mongoose 패키지를 가져온다.

const connect = () => {     // connect 라는 함수는, 호출되면 mongoose 데이터베이스와 연결한다.
    mongoose
        .connect("mongodb://localhost:27017/spa_mall")     //
        .catch(err => console.log('connect err ', err))     // 커넥트 시도 시 에러 발생한다면 어떻게 처리를 하겠다.
};

mongoose.connection.on("error", err => {    // 연결 이후에 에러가 발생한다면.
    console.error("몽고디비 연결 에러 ", err)
})

module.exports = connect;