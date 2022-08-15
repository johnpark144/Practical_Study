function show(){ // function은 여기서 파이썬의 define역할
    console.log("zzzzzzzz");
}
show();
// zzzzzzzz
console.log(`---------------------------------------------`)

function sayHello(name){
    const msg = `hello, ${name}`;
    console.log(msg);
}
sayHello(`영환`);
sayHello(`크리스탈`);
sayHello(`world`);

// hello, 영환
// hello, 크리스탈
// hello, world
console.log(`---------------------------------------------`)

function sayHello2(name = "friend"){
    let newName = name // || "friend"; -> 디폴트값을 안 지정한경우 이렇게 ||(or)로 가능
    let msg = `Hello, ${newName}`
    console.log(msg)
}

sayHello2();
sayHello2('Jane');

// Hello, friend
// Hello, Jane
console.log(`---------------------------------------------`)

function add(num1, num2){
    return num1 + num2;
}
console.log(add(1,2));

// 3
console.log(`---------------------------------------------`)

let add1 = (num1, num2) => {return num1 + num2} // 화살표 함수 (단, this를 쓸떈 화살표 함수 사용불가)
console.log(add1(1,2));

// 3
console.log(`---------------------------------------------`)

function Item(title, price){
    // this = {};
    this.title = title;
    this.price = price;
    this.showPrice = function(){
        console.log(`${title}의 가격은 ${price}원 입니다.`);
    };
    // return this;
}

const item1 = new Item('인형', 3000);
const item2 = new Item('가방', 5000);
const item3 = new Item('지갑', 10000);

item1.showPrice();
item2.showPrice();
item3.showPrice();

// 인형의 가격은 3000원 입니다.
// 가방의 가격은 5000원 입니다.
// 지갑의 가격은 10000원 입니다.
console.log(`---------------------------------------------`)

function User(name, age, ...skills){ // 받는 변수가 여러개 일때 ...을씀
    this.name = name;
    this.age = age;
    this.skills = skills;
}

const user1 = new User("Mike", 30, "html", "css");
const user2 = new User("Tom", 20, "JS", "python");
const user3 = new User("Jane", 10, "html", "css", "java");

console.log(user1);
console.log(user2);
console.log(user3);

// User { name: 'Mike', age: 30, skills: [ 'html', 'css' ] }
// User { name: 'Tom', age: 20, skills: [ 'JS', 'python' ] }
// User { name: 'Jane', age: 10, skills: [ 'html', 'css', 'java' ] }
console.log(`---------------------------------------------`)

function makeCounter(){
    let num = 0;

    return function(){
        return num++; // return 한뒤 숫자를 올림
    };
}

let counter = makeCounter(); // 함수를 counter에 저장함으로써 counter변수는 계속 누적됨

console.log(counter()); // counter = 0 / num = 1    
console.log(counter()); // counter = 1 / num = 2    # makeCounter()함수를 호출하는게 아니라 counter()을 호출 즉, 위에 return된 function기능만 작동
console.log(counter()); // counter = 2 / num = 3

// 0
// 1
// 2