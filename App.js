import React ,{ useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


import Navigation from './navigation/Navigation';

import { LogBox } from 'react-native'; /// unfreeze for running on phones
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs(['Require cycle']); /// unfreeze for running on phones

/*const FetchFonts =()=>{
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}*/


export default function App() {
  const [FontLoaded,setFontLoaded] = useState(false);

  // if(!FontLoaded){
  //   return (
  //   <AppLoading
  //     startAsync={FetchFonts}
  //     onFinish={() => setFontLoaded(true)}
  //     />
  //     );
  //   } 
  AsyncStorage.clear();
  return <Navigation/>;
}

const styles = StyleSheet.create({
  screen:{ 
    flex: 1
  }
});
