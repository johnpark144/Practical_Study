let num = 5.75

console.log(num)
console.log(Math.ceil(num))     //올림
console.log(Math.floor(num))    //내림
console.log(Math.round(num))    //반올림
// 5.75
// 6
// 5
// 6
console.log(num.toFixed(1))     //(소수점)까지 반올림
console.log(num.toFixed(0))
// 5.8
// 6
let num_str = '18.5%'
console.log(parseInt(num_str)); //숫자(정수)만남김
console.log(parseFloat(num_str)); //소수점 포함 숫자만남김
// 18
// 18.5
console.log(Math.random()) // 0~1사이 무작위숫자
console.log(Math.floor(Math.random()*100)+1)    // 1~100사이 무작위숫자
// 0.01274312758788154 (랜덤)
// 26   (랜덤)
console.log(Math.max(1,4,-1,5,7,34,64,3.45))    // 최대값
console.log(Math.min(1,4,-1,5,7,34,64,3.45))    // 최소값
console.log(Math.abs(-42))  // 절대값
// 64
// -1
// 42
console.log(`---------------------------------------------`)

let desc = `python is easier`
console.log(desc.length)    // 파이썬에선 len(desc)
console.log(desc[2])
console.log(desc.toUpperCase())
console.log(desc.toLowerCase())
console.log(desc.indexOf('t'))  //파이썬에선 desc.find('t')와 같음
console.log(desc.indexOf('is'))
console.log(desc.indexOf('java')) //파이썬에선 desc.index('t')하면 오류 desc.find('t')하면 -1
// 16
// t
// PYTHON IS EASIER
// python is easier
// 2
// 7
// -1
console.log(desc.slice(2))  // 파이썬에선 desc[2:]
console.log(desc.slice(0,5)) // 파이썬에선 desc[:5]
console.log(desc.slice(2,-2)) // 파이썬에선 desc[2:-2]
// thon is easier
// pytho
// thon is easi
console.log(desc.includes('python'))    // python이라는 문자가 포함되있는지
console.log(desc.includes('java'))
// true
// false
let desc2 = "   python        "
console.log(desc2.trim())   // 앞뒤 공백제거


