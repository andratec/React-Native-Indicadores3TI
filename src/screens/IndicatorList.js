import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, FlatList, Fragment, Button, Item, View, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Navigation } from 'react-native-navigation';
import { ListItem, Avatar, Text, Icon } from '@rneui/themed';
import styles from '../utils/styles';
import Geolocation from '@react-native-community/geolocation';
import { connection } from '../../constants/config'

const IndicatorList = (props) => {
  const [json, setJson] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);

  Geolocation.getCurrentPosition(info => console.log(info));

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${connection.apiUrl}/api`;
    const fetchIndicators = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status === 200) {
          setJson(response.data);
          setIsLoading(false);
          console.log("Data ok");
          return;
        } else {
          throw new Error("Failed to fetch indicators");
        }
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Data fetching cancelled');
        }else{
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };
    fetchIndicators();
      return () => source.cancel("Data fetching cancelled");
    },[]
  );

  const a = json;
  
  for (let i = 0; i < a.length; i++) {
    let indexToDelete = -1
    for (let j = 0; j < autor.length; j++) {
      if (autor[j] === 'mindicador.cl') {
        indexToDelete = j
      }
    }
    if (indexToDelete !== -1) {
      autor.splice(indexToDelete, 1)
    }
  }

  console.log("new", a);  

    /*
    try {
      axios
        .get(`${apiUrl}/api`)
        .then(response => {
          const indicatorJson = response.data;
          setJson(indicatorJson);      
          //console.log('Axios response:', indicatorBitcoin)
        })
        .catch(function(error) {
          console.log('Catch error:', error);
        });
      } catch (error) {
          console.log('Catch error:', error);
    }
    */

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapperStyle}>
        {!isLoading && !hasError}
          <FlatList
            //data={Object.keys(json)}
            data={Object.keys(json).filter(codigo => codigo === 'bitcoin' 
                                                  || codigo === 'dolar'  
                                                  || codigo === 'dolar_intercambio'  
                                                  || codigo === 'euro'  
                                                  || codigo === 'imacec'  
                                                  || codigo === 'ipc' 
                                                  || codigo === 'ivp'   
                                                  || codigo === 'libra_cobre'  
                                                  || codigo === 'tasa_desempleo' 
                                                  || codigo === 'tmp' 
                                                  || codigo === 'uf'  
                                                  || codigo === 'utm' 
            )}
            //keyExtractor={item => item.codigo}
            ///>
            renderItem={({ item }) => {
              return(  
                <TouchableOpacity
                  onPress={() => Navigation.push(props.componentId,{
                    component: {
                      name: 'IndicatorHistory',
                      passProps:{
                        id: json[item].codigo,
                      },
                      options: {
                        topBar: {
                          title: {
                            text: json[item].nombre
                          }
                        }
                      }
                    }
                  })}
                  >
                  <ListItem bottomDivider 
                    containerStyle = {{ 
                      backgroundColor: '#171717' 
                    }}>
                    <Avatar source={{}} />
                    <ListItem.Content>
                      <ListItem.Subtitle style={{ fontSize: 16, color: '#9d9d9d' }}>{json[item].nombre}</ListItem.Subtitle>
                      <ListItem.Title style={{ fontSize: 24, color: '#4682b4', fontWeight: "bold" }}>
                        {json[item].unidad_medida === 'Pesos' ? '$' : 
                        json[item].unidad_medida === 'Dólar' ? '$' : 
                        json[item].unidad_medida === 'Porcentaje' ? '%' : 
                        ''} {json[item].valor}
                        </ListItem.Title>
                      <ListItem.Subtitle style={{ fontSize: 16, color: '#9d9d9d' }}>{json[item].unidad_medida}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Icon 
                      name='arrow-right'
                      type='evilicon'
                      size={48} 
                      color="#00aced" 
                      onPress={() => Navigation.push(props.componentId,{
                        component: {
                          name: 'IndicatorDetails',
                          passProps:{
                            id: json[item].codigo,
                          },
                          options: {
                            topBar: {
                              title: {
                                text: json[item].nombre
                              }
                            }
                          }
                        }
                      })}
                    />
                  </ListItem>
                </TouchableOpacity>
            )}}
          />
        </View>
        <View style={styles.wrapperStyle}>
                {isLoading && <ActivityIndicator size='large' color='black' />}
                {!isLoading && hasError && <Text>Error en la solicitud</Text>}
        </View>
      </SafeAreaView>
    )
}

export default IndicatorList;