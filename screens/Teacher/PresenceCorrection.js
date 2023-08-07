import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet ,Button, Alert , TouchableOpacity , Keyboard} from 'react-native';
import colors from '../../constants/Colors';
import Input from '../../components/Input';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createGrade } from '../../actions/Grades';
import Firebase ,{db} from '../../firebase/fire';

const PresenceCorrection = props => {
    const signup = async() =>{ 
        try{
            const response = await Firebase.auth().signInWithEmailAndPassword(Email, Pass)
            if (response.user.uid) {
                const Presence = {
                    fullname: FullnameInput,  
                    class:ClassInput,
                    lesson:lessonInput,                  
                    Presence: PresenceInput
                }
                db.collection('Presence')
                    .doc(FullnameInput)
                    .set(Presence)

                props.navigation.navigate({routeName: 'TeacherProfile'});
            }

        } catch (e){
            console.log(e);
            alert(e);
        }
    }

    const [Email,setEmail]= useState('Elihu222@gmail.com');
    
    const [Pass,setPass]= useState('123123');

    const [FullnameInput,setFname]= useState('');

    const FullnameHandler = FullnameText => {
        setFname(FullnameText.replace(/[^A-Za-z]+[^A-Za-z]/))
    }

    const [ClassInput,setClass]= useState('');
    const ClassHandler = ClassText => {
        setClass(ClassText.replace(/^[0-9](1,1)/))
    }
    const [lessonInput,setlesson]= useState('');
    const lessonHandler = lessonText => {
        setlesson(lessonText.replace(/[^A-Za-z]/))
    }
    const [PresenceInput,setPresence]= useState('');
    const PresenceHandler = PresenceText => {
        setPresence(PresenceText.replace(/[^A-Za-z]/))
    }

return(
    <View style={styles.InputContainer}>
                <Text>Presence Correction</Text>
                <Input
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Full Name'
                    keyboardType="ascii-capable"
                    onChangeText={FullnameHandler}
                    value={FullnameInput}
                />
                <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Class'
                    keyboardType="Phone"
                    onChangeText={ClassHandler}
                    value={ClassInput}
                />
                <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='lesson'
                    keyboardType="ascii-capable"
                    onChangeText={lessonHandler}
                    value={lessonInput}
                />
                <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Present / not present'
                    keyboardType="ascii-capable"
                    onChangeText={PresenceHandler}
                    value={PresenceInput}
                    
                />
                
                <View style={styles.buttoncontainer}>
                        <Button title="Enter" onPress={() => {
                            if(PresenceInput!=('Presence' || 'Not Present')){
                                Alert.alert(
                                    'Error',
                                    'Please enter Present or Not Present only!',
                                    [
                                      {text: 'OK'}
                                    ],
                                    {cancelable: false},
                                  );
                            }
                            signup();
                        }} color={colors.secondery} />
                </View>
            </View>
)
            //<TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
}
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
            
            
export default PresenceCorrection