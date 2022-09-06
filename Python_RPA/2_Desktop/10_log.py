import logging
from datetime import datetime

# logging.basicConfig(level=logging.DEBUG, format="%(asctime)s [%(levelname)s] %(message)s")

# # debug < info < warning < error < crtical
# logging.debug("아 이거 누가 짰냐")
# logging.info("자동화 수행 준비")
# logging.warning("이 스크립트는 조금 오래 됨, 실행상에 문제가 있을 수 있음")
# logging.error("에러 발생. 에러 코드는..")
# logging.critical("복구가 불가능한 심각한 문제 발생")

# 터미널과 파일에 함꼐 로그 남기기
# 시간 [로그레벨] 메시지 형태로 로그 작성
logformatter = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger()
# 로그 레벨 설정
logger.setLevel(logging.DEBUG)

# 스트림
streamHandler = logging.StreamHandler()
streamHandler.setFormatter(logformatter)
logger.addHandler(streamHandler)

# 파일
filename = datetime.now().strftime("mylogfile_%Y%m%d%H%M%S.log") # mylogfile_20220726092234.log (현재 연도,월,일,시간,분,초)
fileHandler = logging.FileHandler(filename, encoding="utf-8")
fileHandler.setFormatter(logformatter)
logger.addHandler(fileHandler)

logger.debug("로그를 남겨보는 테스트 진행")