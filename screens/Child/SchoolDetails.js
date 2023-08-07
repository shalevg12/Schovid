import React ,{useState} from 'react'
import {View ,Alert , Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard} from 'react-native'
import Card from '../../components/Card';


const SchoolDetails = props => {

    return(
            <View style={styles.screen}>
                {/*<Text style={styles.title}>Welcome</Text>*/}
                <Card style={styles.inputcontainer}>
                    <Text style={styles.title}>School name: Ben-Gurion</Text>
                    <Text style={styles.title}>School Address: Keryat menahem</Text>
                    <Text style={styles.title}>School Phone-number: 08-9921112</Text>
                    <Text style={styles.title}>School Fax-number: 08-9963564</Text>
                    <Text style={styles.title}>School Email: BenGurion@gmail.com</Text>
                </Card>
            </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title:{
        fontSize:20,
        marginVertical: 10,
    },
    buttoncontainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 90,
        paddingBottom: 35,
        paddingLeft: 90,
        paddingRight: 90,
        paddingTop: 30
    },
    inputcontainer:{
        width: 400,
        maxWidth: '80%',
        alignItems: 'center',
    }, 
    input: {
        width:50,
        textAlign:'center'
    }

});

export default SchoolDetails;