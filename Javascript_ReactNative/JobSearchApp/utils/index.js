 // 이미지 파일인지 확인하는 정규표현식
export const checkImageURL = (url) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      '^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$',
      'i'
    );
    return pattern.test(url);
  }
};
