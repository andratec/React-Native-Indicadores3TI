import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#444444'
     },
    heading1: {
      fontSize: 16,
      color: '#9D9D9D',
      fontWeight: "bold"
    },
    heading2: {
      fontSize: 24,
      color: '#4682b4',
      fontWeight: "bold"
    },
    subheading: {
      color: 'grey',
    },
    wrapperStyle: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'row'
    },
    flatlist: {
        paddingVertical: 20,
        paddingHorizontal: 50,
        backgroundColor: '#444444',
        borderRadius: 10,
        margin: 10,
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
         //marginBottom: 40 
     },
     secondRow: {
         //marginTop: 40,
         backgroundColor: '#444444'
     }      
});