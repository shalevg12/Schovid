import React from 'react';
import {View, Text, StyleSheet , Button } from 'react-native';
import Input from '../../components/Input';
import colors from '../../constants/Colors'

const ViewGrades = props => {
    return (
       
            <View style={styles.InputContainer}>
                <Text> enter grades</Text>
                <Input
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Full Name'
                    keyboardType="ascii-capable"
                    //onChangeText={FullnameHandler}
                    //value={FullnameInput}
                />
                <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='class'
                    keyboardType="email-address"
                   // onChangeText={EmailHandler}
                    //value={EmailInput}
                />
                <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='The name of the lesson'
                    keyboardType="email-address"
                    //onChangeText={PhoneHandler}
                   // value={PhoneInput}
                />
                <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Grade'
                    keyboardType="email-address"
                   // onChangeText={PassHandler}
                   // value={PassInput}
                  
                />
                
                
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


export default ViewGrades;