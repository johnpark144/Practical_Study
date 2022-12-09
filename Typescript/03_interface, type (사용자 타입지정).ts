// ##### interface와 type(사용자 타입지정) ###################################################################################################

type Score = 'A' | 'B' | 'C' | 'F' // type변수 (첫글자 대문자)

interface User {    // (첫글자 대문자)
    name : string;
    age : number;
    gender? : string;
    readonly birthYear : number;
    [grade:number] : Score; // key가 number, value가 위에 타입 Score인 프로퍼티를 받게함
}

let user:User = {
    name : 'xx',
    age : 30,
    birthYear : 2000,
    1 : 'A',
    2 : 'E',    // E는 없어서 오류
}

// ###################################
interface IsAdult {
    (age:number):boolean;
}

const a:IsAdult = (age) =>{
    return age> 19
}

a('12')

console.log(a(3))
console.log(a(20))
// false 
// true 

// ##### interface와 type의 차이점 ###########################################################################################################
// interface
interface PeopleInterface {     // 지정할때 =(equal)사용X // 객체에만 사용가능 (객체사용시 인터페이스 권장)
  name: string
  age: number
}

const me1: PeopleInterface = {
  name: 'yc',
  age: 34,
}

// type
type PeopleType = {     // 지정할때 =(equal)사용O // 모든 형태에 사용가능
  name: string
  age: number
}

const me2: PeopleType = {
  name: 'yc',
  age: 31,
}

// ##### interface와 type 확장 방법 ###########################
// interface
interface PeopleInterface {
  name: string
  age: number
}

interface PeopleInterface {     // interface는 재선언 함으로 같은 인터페이스에 확장가능
  gender:  'm'|'f'
}

interface StudentInterface extends PeopleInterface {    // extends로 다른 타입 및 인터페이스를 확장가능
  school: string
}

// type
type PeopleType = {      // type은 재선언 확장 불가능
  name: string
  age: number
}

type StudentType = PeopleType & {   // &로 다른 타입 및 인터페이스를 확장가능
  school: string
}

// ##### implements, extends ################################################################################################################
interface Car{
    color: string;
    wheels: number;
    start(): void;
}

class Bmw implements Car {  // implements는 클래스의 타입을 interface로 정한 타입으로 정해줌
    color;
    wheels = 4;
    constructor(c:string){
        this.color = c;
    }
    start(){
        console.log('go...')
    }
}

const b2 = new Bmw('green');
console.log(b2)
b2.start()
// Bmw: {
//     "wheels": 4,
//     "color": "green"
//   } 
// "go..." 


interface Benz extends Car{ // extends는 기존에 있는 interface로 정한 타입을 그대로 사용 (여러개 동시 확장가능)
    door: number;
    stop(): void;
}

const benz : Benz = {
    door : 5,
    stop(){
        console.log('stop');
    },
    color : 'black',
    wheels : 4,
    start(){
        console.log('go...')
    }
}
