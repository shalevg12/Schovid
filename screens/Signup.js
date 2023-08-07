import React from 'react'
import {Button, View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import Colors from '../constants/Colors'
import Card from '../components/Card'

const Signup = props => {
    return(
        <View style={styles.screen}>
            <Card style={styles.inputcontainer}>
                <View style={styles.buttonContainer}>
                    <Button title="Sign Up as Teacher" onPress={() => {props.navigation.navigate({routeName:'TeacherSignUp'});}} color={Colors.secondery}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Sign Up as Parent" onPress={() => {props.navigation.navigate({routeName: 'ParentSignUp'});}} color={Colors.secondery}/>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding : 100,
        alignItems: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer:{
        width: 250,
        height: 150,
        justifyContent: 'center',
        //paddingBottom: 50 ,
        //paddingTop: 50,
        borderRadius: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})


export default Signup;