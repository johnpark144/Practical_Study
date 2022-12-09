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
