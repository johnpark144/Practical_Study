// ###### 리마인더 ##############################################################################################################



// ######### 인덱스 (Ctrl + F) ########################################################### (-> 인덱스에 있는데 찾기 안되면 찾아서 인덱스 변경) ##################
// 용어설명
// 기본설정
// Git 관리 선언, 상태, 코밋준비, 코밋 -- Vim 모드
// gitignore
// 과거로 되돌리기 -- Reset, Revert
// 브랜치 확인, 생성, 수정, 삭제, 이동
// 브랜치 합치기 -- Merge, Rebase, 충돌해결
// 깃허브 -- 원격 저장소와 첫 연결 및 업로드, 첫 다운로드, 리액트 사용하는 경우 다운로드 후
// ------->, 연결된 이후, 로컬에서 push시에 원격에 변동이 있었던 경우, no-rebase 충돌, Rebase 충돌, 원격의 브랜치
// 소스트리  -- 브랜치를 초기화, reset, 커밋 되돌리기, revert, 병합, merge, 재배치, rebase

// ######### Git, GitHub 관한 정보 링크 #########################################################################################################



// ######### 용어설명 #########################################################################################################################
// CLI : Command Line Interface (터미널)
// GUI : Graphical User Interface

git --version  // 버전확인

// ######### Git 기본설정 (필수) ################################################################################################################
git config --global user.name "(본인 이름)"     // 이름 최초 설정   (나중에 누가 코드작성했는지 확인가능)
git config --global user.email "(본인 이메일)" // 이메일 최초 설정

git config --global user.name     // 설정되있는 이름 확인
git config --global user.email    // 설정되있는 이메일 확인

// ######## Git 관리 선언, 상태, 코밋준비, 코밋  ###################################################################################################
git init    // git으로 관리 선언 (git으로 관리할 내역들이 담길 숨김폴더 생성  ->  지우면 내역 날아감)
git status  //  현재 폴더의 상태를 확인
// Changes to be committed:   // Commit 준비 임시저장소에 있는것들 (deleted, modified 사실도 알려줌)
// Untracked files:   // add 되지 않은 새 파일

git add .   // 변화한 전체 파일을 Commit준비할 임시저장소에 저장  (.대신 특정파일만 저 가능)
git commit -m "FIRST COMMIT"  // 코밋 내용
git commit -am "FIRST COMMIT" // Add와 Commit을 동시에 (새로 추가된(untracked) 파일이 없을 때 한정)

// ######## Vim 모드 log 확인, 자세한 상태확인, Vim 모드 코밋
git log  // 코밋 log 확인
git diff  // Vim 모드로 더 자세히 상태확인 
git commit  // Vim 모드로 코밋 

	i // 입력 시작 //	명령어 입력 모드에서 텍스트 입력 모드로 전환
	ESC	// 입력 종료 // 텍스트 입력 모드에서 명령어 입력 모드로 전환
	:q	// 저장 없이 종료
	:q! // 저장 없이 강제 종료
	:wq // 저장하고 종료 // 입력한 것이 있을 때 사용
	k	// 위로 스크롤
	j // 아래로 스크롤
	
// ######## .gitignore 파일 기본 예시 #######################################################################################################
file.c    // 모든 file.c
/file.c   // 최상위 폴더의 file.c
file    // file이란 이름의 파일과 폴더와 그 내용들
file/   // file이란 이름의 폴더와 그 내용들
*.c   //  모든 .c 확장자 파일
!not_ignore_this.c  // .c 확장자지만 무시하지 않을 파일

file/debug.log  // file이란 폴더 바로 안에 debug.log 파일
file/*.c  // file이란 폴더 바로 안에 확장자가 .c 인 파일들

file/**/debug.log   // logs 폴더 바로 안, 또는 그 안의 다른 폴더(들) 안의 debug.log

// ######## 과거로 되돌리기 ####################################################################################################################
// Reset : 말그대로 현재것을 삭제한 후 과거로 되돌림
// Revert : 과거에 있는 내용을 현재에 덧붙여 되돌림 (기록을 남길필요가 있을때, 협업시에 주로 사용)

git log	// comit 로그 확인하여 돌아갈 과거 일련번호 확인 (Vim)	// 소스트리로 쉽게 확인가

// ######## Reset
git reset --hard (일련번호 앞 일부) 	// 과거로 reset
git reset --hard 	// 과거로 돌아온 상태에서 다시 마지막 커밋으로 변경 (과거로 되돌리기전 git 폴더를 따로 저장해 둔 경우에만 헤당)

// ######## Revert
git revert (일련번호 앞 일부)	// 과거의 용을 revert (Vim으로 이동)
	:wq // 저장하고 종료 // 입력한 것이 있을 때 사용
git revert --continue	// revert 도중 충돌 오류 떳을때 그것을 처리한뒤 이어서 revert할떄

git revert --no-commit (일련번호 앞 일부) 	// 코밋없이 Revert (untracked)

// ######## 브랜치 확인, 생성, 수정, 삭제, 이동 ##################################################################################################
git branch	// 브랜치들 확인 (* 있는 부분이 현재위치)	// 브랜치로 이동 수정 삭제 시 앞몇글자 입력후 Tab누르면 자동완성
git branch -a	// 원격까지 브랜치 확인

git branch (브랜치명) 	// (브랜치명)을 가진 특정 브랜치 생성
git branch -m (기존 브랜치명) (새 브랜치명) // 브랜치 이름 수정

git branch -d (삭제할 브랜치명)	// 브랜치 제거
git branch -D (강제삭제할 브랜치명) // 강제 삭제

git switch (브랜치명) 	// (브랜치명)을 가진 브랜치로 이동
git switch -c (브랜치명) // (브랜치명)의 생성과 이동을 동시에

git log --all --decorate --oneline --graph	// 브랜치 상태들을 보기 쉽게 확인 (그래도 소스트리가 더 나음)

// ######## 브랜치 합치기 #####################################################################################################################
// Merge : 두 브랜치 사이에 새로운 커밋을 만들어서 합침, 브랜치의 히스토리가 분산되어 따로 존재 (기록을 남길필요가 있을때, 협업시에 주로 사용)
// Rebase : 한 브랜치의 커밋을 다른 브랜치의 커밋 위로 이동, 브랜치의 히스토리가 분산되지 않아 깔끔하게 한줄유지

// ######## Merge
git merge (합칠 브랜치명) 	// 현재 브랜치와 합칠 브랜치를 하나로 커밋	// * 주로 Main에서 합칠 브랜치를 입력 !!	
git branch -d  (합친 브랜치명) // 합친 브랜치는 삭제해줘야함
	
// ######## Rebase
git rebase (이동할 브랜치명) 	// 현재 브랜치에서 이동할 브랜치로	// * 주로 합칠 브랜치에서 Main을 입력 !!
git switch (뒤쳐져 있는 메인 브랜치명) 		
git merge (맨상위 브랜치명)	// merge로 메인브랜치를 상위로 병합
git branch -d  (합친 브랜치명) // 합친 브랜치는 삭제해줘야함

// ###################################################################################################### 브랜치 병합 충돌해결 ##################
// 충돌확인 : Search에서 <<<<<< 확인
		
// accept current change : Head에 있는 내용을 고수
// accept incoming change  : Merge할 내용을 고수
// accept both changes : 둘다
// compare changes : 자세 비교

// ######## Merge 충돌
git merge --abort	// Merge 중단 (충돌이 많은경우 사용)
git add . -> git commit -> :wq	// 충돌 해결후 코밋해줘야함

// ######## Rebase 충돌
git rebase --abort	// Rebase 중단
git add. -> git rebase --continue -> :wq  // 해결가능

// ######## 깃허브 (원격저장소 활용) ################################################################################################################
// 내 깃에 깃허브 사용자를 내 아이디로 디폴트 : 먼저 깃허브에서 Personal access 토큰을 받아옴 -> 제어판 -> 자격 증명 관리자 -> Window 자격 증명 -> Github사이트 찾기 -> 편집 -> 사용자이름을 깃허브 사용자명으로 -> 암호를 토큰으로 저장
// 소스트리도 연결 : 도구 -> 옵션 -> 인증 -> Github사이트 찾 -> 사용자이름을 깃허브 사용자명으로 -> 암호를 토큰으로 저장

// ######## 원격 저장소와 첫 연결 및 업로드
git remote add origin (원격 저장소 주소) 	// remote : 원격으로 보냄 // origin은 그냥 이름이고 바뀔 수 있지만 주로 origin으로 쓰임
git branch -M main	// 기본 브랜치를 main 으로 변경
git push -u origin main // push는 업로드 // -u는 현재 브랜치와 명시된 원격 브랜치 기본 연결 (origin의 main에 연결) // 이후엔 그냥 git push만 입력

git remote  // 현재 연결된 원격목록 확인
git remote -v  // 원격목록 링크 확인
git remote remove (origin 등 원격 이름)	// 원격 저장소와 연결 해제

// ######## 원격 저장소로부터 첫 다운로드	// zip으로 받는 것은 비추천 (git 폴더가 없음)
// 다운 받을 폴더로 이동 -> 오른쪽 버튼 -> Git bash -> git clone (원격 저장소 주소)		// git 관리 목록까지 다운

// 리액트 사용하는 경우 다운로드 후 -> npm install -save react-scripts
		
// ######## git폴더있고 원격 저장소와 연결된 이후 (Push, Pull)
git push	// 업로드
git pull	// 다운로드

// #################################################################################################### 로컬에서 push시에 원격에 변동이 있었던 경우 ###########
// push시 원격에 변동이 있었던 경우 pull을 해줘야 하는데 두 가지 방법이 있음
git pull --no-rebase // merge 방식 (디폴트)
git pull --rebase // rebase 방식  // pull상의 rebase는 협업시 사용해도 됨

git push --force  // 원격 변동내용 무시하고 push (협업시 사용 X)

// ######## no-rebase 충돌 (Merge 충돌)
충돌 후 둘 중 하나 선택 -> Save ->  git add . -> git commit -m "(코밋내용)" -> git push  // 해결가능
git merge --abort	// Merge 중단
// ######## Rebase 충돌
충돌 후 둘 중 하나 선택 -> Save ->  git add . -> git commit -m "(코밋내용)" -> git rebase --continue -> git push  // 해결가능
git rebase --abort	// Rebase 중단

// ######################################################################################################################### 원격의 브랜치 ################

git push -u origin (브랜치이름)	// 로컬엔 있고 원격에 없는 브랜치를 원격에 업로드하고 연결시키기
git switch -t origin/(브랜치이름) // 로컬엔 없고 원격에 있는 브랜치를 로컬에 다운 받아 연결시킨뒤 그 브랜치로 이동

git branch -a  // 원격을 포함한 모든 브랜치 확인
git fetch	// 원격에서 생성된 브랜치 git branch -a로 볼수있게 업데이트 하기 (원격에서 직접 브랜치를 생성한 경우)

git push (원격 이름) --delete (원격의 브랜치명)	// 원격에 브랜치 삭제	 // 로컬 브랜치는 git branch -d (삭제할 브랜치명) 


// ######## 소스트리 ############################################################################################################################
// 검색부분 밑에 폴더를 끌어다 두면 확인가능
// 스테이지에 올라간파일 (add된 파일)
// 스테이지에 올라가지 않은파일 (untracked 파일)

// Reset : 마우스 오른쪽 -> 이 커밋까지 현재 브랜치를 초기화 -> 사용중인 모드를 Hard로 선택 -> 확인 -> 예
// Revert : 마우스 오른쪽 -> 커밋 되돌리기 -> 예	[협업용]
// Merge : Merge할 브랜치 마우스 오른쪽 -> 병합 -> 확인 -> 합쳐진 브랜치는 삭제	[협업용]
// Rebase : Rebase할 브랜치로 이동 -> Rebase 시켜질 브랜치 마우스 오른쪽 (주로Main) -> 재배치 -> 확인 -> 뒤쳐져있는 브랜치로이동 -> 앞서있는 브랜치와 병합 -> 합쳐진 브랜치는 삭제
		
