import React, { Suspense } from 'react'
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Model } from './../../public/Apple_iphone_13_pro_max';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: transparent;
  transition: all 0.3s ease;
`;

export default function PhoneModel() {
  return (
    <Container id="phone-model">
      {/* Canvas // camera={{fov: 14}} 는 처음 Zoom크기 */}
        <Canvas camera={{fov: 14}}>
            {/* 3D 밝기 // 적용안하면 그냥 검하게 보임 */}
            <ambientLight intensity={1.25} /> 
            {/* 빛이 비추는 방향 position={[우,위,앞]} (디폴트: 위) */}
            <directionalLight intensity={0.4} position={[1,0,0]} />
            {/* 다운받은 3D 생성 */}
            <Suspense fallback={null}>
              <Model />
            </Suspense>
            {/* 주변환경 세팅  https://github.com/pmndrs/drei#environment  */}
              <Environment preset='night' />
        </Canvas>
    </Container>
  )
}
