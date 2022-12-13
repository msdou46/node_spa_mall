const add = (a, b) => { return a + b; }

module.exports = { add: add};

// 모듈을 호출했을 때, add 키 값에는 add 함수가 들어가는 방법.
// module.exports = {add: add}      const {add} = require("./math.js")

// 모듈 그 자체를 바로 add 함수를 할당한다.
// module.exports = add             const add = require("./math.js")

// 모듈을 호출했을 때, add 키 값에는 (a, b) => (return a+b) 라는 익명함수가 할당되는 방법.
// exports.add = () {}              const {add} = require("./math.js")
// const add = () => {}    exports.add = add;  이것도 같은 방법.