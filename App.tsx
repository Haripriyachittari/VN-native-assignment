import React, {useContext, useEffect} from 'react';
// import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useColorScheme} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import EditProfile from './src/screens/EditProfile';
import CreateProfile from './src/screens/CreateProfile';
// import {Toast, BaseToast} from 'react-native-toast-message/lib/src/Toast';
import Toast, {BaseToast} from 'react-native-toast-message';

// import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import ThemeContextProvider, {ThemeContext} from './src/context/ThemeContext';

const Stack = createNativeStackNavigator();
const apiUrl = 'https://api.poc.graphql.dev.vnplatform.com/graphql';
console.log(apiUrl, 'api');

const httpLink = createHttpLink({
  uri: apiUrl,
});

const authLink = setContext(_ => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6Imhhcmlwcml5YTAwN0BhaWRldGljLmluIiwiaXNfY2FuZGlkYXRlIjp0cnVlLCJpYXQiOjE2OTE0MDY3MzMsImV4cCI6MTY5MTkyNTEzM30.PgQ25oCM30aK9dbh25wOmKYCHORSPUlrYMbgu89PGy4';

  return {
    headers: {
      authorization: token ? token : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{backgroundColor: '#3DACFF'}}
      text1Style={{
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
      }}
    />
  ),
};
function App(): JSX.Element {
  // const {preferedTheme} = useContext(ThemeContext);
  return (
    <ThemeContextProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Home',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Edit"
              component={EditProfile}
              options={{title: 'Edit Profile', headerShown: false}}
            />
            <Stack.Screen
              name="Create"
              component={CreateProfile}
              options={{
                title: 'Create Profile',
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          {/* <Text>HOME </Text> */}
          <Toast position="bottom" config={toastConfig} />
        </NavigationContainer>
      </ApolloProvider>
    </ThemeContextProvider>
  );
}

export default App;
