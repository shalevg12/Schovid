import React from 'react';
import {View, Text, StyleSheet , Button } from 'react-native';
import Input from '../../components/Input';
import colors from '../../constants/Colors';
import Firebase ,{db} from '../../firebase/fire';
import Grade from '../../data/dummy-data'
 
const ViewPresence = props => {
    
    return (
        
        
            
            
       
            <View style={styles.InputContainer}>
                <View style={styles.buttoncontainer}>
                        <li>Grade.Name</li>
                            
                        
                </View>
                
                    
                
                
                
                
                
            </View>
        //</TouchableWithoutFeedback>
    );
    
}; 






const styles = StyleSheet.create({
    screen: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        //height: windowHeight /15,
        borderColor: '#acc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    InputContainer: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1
    }
})



export default ViewPresence;
