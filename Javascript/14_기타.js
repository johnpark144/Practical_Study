// let num = 0;

// function showTime(){
//     console.log(`안녕, 넌접속한지 ${num++}초가 흘렀어`);
//     if(num>5){
//         clearInterval(tId);
//     }
// }
// const tId = setInterval(showTime, 1000); // 1초(1000)에 한번 함수(showTIme)를 실행해라

// 안녕, 넌접속한지 0초가 흘렀어    
// 안녕, 넌접속한지 1초가 흘렀어    -> 1초뒤
// 안녕, 넌접속한지 2초가 흘렀어
// 안녕, 넌접속한지 3초가 흘렀어
// 안녕, 넌접속한지 4초가 흘렀어

console.log(`---------------------------------------------`)

const mike = {
    name: "Mike"
}
const tom = {
    name: "Tom"
}

function showThisName(){
    console.log(this.name)
}
showThisName.call(tom)  // 변수 tom을 불러와서 this에 넣어줌
// Tom

function update(birthyear, occupation){
    this.birthyear = birthyear;
    this.occupation = occupation;
}

update.call(mike, 1999, "singer");  // 변수 mike를 불러와서 this에넣고 나머지는 각각 함수에 있는 변수에 둠
console.log(mike);
update.apply(tom, [2002, "teacher"]) ;   // apply는 call과 같은데 차이는 뒤에 변수들을 배열로 묶어줘야함
console.log(tom);
// { name: 'Mike', birthyear: 1999, occupation: 'singer' }
// { name: 'Tom', birthyear: 2002, occupation: 'teacher' }
const updateMike = update.bind(mike);   // bind는 this값을 call된값으로 영구히 바꿔줌
updateMike(2002, "teacher");
console.log(mike);
// { name: 'Mike', birthyear: 2002, occupation: 'teacher' }


