import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import { API_URL } from '../env';

export const receiptScanInference = async (image) => {
  if (!image) throw new Error('No image selected');


  try {
    const base64Image = await FileSystem.readAsStringAsync(image, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const payload = { base64_string: base64Image };
    // console.log('Posting image for inference to', API_URL)

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to send image');
    }

    const inferenceResult = await response.json();
    return inferenceResult;
  } catch (error) {
    console.error('Error sending image:', error);
    Alert.alert('Error', error.message);
    throw error;
  }
};