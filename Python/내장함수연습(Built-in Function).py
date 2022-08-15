#----------------enumerate 함수----------------
import enum

for i, name in enumerate(['body','foo','bar']) : # 리스트를 0,1,2... 키를가진 딕셔너리 형식으로
    print(i, name)

#0 body
#1 foo
#2 bar
#-----------------filter 함수------------------
def positive(x):
    return x > 0

a = list(filter(positive, [1,-3,2,0,-5,6])) # 디파인된 함수를 이용하여 리스트에 있는것 중 참인것만 필터해서 남김
print(a)

#[1, 2, 6]
#-----------------map 함수---------------------
def two_times(x) :
    return x * 2

a = list(map(two_times, [1, 2, 3, 4])) # 디파인된 함수를 이용하여 리스트에 있는을 한번에 실행시킴
print(a)

#[2, 4, 6, 8]
#-----------------zip 함수---------------------
a = ['a','b','c']
b = [1,2,3]
c = ['abc']
print(list(zip(a, b))) # 두 리스트를 묶어줌
print(dict(zip(a, b))) # 두 리스트를 묶어줌

#[('a', 1), ('b', 2), ('c', 3)]
# {'a': 1, 'b': 2, 'c': 3}
#-----------------dir 함수---------------------
print(dir()) # 지금 상태에서 어떤 변수와 함수를 사용할 수 있는지 알려줌

#----------------내장 함수 활용-----리스트 캐비넷 만들기----------
a = ['a','b','c','d']
def map_plus1(x) :
    return x + 1

print(dict(zip(list(map(map_plus1, list(dict(enumerate(a)).keys()))), a)))

# {1: 'a', 2: 'b', 3: 'c', 4: 'd'}
