//continue, break도 파이썬과 동일하게 작용


for(let i=0; i<10; i++){
    console.log(i)
}
// 0
// 1
// .
// .
// 9
console.log(`---------------------------------------------`)
for(let i=0; i<10; i++){    // 짝수만 출력하기
    if(i%2){
        continue;
    }
    console.log(i)
}
// 0
// 2
// 4
// 6
// 8
console.log(`---------------------------------------------`)
const Mike = {
    name : "Mike", // 파이썬 에선 키도 따옴표 처리 해줘야함
    age : 30
}

for (x in Mike){
    console.log(Mike[x])
}

// Mike
// 30
console.log(`---------------------------------------------`)
//while 문
let i = 0;
while(i<10){
    console.log(i);
    i++;
}
// 0
// 1
// .
// .
// 9
console.log(`---------------------------------------------`)

//do.. while 문 / 잘 사용 안함
i = 0;
do{
    i++;
    console.log(i)
}while(i<10) //do..while은 먼저 한번 진행한뒤 참거짓을 따짐

// 1
// 2
// .
// .
// 10
console.log(`---------------------------------------------`)

let arr = ["Mike", "Tom", "Jane"];

arr.forEach((name1, idx) => {       // 파이썬의 for idx, name1 in enumerate(arr) :
    console.log(`${idx}, ${name1}`)
})
// 0, Mike 
// 1, Tom
// 2, Jane


