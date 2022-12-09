// ##### 함수 ##################################################################################################################################

const hello = (name?:string) =>{
    return `Hello, ${name || "world"}`;
}

hello(2)
console.log(hello())
console.log(hello('john'))
// "Hello, world" 
// "Hello, john"

// ###################################

const hello2 = (name:string, age?:number): string =>{
    if (age !== undefined){
        return `Hello, ${name}. You are ${age}`;
    } else {
        return `Hello, ${name}`;
    }
}
console.log(hello2('john'))
console.log(hello2('john',12))
// "Hello, john" 
// "Hello, john. You are 12" 

// ###################################

const hello3 = (age:number | undefined, name:string): string =>{
    if (age !== undefined){
        return `Hello, ${name}. You are ${age}`;
    } else {
        return `Hello, ${name}`;
    }
}

console.log(hello3(undefined, 'Sam'))
// "Hello, Sam" 

// ###################################

function add(...nums:number[]){
    return nums.reduce((result, num) => result + num, 0);
}

console.log(add(1,2,3))
console.log(add(1,2,3,4,5,6,7,8,9,10))
// 6 
// 55 

// #### this의 타입 지정 ##########################
interface User2 {
    name: string;
}

const Sam: User2 = {name:'Sam'}

function showName(this:User2, age:number, gender:'m'|'f'){
    console.log(this.name, age, gender)
}

const user1 = showName.bind(Sam);
user1(30, 'm');

// #### 함수 오버로드 ##########################
interface User3 {
    name: string;
    age: number
}

function join(name: string, age: string): string;
function join(name: string, age: number): User3;
function join(name: string, age: string | number): User3 | string{
    if(typeof age === 'number'){
        return{
            name,
            age,
        };
    }else{
        return "나이는 숫자로 입력하세요"
    }
}

console.log(join('Sam', 30))
console.log(join('Jane', '30'))
// {
//     "name": "Sam",
//         "age": 30
// }
// "나이는 숫자로 입력하세요" 
