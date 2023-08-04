import {useColorScheme} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
export const ThemeContext = createContext(null);

const ThemeContextProvider = ({children}: any) => {
  const prevTheme = useColorScheme();
  // const [theme, setTheme] = useState<any>();
  const [preferedTheme, setPreferedTheme] = useState(prevTheme);
  useEffect(() => {
    console.log('pr', typeof preferedTheme);
  }, [preferedTheme]);
  const value: any = {
    preferedTheme,
    setPreferedTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
