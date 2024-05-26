import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {QueryStore} from './services/network';
import {ThemeProvider, theme} from './theme';
import {HomeScreen} from './src/screens/HomeScreen';

function App(): React.JSX.Element {
  return (
    <QueryStore>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={{backgroundColor: 'black'}}>
          <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
        </SafeAreaView>
        <HomeScreen />
      </ThemeProvider>
    </QueryStore>
  );
}

export default App;
