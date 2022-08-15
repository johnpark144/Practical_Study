const a = 1; //숫자1
const b = "1"; //문자1
console.log(a + b, a == b, a === b) //둘다 문자로써 더함, 타입 비교 X, 타입 비교 O
// 11 true false
////////////////////////////////////////////////////////////

const age = 10;
if(age === 19){
    console.log(`수능잘치세요`);
}
else if(age > 19){
    console.log(`환영합니다`);
}else{
    console.log(`안녕히 가세요`);
}

const name1 = `mike`;
const isAdult = age > 19;

if(name1 == 'tom' || age > 19){ // &&, 등 사용가능
    console.log(`통과`)
}
if(!isAdult){
    console.log(`돌아가세요`)
}
