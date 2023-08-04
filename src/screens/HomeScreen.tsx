import {
  View,
  Text,
  Switch,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
  Button,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {useQuery} from '@apollo/client/react';
import {GET_ALL_PROFILES} from '../api/queries';
import UserProfile from '../components/UserProfile';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import {ThemeContext} from '../context/ThemeContext';
import Toast from 'react-native-toast-message';

// const myIcon = <Icon name="rocket" size={30} color="#900" />;

type Props = {
  navigation: any;
};
type ProfileProps = {
  profile: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    is_verified: boolean;
    image_url: string;
    description: string;
  };
};
// const data1 = {
//   getAllProfiles: {
//     size: 3,
//     profiles: [
//       {
//         id: '1',

//         first_name: 'hp',
//         last_name: 'varma',
//         email: 'hpvarma09@gmail.com',
//         is_verified: true,
//         image_url: 'kjhadska',
//         description: 'kjhdkjdfhsfhdhfkjdfhksjfjkdfh',
//       },
//       {
//         id: '2',

//         first_name: 'hp',
//         last_name: 'varma',
//         email: 'hpvarma09@gmail.com',
//         is_verified: true,
//         image_url: 'kjhadska',
//         description: 'kjhdkjdfhsfhdhfkjdfhksjfjkdfh',
//       },
//       {
//         id: '3',

//         first_name: 'hp',
//         last_name: 'varma',
//         email: 'hpvarma09@gmail.com',
//         is_verified: true,
//         image_url: 'kjhadska',
//         description: 'kjhdkjdfhsfhdhfkjdfhksjfjkdfh',
//       },
//       {
//         id: '4',

//         first_name: 'hp',
//         last_name: 'varma',
//         email: 'hpvarma09@gmail.com',
//         is_verified: true,
//         image_url: 'kjhadska',
//         description: 'kjhdkjdfhsfhdhfkjdfhksjfjkdfh',
//       },
//       {
//         id: '5',

//         first_name: 'hp',
//         last_name: 'varma',
//         email: 'hpvarma09@gmail.com',
//         is_verified: true,
//         image_url: 'kjhadska',
//         description: 'kjhdkjdfhsfhdhfkjdfhksjfjkdfh',
//       },
//       {
//         id: '6',

//         first_name: 'hp',
//         last_name: 'varma',
//         email: 'hpvarma09@gmail.com',
//         is_verified: true,
//         image_url: 'kjhadska',
//         description: 'kjhdkjdfhsfhdhfkjdfhksjfjkdfh',
//       },
//       {
//         id: '7',

//         first_name: 'hp',
//         last_name: 'varma',
//         email: 'hpvarma09@gmail.com',
//         is_verified: true,
//         image_url: 'kjhadska',
//         description: 'kjhdkjdfhsfhdhfkjdfhksjfjkdfh',
//       },
//       {
//         id: '8',

//         first_name: 'hp',
//         last_name: 'varma',
//         email: 'hpvarma09@gmail.com',
//         is_verified: true,
//         image_url: 'kjhadska',
//         description: 'kjhdkjdfhsfhdhfkjdfhksjfjkdfh',
//       },
//       {
//         id: '9',

//         first_name: 'hp',
//         last_name: 'varma',
//         email: 'hpvarma09@gmail.com',
//         is_verified: true,
//         image_url: 'kjhadska',
//         description: 'kjhdkjdfhsfhdhfkjdfhksjfjkdfh',
//       },
//       {
//         id: '10',

//         first_name: 'hp',
//         last_name: 'varma',
//         email: 'hpvarma09@gmail.com',
//         is_verified: true,
//         image_url: 'kjhadska',
//         description:
//           'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
//       },
//     ],
//   },
// };

const HomeScreen = ({navigation}: Props) => {
  // const [view, setView] = useState<string>('card');
  const {preferedTheme, setPreferedTheme} = useContext(ThemeContext);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [searchString, setsearchString] = useState<string>('');
  const [page] = React.useState<number>(0);
  const [rows] = React.useState<number>(16);
  const [key] = useState<string>('email');
  const [sort] = useState<string>('asc');

  const {loading, data, refetch, error} = useQuery(GET_ALL_PROFILES, {
    variables: {
      orderBy: {
        key,
        sort,
      },
      rows,
      page,
      searchString,
    },
    fetchPolicy: 'network-only',
  });

  const debounce = (func, delay) => {
    let timer;
    clearTimeout(timer);
    return (...args) => {
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  const handleChangeText = text => {
    setsearchString(text);
  };
  // const showToast = () => {
  //   Toast.show({
  //     type: 'success',
  //     text1: 'Profile Deleted!!!',
  //     position: 'bottom',
  //   });
  // };
  return (
    <View
      style={
        preferedTheme === 'light' ? styles.container : styles.darkContainer
      }>
      {/* <Button title="Click" onPress={() => showToast()} /> */}
      {/* <Modal visible={openDeleteModal} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={
              preferedTheme === 'light'
                ? styles.modalView
                : styles.modalDarkView
            }>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={
                  preferedTheme === 'light'
                    ? styles.modalHeading
                    : styles.modalDarkHeading
                }>
                Remove Profile
              </Text>
              <Ionicons
                name="close"
                size={30}
                color={preferedTheme === 'light' ? '#555' : '#fff'}
                onPress={() => setOpenDeleteModal(false)}
              />
            </View>
            <View>
              <Text style={styles.line} />
            </View>
            <Text
              style={
                preferedTheme === 'light'
                  ? styles.modalContent
                  : styles.modalDarkContent
              }>
              Removed profile will be deleted permanently and won't be available
              anymore.
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 30,
                marginTop: 10,
              }}>
              <Pressable
                onPress={() => setOpenDeleteModal(false)}
                style={styles.modalButtonCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.modalButtonDelete}
                onPress={() => {
                  setOpenDeleteModal(false);
                  // deleteProfile();
                }}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal> */}
      <View
        style={preferedTheme === 'light' ? styles.navbar : styles.darkNavbar}>
        <Text style={preferedTheme === 'light' ? styles.logo : styles.darkLogo}>
          Viral Nation
        </Text>
        {/* {preferedTheme === 'light' ? (
          <Image source={require('../assets/vnlogo.png')} style={styles.logo} />
        ) : (
          <Image
            source={require('../assets/vnlogodark.png')}
            style={styles.darkLogo}
          />
        )} */}
        <View style={styles.icons}>
          <Ionicons
            name="sunny"
            size={30}
            color={preferedTheme === 'light' ? '#555' : '#fff'}
          />
          <Switch
            style={{transform: [{scaleX: 1.05}, {scaleY: 1.05}]}}
            trackColor={{true: '#6DA9E4', false: '#999'}}
            thumbColor={preferedTheme === 'light' ? 'gray' : '#3DACFF'}
            value={preferedTheme === 'light' ? false : true}
            onValueChange={() =>
              setPreferedTheme(preferedTheme === 'light' ? 'dark' : 'light')
            }
          />
          <Ionicons
            name="moon"
            size={24}
            color={preferedTheme === 'light' ? '#555' : '#fff'}
          />
        </View>
      </View>
      {/* <View>
        <Text style={styles.line}></Text>
      </View> */}
      <View style={{paddingHorizontal: 10}}>
        <View>
          <TextInput
            placeholderTextColor={
              preferedTheme === 'light' ? '#999' : '#9BA4B5'
            }
            style={
              preferedTheme === 'light'
                ? styles.inputContainer
                : styles.darkInputConatiner
            }
            placeholder="Search..."
            value={searchString}
            onChangeText={text => debounce(handleChangeText(text), 300)}
          />
        </View>
        <View>
          <Pressable
            android_ripple={{color: '#5BC0F8'}}
            style={styles.button}
            onPress={() => navigation.navigate('Create', {refetch: refetch})}>
            <Text>
              <AntIcon name="adduser" color="white" size={26} />
            </Text>
            <Text style={styles.btnText}>CREATE PROFILE</Text>
          </Pressable>
        </View>

        <View style={styles.userprofile}>
          {error && (
            <View>
              <Text
                style={
                  preferedTheme === 'light'
                    ? styles.boldText
                    : styles.darkBoldText
                }>
                Something went wrong!!!
              </Text>
            </View>
          )}
          {data?.getAllProfiles.size > 0 ? (
            <FlatList
              style={{height: '77%'}}
              data={data.getAllProfiles.profiles}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View key={item.id}>
                  <UserProfile
                    profile={item}
                    navigation={navigation}
                    refetch={refetch}
                  />
                </View>
              )}
              keyExtractor={item => item.id.toString()}
            />
          ) : loading ? (
            <View>
              <Text
                style={
                  preferedTheme === 'light'
                    ? styles.boldText
                    : styles.darkBoldText
                }>
                Loading..
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={
                  preferedTheme === 'light'
                    ? styles.boldText
                    : styles.darkBoldText
                }>
                No Profiles Available.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 18,
    backgroundColor: 'white',
    flex: 1,
  },
  darkContainer: {
    // padding: 18,
    backgroundColor: '#272829',
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 21,
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  icons: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },

  darkNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: '#3C4048',
    shadowColor: '#444',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
  },
  darkLogo: {fontSize: 26, fontWeight: '700', color: '#fff'},
  inputContainer: {
    marginTop: 25,
    marginBottom: 25,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    color: 'black',
  },
  darkInputConatiner: {
    marginTop: 30,
    marginBottom: 25,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    color: '#fff',
  },
  userprofile: {
    marginTop: 15,
    marginBottom: 100,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 18,
    marginTop: 10,
  },
  darkBoldText: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 18,
    color: 'white',
  },
  button: {
    padding: 7,

    backgroundColor: '#3DACFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
  line: {
    height: 1,
    borderWidth: 0.5,
    borderColor: '#D1D1D1',
    marginTop: 5,
  },
});
export default HomeScreen;
