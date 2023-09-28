// ###### 리마인더 #########################################################################################################
// 유용한 메소드들 
// window 스크롤, 사이즈 정리
// Intl 에대해 정리 (DateTimeFormat, NumberFormat 등), 밑에 단위변환기랑 같이둠
// Object.entries
// for 대신 쓸만한거 foreach랑 같이놓기
// Reflect 내장 객체
// Array.from()
// Node 등 관련 요소들 정리 (Node js 말하는거 아님)
// 쓸만한 함수 업데이트 하기

// ######### 인덱스 (Ctrl + F) ########################################################### (-> 인덱스에 있는데 찾기 안되면 찾아서 인덱스 변경) ##################
// 형변환
// forEach
// 객체 메소드
// 배열 메소드
// 숫자열, 문자열 메소드
// try, catch, finally
// rompt, alert, confirm
// script를 JS로 빼기
// DOM -- document.children[0], 부모태그, parentNode, 자식 태그, firstElementChild, lastChild, 형제 태그, nextElementSibling, previousElementSibling
// JS로 CSS 변경 -- .style.setProperty, getPropertyValue, removeProperty, item
// 단일 Element -- getElementById, getAttribute, setAttribute, innerHTML, innerText, .style.color
// 다중 Element -- getElementsByClassName, getElementsByTagName, getElementsByName, 
// CSS Selector -- querySelector, querySelectorAll
// Element 추가/삭제  -- createElement, appendChild, insertBefore, cloneNode(), removeChild
// setTimeout, setInterval, clearTimeout, clearInterval
// EventHandler -- onclick, onmouseover, onmouseout, onchange, onkeydown
// classList -- add, toggle
// AJAX 
// JSON -- 데이터를 문자열로 변환, JSON.stringify, JSON.parse

// Reduce
// 단위변환기
// 특정글자를 다른글자로 전체바꾸기
// 오름차순
// 배열에서 3개 랜덤으로
// 비동기작업 취소 -- AbortController

// ######### JavaScript 관한 정보 링크 #########################################################################################################



// ###### 형변환  #########################################################################################################
parseInt(문자);    // 문자를 정수형 숫자로
Number(문자);    // 문자를 정수&실수형 숫자로
String(숫자);   // 숫자를 문자로
숫자.toString();  // 숫자를 문자로

숫자.toFixed(소수자리수);    // 숫자를 문자로  // 소수자리수 안적으면 String(숫자) 와같음
Boolean(0)   // 불린으로

// ###### forEach  #########################################################################################################
let arr = ["Mike", "Tom", "Jane"];

arr.forEach((name1, idx) => {       // 파이썬의 for idx, name1 in enumerate(arr) :
    console.log(`${idx}, ${name1}`)
})
// 0, Mike 
// 1, Tom
// 2, Jane

// ###### 객체 메소드 #########################################################################################################
delete a['hobby'];  // 객체 값 제거 // a라는 객체 hobby 키를 가진 값제거
"age"in a   // 객체안에 존재하는지 불린
Object.keys(a); // 객체안에 키만 배열로
Object.values(a); // 객체안에 밸만 배열로
Object.entries(a); // 키와 밸류를 배열로 묶어줌    // ex) [ [ '5', 5 ], [ 'name', 'Mike' ]]


// ###### 배열 메소드 #########################################################################################################
a.length // 배열의 길이
a.push('789')    // 맨뒤에 삽입
a.pop()       // 맨뒤 제거
a.unshift('123') // 맨앞에 삽입
a.shift()    // 맨앞 제거
a.slice(1,3)  // 1번 항목부터 3번 미만까지
let b = a.splice(1,3) // 1번 항목부터 3번 미만까지 빼와라 (b 에담김)
a.splice(1,0,"tue","wed","thu")  // 1번 항목부터 0개지우고 "tue","wed","thu"를 삽입
a.indexOf(3))   // 3이 몇번째에 있는가
a.indexOf(3,3)  // 처음 3이 있는 곳부터 3이 몇번째에 있는가
a.includes(2)   // 2라는게 포함되어 있는지 불린
a.reverse()  // 배열 순서를 뒤집어
a.sort()    // 오름차순 (앞글자만 확인해서 제대로 sort는 안될것)
a.find(함수)  // 함수에 조건을걸어 처음 true로 리턴된값만
a.findIndex(함수)  // 함수에 조건을걸어 처음 true로 리턴된 값의 index만
a.filter(함수)  // 함수에 조건을걸어 true로 리턴된 값만 배열로
a.join("-") // 모든 배열에 -를 삽입하여 문자열로
"a b c".split(" ") // " "에 들어있는 부분을 기준해서 배열로
"abcde".split("") // 모든 글자마다 배열로

// 예시 배열
let arr = [1, 2, 3, 4, 5];
arr.fill(0); // 배열의 모든 요소를 0으로 채우기   // [0, 0, 0, 0, 0]
arr.fill(9, 2, 4) // fill(값, 시작idx, 끝idx직전까지)    // [0, 0, 9, 9, 0]

// ###### 숫자열, 문자열 메소드 (slice, includes, indexOf 과같은 대부분의 배열 메소드 사용가능) ##############################################################
Math.ceil(num)      // 올림 (ceil, floor, round, max, min)
num.toFixed(1)  // 1의 자리까지 반올림
Math.random()   // 0~1사이 무작위숫자

a.toUpperCase() // 대문자로
a.toLowerCase() // 소문자로
a.trim()    // 앞뒤 공백제거

// ###### try, catch, finally ##################################################################################################################
try{
    console.log('try 1');
    throw 'error';
}
catch(e){
    console.log('catch error :',e);
}
finally{
    console.log('finally');
}

// ###### prompt, alert, confirm ###################################################################################################
const newContent = prompt("JS로 이같이 가능") // prompt는 글쓰고확인, alert는 확인버튼, confirm은 확인 취소버튼
document.body.innerText = newContent // prompt에서 쓴글을 바디안에


// ###### script를 JS로 빼기 #########################################################################################################
<script src="JS.js"></script> // html에 추가하여 script를 JS.js라는 파일에 작성하여 입력

// ###### DOM (Document Object Model) ########################################## 컴퓨터가 문서를 잘처리하도록 문서에대한 구조를 약속한것 ########
document.children[0]
{/* 
<html>
    <head>
    </head>
    <body>
    </body>
</html> 
*/}
document.children[0].children[0]
// <head>
// </head>
document.children[0].children[1]
// <body>
// </body>

// parentNode : 부모태그, firstElementChild : 첫번째 자식 태그 (children[0]), lastChild : 마지막 자식 태그
// nextElementSibling : 다음 형제 태그, previousElementSibling : 이전 형제 태그

// ###### JS로 CSS 변경 ########################################################################################################################
// 설정(set)
document.body.style.setProperty('color', 'lime');
document.body.style.setProperty('font-size', '16px'); // - 를 사용한것에 주목!

// 읽기(get)
document.body.style.getPropertyValue('color'); // 'lime'

// item() 이용, 인자값은 인덱스 숫자
document.body.style.item(0) // 'color'
document.body.style.item(1) // 'font-size'

// 제거(remove), 제거 후에는 빈 문자열을 반환한다.
document.body.style.removeProperty('color') // 'lime'
document.body.style.item(1) // ''


// ##### 단일 Element ########################################################################################################################
 
document.getElementById("abc") // <p id="abc" class="def"> ... </p>

abc = document.getElementById("abc")
abc.innerHTML //  <b>하이</b> (예시)
abc.innerText // 하이
abc.innerText = 'hi' // 텍스트만 변경
abc.innerHTML = '<b>hi</b>' // html과 같이 변경

abc.style.color = 'blue'
abc.style.fontsize = '10px'

abc.getAttribute('class') // def // 속성값을 가져오기 (input태그의 value는 가져올 수 없음)
abc.setAttribute('class','abc') // 속성값(클래스명)을바꿈

logo = document.getElementById("logo"); // img 태그
logo.src // https://cdn.britannica.com/26/9..... (img의 경우 getAttribute를 써도되고 안써도됨, 다른건 다써줘야함)

// ##### 다중 Element #########################################################################################################################

document.getElementsByClassName("abc") // 'abc'라는 클래스를 가진 파트를 리스트형태로 가져옴
document.getElementsByTagName("p")
document.getElementsByName("abc") // Name은 주로 input태그에 사용되는 속성

abc = document.getElementsByName("abc")[0]
abc.value // abc에 입력되있는 값을 가져옴
abc.value = '홍길동' // 값을 변경

// ##### CSS Selector(getElement를 쉽게 사용) ##################################################################################################

document.querySelector('#abc') // Id가 abc인 태그하나 (document.getElementById("abc")와 같음)
document.querySelector('p') // p태그 하나
document.querySelector('.abc') // class가 abc인 태그하나

document.querySelectorAll('p') //p태그 전체 리스트로
document.querySelectorAll('.abc')

document.querySelectorAll('h1,h2') // 전체 h1태그, h2태그를 리스트로

// ##### Element 추가/삭제 #####################################################################################################################

hr = document.createElement('hr') // hr태그를 hr변수에
document.body.appendChild(hr) // body 마지막 자식 태그로 추가
document.body.insertBefore(hr, document.body.children[3]) // 현재 body의 3번자식(4번째자식) 전에 삽입해라 (즉 3번자리가됨)

hr2 = hr.cloneNode() // hr변수를 hr2변수에복제
document.body.insertBefore(hr2, document.body.children[6]) // (이같이 hr변수 hr2변수를 따로 삽입가능)

document.body.removeChild(hr2) // hr2변수를 body에서 삭제
document.body.removeChild(document.body.children[3]) // 3번자식삭제

// ##### setTimeout, setInterval, clearTimeout, clearInterval ##################################################################################

function callback() { console.log("callback function is called"); }
setTimeout(callback, 3000); // 1 (setTimeout이나 setInterval에 반환되는 id값을 출력) // 3초뒤 callbackg함수 실행
setInterval(callback, 5000); // 2 // 5초마다 callbackg함수 실행

clearTimeout(1) // 1번 setTimeout함수를 중지시킴
clearInterval(2) // 2번 setInterval함수를 중지시킴


// ##### EventHandler ############################################################################################# html 속성 #################
{/* <h1 onclick="console.log('clicked');">event handler</h1> */}
{/* <input type="text" onchange="console.log('changed')"; onkeydown="console.log('typed');"></input> */}

// onclick : 클릭할때 속성값실행
// onmouseover : 마우스가 올려있을때
// onmouseout : 마우스가 나갔을때
// onchange : 변화가 생기고 나왔을때 (변화가 생길떄x)
// onkeydown : 키보드가 눌렸을때

// #####################################################################################################=########## JS에서(onclick...) ###########

{/* HTML 
<form method="GET" action="b.html" id="form1">
    이름 : <input type="text" name="id"> <br>
    <input type="submit">
</form>
*/}
let t = document.getElementById('form1');
t.onsubmit = function a(){ // onsubmit의 속성을 추가
    console.log('submit버튼눌림')
    return false; // return false인경우 submit, keydown, click 등이 실행이 되지않음
}
// ############################################################################################################# JS에서(EventListener) ###########

function b(){
    console.log("이벤트리스너")
    return false;
}
t.addEventListener('submit', b) // 이벤트 리스너는 on을붙이지 않고 이벤트이름, 함수를 적어줌 (위 이벤트핸들러를 덮어쓰지않음)
t.removeEventListener('submit', b) // 이벤트 리스너 지우기

// ###### classList(클래스 확인,삽입,토글) ##########################################################################################################
let t = document.body.children[0]
t.classList // 변수안에 존재하는 클래스들을 리스트로 확인가능
t.classList.add('image-selected'); // 인자로 받은 클래스를 삽입
t.classList.toggle('image-selected'); // 인자로 받은 클래스가 없으면 넣고, 있으면 뺴는 기능


// ########## AJAX (브라우저에서 페이지를 이동않고 http request를보내 처리하는기술)###############################################################

let request = new XMLHttpRequest(); // HttpRequest를 보내기위한 새로운 객체 생성
request.onreadystatechange = function a(){  // readyState 숫자가 변경될떄마다 함수실행
    console.log(this.readyState, this.status);// 0:open메소드 호출전// 1: open메소드 호출후// 2: 응답에 헤더가 수신된후// 3: 바디가 수신중일때// 4:완료
    if (this.readyState == 4 && this.status == 200){
        console.log(this.response); // 보낸 데이터 확인 (바로확인은 불가능)
    }
}
request.open('GET','./data.txt');
request.send();

// ############################################################################################################################ JSON ###########
let arr=[문자열, 3.14, true, null, undefined, function a(){console.log('method')}]

let t = JSON.stringify(arr); // JSON.stringify()는 데이터를 문자열로 변환 (undefined와 method는 누락시킴) -> 데이터전송위해서
// "[문자열, 3.14, true, null, null, null]"
JSON.parse(t);// JSON.parse()는 문자열을 다시 풀어줌 -> 데이터 전송후
// [문자열, 3.14, true, null, null, null]

// ############################################################################################################## AJAX로 JSON 데이터 전송 #######
{/* 
HTML
<p id="template">
    <span class="'character">주인공</span>:
    <span class="word">명대사</span>
</p>

JSON파일
[{'id':'마틸다', 'msg':'여기서라면 우린 괜찮을거에요'},
{'id':'터미네이터', 'msg':'I will be back'}]
*/}

let request = new XMLHttpRequest();
request.onreadystatechange = function a(){  
    console.log(this.readyState, this.status);
    if (this.readyState == 4 && this.status == 200){
        console.log(this.response);

        let data = JSON.parse(this.response);
        for (let i in data){ // JS에서 in 은 index만 전달
            let t = document.getElementById("template").cloneNode(true); // cloneNode(true)는 자식태그들까지 복제
            t.removeAttribute('id');
            t.children[0].innerText = data[i].id;
            t.children[1].innerText = data[i].msg;
            document.body.appendChild(t);
        }
    }
}
request.open('GET','./json_data.txt');
request.send();


// ###############################################################################################################################
// ########## 기타 JS 유용한것들 ####################################################################################################
// ###############################################################################################################################
// ###### Reduce 예시 1 ##################################################################################################
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sum1 = numbers.reduce((accumulator, currentNumber) => {accumulator + currentNumber}, 0);
console.log('sum1 =', sum1);

// ###### Reduce 예시 2 (함수 따로 빼기) ####################################################################################
function sumReducer(accumulator, currentNumber) {
  return accumulator + currentNumber;
}
const sum2 = numbers.reduce(sumReducer);
console.log('sum2 =', sum2);

// ###### 단위 변환기 ####################################################################################
 const numConverter = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

// ###### 특정글자를 다른글자로 전체바꾸기 ####################################################################################
title.replace(/&quot;/g, '"')

// ###### 숫자, 글자 오름차순 내림차순 ####################################################################################
  if (sortBy === 'price') { // 숫자 오름차순
      dataByLessThenPrice.sort((a, b) => {
          return Number(a.price) - Number(b.price);
      });
  } else if (sortBy === '-price') {
      dataByLessThenPrice.sort((a, b) => {
          return Number(b.price) - Number(a.price);
      });
  } else if (sortBy === 'name') { // 글자 오름차순
      dataByLessThenPrice.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          if (a.name === b.name) return 0;
      });
  } else if (sortBy === '-name') {
      dataByLessThenPrice.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          if (a.name === b.name) return 0;
      });
  }

// ###### 배열에서 3개 랜덤으로 가져오기 (실험해봐야함,,)####################################################################################
  let data = data.sort(() => Math.random() - 0.5);
  data = data.slice(0, 3)


// ###### 비동기작업 취소 ########################################################################################################################
const fetchControl = new AbortController(); // 비동기작업 취소 할수있게함

fetch('http://192.168.0.1:8000/api', {
    signal:fetchControl.signal,  // AbortController와 연결
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(jsonObj),
}).then(res => {
    if (res.ok) {
        return res.json()
    }
    if (!res.ok) {
        return;
    }
}).then(res2 => {
    const isConfirm = confirm("취소할래?");
    .then((result) => {
        if (result) {
            fetchControl.abort();  // 비동기작업 취소
           }
         return;
        }
    })
    }

// ###### ########################################################################################################################
        
