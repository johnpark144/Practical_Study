// npm install -g typescript
// tsc -w  // 명령어(타입스크립트 -> 자바스크립트)
// ######## tsconfig.json (자바스크립트로 변경시 필요한파일 / ESNext는 최신버전)
// {
//     "compilerOptions": {
//         "target": "ESNext",
//         "module": "commonjs"
//     }
// }

// ######## 타입스크립트, 리액트
// npx create-react-app myapp --template typescript // 타입스크립트를 이용한 새로운 리액트 앱생성
// npm install --save typescript @types/node @types/react @types/react-dom @types/jest  // 기존 리액트 앱에 타입스크리트 추가 설치

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
    return 1    // 에러
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
