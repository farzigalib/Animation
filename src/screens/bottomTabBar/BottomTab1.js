import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {recognizeImage} from '../../mlkit';

const BottomTab1 = () => {
  const [imageFile, setImageFile] = useState('');
  const chooseImage = type => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const getData = response => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response?.assets[0]?.uri};
        // do something with the selected image
        (async () => {
          if (source) {
            try {
              const res = await recognizeImage(source.uri);
              console.log(JSON.stringify(res));
            } catch (error) {
              console.log(error);
            }
          }
        })();
      }
    };

    if (type === 'file') {
      ImagePicker.launchImageLibrary(options, response => {
        setImageFile(response);
        getData(response);
      });
    } else {
      ImagePicker.launchCamera(options, response => {
        setImageFile(response);
        getData(response);
      });
    }
  };

  return (
    <View>
      <Text>BottomTab1</Text>
      <Button title="Choose Image" onPress={() => chooseImage('file')} />
      <Button
        title="Choose Image From Camera"
        onPress={() => chooseImage('camera')}
      />
      {imageFile?.assets && (
        <>
          <Image
            source={{uri: imageFile?.assets[0]?.uri}}
            style={{width: 400, height: 300, resizeMode: 'contain'}}
          />
        </>
      )}
    </View>
  );
};

export default BottomTab1;

const styles = StyleSheet.create({});
