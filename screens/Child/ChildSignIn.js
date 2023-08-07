import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet ,Button, Alert , TouchableOpacity , Keyboard} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from '../../constants/Colors';
import Input from '../../components/Input';
import { FlingGestureHandler, TouchableWithoutFeedback } from 'react-native-gesture-handler';;
import Firebase ,{db} from '../../firebase/fire';
import { NavigationActions, StackActions } from 'react-navigation'

const ChildSignIn = props => {

    const login = () => {
        return async (dispatch, getState) => {
            try {
                const response = await Firebase.auth().signInWithEmailAndPassword(IDInput+"@gmail.com", PassInput)
                dispatch(getUser(response.user.uid))
                //sessionStorage.setItem('name',response.user.fullname)
                props.navigation.navigate({routeName: 'ChildLogin'});
            } catch (e) {
                alert(e)
                Alert.alert(e.error,e.message)
            }
        }
    }
    
    const getUser = uid => {
        return async (dispatch, getState) => {
            try {
                const user = await db
                    .collection('Child')
                    .doc(uid)
                    .get()
                } 
            catch (e) 
            {
                alert(e)
            }
        }
    }

    const [IDInput,setID]= useState('');

    const IDHandler = IDText => {
        setID(IDText.replace(/^[0-9](9,9)/))
    }
    
    const [PassInput,setPass]= useState('');

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

    resetStack = () => {
        props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'ChildProfile',
                //params: { someParams: 'parameters goes here...' },
              }),
            ],
          }
        ))
    }

    const AddItem = async (saveas,save) =>{
        try{
            console.log(saveas +" "+ save)
            await AsyncStorage.setItem(saveas,save)
        } catch (error){
            console.warn(error)
        }
    }

    return (
        //<TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
            <View style={styles.InputContainer}>
                <Text>Child Sign In Screen</Text>
                <Input 
                    testID={'Id'}
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Id'
                    keyboardType="visible-password"
                    onChangeText={IDHandler}
                    value={IDInput}
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
                            Firebase.auth().signInWithEmailAndPassword(IDInput+"@gmail.com", PassInput)
                            .then((userCredential) => {
                                console.log("1")
                                db.collection("Child").where("id", "==", IDInput).get().then(function(querySnapshot) {
                                    console.log("2")
                                    querySnapshot.forEach(function(doc) {
                                        console.log("name from db collection: "+doc.data().fullname)
                                        AddItem('ChildFullname',doc.data().fullname);
                                        //AddItem('ChildEmail',doc.data().email)
                                        AddItem('ChildId', doc.data().id)
                                        AddItem('ChildPhone', doc.data().phonenum)
                                        props.navigation.navigate({routeName: 'ChildProfile'})
                                        //resetStack(); //unfreeze in final
                                    }
                                )}
                                )
                            })
                            .catch((error) => {
                                Alert.alert('Error!','Please check info again!\nEmail is case sensitive')
                                console.log('Error!\nPlease check info again!\nEmail is case sensitive')
                              });
                            // db.collection("Child").where("id", "==", IDInput).get().then(function(querySnapshot) {
                            //     querySnapshot.forEach(function(doc) {
                            //             if(querySnapshot!= null){
                                        // console.log("name from db collection: "+doc.data().fullname)
                                        // AddItem('ChildFullname',doc.data().fullname);
                                        // //AddItem('ChildEmail',doc.data().email)
                                        // AddItem('ChildId', doc.data().id)
                                        // AddItem('ChildPhone', doc.data().phonenum)
                                        // props.navigation.navigate({routeName: 'ChildProfile'})
                                        // //resetStack(); //unfreeze in final
                            //         }
                            //         else{
                            //             Alert.alert('Error!','Please check info again!\nEmail is case sensitive')
                            //             console.log('Error!\nPlease check info again!\nEmail is case sensitive')
                            //         }
                            //     },
                            // )})         
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

export default ChildSignIn;
