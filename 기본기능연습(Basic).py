#----------문자열함수----------------
python = "Python is blowing my MIND"
print (python.lower())
print (python.upper())
print (python[0] == "P")
print (python[0].isupper()) # 대문자인지 아닌지 (is로 시작 된거 많음)
print (len(python)) # 문자 길이
print(python.replace("Python","Java")) # replace 해서 제거기능도 가능
print(python.index("y"))
index = python.index("y")
index = python.index("y", index + 1) # y를 찾은부분에 다음것부터 찾음으로써 두번째로된 y찾기
print(index)
print(python.find("Java")) # find는 없으면 -1 뜸  index는 오류뜸
print(python.count("y")) # y가 몇개인지
#문자열 함수는 remove사용불가, del은 변수 자체를 지울떄 사용, 문자를 지울떄는 replace로 바꿔서지움
print(type(python))

# python is blowing my mind
# PYTHON IS BLOWING MY MIND
# True
# True
# 25
# Java is blowing my MIND
# 1
# 19
# -1
# 2
# <class 'str'>

#----------프린트방법-----------------
print ("나는 {}색과 {}색을 좋아함" .format("빨간","파랑")) # Format 형식 print
print ("나는 {1}색과 {0}색을 좋아함" .format("빨간","파랑"))
print ("내이름은{name} {age}살이죠".format(name="john",age=30)) 
name = "john"
age = 30
print(f"나는{name} {age}살이야 벌써 ㅋㅋㅋ") # 새로운 형식 print

# 나는 빨간색과 파랑색을 좋아함
# 나는 파랑색과 빨간색을 좋아함
# 내이름은john 30살이죠
# 나는john 30살이야 벌써 ㅋㅋㅋ

#-----------\의 역할------------------
print("red apple\rpine") # \r은 커서를 앞으로 가져와서 앞글자를 순서대로 pine 으로 바꿔줌
A = "I have no money"
print (A,"\b\b\b\b\b\bgold and silver") # \b는 백스페이스역할

# pineapple
# I have no gold and silver

#----------리스트함수-----------------
subway = ["A","B","C","D"]
print(subway)
subway.append("E")
print(subway)
subway.insert(1, "A") # 1번 자리에 A를 넣어라
print(subway)
subway.pop() # 맨뒤에 지우기, 맨앞은 del subway[0]
print(subway)
print(subway.count("A"))

num_list = [5,4,3,2,1]
num_list.sort()
print(num_list)
num_list.reverse()
print(num_list)
del num_list[0] # 리스트에선 순서 지우기!!!! 항상 벨류가 아닌 키를 지운다 생각
print(num_list)
num_list.remove(2) # 리스트에서 적힌값을 지우기!!!!
print(num_list)
num_list.clear()
print(num_list)

# ['A', 'B', 'C', 'D']
# ['A', 'B', 'C', 'D', 'E']
# ['A', 'A', 'B', 'C', 'D', 'E']
# ['A', 'A', 'B', 'C', 'D']
# 2
# [1, 2, 3, 4, 5]
# [5, 4, 3, 2, 1]
# [4, 3, 2, 1]
# [4, 3, 1]
# []
#------------딕셔너리 함수----------------
cabinet = {3:"you", 100:"kim", 342:"park", 566:"jo"}
print(cabinet[100])
print(cabinet.get(100))
print(cabinet.get(101,"사용가능")) # get도 키로 벨류를 불러오지만 없을떈 none으로 지정해주면 이것처럼 "사용가능"이라 적을수있음
print(3 in cabinet)
print("you" in cabinet.values()) # 벨류에 "you"가 있는지 참,거짓
del cabinet[3] # 키에맞는 값 지우기, 딕셔너리는 remove함수 없음!!!!!!!!! (del은 키, remove는 벨류)
print(cabinet)
print(cabinet.clear())

# kim
# kim
# 사용가능
# True
# True
# {100: 'kim', 342: 'park', 566: 'jo'}
# None

#---------------집합 함수-----------------
python = {"you", "kim", "lee"} # 집합은 랜덤으로 구성, 중복안됨
java = set(["you","park"])
print(python & java) # 교집합 = python.interection(java)
print(python | java) # 합집합 = python.union(java)
print(python - java) # 차집합 = python.difference(java) , 파이썬만 할줄아는 사람
python.add("park") # 집합은 appendix, insert함수가 없음 순서가 아니라서
print(python)
python.remove("kim") # 집합은 del없음 (del = 순서나 키, remove = 값)
print(python)
print(list(python)) # 집합을 리스트로 만들기

#----------------표준입출력---------------------
scores = {"수학":80,"영어":70,"코딩":100}
for sub, score in scores.items():
    print(sub.ljust(3), str(score).rjust(4), sep = ":") # 3칸안에 왼쪽정렬, 4칸안에 오른쪽정렬, 그사이에 : 넣기
for num in range(1,101) :
    print ("대기번호",str(num).zfill(3), sep=":") ## 3자리 숫자에 앞자리에 0으로 채워라
    
print("{0: >10}".format(500)) #앞에 0 은 0에해당하는 format에, 10공간을 확보하고 오른쪽정렬
print("{0: >+10}".format(500))
print("{0:_>+10}".format(-500))#10공간을 확보하고 오른쪽정렬 후 빈칸은 _로채움
print("{0: <10}".format(500))#10공간을 확보하고 왼쪽정렬
print("{0:,}".format(50000000))#돈 콤마 찍어주기
print("{0:.2f}".format(500))# 소수점 둘쨰짜리까지 찍기

# 수학 :  80
# 영어 :  70
# 코딩 : 100
# 대기번호:001
# 대기번호:002
# :
# :
# 대기번호:100
#        500
#       +500
# ______-500
# 500
# 50,000,000
# 500.00

#------------------파일입출력---------------------
f = open("헬로우","r", encoding="utf8")
while True :
    line = f.readline() # line을 하나씩만 가져와라
    if not line:
        break
    print(line, end="")
print()
f.close()

f = open("헬로우","r", encoding="utf8")
lines = f.readlines() # 모든 line을 가져오되 라인별로 리스트에 묶어라
for line in lines :
    print(line, end="")
f.close()   

with open("헬로우2","r", encoding="utf8") as f:
    print(f.read())

#-------------클래스,상속,다중상속-------------------------
class Unit:
    def __init__ (self, name, hp):
        self.name = name
        self.hp = hp

class AttackUnit(Unit):
    def __init__ (self, name, hp, power):
        Unit.__init__(self, name, hp)
        self.power = power

    def attack(self, location):
        print("{} : {}방향에서 적군을 공격합니다. {}의 데미지를 주었습니다.".format(self.name, location, self.power))

    def damaged(self, damage):
        print("{} : {}의 데미지를 입었습니다.".format(self.name,damage))
        self.hp -= damage
        print("{} : 현재체력은 {}입니다.".format(self.name, self.hp))
        if self.hp <= 0 :
            print("{}은/는 파괴되었습니다.".format(self.name))

firebat1 = AttackUnit("파이어뱃",100,20)
firebat1.damaged(25)
firebat1.damaged(25)
firebat1.damaged(25)
firebat1.damaged(25)

class Flyable :
    def __init__(self,flying_speed):
        self.flying_speed = flying_speed

    def fly(self, name, location):
        print("{}가 {}방향으로 {}속도로 날아갑니다,".format(self.name,location,self.flying_speed))

class FlyableAttackUnit(AttackUnit, Flyable):
    def __init__(self, name, hp, power, flying_speed):
        AttackUnit.__init__(self, name, hp, power)
        Flyable.__init__(self, flying_speed)

valkyrie1 = FlyableAttackUnit("발키리",100,30,20)
valkyrie1.fly("발키리","5시")
valkyrie1.attack("5시")
valkyrie1.damaged(50)
valkyrie1.damaged(50)

# 파이어뱃 : 25의 데미지를 입었습니다.
# 파이어뱃 : 현재체력은 75입니다.
# 파이어뱃 : 25의 데미지를 입었습니다.
# 파이어뱃 : 현재체력은 50입니다.
# 파이어뱃 : 25의 데미지를 입었습니다.
# 파이어뱃 : 현재체력은 25입니다.
# 파이어뱃 : 25의 데미지를 입었습니다.
# 파이어뱃 : 현재체력은 0입니다.
# 파이어뱃은/는 파괴되었습니다.
# 발키리가 5시방향으로 20속도로 날아갑니다,
# 발키리 : 5시방향에서 적군을 공격합니다. 30의 데미지를 주었습니다.
# 발키리 : 50의 데미지를 입었습니다.
# 발키리 : 현재체력은 50입니다.
# 발키리 : 50의 데미지를 입었습니다.
# 발키리 : 현재체력은 0입니다.
# 발키리은/는 파괴되었습니다.


#-------------예외처리-----------------------
try :
    print("한자리 전용 덧셈 계산기입니다.")
    num1 = 5
    num2 = 11
    print(f"{num1}을 입력하였습니다.")
    print(f"{num2}을 입력하였습니다.")
    if num1 >= 10 or num2 >= 10 :
        raise ValueError # 에러를 고의로 일으키기
    print (f"{num1} + {num2} = {num1 + num2}")
except ValueError :
    print("ValueError입니다.")
finally : # try를 완료하든 except를 완료하든 마지막단계로 감
    print("계산기를 이용해서 감사합니다")

# 한자리 전용 덧셈 계산기입니다.
# 5을 입력하였습니다.
# 11을 입력하였습니다.
# ValueError입니다.
# 계산기를 이용해서 감사합니다
