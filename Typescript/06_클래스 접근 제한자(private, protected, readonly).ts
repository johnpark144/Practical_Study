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
        console.log(this.wheels) // !!에러!! // static은 this 사용불가 
        console.log(Car5.wheels) // static은 클래스명 사용
    }
    abstract doSomething():void; // abstract class의 abstract 메서드는 상속받은쪽에서 구현해줘야함
}


class Bmw5 extends Car5{
    constructor(color: string){
        super(color);
    }
    showName(){
        console.log(super.name);  // !!에러!! // extends 하여도 private인 name은 사용불가
        console.log(super.color);  // extends 하면 protected된 color는 자식 class에서 사용가능
    }
    doSomething(){
        alert(1)    // a상속받은쪽에서 구현
    }
}

const z4 = new Bmw5('black');

const taxi = new Car5('red')    // !!에러!! // abstract때문에 클래스 사용불가

console.log(z4.name)  // !!에러!! // private이라서 사용불가
console.log(z4.color) // !!에러!! // protected라서 밖에서 사용불가
