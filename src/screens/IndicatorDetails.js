import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { Card } from '@rneui/themed'
import { LineChart } from 'react-native-chart-kit';
//import styles from '../utils/styles'
import { connection } from '../../constants/config'

const width = Dimensions.get('window').width
const height = 220

const chartConfig = 
{
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 10
    }
}

const graphStyle = {
    margin: 15,
    borderRadius: 10
}

export default function IndicatorDetails(props)  {
    const [valueInd, setValueInd ] = useState([]);
    const [valueNom, setValueNom ] = useState([]);
    const [dataChart, setDataChart] = useState([{"fecha": "2022-04-17T04:00:00.000Z", "valor": 1}]);
    //const [datasets, setDatasets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setErrorFlag] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const url = `${connection.apiUrl}/api/${props.id}`;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response =  await axios.get(url, { cancelToken: source.token });
                if (response.status === 200) {
                    setDataChart(response.data.serie);
                    setValueInd(response.data.serie[0]);
                    setValueNom(response.data);
                    setIsLoading(false);
                    console.log("Axios response 200");
                    console.log("DataChart:", dataChart);

                    datasets.push({
                        data: dataChart.slice(0,10).map(item => item.valor),
                        strokeWidth: 2,
                    });

                return;
                } else {
                    throw new Error("Failed to fetch indicators");
                }
                } catch (error) {
                    if(axios.isCancel(error)){
                        console.log('Data fetching cancelled');
                } else {
                    setErrorFlag(true);
                    setIsLoading(false);
                }
            }
        };
        fetchData();
        return () => source.cancel("Data fetching cancelled");
    },[]
);

const datasets = [];
if (dataChart.length > 0){
    datasets.push({
        data: dataChart.slice(0,10).map(item => item.valor),
        strokeWidth: 2,
    });
} 

const chartOK = {
    labels: dataChart.slice(0,10).map(item => moment(item.fecha).format('D/MM')),
    datasets,
};

/*
const data = {
    labels: ['Default'],
    datasets: [
        {
            data: [0],
        }
    ]
}
*/

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapperStyle}>
                {!isLoading && !hasError}
                <View style={styles.firstRow}> 
                    <Card containerStyle={{backgroundColor:'#171717', borderRadius:10}}>
                        <Text style={{fontSize: 16, color:'#9D9D9D'}}>{valueNom.nombre }</Text>
                        <Text style={{marginBottom: 10, fontSize: 48, color:'#ffffff', fontWeight: 'normal'}}>
                            {
                                valueNom.codigo === 'uf' ? '$' : 
                                valueNom.codigo === 'ivp' ? '$' : 
                                valueNom.codigo === 'dolar' ? '$' : 
                                valueNom.codigo === 'dolar_intercambio' ? '$' : 
                                valueNom.codigo === 'euro' ? '$' : 
                                valueNom.codigo === 'ipc' ? '%' : 
                                valueNom.codigo === 'utm' ? '$' : 
                                valueNom.codigo === 'imacec' ? '%' : 
                                valueNom.codigo === 'tpm' ? '%' : 
                                valueNom.codigo === 'libra_cobre' ? '$' :
                                valueNom.codigo === 'tasa_desempleo' ? '%' : 
                                valueNom.codigo === 'bitcoin' ? '$' : 
                                ''
                            } {valueInd.valor}
                        </Text>
                        <Text style={{fontSize: 16, color:'#9D9D9D',}}>Fecha</Text>
                        <Text style={{fontSize: 24, color:'#ffffff',}}>{moment(valueInd.fecha).format('D-MM-Y')}</Text>
                    </Card>

                </View>
                
                <View style={styles.secondRow}> 
                    <Text style={styles.description}>Últimos 10 días</Text>
                    <LineChart
                        data={chartOK}
                        width={width}
                        height={height}
                        chartConfig={chartConfig}
                        bezier
                        style={graphStyle}
                    />
                </View>
            </View>
            <View style={styles.wrapperStyle}>
                    {isLoading && <ActivityIndicator size='large' color='#ffffff' />}
                    {!isLoading && hasError && <Text>Error en la solicitud</Text>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444444'
    },
    description: {
       marginTop:15,
       marginLeft: 15,
       marginRight: 15,
       padding: 15,
       fontSize: 18,
       fontWeight: "normal", 
       color: '#ffffff',
       backgroundColor: '#171717',
       borderRadius:10

    },
    firstRow:{
        backgroundColor: '#444444',
    },
    secondRow: {
        backgroundColor: '#444444'
    },
    wrapperStyle: {
        //minHeight: 128,
    },

});

//export default IndicatorDetails;