import React ,{useState} from 'react'
import {View ,Alert , Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard} from 'react-native'
import Card from '../components/Card';
import { Platform } from 'react-native';
import colors from '../constants/Colors';
import Input from '../components/Input';
//import ParentSignUp from './Parent/ParentSignUp';

const FirstScreen = props => {
    return(
            <View style={styles.screen}>
                {/*<Text style={styles.title}>Welcome</Text>*/}
                <Card style={styles.inputcontainer}>
                    <View style={styles.buttoncontainer}>
                        <Button title="Sign Up" onPress={() => {
                            /*Alert.alert(
                                'Move To Parent Sign up',
                                'Your are about to move to the Parent Sign Up screen',
                                [
                                  {text: 'OK'}
                                ],
                                {cancelable: false},
                              ); */
                            props.navigation.navigate({routeName: 'Signup'});
                        }} color={colors.secondery}/>
                    </View>    
                    <View style={styles.buttoncontainer}>
                        <Button title="Sign In" onPress={() => {
                            console.log('wtf?!')
                             props.navigation.navigate({routeName: 'TypeSignin'});
                        }} color={colors.secondery} />
                    </View>
                    {/*<Input 
                        style={styles.Input}
                        blurOnSubmit
                        onChangeText={InputHandler}
                        value={enteredInput}
                        keyBoard='letters'
                    /> */}
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

export default FirstScreen;