import re #정규표현식을 위한 모듈

# [a-c] : a와 c사이 매치 -> ex) 'a'는매치, 'before' 도 b로시작되서 매치, 'dude'는 포함된거 없어서 매치X
# a.b : a와 b사이에 아무 문자가 있으면 그것과 매치(줄바꿈인 \n 제외) -> ex) 'aab'매치o, 'a0b'매치o, 'abc'매치X
# ca*t : *전에있는 a가 반복된것 매치 (a를 포함하지 않아도됨) -> ex) 'ct' a가 0번반복되어 매치o, 'caat' a가 2번 반복되어 매치o
# ca+t : +전에있는 a가 반복된것 매치 (a를 하나라도 포함되야함) -> ex) 'ct' a가없으므로 매치X, 'caat' a가 2번 반복되어 매치o
# ca{2}t : {}숫자만큼 반복된것만 매치  -> ex) 'cat' a가 1개이므로 매치X, 'caat' a가 2번 반복되어 매치o
# ca{2,5}t : {}숫자와숫자 사이 만큼만 반복된것만 매치 -> ex) 'cat' a가 1개이므로 매치X, 'caat' a가 5번 반복되어 매치o
# ca?t : 0혹은 1번 사용된것만 매치(a가있는지 없는지 모를떄) -> ex) 'ct' a가없으므로 매치o, 'cat' a가있으므로 매치o

# (매타문자) ^ : 맨처음부분의, | : |앞이나 뒤에있는 문자일치, $ :맨뒤부분의
# \s : 공백과 매치, \w 한문자(숫자나 문자)와 매치, \d 숫자와 매치
# \S : 공백이 아닌것과 매치, \W 문자가 아닌것과 매치, \D 숫자가 아닌것과 매치



#---------------match 함수------------------------
p = re.compile('[a-z]+')
m = p.match('3 python') # re.compile 안에 정규표현식에 매치되는지 확인
print(m)
# None / 3으로 시작되므로 매치가 안돰

#---------------search 함수------------------------
p = re.compile('[a-z]+')
m = p.search('3 python') # re.compile 안에 정규표현식에 매치되는 부분을 찾기
print(m)
# <re.Match object; span=(2, 8), match='python'> / 2이상 8미만 자리에 python부분 매치(서치기능)

#---------------findall 함수------------------------
p = re.compile('[a-z]+')
m = p.findall('life is too short') # re.compile 안에 매치되는 부분들을 리스트에 담기
print(m)
# ['life', 'is', 'too', 'short']

#---------------finditer 함수------------------------
p = re.compile('[a-z]+')
m = p.finditer('life is too short') # re.compile 안에 정규표현식에 매치되는 부분을 반복가능한 매치객체 형체로 담기
for r in m:
    print(r) # 첫번째 반복 예 : <re.Match object; span=(0, 4), match='life'>
    print(r.group()) # 첫번째 반복 예 : life
    print(r.start()) # 첫번째 반복 예 : 0
    print(r.end()) # 첫번째 반복 예 : 4
    print(r.span()) # 첫번째 반복 예 : (0, 4)



#------------DOTALL,S 컴파일 옵션 주기-------------------
p = re.compile('a.b', re.DOTALL) # 줄바꿈인 \n 문자도 포함시켜주는 옵션, S라는 약어로 대신써도 됨
m = p.match('a\nb')
print(m)
# <re.Match object; span=(0, 3), match='a\nb'>

#------------IGNORECASE,I 컴파일 옵션 주기-------------------
p = re.compile('[a-z]+', re.IGNORECASE) # 대소문자 구분없다는 옵션, I라는 약어로 써도 됨
print(p.match('PYTHON'))
# <re.Match object; span=(0, 6), match='PYTHON'>

#------------MULTILINE, M 컴파일 옵션 주기-------------------
p = re.compile("^python\s\w+", # ^ : 맨처음부분에, \s : 공백(space바), \w 한문자(숫자나 문자), +반복
    re.MULTILINE) # 모든 줄에 적용시킴

data = """python one
life is too short
python two
you need python
python three"""

print(p.findall(data))

#['python one', 'python two', 'python three']

#------------VERBOSE, X 컴파일 옵션 주기-------------------
charref = re.compile(r"""
&[#]
(
     0[0-7]+
    | [0-9]+
    | x[0-9a-fA-F]+
)
;
""", re.VERBOSE) # 정규 표현식을 여러줄로 적어도 가능하게 만듬

#(출력 없음)
#------------메타문자 | -------------------
p = re.compile('crow|servo') # |의 앞,뒤 중에 일치하는게 있는지 
m = p.match('crowhello')
print(m)
# <re.Match object; span=(0, 4), match='crow'>

#------------메타문자 $ -------------------
print(re.search('short$', 'life is too short')) # $앞의 있는 문자가 맨뒤에 있는지
print(re.search('short$', 'life is too short, you need python'))

# <re.Match object; span=(12, 17), match='short'>
# None
#------------메타문자 \b-------------------
p = re.compile(r'\bclass\b') # \b는 공백을 넣어주어 일치하는것을 찾음, FYI -> r을쓰면 \두개안써도 백슬래시문제 해결함
print(p.search('no class at all'))
print(p.search('the declassified algorithm')) #  class가 있지만 양쪽에 공백이 없어서  None이뜸
print(p.search('one subclass is')) #  class가 있지만 양쪽에 공백이 없어서  None이뜸

# <re.Match object; span=(3, 8), match='class'>
# None
# None
#------------그루핑 () 과 \1 -------------------
p = re.compile(r'(\b\w+)\s+\1') # \1은 앞에있는 부분이 반복되는것 찾기
print(p.search('Paris in the the spring').group())

# the the
#------------그루핑 문자열에 이름 붙이기 ?P<name>------------------
p = re.compile(r"(?P<name>\w+)\s+((\d+)[-]\d+[-]\d+)")
m = p.search("park 010-1234-1234")
print(m.group("name"))

# park
#---------전방탐색 : 긍정형(?=), 부정형(?!)-------------
p = re.compile(".+:")
m = p.search("http://google.com")
print(m.group())
# http:

p = re.compile(".+(?=:)") # :까지 찾되 출력할떈 :제외
m = p.search("http://google.com")
print(m.group())
# http

p = re.compile(".*[.](?!bat$|exe$).*$", re.M) # 끝에 exe와 bat을 제외한부분을 출력
l = p.findall("""
autoexec.exe
autoexec.bat
autoexec.jpg
"""
)
print(l)

# ['autoexec.jpg']
#------------------문자열 바꾸기 sub------------------

p = re.compile('(blue|white|red)')
l = p.sub('colour', 'blue socks and red shoes') # 찾아바꿔라
print(l)

# colour socks and colour shoes
#---------------greedy vs non-greedy----------------
s = '<html><head><title>Title</title>'
print(re.match('<.*>', s).group()) # 한줄에 있는 < >사이 다가져와라 (greedy)
print(re.match('<.*?>', s).group())# 최소한으로 < >사이 다가져와라 (non-greedy)

#<html><head><title>Title</title>
#<html>
