import { Camera, CameraType } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Entypo } from '@expo/vector-icons';

const CameraScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const cameraRef = useRef(null);

  // 카메라 허용 여부
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync(); // 카메라 여부 창 띄우기
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted'); // 카메라 허용
    })();
  }, []);

  // 카메라 허용하지 않은경우
  if (hasCameraPermission === false) return <Text>No access to camera</Text>;

  // 사진 찍을 때
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync(); // 사진 데이터
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // 사진 저장
  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert('picture save!');
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // 버튼 생성  // 파라미터 : (아이콘, 클릭한경우 실행함수, 글씨, 색깔(디폴트: 하얀색))
  const Button = (icon, onPress, text, color = 'white') => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Entypo name={icon} size={28} color={color} />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {!image ? ( // 아직 찍은 사진이 없는 경우, 카메라 작동
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View style={styles.cameraOption}>
            {/* 전면, 후면 카메라 여부 */}
            {Button('retweet', () => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            })}
            {/* 플래시 여부 */}
            {Button(
              'flash',
              () => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              },
              null,
              flash === Camera.Constants.FlashMode.on ? 'white' : 'yellow'
            )}
          </View>
        </Camera>
      ) : (
        // 찍은 이미지
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? ( // 사진찍은 후 다시찍을지, 저장할지 여부 버튼
          <View style={styles.afterSnap}>
            {Button('retweet', () => setImage(null), 'Re-take')}
            {Button('save', saveImage, 'Save')}
          </View>
        ) : (
          // 사진찍기 버튼
          Button('camera', takePicture, 'Take a picture')
        )}
      </View>
    </View>
  );
};
export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  afterSnap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  button: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#F1F1F1',
    marginLeft: 10,
  },
  cameraOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
});
