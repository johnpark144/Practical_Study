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
