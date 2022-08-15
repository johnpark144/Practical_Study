// 리스트와 비슷함
let days = ["mon", "tue", "wed"];
days[1] = "화요일" 
console.log(days);
console.log(days.length); // 파이썬의 len(days)과 같음
// [ 'mon', '화요일', 'wed' ]
// 3

days.push('thu') // 파이썬의 append와 같음
console.log(days);
days.pop()
console.log(days);
// [ 'mon', '화요일', 'wed', 'thu' ]
// [ 'mon', '화요일', 'wed' ]

days.unshift('sun') // 맨앞에 삽입 / 파이썬의 days.insert(0,"sun")와 같음
console.log(days);
days.shift() // 맨앞 삭제 / 파이썬의 del days[0]과 같음
console.log(days);
// [ 'sun', 'mon', '화요일', 'wed' ]
// [ 'mon', '화요일', 'wed' ]

days.push('thu','fri','sat')
console.log(days)
console.log(days.slice(1,3));   // 1번 항목부터 3번 미만까지 보여라 / 파이썬의 days[1,3]
console.log(days.splice(1,3));  // 1번 항목부터 3개 days에서 빼와라(어떤 변수에 저장도 가능) / days에서 삭제할 부분을 보이기
console.log(days)   // splice에서 삭제되고 남은것
days.splice(1,0,"tue","wed","thu")  // 1번 항목으로부터 0개 지우고 "tue","wed","thu"를 삽입시켜라 / 파이썬의 insert기능
console.log(days)  
// [ 'mon', '화요일', 'wed', 'thu', 'fri', 'sat' ]
// [ '화요일', 'wed' ]
// [ '화요일', 'wed', 'thu' ]
// [ 'mon', 'fri', 'sat' ]
// [ 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ]

let num = [1,2,3,4,5,1,2,3];
console.log(num.indexOf(3));    // 3이 몇번째에 있는가 / 파이썬의 find or index 기능
console.log(num.indexOf(3,3));   // 처음 3이 있는 곳부터 확인해서 3이 몇번째에 있는가
// 2
// 7
num.splice(num.indexOf(5));     // 5가있는 곳부터 끝까지 삭제해라
console.log(num)
// [ 1, 2, 3, 4 ]

console.log(num.includes(2));   // 2라는게 포함되어 있는가
console.log(num.includes(7));
// true
// false

num = [1,2,3,4,5]
console.log(num.reverse());
// [ 5, 4, 3, 2, 1 ]

const r = num.reduce((prev, cur) =>{    // prev -> 누적계산값, cur -> 현재값(배열에서 한개씩 집어넣어줌)
    return prev + cur;
}, 0);  // 초기값은 prev의 초기값은 0, 바꿔줄수도 있음
console.log(r);
// 15

let userList = [
    {name : "Mike", age : 30},
    {name : "Jane", age : 27},
    {name : "Tom", age : 10},
]
let result = userList.find((user) => { // 자바스크립트의 find는 뒤에 조건에 함수를 써서 찾아낼때 쓰임 / 첫번째 true값만 반환 / filter을 쓰면 전체!
    if (user.age<19){
        return true;
    }
    return false;
});
console.log(result);
// { name: 'Tom', age: 10 }

result = userList.findIndex((user) => { // find와 동일하게 함수쓸때 사용하되 조건에 맞는index값을 반환 / 첫번째 true값만 반환
    if (user.age<19){
        return true;
    }
    return false;
});
console.log(result);
// 2

let newUserList = userList.map((user, idx) => { // 모든 객체들을 동시에 함수 기능을 실행하고 반환
    return Object.assign({}, user, {
        id: idx + 1,
        isAdult: user.age > 19,
    });
});
console.log(newUserList);
// [
//     { name: 'Mike', age: 30, id: 1, isAdult: true },
//     { name: 'Jane', age: 27, id: 2, isAdult: true },
//     { name: 'Tom', age: 10, id: 3, isAdult: false }
// ]

let arr = ["안녕", "나는", "철수야"];
console.log(arr.join("-")); // 모든 배열에 -를 삽입
// 안녕-나는-철수야

arr = "안녕 나는 철수야"
console.log(arr.split(" "));    // " "에 들어있는 부분을 기준해서 배열로 만듬
console.log(arr.split("")); // 아무것도 입력을 안한경우 모든 글자마다 배열로 만듬
// [ '안녕', '나는', '철수야' ]
// [
//   '안', '녕', ' ',
//   '나', '는', ' ',
//   '철', '수', '야'
// ]

arr = [1,4,5,3,2,12];
console.log(arr.sort());    // 앞글자만 확인해서 제대로 sort는 안될것
// [ 1, 12, 2, 3, 4, 5 ]


console.log(`---------------------------------------------`)
days = ["mon", "tue", "wed"]

for(let i = 0; i<days.length; i++){
    console.log(days[i]);
}
// mon
// tue
// wed
console.log(`---------------------------------------------`)

for(let day of days){ //in 대신 of를 써야함  //for day in days:  ->  파이썬 방식
    console.log(day)                        //   print(day)
}
// mon
// tue
// wed
console.log(`---------------------------------------------`)

for(i in days){ //파이썬처럼 in을 쓰면 index가 저장됨
    console.log(i)
}
// 0
// 1
// 2
console.log(`---------------------------------------------`)

let arr2 = ["Mike", "Tom", "Jane"];

arr2.forEach((name1, idx) => {       // 파이썬의 for idx, name1 in enumerate(arr) :
    console.log(`${idx}, ${name1}`)
})
// 0, Mike 
// 1, Tom
// 2, Jane
