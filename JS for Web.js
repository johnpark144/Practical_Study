// ###### script를 JS로 빼기 ##########################################################################################################
<script src="JS.js"></script> // html에 추가하여 script를 JS.js라는 파일에 작성하여 입력

// ###### prompt, alert, confirm ####################################################################################################
const newContent = prompt("JS로 이같이 가능") // prompt는 글쓰고확인, alert는 확인버튼, confirm은 확인 취소버튼
document.body.innerText = newContent // prompt에서 쓴글을 바디안에

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

// ######################################################################################################################## JS에서 #############

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

function b(){
    console.log("이벤트리스너")
    return false;
}
t.addEventListener('submit', b) // 이벤트 리스너는 on을붙이지 않고 이벤트이름, 함수를 적어줌 (위 이벤트핸들러를 덮어쓰지않음)

t.removeEventListener('submit', b) // 이벤트 리스너 지우기

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
// ###### classList ############################################################################################################################
let t = document.body.children[0]
t.classList // 변수안에 존재하는 클래스들을 리스트로 확인가능
t.classList.add('image-selected'); // 인자로 받은 클래스를 삽입
t.classList.toggle('image-selected'); // 인자로 받은 클래스가 없으면 넣고, 있으면 뺴는 기능

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
