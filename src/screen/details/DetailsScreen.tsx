import { View, Text, Platform, Dimensions, SafeAreaView, TouchableOpacity, TextInput, Alert, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStyleSheet } from 'react-native-unistyles';
import { MapPin } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dropdown } from 'react-native-element-dropdown';
import CustomInputWithMic from '@components/CustomInputWithMic';
import { useNavigation } from '@react-navigation/native';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';

const { width, height } = Dimensions.get('screen');

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export default function DetailsScreen() {

  const { navigate, goBack }: any = useNavigation();

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [text, setText] = useState(String);

  const [location, setLocation] = useState<GeoCoordinates | null>(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'We need access to your location to show you relevant data.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        getLocation();
      } else {
        console.log('Location permission denied');
        Alert.alert('Location permission is required to access the location');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        console.log(error.code, error.message);
        Alert.alert('Unable to fetch location. Please try again later.');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getLocation();
    }
  }, []);

  return (
    <SafeAreaView style={styles.mianContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 10 }}>
        <MapPin size={RFValue(30)} />
        {location ? (
          <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
        ) : (
          <Text>Location not available</Text>
        )}
      </View>

      <View style={styles.imagePreview}></View>

      <TouchableOpacity style={styles.button} onPress={() => navigate('CameraStack')}>
        <Text style={{ fontSize: RFValue(15) }}>Retake Picture</Text>
      </TouchableOpacity>

      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />

      <View style={styles.aboutContainer}>
        <TextInput placeholder="Qty." style={styles.input} />
        <TextInput placeholder="W" style={styles.input} />
        <TextInput placeholder="H" style={styles.input} />
        <TextInput placeholder="D" style={styles.input} />
      </View>

      <CustomInputWithMic value={setText} />

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity style={[styles.button, { width: width / 2.5 }]}>
          <Text style={{ fontSize: RFValue(15) }}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { width: width / 2.5 }]} onPress={() => goBack()}>
          <Text style={{ fontSize: RFValue(15) }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = createStyleSheet({
  mianContainer: {
    flex: 1,
    alignItems: 'center',
    gap: Platform.OS === 'ios' ? 15 : 10,
  },

  imagePreview: {
    width: width / 1.2,
    height: '40%',
    borderWidth: 2,
    borderRadius: 20,
  },

  button: {
    borderRadius: 10,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    paddingHorizontal: 20,
    backgroundColor: '#6CA6CD',
    width: width / 1.3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdown: {
    height: 50,
    width: width / 1.3,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  placeholderStyle: {
    fontSize: 16,
  },

  selectedTextStyle: {
    fontSize: 16,
  },

  aboutContainer: {
    width: width / 1.2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  input: {
    width: width / 5,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
});