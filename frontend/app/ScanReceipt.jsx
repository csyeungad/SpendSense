import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import Button from '@/components/Button';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import {receiptScanInference} from '@/services/receiptScanService';
//only for quick demo purpose
// import sampleImage1 from '../assets/images/re_2.jpeg';
// import sampleImage2 from '../assets/images/re_1.jpeg';
// import sampleImage3 from '../assets/images/re_3.jpeg';


export default function CCameraModule() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [cameraProps, setCameraProps] = useState({
    facing: 'back',
    flash: 'off',
    animateShutter: false,
    enableTorch: false,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const cameraRef = useRef(null);

  // const sampleImageData = Image.resolveAssetSource(sampleImage1);

  if (!cameraPermission) {
    return <View />;
  }
  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera permission is required to use this app.</Text>
        <TouchableOpacity style={styles.requestButton} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1,
    }));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setImage(picture.uri);
      } catch (err) {
        console.log('Error while taking the picture: ', err);
      }
    }
  };

  // const useSampleImage = async () => {
  //   try {
  //     // Download the sample image to a local file
  //     setLoading(true);
  //     setLoadingMessage('Preparing sample image...');
  //     const downloadedImage = await FileSystem.downloadAsync(
  //       sampleImageData.uri,
  //       FileSystem.cacheDirectory + 'sampleImage.jpeg' // Cache directory path
  //     );

  //     // Resize the image
  //     const manipulatorResult = await ImageManipulator.manipulateAsync(
  //       downloadedImage.uri,
  //       [{ resize: { width: 400, height: 600 } }], // Change these values as needed
  //       { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
  //     );

  //     setImage(manipulatorResult.uri);
  //   } catch (error) {
  //     console.error('Error downloading sample image:', error);
  //     Alert.alert('Error', 'Failed to prepare the sample image.');
  //   } finally {
  //     setLoading(false);
  //     setLoadingMessage('');
  //   }
  // };

  const sendPicture = async () => {
    setLoading(true);
    setLoadingMessage('Waiting for inference result...');
    try {

      const inferenceResult = await receiptScanInference(image);
      console.log('inference_result', inferenceResult)
      Alert.alert(
        'Scanning completed.',
        'Please verify or modify the data\nbefore adding the record.');
      //  inference_result  = {"Amount": "10.50", "Category": "Shopping", "Date": "2025-03-06", "Merchant": "PARKnSHOP (HK) Limited", "Note": "Bakery purchase"}
      router.push({
        pathname: "/AddExpense",
        params: {
          merchant: inferenceResult.Merchant || "",
          date: new Date(inferenceResult.Date) || "",
          amount: inferenceResult.Amount || "",
          category: inferenceResult.Category || "",
          note: inferenceResult.Note || ""
        }},)
    } catch (error) {
      console.error('Error sending image:', error);
      Alert.alert('Error', error.message);
    } finally {
      setImage(null)
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      selectionLimit: 1,
    });
    // console.log(result.assets[0].uri)
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <View style={styles.topControlsContainer}>
            <Button
              icon={cameraProps.flash === 'on' ? 'flash-on' : 'flash-off'}
              onPress={() => toggleProperty('flash', 'on', 'off')}
            />
            <Button
              icon={cameraProps.enableTorch ? 'flashlight-on' : 'flashlight-off'}
              onPress={() => toggleProperty('enableTorch', true, false)}
            />
            {/* <Button icon="image" size={36} onPress={useSampleImage} /> */}
          </View>
          <CameraView
            style={styles.imageview}
            zoom={1}
            facing={cameraProps.facing}
            flash={cameraProps.flash}
            animateShutter={cameraProps.animateShutter}
            enableTorch={cameraProps.enableTorch}
            ref={cameraRef}
          />
          <View style={styles.bottomControlsContainer}>
            <Button icon="arrow-back-ios-new" size={36} onPress={() => router.back()} />
            <Button icon="camera" size={36} onPress={takePicture} />
            <Button icon="flip-camera-android" size={36} onPress={() => toggleProperty('facing', 'back', 'front')} />
            <Button icon="image" size={36} onPress={pickImage} />
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.imageview} />
          <View style={styles.bottomControlsContainer}>
            <Button icon="delete" size={36} onPress={() => setImage(null)} />
            <Button icon="upload" size={36} onPress={sendPicture} />
          </View>
        </>
      )}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>{loadingMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  topControlsContainer: {
    height: 80,
    backgroundColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  requestButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageview: {
    flex: 1,
    width: '100%',
  },
  bottomControlsContainer: {
    height: 100,
    backgroundColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
});