// const pr = new Promise((resolve, reject) =>{
//     setTimeout(() =>{
//         resolve("ok");
//         // reject(new Error("err..."));
//     }, 1000); // 1초간 기다림
// });
// console.log("시작");

// pr.then((result) => {
//     console.log(result);
// })
// .catch((err) => {
//     console.log(err);
// })
// .finally(() =>{
//     console.log("끝");
// });

// 시작
// ok
// 끝

// console.log(`-------------------------------------------------`)

// const f1 = () => {
//     return new Promise((res, rej) =>{
//         setTimeout(() =>{   // 1초(1000)뒤에 실행해라 (그래서 밑에 시작이 먼저 출력됨)
//             res("1번 주문 완료");
//             // rej("1번 주문 실패");
//         }, 1000);
//     });
// };
// const f2 = (message) => {
//     console.log(message);
//     return new Promise((res, rej) =>{
//         setTimeout(() =>{
//             // res("2번 주문 완료");
//             rej("2번 주문 실패");
//         }, 3000);
//     });
// };
// const f3 = (message) => {
//     console.log(message);
//     return new Promise((res, rej) =>{
//         setTimeout(() =>{
//             res("3번 주문 완료");
//             // rej("3번 주문 실패");
//         }, 2000);
//     });
// };

// console.log('시작');

// f1()
// .then((res) => f2(res))
// .then((res) => f3(res))
// .then((res) => console.log(res))
// .catch(console.log)
// .finally(() =>{ 
//     console.log("끝");
// });

// 시작
// 1번 주문 완료
// 2번 주문 실패
// 종료
// console.log(`-------------------------------------------------`)

// async, await
const f1 = () => {
    return new Promise((res, rej) =>{
        setTimeout(() =>{   // 1초(1000)뒤에 실행해라 (그래서 밑에 시작이 먼저 출력됨)
            res("1번 주문 완료");
            // rej("1번 주문 실패");
        }, 1000);
    });
};
const f2 = (message) => {
    console.log(message);
    return new Promise((res, rej) =>{
        setTimeout(() =>{
            // res("2번 주문 완료");
            rej("2번 주문 실패");
        }, 3000);
    });
};
const f3 = (message) => {
    console.log(message);
    return new Promise((res, rej) =>{
        setTimeout(() =>{
            res("3번 주문 완료");
            // rej("3번 주문 실패");
        }, 2000);
    });
};

console.log("시작");
async function order(){
    try{
        const result1 = await f1();
        const result2 = await f2(result1);
        const result3 = await f3(result2);
        console.log(result3);
    } catch(e) {
        console.log(e);
    }
    console.log("종료");
}
order();

// 시작
// 1번 주문 완료
// 2번 주문 실패
// 종료