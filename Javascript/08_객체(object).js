// 딕셔너리와 비슷함

const superman = {
    name : 'clark',
    age : 30,
}

console.log(superman.name) // ['name']과 동일
console.log(superman['age'])
console.log(superman)
// clark
// 30
// { name: 'clark', age: 30 }

superman['job'] = "hero";
superman.hobby = "fly";
console.log(superman)
// { name: 'clark', age: 30, job: 'hero', hobby: 'fly' }

delete superman['hobby'];
console.log(superman)
// { name: 'clark', age: 30, job: 'hero' }

console.log(`---------------------------------------------`)

function makeObject(name, age){
    return{
        name, // : name,
        age, // : age,
        hobby : "soccer",
    }
}
const Mike = makeObject("Mike", 30);
console.log(Mike);
// { name: 'Mike', age: 30, hobby: 'soccer' }

console.log("age"in Mike);
console.log("birth_day"in Mike);
// true
// false
console.log(`---------------------------------------------`)

function isAdult(user){
    if (!('age' in user) || user["age"] < 20){ //age가 user에 포함되어 있지 않거나 20살아래면 "false"
        return false;
    }
    else{
        return true;
    }
}

const John = {
    name : "John",
    age : 30
}
const Kry = {
    name : "Krystal",
    age : 18,
}
const Mark ={
    name : "Mark"
}

console.log(isAdult(John));
console.log(isAdult(Kry));
console.log(isAdult(Mark)); // age의 정보가 없어서 "false"
// true
// false
// false
console.log(`---------------------------------------------`)

let user = {
    name : 'Mike',
    sayHello : function(){
        console.log(`hello, I'm ${this.name}`); // user.name 대신 this.name을 적어둬야함 // 파이썬의 __init__과 self역할을 하기위해
    }
}

user.sayHello();
// hello, I'm Mike

let Luke = user
Luke.name = "Luke"

console.log(Luke.name)
Luke.sayHello();
// Luke
// hello, I'm Luke
user = null;
Luke.sayHello() // 전에 this.name 대신 user.name을 적어 뒀다면, user가 null될때 Luke도 null이됨

console.log(`---------------------------------------------`)

let n = "name";
let a = "age";

const user2 ={
    [n] : "Mike",   // 대괄호로 감싸면 변수를 객체의 키로도 사용가능
    [a] : 30,
    [1+4] : 5,
};
console.log(user2)
// { '5': 5, name: 'Mike', age: 30 }

const user3 = Object.assign({},user2); // user2를  user3에 복사 // 그냥 const user3 = user2로 하면 둘중하나가 바뀔떄 같이바뀜
user3.name = "Tom"
console.log(user2)
console.log(user3)
// { '5': 5, name: 'Mike', age: 30 }
// { '5': 5, name: 'Tom', age: 30 }
const user4 = {...user2}    // 이렇게도 복사가능 (user2를 가져오라는 뜻이아니고, user2에 있는 전부를 가져오라는 뜻이라서)
user4.name = "Jane"
console.log(user4)
// { '5': 5, name: 'Jane', age: 30 }


let result = Object.keys(user2);  // 파이썬의 user.key()와같음
console.log(result)
result = Object.values(user2); // 파이썬의 user.values()와같음
console.log(result)
// [ '5', 'name', 'age' ]
// [ 5, 'Mike', 30 ]

result = Object.entries(user2); // 배열(리스트)로 묶어줌
console.log(result)
// [ [ '5', 5 ], [ 'name', 'Mike' ], [ 'age', 30 ] ]
