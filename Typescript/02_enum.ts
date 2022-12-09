// ##### enum ################################################################################################################################
enum Os{
    Window,
    Ios,
    Android
}   // 디폴트값 0,1,2

console.log(Os['Window'])
//  0 

// ###################################
enum Os{
    Window2 = 1,
    Ios2,
    Android2 = 10
}   // 자동으로 앞에 정해준거부터 순서대로 지정됨

console.log(Os['Ios2'])
console.log(Os['Android2'])
console.log(Os[10]) // 역방향으로도 출력이 됨
// 2
// 10
// Android2

let myOs:Os = Os.Window2    // 타입이 지정해준 Os타입
console.log(myOs)
// 1

let myOs2:Os = Os.Window3 // 존재X
