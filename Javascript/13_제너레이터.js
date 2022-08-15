function* fn(){
    try {
        console.log(1);
        yield "첫번쨰";
        console.log(2);
        yield "두번쨰";
        console.log(3);
        console.log(4);
        yield "세번쨰";
        return "finish";
    } catch(e){
        console.log(e);
    }
}
const a = fn();

for(let num of a){
    console.log(num)
}
// 1
// 첫번쨰
// 2
// 두번쨰
// 3
// 4
// 세번쨰

console.log(`-------------------------------------------------`)
function* fn2(){
    try {
        console.log(1);
        yield "첫번쨰";
        console.log(2);
        yield "두번쨰";
        console.log(3);
        console.log(4);
        yield "세번쨰";
        return "finish";
    } catch(e){
        console.log(e);
    }
}
const a2 = fn2();

for(let num of a2){
}

