import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { Camera, CameraType, CameraApi } from 'react-native-camera-kit';

const CameraScreen = () => {
  const cameraRef = useRef<CameraApi | null>(null);

  const captureImage = async () => {
    if (cameraRef.current) {
      const image = await cameraRef.current?.capture();
      console.log(image.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        cameraType={CameraType.Back}
        scanBarcode={false}
        focusMode="off"
        torchMode="off"
        zoomMode="off"
        flashMode="off"
      />
      <Button title="Capture Image" onPress={captureImage} />
    </View>
  );
};

export default CameraScreen;