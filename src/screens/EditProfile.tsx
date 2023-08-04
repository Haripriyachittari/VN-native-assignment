import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Switch,
  Button,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {GET_PROFILE_BY_ID, UPDATE_PROFILE} from '../api/queries';
import {useMutation, useQuery} from '@apollo/client';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ThemeContext} from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditProfile = ({navigation, route}) => {
  const {preferedTheme, setPreferedTheme} = useContext(ThemeContext);
  const {data, loading} = useQuery(GET_PROFILE_BY_ID, {
    variables: {getProfileByIdId: route.params.id},
  });
  const [imageUrl, setImageUrl] = useState<string>(
    data?.getProfileById?.first_name,
  );
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  // const [getProfileById, {loading: profileLoading, data: profileData}] =
  //   useLazyQuery(GET_PROFILE_BY_ID);
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Profile Updated!!!',
    });
  };
  useEffect(() => {
    setFirstName(data?.getProfileById?.first_name);
    setLastName(data?.getProfileById?.last_name);
    setEmail(data?.getProfileById?.email);
    setDescription(data?.getProfileById?.description);
    setImageUrl(data?.getProfileById?.image_url);
    setIsVerified(data?.getProfileById?.is_verified);
  }, [data]);

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: {
      updateProfileId: route.params.id,
      firstName,
      lastName,
      email,
      isVerified,
      imageUrl,
      description,
      is_candidate: false,
    },
    onCompleted: () => {
      navigation.navigate('Home');
      showToast();
    },
    onError: error => {
      console.log(error);
    },
  });

  console.log(route.params.id, 'editdata');
  console.log(data?.getProfileById, 'editdata');
  return (
    <ScrollView
      style={preferedTheme === 'light' ? styles.main : styles.darkMain}>
      <View
        style={preferedTheme === 'light' ? styles.header : styles.darkHeader}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={30}
            color={preferedTheme === 'light' ? '#555' : '#fff'}
          />
        </Pressable>
        <Text
          style={
            preferedTheme === 'light'
              ? styles.headerText
              : styles.darkHeaderText
          }>
          Edit Profile
        </Text>
      </View>
      <View>
        <Text
          style={{
            height: 1,
            borderWidth: 1,
            borderColor: '#D2D2D2',
            marginVertical: 4,
          }}
        />
      </View>
      <Text style={preferedTheme === 'light' ? styles.text : styles.darkText}>
        Image Link
      </Text>
      <TextInput
        style={
          preferedTheme === 'light'
            ? styles.inputContainer
            : styles.inputDarkContainer
        }
        value={loading ? 'loading...' : imageUrl}
        onChangeText={text => setImageUrl(text)}
      />

      <View style={styles.inputNameContainer}>
        <View style={styles.inputName}>
          <Text
            style={preferedTheme === 'light' ? styles.text : styles.darkText}>
            First Name
          </Text>
          <TextInput
            style={
              preferedTheme === 'light'
                ? styles.inputContainer
                : styles.inputDarkContainer
            }
            value={loading ? 'loading...' : firstName}
            onChangeText={text => setFirstName(text)}
          />
        </View>
        <View style={styles.inputName}>
          <Text
            style={preferedTheme === 'light' ? styles.text : styles.darkText}>
            Last Name
          </Text>
          <TextInput
            style={
              preferedTheme === 'light'
                ? styles.inputContainer
                : styles.inputDarkContainer
            }
            value={loading ? 'loading...' : lastName}
            onChangeText={text => setLastName(text)}
          />
        </View>
      </View>
      <Text style={preferedTheme === 'light' ? styles.text : styles.darkText}>
        Email
      </Text>
      <TextInput
        style={
          preferedTheme === 'light'
            ? styles.inputContainer
            : styles.inputDarkContainer
        }
        value={loading ? 'loading...' : email}
        onChangeText={text => setEmail(text)}
      />
      <Text style={preferedTheme === 'light' ? styles.text : styles.darkText}>
        Description
      </Text>
      <TextInput
        placeholderTextColor={preferedTheme === 'light' ? '#999' : '#9BA4B5'}
        multiline={true}
        numberOfLines={8}
        style={
          preferedTheme === 'light'
            ? styles.description
            : styles.darkDescription
        }
        value={loading ? 'loading...' : description}
        onChangeText={text => setDescription(text)}
        placeholder="Write a description for the talent"
      />
      <Text style={preferedTheme === 'light' ? styles.text : styles.darkText}>
        Verification
      </Text>
      <View style={styles.talent}>
        <View>
          <Text
            style={preferedTheme === 'light' ? styles.text : styles.darkText}>
            Talent Verified
          </Text>
        </View>
        <Switch
          style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
          trackColor={{true: '#6DA9E4', false: '#999'}}
          thumbColor={isVerified ? '#3DACFF' : 'gray'}
          value={isVerified}
          onValueChange={() => setIsVerified(!isVerified)}
        />
      </View>
      {/* <Pressable>Create</Pressable> */}
      {/* <View> */}
      <Pressable
        android_ripple={{color: '#5BC0F8'}}
        style={styles.button}
        onPress={() => updateProfile()}>
        <Text style={styles.btnText}>EDIT</Text>
      </Pressable>
      {/* </View> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  main: {
    padding: 15,

    backgroundColor: 'white',
  },
  darkMain: {
    padding: 15,

    backgroundColor: '#272829',
  },
  header: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#555',
  },
  description: {
    textAlignVertical: 'top',
    borderWidth: 1,
    padding: 8,
    borderColor: 'gray',
    color: '#555',
  },
  darkDescription: {
    textAlignVertical: 'top',
    borderWidth: 1,
    padding: 8,
    borderColor: 'gray',
    color: '#fff',
  },
  darkHeader: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    backgroundColor: '#272829',
  },
  darkHeaderText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#fff',
  },
  text: {
    marginVertical: 10,
    color: '#555',
  },
  darkText: {
    marginVertical: 10,
    color: '#fff',
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    color: '#555',
  },
  inputDarkContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    color: '#fff',
  },
  inputNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  inputName: {
    flex: 1,
    marginVertical: 10,
    borderColor: 'gray',
  },
  talent: {
    borderWidth: 1,
    borderColor: 'gray',

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#3DACFF',
    alignSelf: 'flex-end',
    marginVertical: 40,
  },
  btnText: {
    fontWeight: '800',
    color: '#fff',
  },
});

export default EditProfile;
