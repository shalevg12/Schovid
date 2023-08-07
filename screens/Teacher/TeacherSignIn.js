import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet ,Button, Alert , TouchableOpacity , Keyboard , Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationActions, StackActions } from 'react-navigation'

import colors from '../../constants/Colors';
import Input from '../../components/Input';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Firebase ,{db} from '../../firebase/fire';


import { LogBox } from 'react-native'; /// unfreeze for running on phones

LogBox.ignoreLogs(['Setting a timer']); /// unfreeze for running on phones

const TeacherSignIn = props => {

    const login = () => {
        return async (dispatch, getState) => {
            try {
                const response = await Firebase.auth().signInWithEmailAndPassword(EmailInput, PassInput)
                dispatch(getUser(response.user.uid))
                props.navigation.navigate({routeName: 'TeacherLogin'});
            } catch (e) {
                alert(e)
            }
        }
    }
    
    const getUser = uid => {
        return async (dispatch, getState) => {
            try {
                const user = await db
                    .collection('Parent')

                    .doc(uid)
                    .get()
                } 
            catch (e) 
            {
                alert(e)
            }
        }
    }

    const [EmailInput,setEmail]= useState('');

    const EmailHandler = EmailText => {
        setEmail(EmailText.replace(/^(9,12)/))
    }
    
    const [PassInput,setPass]= useState('');

    const [Verified, setVerified]= useState(false);

    const VerifiedHandler = VerifyTrue => {
        setVerified(true);
    }

    const PassHandler = PassText => {
        setPass(PassText)
    }
    //const { getItem, setItem } = useAsyncStorage('@storage_key');

    const readItemFromStorage = async () => {
      const item = await getItem();
      setValue(item);
    };
  
    const writeItemToStorage = async newValue => {
      await setItem(newValue);
      setValue(newValue);
    };

    // _StoreData = async () => {
    //     try {
    //        await AsyncStorage.setItem('user',JSON.stringify(doc.data().fullname))
    //        console.log(doc.data().fullname)
    //     } catch (error) {
    //       console.log("Something went wrong", error);
    //     }
    //   }

    const AddItem = async (saveas,save) =>{
        try{
            console.log("saving to async storage: "+ save)
            await AsyncStorage.setItem(saveas,save)
        } catch (error){
            console.warn(error)
        }
    }

    return (
        //<TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
            <View style={styles.InputContainer}>

                <Text>Teacher Sign In Screen</Text>


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

                <View style={styles.buttoncontainer}>
                    <Button title="Sign In" onPress={() => {
                            console.log('pressed Sign In');
                            Firebase.auth().signInWithEmailAndPassword(EmailInput, PassInput)
                            .then((userCredential) => {
                                db.collection("Teacher").where("email", "==", EmailInput).get().then(function(querySnapshot) {
                                    querySnapshot.forEach(function(doc) {
                                            console.log("name from db collection: "+doc.data().fullname)
                                            AddItem('TeacherFullname',doc.data().fullname);
                                            AddItem('TeacherEmail',doc.data().email)
                                            AddItem('TeacherId', doc.data().id)
                                            AddItem('TeacherPhone', doc.data().phonenum)
                                            props.navigation.navigate({routeName: 'TeacherProfile'})
                                            //resetStack(); //unfreeze in final
                                        }
                                )}
                                )
                            })
                            .catch((error) => {
                                Alert.alert('Error!','Please check info again!\nEmail is case sensitive')
                                console.log('Error!\nPlease check info again!\nEmail is case sensitive')
                              });
                        }} color={colors.secondery} />
                </View>
                {/* <View style={styles.buttoncontainer}>
                    <Button title="Sign In" onPress={() => {
                            console.log('pressed Sign In');
                            Firebase.auth().signInWithEmailAndPassword(EmailInput, PassInput)
                            .then((userCredential) => {
                                // Signed in
                                var user = userCredential.user;
                                Alert.alert('Logged In!','Logged as '+userCredential)
                                
                                Firebase.auth().onAuthStateChanged(
                                    authUser => {
                                        if (authUser) {
                                            db.collection('Teacher').get().then( snapshot =>{
                                                //const students = []
                                                snapshot.forEach( doc =>{
                                                    KEY = Object.keys(doc.data());
                                                    console.log("KEYS is :"+KEY);
                                                    KEY.forEach( (key_id) => {
                                                        if(key_id=='email'){
                                                            const data = doc.data()
                                                            if(doc.data().email == EmailInput){
                                                                console.log(doc.data().fullname)
                                                            }
                                                        }
                                                    const userData = snapshot;
                                                    console.log(userData)
                                                })
                                            })
                                        }
                                    )
                                }})
                            .catch((error) => {
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                Alert.alert('Error!',errorMessage)
                                });
                        })}} color={colors.secondery} /> */}
                    {/* <Button title="Sign In as Child" onPress={() => { 
                        console.log('pressed Sign In as Child');
                        db.collection("Teacher").where("email", "==", EmailInput).get().then(function(querySnapshot) {
                                querySnapshot.forEach(function(doc) {
                                // .setItem('user', doc.data().fullname)
                                // .setItem('email', doc.data().email)
                                }
                            )})   
                        props.navigation.navigate({routeName: 'ChildLogin'});
                    }} color={colors.secondery}/> */}
                {/* </View> */}
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
        width: 250,
        //height: windowHeight /15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1
    }
})

export default TeacherSignIn;