import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, Item, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { ListItem, Avatar , Button} from '@rneui/themed'
const apiUrl = "https://mindicador.cl";
import styles from '../utils/styles';

const IndicatorHistory = (props) =>{
  const [json, setJson] = useState([]);
  const [indicator, setIndicator] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${apiUrl}/api/${props.id}`;
    const fetchIndicators = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status === 200) {
          setJson(response.data);
          setIndicator(response.data.serie);
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

  /*
    try {
      axios
        .get(`${apiUrl}/api/uf`)
        .then(response => {
          const indicatorsHistory = response.data.serie;
          setIndicator(indicatorsHistory);
          //console.log('Axios response:', indicator)
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
          <ScrollView>
            {
              indicator.map((l, i) => (
                <ListItem key={i} bottomDivider 
                  containerStyle = {{ 
                    backgroundColor: '#171717' 
                  }}>
                  <Avatar source={{uri: l.avatar_url}} />
                  <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 24, color: '#4682b4', fontWeight: "bold" }}>
                        {json.unidad_medida === 'Pesos' ? '$' : 
                        json.unidad_medida === 'Dólar' ? '$' : 
                        json.unidad_medida === 'Porcentaje' ? '%' : 
                        ''} {l.valor}
                      </ListItem.Title>
                    <ListItem.Subtitle style={{ fontSize: 16, color: '#9d9d9d' }}>Fecha: {moment(l.fecha).format('D-MM-Y')}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))
            }
          </ScrollView>
        </View>
        <View style={styles.wrapperStyle}>
                {isLoading && <ActivityIndicator size='large' color='black' />}
                {!isLoading && hasError && <Text>Error en la solicitud</Text>}
        </View>
      </SafeAreaView>
    )

}

export default IndicatorHistory;


  
    
