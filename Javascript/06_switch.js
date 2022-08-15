let fruit = "사과"

switch(fruit){  // switch는 case에 해당하는값으로 넣어주되 그 밑에 있는 값 전부 다 실행 / if else로 대체 가능
    case '사과':
        console.log(`100원 입니다.`);
    case '바나나':
        console.log(`200원 입니다.`);
    case '키위':
        console.log(`300원 입니다.`);
}
// 100원 입니다.
// 200원 입니다.
// 300원 입니다.
console.log(`---------------------------------------------`)

switch(fruit){  // 그에 맞는 case 하나만 실행하려면 break를 전부 넣어줘야함
    case '사과':
        console.log(`100원 입니다.`);
        break;
    case '바나나':
        console.log(`200원 입니다.`);
        break;
    case '키위':
        console.log(`300원 입니다.`);
        break;
}
// 100원 입니다.
console.log(`---------------------------------------------`)

fruit ='딸기'
switch(fruit){  
    case '사과':
        console.log(`100원 입니다.`);
        break;
    case '바나나':
        console.log(`200원 입니다.`);
        break;
    case '키위':
        console.log(`300원 입니다.`);
        break;
    default :
    console.log("그런 과일은 없단다") // else의 역할처럼 없는값은 default로 감
}
// 그런 과일은 없단다
console.log(`---------------------------------------------`)

fruit ='바나나'
switch(fruit){  
    case '사과':
        console.log(`100원 입니다.`);
        break;
    case '바나나':
    case '키위':
        console.log(`300원 입니다.`); // break를 한부분만 빼주면 바나나,키위 둘다 가능
        break;
    default :
    console.log("그런 과일은 없단다")
}
// 300원 입니다.
