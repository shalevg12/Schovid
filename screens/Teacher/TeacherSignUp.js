import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet ,Button, Alert , TouchableOpacity , Keyboard} from 'react-native';
import colors from '../../constants/Colors';
import Input from '../../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationActions, StackActions } from 'react-navigation'
import Firebase ,{db} from '../../firebase/fire';

const TeacherSignUp = props => {
    const AddItem = async (saveas,save) =>{
        try{
            console.log("saving to async storage: "+ save)
            await AsyncStorage.setItem(saveas,save)
        } catch (error){
            console.warn(error)
        }
    }

    const signup = async() =>{ 
        try{
            const response = await Firebase.auth().createUserWithEmailAndPassword(EmailInput, PassInput)
            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: EmailInput,
                    fullname: FullnameInput,
                    phonenum: PhoneInput,
                    id:IDInput,
                    Role: 'Teacher', 
                    TeacherOfClass: null   
                }
                db.collection('Teacher')
                    .doc(FullnameInput)
                    .set(user)
                AddItem('TeacherFullname',FullnameInput);
                AddItem('TeacherEmail',EmailInput)
                AddItem('TeacherId', IDInput)
                AddItem('TeacherPhone', PhoneInput)
                props.navigation.navigate({routeName: 'TeacherProfile'});
            }

        } catch (e){
            if(e.code == 'auth/invalid-email'){
                Alert.alert("Bad Email!", e.message)
                console.log(e);
            }
            if(e.code == 'auth/email-already-in-use'){
                Alert.alert("This Email is already Registered!", "The email address is already in use by another account.")
                console.log(e);
            }
            else{
                Alert.alert(e.code,e.message)
                console.log(e);
            }

        }
    }

    const [FullnameInput,setFname]= useState('');


    const FullnameHandler = FullnameText => {
        setFname(FullnameText.replace(/[^A-Za-z]+[^A-Za-z]/))
    }


    const [EmailInput,setEmail]= useState('');


    const EmailHandler = EmailText => {
        setEmail(EmailText.replace(/^[0-9](9,12)/))
    }


    const [PhoneInput,setPhone]= useState('');


    const PhoneHandler = PhoneText => {
        setPhone(PhoneText.replace(/^[0-9](9,12)/))
    }
    

    const [PassInput,setPass]= useState('');


    const PassHandler = PassText => {
        setPass(PassText)
    }


    const [IDInput,setID]= useState('');


    const IDHandler = IDText => {
        setID(IDText.replace(/^[0-9](9,9)/))
    }
    

    const [VerifyPass, setVerifyPass] = useState ('');


    const VerifyHandler = VerifyPassText =>{
        setVerifyPass(VerifyPassText)
    }

    const resetinputHandler =() =>{
        setenteredInput=('');
    }

    const submitHandler = useCallback(() =>{
        console.log("Submit!");
    },[]);


    return (
        //<TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
            <View style={styles.InputContainer}>
                <Text>Parent Sign Up Screen</Text>
                <Input
                    testID={'fullname'}
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Full Name'
                    keyboardType="ascii-capable"
                    onChangeText={FullnameHandler}
                    value={FullnameInput}
                />
                <Input 
                    testID={'email'}
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Email'
                    keyboardType="email-address"
                    onChangeText={EmailHandler}
                    value={EmailInput}
                />
                <Input 
                    testID={'phone'}
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Phone'
                    keyboardType="phone-pad"
                    onChangeText={PhoneHandler}
                    value={PhoneInput}
                />
                <Input 
                    testID={'password'}
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Password'
                    keyboardType="visible-password"
                    onChangeText={PassHandler}
                    value={PassInput}
                    secureTextEntry={true}
                />
                <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Verify Password'
                    keyboardType="visible-password"
                    onChangeText={VerifyHandler}
                    value={VerifyPass}
                    secureTextEntry={true}
                />
                <Input
                    testID={'id'}
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='ID number'
                    keyboardType="number-pad"
                    onChangeText={IDHandler}
                    value={IDInput}
                />
                <View style={styles.buttoncontainer}>
                        <Button title="Sign Up" onPress={() => {
                            if(PassInput!=''){
                                if(VerifyPass==PassInput){
                                    submitHandler();
                                    signup();
                                }
                                else{
                                    Alert.alert(
                                        'Error',
                                        'Passwords do no match!',
                                        [
                                          {text: 'OK'}
                                        ],
                                        {cancelable: false},
                                      );
                                      console.log(VerifyPass);
                                }
                            }
                            else{
                                Alert.alert(
                                    'Error',
                                    'Please enter a Password',
                                    [
                                      {text: 'OK'}
                                    ],
                                    {cancelable: false},
                                  );
                                  console.log(VerifyPass);
                            }
                        }} color={colors.secondery} />
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
        //width: windowWidth /1.5,
        //height: windowHeight /15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1
    }
})


export default TeacherSignUp;