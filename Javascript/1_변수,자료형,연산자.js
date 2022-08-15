// console.log("hello world");

let age1 = 30; // 변할수 있는 값은 let으로  //참고로 var도 let과 비슷한데 let쓰는걸 추천
const name1 = `john`; // 변하지않는 값을 가질 변수는 const로
const message = `my name is ${name1}`;

console.log(age1)
console.log(name1)
console.log(message)
// 30
// john
// my name is john

console.log(typeof 3)
console.log(typeof name1)
console.log(typeof true)
console.log(typeof `xxx`)
console.log(typeof null)
console.log(typeof undefined)
// number
// string
// boolean
// string
// object
// undefined

const a = "나는";
const b = "입니다";
console.log(a+name1+b)
// 나는john입니다

console.log(a + age1 + `살` + b) // 파이썬에서는 문자열 + 숫자열 안되지만, JS에서는 숫자가 자동으로 문자열로 바뀜, 근데 형변환을 해주는게나음
// 나는30살입니다


let num = 10;
let result = ++num; // 1 올린값을 먼저 적용
console.log(result, num); 

let num2 = 10;
let result2 = num2++; // 적용먼저 하고 1을 올림
console.log(result2, num2);

