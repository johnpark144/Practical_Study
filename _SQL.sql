-- ############# SQL의 기본 (되도록 뒤에 ; 붙이기) ##########################################################################################
SELECT * FROM Customers -- Customers에서 전체행을 가져와라
WHERE ProductID < 3 -- 열을가져옴 (True인 열만 불러오는 조건문)
SELECT CustomerID AS '아이디' FROM Customers -- 데이터 불러와서 행이름 바꾸기

-- ######################################################################################################### 오름차순, 내림차순 ############
ORDER BY ContactNamel -- 오름차순 디폴트 (ASC)
ORDER BY ContactNamel DESC -- 내림차순
ORDER BY ProductID ASC, ContactNamel DESC -- ProductID를 먼저 오름차순으로 정렬하되 그안에서 ContactNamel를 내림차순으로

-- ################################################################################################## 원하는만큼만 데이터 가져오기 ##########
SELECT * FROM Customers
LIMIT 10 -- 가져올 개수
LIMIT 30, 10 -- 건너뛸개수, 가져올개수 (페이징 기능에 주로사용)


-- ###### 각종 연산자들 ####################################### (+, -, *, /, %, TRUE, FALSE, !, IS(=), IS NOT, AND(&&), OR(||), <> )#######
SELECT ProductName, Price / 2 AS HalfPrice FROM Products; -- Price행에 값들에 2를 나눈값을 HalfPrice행에 저장
SELECT !TRUE, NOT 1, !FALSE, NOT FALSE; -- 0,0,1,1
SELECT (TRUE IS FALSE) IS NOT TRUE; -- 1
SELECT TRUE AND FALSE, TRUE OR FALSE; -- 0, 1

SELECT * FROM OrderDetails
WHERE ProductId = 20 AND (OrderId = 10514 OR Quantity = 50); -- ProductId가 20이면서 OrderId가 10514거나 Quantity가 50

SELECT 1 = 1, !(1 <> 1), NOT (1 < 2), 1 > 0 IS NOT FALSE -- 1,1,0,1 // SQL은 변수넣는게 없어서 =이 같다는뜻 //<>는 !=와 동일
SELECT 'A' != 'B', 'A' < 'B', 'A' = 'a'; -- 1,1,1 // SQL은 대소문자구분X

SELECT ProductName, Price, Price > 20 AS EXPENSIVE FROM Products; -- Price가 20넘으면1 안넘으면0을 EXPENSIVE행에 같이 저장

-- ############################################################################################################## BETWEEN, IN ##########
SELECT 'banana' NOT BETWEEN 'Apple' AND 'camera';-- 0// 'banana'첫자 b 가 'Apple'의 A, 'camera' c사이에 있어서 1 인데 NOT붙여서 0

SELECT * FROM Customers
WHERE CustomerName BETWEEN 'b' AND 'd'; -- CustomerName b,c,d로 시작하는거

SELECT * FROM Customers
WHERE City IN ('Torino', 'Paris', 'Portland', 'Madrid')  -- IN 에 존재하는 City만 (NOT을 붙이면 제외함)

-- ############################################################ LIKE '..%..'(0~N)개 문자가 있는패턴/ LIKE '.._..' _개수만큼 문자가있는 패턴 ####
SELECT
  'HELLO' LIKE 'hel%', -- 1
  'HELLO' LIKE 'H%', -- 1
  'HELLO' LIKE 'H%O', -- 1
  'HELLO' LIKE '%O', -- 1
  'HELLO' LIKE '%HELLO%', -- 1 // 내용안에 포함이 되있는지 (%안에 아무것도 없어도됨)
  'HELLO' LIKE '%H', -- 0 // H뒤에 아무것도없어서 0
  'HELLO' LIKE 'L%' -- 0

  SELECT
  'HELLO' LIKE 'HEL__', -- 1
  'HELLO' LIKE 'h___O', -- 1
  'HELLO' LIKE 'HE_LO', -- 1
  'HELLO' LIKE '_____', -- 1
  'HELLO' LIKE '_HELLO', -- 0 // 밑줄 수 만큼 문자가 존재해야 1
  'HELLO' LIKE 'HEL_', -- 0
  'HELLO' LIKE 'H_O' -- 0 // 문자개수만큼 밑줄이 있어야함

-- ##### 숫자와 문자열을 함수들 ###################### 숫자열 함수(ROUND, CEIL, FLOOR, ABS, GREATEST, LEAST, MAX, MIN, COUNT, SUM, AVG, TRUNCATE)
SELECT ROUND(0.5) -- 1
 
SELECT 
  GREATEST(1, 2, 3), -- 3 // 괄호안에서 비교 (MAX랑다름)
  LEAST(1, 2, 3, 4, 5); -- 1

SELECT OrderDetailID, ProductID, Quantity,
  GREATEST(OrderDetailID, ProductID, Quantity), -- 괄호안에 행들 중 "열을" 비교해서 가장큰값을 새로운 행에 저장
  LEAST(OrderDetailID, ProductID, Quantity)
FROM OrderDetails;

SELECT
  MAX(Quantity), -- 괄호안에 "행들을" 비교해서 가장큰값을 새로운 행에 저장
  MIN(Quantity),
  COUNT(Quantity),
  SUM(Quantity),
  AVG(Quantity)
FROM OrderDetails

SELECT
  TRUNCATE(1234.5678, 2), -- 1234.56 // 소수 둘째자리에서 짤라라(반올림없이)
  TRUNCATE(1234.5678, 3), -- 1234.567
  TRUNCATE(1234.5678, -1), -- 1230 // 앞에 한자리를 짤라라서 0붙임
  TRUNCATE(1234.5678, -2) -- 1200


-- ################################# 문자열 함수 1 (UCASE(UPPER), LCASE(LOWER), CONCAT, SUBSTR, SUBSTRING, LEFT, RIGHT,)###

SELECT CONCAT('O-ID: ', OrderID) FROM Orders; -- OrderID행에 O-ID: 붙여서 행을만듬

SELECT CONCAT_WS(' ', FirstName, LastName) AS FullName -- 문자사이에 빈칸을 넣어서 행을만듬 // 빈칸 대신 다른 문자를 넣을수 있음
FROM Employees;

SELECT
  OrderDate, -- Ex) 1996-07-04
  LEFT(OrderDate, 4) AS Year, -- 1996 // 왼쪽 4개만 //MySQL은 1부터 샘 (파이썬은 0부터)
  SUBSTR(OrderDate, 6, 2) AS Month, -- 07 // 6부터 2개만
  RIGHT(OrderDate, 2) AS Day -- 04 // 오른쪽 2개만
FROM Orders;

-- ############################################## 문자열 함수 2 ( LENGTH, CHAR_LENGTH, TRIM, LTRIM, RTRIM, LPAD, RPAD, REPLACE, INSTR, CAST)###

SELECT
  LENGTH('안녕하세요'), -- 15 (바이트수)
  CHAR_LENGTH('안녕하세요'), -- 5 (실제길이)

SELECT CONCAT('|', TRIM(' HELLO '), '|'); -- |HELLO| // 왼쪽오른쪽 공간없애줌 // (LTRIM, RTRIM)으로 한쪽만 가능

SELECT
  LPAD(SupplierID, 5, 0), -- ex) 00001 // 총 5개길이가되되 나머지는 왼쪽에 0으로 채워라
  RPAD(Price, 6, 0) -- ex) 18.000
FROM Products;

SELECT
  REPLACE(Description, ', ', ' and') -- Description행에 존재하는 ',' 대신 ' and'를 넣어라
FROM Categories;

SELECT
  INSTR('ABCDE', 'ABC'), -- 1 // ABC가 ABCDE안에 몇번째에 있나
  INSTR('ABCDE', 'BCDE'), -- 2
  INSTR('ABCDE', 'C'), -- 3
  INSTR('ABCDE', 'DE'), -- 4
  INSTR('ABCDE', 'F'); -- 0 // 존재하지않는경우 0반환

SELECT * FROM Customers
WHERE INSTR(CustomerName, ' ') BETWEEN 1 AND 6; -- CustomerName행안에 값중 1~6칸 사이에 빈칸있는열만 불러와라 (짧은이름 같은거 찾을때 주로사용)

SELECT '01' = '1', -- 0 // 둘다 문자형이라
  CONVERT('01', DECIMAL) = CONVERT('1', DECIMAL); -- 1 //  CONVERT('', DECIMAL)은 숫자형으로 전환해줌 그래서 1

-- ############# 시간/날짜 관련 함수 #################################################################################################

SELECT CURDATE(), CURTIME(), NOW(); -- 현재날짜, 현재시간, 현재날짜+시간

SELECT * FROM Orders
WHERE OrderDate BETWEEN DATE('1997-1-1') AND DATE('1997-1-31'); -- 문자열을 날짜로 바꿔서 그 날짜사이에것들을 가져옴 // TIME()은 시간

SELECT OrderDate, -- ex) 1996-07-04
  YEAR(OrderDate) AS YEAR, -- 1996
  MONTHNAME(OrderDate) AS MONTHNAME, -- July (월)
  MONTH(OrderDate) AS MONTH, -- 7 (월)
  WEEKDAY(OrderDate) AS WEEKDAY, -- 3 (요일) //  0 월, 1 화, 2 수, 3 목, 4 금, 5 토, 6 일
  DAYNAME(OrderDate) AS DAYNAME, -- Thursday (요일)
  DAY(OrderDate) AS DAY -- 4 (일)
FROM Orders;

SELECT HOUR(NOW()), MINUTE(NOW()), SECOND(NOW()); -- 현재 몇시, 현재 몇분, 현재 몇초

-- ########################################################################### 날짜이동, 두 날짜간격, 마지막날 // ADDDATE, DATEDIFF, LAST_DAY ######
SELECT
  OrderDate, -- ex) 1996-07-04
  ADDDATE(OrderDate, INTERVAL 1 YEAR), -- 1997-07-04 // 1년후
  ADDDATE(OrderDate, INTERVAL -2 MONTH), -- 1996-05-04 // 2달전
  ADDDATE(OrderDate, INTERVAL 3 WEEK), -- 1996-07-25 // 3주뒤
  ADDDATE(OrderDate, INTERVAL -4 DAY), -- 1996-06-30 // 4일전
  ADDDATE(OrderDate, INTERVAL -5 MINUTE), -- 1996-07-03 23:55:00 // 5분전
  
  DATEDIFF(OrderDate, NOW()), -- -9576 // 두 날짜의 일수 간격 (시간 간격은 TIMEDIFF(,) )

  LAST_DAY(OrderDate), -- 1996-07-31 // 그달의 마지막날 (31,30,28)
  DAY(LAST_DAY(OrderDate)), -- 31
FROM Orders;

-- #################################################################################################### 시간 포맷 DATE_FORMAT #################
SELECT DATE_FORMAT(NOW(), '%y-%m-%d %h:%i:%s %p') -- 22-09-22 10:54:49 PM

-- %Y	년도 4자리         -- %y  년도 2자리
-- %M	월 영문            -- %m	월 숫자
-- %D	일 영문 (st,nd,th) -- %d  일 숫자 (01 ~ 31)
-- %T	hh:mm:ss           -- %r	hh:mm:ss AM/PM
-- %H	시 (~23)           -- %h	시 (~12)
-- %i	분
-- %S, %s	초
-- %p	AM/PM

-- ##### 기타 함수들 (IF, CASE, IFNULL) ########################################################################################################
SELECT
  IF (Price > 30, 'Expensive', 'Cheap'), -- 참이면 전자, 거짓이면 후자 // 30보다 크면 Expensive, 아니면 Cheap
  CASE
    WHEN Price < 20 THEN '저가' -- 참이면 적용 아니면 다음 캐이스로
    WHEN Price BETWEEN 20 AND 30 THEN '일반'
    ELSE '고가'
  END
FROM Products;

SELECT
  IFNULL('A', 'B'), -- A // 앞에 것을 출력하되 NULL이 앞에있으면 다음것을 출력
  IFNULL(NULL, 'B'); -- B

-- ######## 조건에 따라 그룹으로 묶기 #############################################################################################################
SELECT Country FROM Customers
ORDER BY Country -- 전체 Country별로 모아서 정렬
GROUP BY Country -- 전체 Country별로 모으되 중복된것은 제거 (한개씩만) // 주로 MAX, MIN, COUNT, SUM, AVG 등과 같이 쓰임
-- ########################################################################################### GROUP BY 활용(MAX, MIN, COUNT, SUM, AVG) #########
SELECT COUNT(*), OrderDate 
FROM Orders
GROUP BY OrderDate; -- OrderDate별로 모아 중복된것은 제거하여 한가지만 불러오되, 그룹들을 다 카운트함

SELECT ProductID,
  SUM(Quantity) AS QuantitySum
FROM OrderDetails
GROUP BY ProductID -- ProductID별로 모아 중복된것은 제거하여 한가지만 불러오되, 그룹별로 다 더함
ORDER BY QuantitySum DESC; -- 결과값에 양이 많은 순으로 다시 재정렬

SELECT CategoryID,
  MAX(Price) AS MaxPrice,
  MIN(Price) AS MinPrice,
  TRUNCATE((MAX(Price) + MIN(Price)) / 2, 2) AS MedianPrice,
  TRUNCATE(AVG(Price), 2) AS AveragePrice
FROM Products
GROUP BY CategoryID;

-- ################################################################################################# WITH ROLLUP, HAVING, DISTINCT #####
SELECT Country, COUNT(*)
FROM Suppliers
GROUP BY Country
WITH ROLLUP; -- GROUP BY 결과값의 총 합계 (즉 전체 카운트값이 맨밑에 입력됨)

SELECT COUNT(*) AS Count, OrderDate
FROM Orders
WHERE OrderDate > DATE('1996-12-31') -- WHERE은 그룹하기 전 조건문
GROUP BY OrderDate
HAVING Count > 2; -- HAVING은 그룹 후 조건문

SELECT Country,
  COUNT(DISTINCT CITY) -- DISTINCT는 정렬하지않고 중복값만 없앰 (이같이 GROUP BY와 이중사용가능)
FROM Customers
GROUP BY Country;

-- ####### 서브쿼리 #################################################################################### 비상관 서브쿼리 ######################

SELECT * FROM Products
WHERE Price < (
  SELECT AVG(Price) FROM Products -- 서브쿼리값이 하나만 나오는경우(주로 MAX, MIN, COUNT, SUM, AVG로 나온값)에만 =,< 등을 쓸수 있음
);

SELECT CategoryID, CategoryName, Description
FROM Categories
WHERE CategoryID IN
  (SELECT CategoryID FROM Products WHERE Price > 50); -- 여러값이 나오는경우에선 IN, ANY, ALL을 사용

SELECT * FROM Products
WHERE Price > ALL ( -- 모두해당하는것보다 커야하는경우 ALL, 하나라도 해당되면 ANY
  SELECT Price FROM Products
  WHERE CategoryID = 2
);
-- ##################################################################################### 상관 서브쿼리와 EXISTS / NOT EXISTS 연산자 #############

SELECT
  ProductID, ProductName,
  ( SELECT CategoryName FROM Categories C -- Categories 를 C로(약자는 FROM에서 지정)
    WHERE C.CategoryID = P.CategoryID -- Categories의 CategoryID와 Products의 CategoryID가 같은
  ) AS CategoryName
FROM Products P; -- Products 를 P로(약자는 FROM에서 지정)

SELECT
  CategoryID, CategoryName
FROM Categories C
WHERE EXISTS( -- 존재하는 것만 가져옴 (SELECT부분에 EXISTS없이 같은 쿼리를 적어두면 모든 행을 가져오되 P.Price > 80에 해당안하면 빈칸임)
  SELECT * FROM Products P
  WHERE P.CategoryID = C.CategoryID
  AND P.Price > 80
);
-- ####### JOIN (상관서브쿼리를 쉽게 엮음) ################################################################# JOIN, LEFT JOIN, RIGHT JOIN #######

SELECT C.CategoryID, C.CategoryName, P.ProductName
FROM Categories C -- (약자는 FROM과 JOIN에서 지정)
JOIN Products P 
  ON C.CategoryID = P.CategoryID; -- C테이블, P테이블을 하나로 만들되 CategoryID가 같은거끼리 묶어서 SELECT행만 출력

SELECT 
  C.CategoryName, P.ProductName,
  MIN(O.OrderDate) AS FirstOrder,
  MAX(O.OrderDate) AS LastOrder,
  SUM(D.Quantity) AS TotalQuantity
FROM Categories C
JOIN Products P --여러개 JOIN도가능, JOIN은 빈칸있는 부분 열은 출력X
  ON C.CategoryID = P.CategoryID
JOIN OrderDetails D
  ON P.ProductID = D.ProductID
JOIN Orders O
  ON O.OrderID = D.OrderID
GROUP BY C.CategoryID, P.ProductID;

SELECT
  E1.EmployeeID, CONCAT_WS(' ', E1.FirstName, E1.LastName) AS Employee,
  E2.EmployeeID, CONCAT_WS(' ', E2.FirstName, E2.LastName) AS NextEmployee
FROM Employees E1
LEFT JOIN Employees E2 -- LEFT JOIN은 왼쪽에있는 데이터(FROM데이터)는 오른쪽(JOIN 데이터)이 NULL이어도 다가져옴 (RIGHT JOIN은 그반대)
ON E1.EmployeeID + 1 = E2.EmployeeID
ORDER BY E1.EmployeeID;

-- ########## UNION (집합) ##############################################################################################################

SELECT CustomerName AS Name, City, Country, 'CUSTOMER'
FROM Customers
UNION -- UNION은 중복을 제거한 합집합, UNION ALL은 중복된것 포함한 합집합
SELECT SupplierName AS Name, City, Country, 'SUPPLIER'
FROM Suppliers
ORDER BY Name;

-- ########## 테이블 만들고 데이터 입력 ######################################################################## (대부분 GUI로 해결가능) ##########

-- 테이블생성
REATE TABLE people (
  person_id INT,
  person_name VARCHAR(10),
  age TINYINT,
  birthday DATE
);
-- 테이블명 변경
ALTER TABLE people RENAME TO friends,
-- 테이블 삭제
DROP TABLE friends;

-- 컬럼 자료형 변경 (이름 그대로 적어야함)
CHANGE COLUMN person_id person_id TINYINT, -- person_id에 대하여, 이름을 person_id, 자료형을 TINYINT로 전환
-- 컬럼명 변경
CHANGE COLUMN person_name person_nickname VARCHAR(10), 
-- 컬럼 삭제
DROP COLUMN birthday,
-- 컬럼 추가
ADD COLUMN is_married TINYINT AFTER age; -- age 행 다음에 추가

-- 데이터 삽입 (일부 컬럼만 값 넣기 가능 (NOT NULL은 생략 불가))
INSERT INTO people
  (person_id, person_name, birthday)
  VALUES (3, '임꺽정', '1995-11-04');

-- 데이터 삽입 (모든 칼럼이 존재하는경우)
INSERT INTO people
  VALUES 
    (4, '존 스미스', 30, '1991-03-01'),
    (5, '루피 D. 몽키', 15, '2006-12-07'),
    (6, '황비홍', 24, '1997-10-30'); 

--  DELETE - 주어진 조건의 행 삭제하기
DELETE FROM businesses
WHERE status = 'CLS'; 

DELETE FROM businesses -- WHERE을 안붙이면 전체 삭제(테이블을 삭제한것이어서 PK 이어서 생김)
TRUNCATE businesses; -- 데이터베이스 초기화 (영구삭제)

-- UPDATE - 주어진 조건의 행 수정하기
UPDATE menus
SET 
  menu_name = '열정떡볶이',
  kilocalories = 492.78,
  price = 5000
WHERE 
  fk_business_id = 4
  AND menu_name = '국물떡볶이';

UPDATE menus
SET menu_name = '획일화'; -- WHERE을 안붙이면 전체수정


-- ################################################################################################## 데이터 제약 ####################

CREATE TABLE people (
  person_id INT AUTO_INCREMENT PRIMARY KEY, -- 둘이 거이 항상 같이다님
  person_name VARCHAR(10) NOT NULL,
  nickname VARCHAR(10) UNIQUE NOT NULL,
  age TINYINT UNSIGNED,
  is_married TINYINT DEFAULT 0 -- 디폴트는 0
);

-- AUTO_INCREMENT	새 행 생성시 1씩 증가
-- PRIMARY KEY	PK 중복 불가, NULL 불가
-- FOREIGN KEY 

-- UNIQUE	중복 불가
-- NOT NULL	NULL 입력 불가
-- UNSIGNED	(숫자일시) 양수만 가능
-- DEFAULT	값 입력이 없을 시 기본값

-- ###### 자료형 ##################################################################################################################################

-- 정수형 (주로 TINYINT나 INT를씀)
-- TINYINT	0 ~ 255 (숫자 범위)
-- SMALLINT	0 ~ 65,535
-- MEDIUMINT0 ~ 16,777,215
-- INT	0 ~ 4,294,967,295
-- BIGINT	0 ~ 2^64

-- 실수형
-- DECIMAL( s, d )	정수부분 포함한 총 자릿수( s ), 소수 자릿수 ( d ) // 고정소수점
-- FLOAT // 부동소수점

-- 문자형(왠만하면VARCHAR, 고정된수의 글자면CHAR)
-- CHAR(s)	고정 사이즈 (남는 글자 스페이스로 채움), 검색시 더빠름
-- VARCHAR (s)	가변 사이즈

-- 텍스트
-- TINYTEXT	255
-- TEXT	65,535
-- MEDIUMTEXT	16,777,215
-- LONGTEXT	4,294,967,295

-- 시간자료형
-- DATE	YYYY-MM-DD	
-- TIME	HHH:MI:SS
-- DATETIME	YYYY-MM-DD HH:MI:SS	(입력된 시간을 그 값 자체로 저장)
-- TIMESTAMP YYYY-MM-DD HH:MI:SS (컴퓨터의 시간대를 기준으로 저장)

-- ########################################################################################################################################
