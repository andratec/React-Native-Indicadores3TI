// In index.js of a new project
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import IndicatorList from './src/screens/IndicatorList';
import IndicatorHistory from './src/screens/IndicatorHistory';
import IndicatorDetails from './src/screens/IndicatorDetails';

IndicatorList.options = {
    topBar: {
      title: {
        text: 'Indicadores',
        color: 'white',
      },
      //background: {
      //  color: '#4682b4'
      //},
    }
}

IndicatorHistory.options = {
  topBar: {
    title: {
      text: 'Historial',
      color: 'white',
    },
    //background: {
    //  color: '#4682b4'
    //}
  }
}

IndicatorDetails.options = {
  topBar: {
    title: {
      text: 'Detalles',
      color: 'white',
    },
    //background: {
    //  color: '#4682b4'
    //}
  }
}

Navigation.registerComponent('IndicatorList', () => IndicatorList);
Navigation.registerComponent('IndicatorHistory', () => IndicatorHistory);
Navigation.registerComponent('IndicatorDetails', () => IndicatorDetails);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#171717'
  },
  topBar: {
    title: {
      color: 'white'
    },
    backButton: {
      color: 'white'
    },
    background: {
      color: '#171717'
    }
  }
});

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'IndicatorList'
            }
          }
        ]
      }
    }
  });
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});