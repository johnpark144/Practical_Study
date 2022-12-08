// npm install -g typescript
// tsc -w  // 타입스크립트 -> 자바스크립트

// npx create-react-app myapp --template typescript // 타입스크립트를 이용한 새로운 리액트 앱생성
// npm install --save typescript @types/node @types/react @types/react-dom @types/jest  // 기존 리액트 앱에 타입스크리트 추가 설치

// ######## tsconfig.json (ESNext는 최신버전)
// {
//     "compilerOptions": {
//         "target": "ESNext",
//         "module": "commonjs"
//     }
// }


// ########## 여러 타입 ######################################################################################################################
let abc:string = 'abc'
let whatAge:number = 30;
let isAdult:boolean = true;
let numArr:number[] = [1,2,3]; // 숫자로된 배열만
let numArr2:Array<number> = [1,2,3]; // 숫자로된 배열만
let obj:object = {1:'a', 2:'b', 3:'c'}
let a1:null = null;
let a2:undefined = undefined;
let a3:unknown; // 아직모르니 아무거나 (any보다 권장됨)

let userName1 = 'Bob'   // 아무것도 할당하지않으면 자동으로 처음 타입으로 지정됨
userName1 = 2
let userName2: string|number = 'Tom'

// ####### 튜플타입
let b:[string, number] = ['z',1];
b = [1,'z'];

// ####### void (함수에서 아무것도 반환하지 않을때)
function sayHello1():void{
    console.log('hello1')
}

function sayHello2():void{
    console.log('hello2')
    return 1    //
}

// ######## never (에러를 반환하거나 영원히 끝나지 않는 함수 타입)
function showError():never{
    throw new Error();
}

function infLoop():never{
    while(true){
        // do somgthing
    }
}

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

interface StudentInterface extends PeopleInterface {    // extends로 다른 인터페이스에 확장가능
  school: string
}

// type
type PeopleType = {      // type은 재선언 확장 불가능
  name: string
  age: number
}

type StudentType = PeopleType & {
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

// #### 유니온 타입 (or, |)/인터섹션 타입(교차 타입, and, &) #########################################################################
interface Car3{
    name:'car';
    color: string;
    start():void;
}

interface Toy3{
    name:'toy';
    color:string;
    play(): void;
}

function getGift(gift: Car3 | Toy3){   // 유니온 타입
    console.log(gift.color);
    if(gift.name === 'car'){
        gift.start();
    }else{
        gift.play();
    }
}
// #############################

interface Car4{
    name: string;
    start():void;
}

interface Toy4{
    name: string;
    color:string;
    price: number;
}

const toyCar: Toy4 & Car4 = {  // 교차 타입
    name: '타요',
    start() {},
    color: 'blue',
    price: 1000,
};

// ###### 클래스 접근 제한자(Access modifier) - public(디폴트), private, protected, readonly #############################################
// public - 자식 클래스, 클래스 인스턴스 모두 접근 가능
// private (= #변수명) - 해당 클래스 내부에서만 접근 가능 
// protected - 자식 클래스에서도 접근가능 (클래스밖 X)
// readonly - 모두 접근 가능하지만 한번 입력되면 수정불가
// static - static은 this 사용불가 (클래스명 사용)


abstract class Car5{    // abstract class 는 상속용 class
    private name:string = 'car'; // #name:string = 'car';
    protected color:string;
    static wheels = 4;
    constructor(color: string){
        this.color = color;
    }
    start(){
        console.log('start');
        console.log(this.name);
        console.log(this.wheels) // static은 this 사용불가
        console.log(Car5.wheels) // static은 클래스명 사용
    }
    abstract doSomething():void; // abstract class의 abstract 메서드는 상속받은쪽에서 구현해줘야함
}


class Bmw5 extends Car5{
    constructor(color: string){
        super(color);
    }
    showName(){
        console.log(super.name);  // extends 하여도 private인 name은 사용불가
        console.log(super.color);  // extends 하면 protected된 color는 자식 class에서 사용가능
    }
    doSomething(){
        alert(1)    // a상속받은쪽에서 구현
    }
}

const z4 = new Bmw5('black');

const taxi = new Car5('red')    // abstract때문에 클래스 사용불가

console.log(z4.name)  // private이라서 사용불가
console.log(z4.color)   // protected라서 밖에서 사용불가

// ###### 제네릭 (타입을 미리 정하지 않고 사용할때 결정하게함) #############################################################################
function getSize<T>(arr: T[]): number{
    return arr.length
}

const arr1 = [1,2,3];
getSize<number>(arr1);

const arr2 = ['a','b','c'];
getSize<string>(arr2);

const arr3 = [false,true,true];
getSize<boolean>(arr3);

const arr4 = [{},true,{name:'Tim'}];
getSize<object|boolean>(arr4);

// #######################
interface Mobile<T>{
    name: string;
    price: number;
    option: T;
}

const m1: Mobile<object> = {
    name: 's21',
    price: 1000,
    option:{
        color: 'red',
        coupon: false,
    },
}

const m2: Mobile<{ color:'black'|'white' ; coupon: boolean }> = {
    name: 's22',
    price: 1300,
    option:{
        color: 'black',
        coupon: false,
    },
}

// ######## 유틸리티 타입 #################################################################################################################
// ######## keyof (key들만 타입으로 사용)
interface User4{
    id: number;
    name: string;
    age: number;
    gender: 'm'|'f';
}

type UserKey = keyof User4;

const uk1:UserKey = 'id'
const uk2:UserKey = 'email'

// ######## Partial<T> (부분적으로만 사용)
// interface User5{
//     id?: number;
//     name?: string;
//     age?: number;
//     gender?: 'm'|'f';
// }

interface User5{
    id: number;
    name: string;
    age: number;
    gender: 'm'|'f';
}

let admin: Partial<User5> ={
    id:1,
    name: 'Bob',
}

// ######## Required<T> (?파트도 무조건 사용해야함)
interface User6{
    id: number;
    name: string;
    age?: number;
}

let admin2: Required<User6> ={
    id: 1,
    name: 'Bob',
    age: 12,  // age도 필수
}

// ######## Readonly<T>
interface User6{
    id: number;
    name: string;
}

let admin3: Readonly<User6> ={
    id:1,
    name:'Bob',
};

admin3.name = 'john' // Readonly는 변경불가

// ######## Record<K, T> (key값의 타입, value의 타입 따로지정)
interface User7{
    id: number;
    name: string;
    age: number;
}

function isValid(user: User7){
    const result: Record<keyof User7, boolean> = {
        id: user.id > 0,
        name: user.name !== "",
        age: user.age > 0,
    };
    return result;
}

// ######## Pick<T, K> // Omit<T, K> 
interface User8{
    id: number;
    name: string;
    age: number;
}

const admin4: Pick<User8, 'id'|'name'> = {
    id: 0,
    name: 'Bob',
    age: 1  // id랑 name만 pick했기때문에 age는 사용불가
} 

const admin5: Omit<User8, 'id'> = {
    id: 0,  // id를 Omit했기 때문에 사용불가
    name: 'Bob',
    age: 1 
} 

// ########  Exclude<T1, T2>

type Type1 = string | number | boolean;
type Type2 = Exclude<Type1,  number | boolean>; // Type1에서 제거할 타입 설정

let myName1:Type2 = 'john';
let myName2:Type2 = 12;

// ########  NonNullable<T> (undefined도 사용불가)

type Type3 = string | null | undefined | void;
type Type4 = NonNullable<Type3>;  // Type3에서 null과 undefined 사용불가

let noNullUndefined:Type3 = null
let noNullUndefined2:Type4 = null
let noNullUndefined3:Type4 = undefined
