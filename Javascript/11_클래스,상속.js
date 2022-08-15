// // 생성자의 상속

// const car = {
//     wheels : 4,
//     drive() {
//         console.log("drive..");
//     },
// };

// const bmw = {
//     color : "red",
//     nevigation : 1,
// };

// bmw.__proto__ = car; // car변수에 있는걸 bmw에 상속시켜라

// const x5 = {
//     color : "white",
//     name : "x5",
// };

// x5.__proto__ = bmw; // bmw변수에 있는걸 x5에 상속시켜라 (car포함)

// for(v in x5){ // 객체에서 값을 가져올떈 in을 씀
//     if(x5.hasOwnProperty(v)){     // 상속된건지 원래있던건지 체크
//         console.log('o',v);
//     } else{
//         console.log('x',v);
//     }
// }

console.log(`-------------------------------------------------`)
// 클래스

const User = function(name, age) {  // 기존 생성자 함수
    this.name = name;
    this.age = age;
    // this.showName = function(){
    //     console.log(this.name);
    // };
};

User.prototype.showName = function() {
    console.log(this.name);
};
const mike = new User("Mike", 30);
console.log(mike)
// User { name: 'Mike', age: 30 }

class User2{                        // 클래스
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    showName(){
        console.log(this.name);
    }
}
const tom = new User2("Tom", 19)
console.log(tom)
// User2 { name: 'Tom', age: 19 }

console.log(`-------------------------------------------------`)
// 클래스의 상속 (extends)

class Car{
    constructor(color){
        this.color = color;
        this.wheels = 4;
    }
    drive(){
        console.log("drive..");
    }
    stop(){
        console.log("stop!");
    }
}

class Bmw extends Car{
    constructor(color){
        super(color);    // construnctor를 상속받으려면 이걸로 부모것을 실행시켜 줘야함
        this.navigation = 1;
    }
    park(){
        console.log("park");
    }
    stop(){
        super.stop();   // 부모 클래스의 stop도 소환
        console.log("hold up")
    }
}

const z4 = new Bmw('blue')
console.log(z4)
z4.park()
z4.stop()
// Bmw { color: 'blue', wheels: 4 }
// park
// stop!        ->부모stop
// hold up      ->자식stop