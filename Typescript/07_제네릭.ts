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
