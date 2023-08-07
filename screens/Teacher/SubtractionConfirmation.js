import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet ,Button, Alert , TouchableOpacity , Keyboard} from 'react-native';
import colors from '../../constants/Colors';
import Input from '../../components/Input';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createGrade } from '../../actions/Grades';
import Firebase ,{db} from '../../firebase/fire';

const SubtractionConfirmation = props => {
    const signup = async() =>{ 
        try{
            const response = await Firebase.auth().signInWithEmailAndPassword(Email, Pass)
            if (response.user.uid) {
                const Class = {
                    fullname: FullnameInput,
                    number:numberInput,
                    students:studentsInput,
                }
                db.collection('Classes')
                    .doc(FullnameInput)
                    .set(Class)

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

    const [numberInput,setnumber]= useState('');
    const numberHandler = numberText => {
        setnumber(numberText.replace(/^[0-9](1,2)/))
    }
    const [studentsInput,setstudents]= useState('');
    const studentsHandler = studentsText => {
        setstudents(studentsText.replace(/[^A-Za-z]+[^A-Za-z]+[0-9](0,9)/))
    }
    

return(
    <View style={styles.InputContainer}>
                <Text>Subtraction Confirmation</Text>
                <Input
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Teacher Name'
                    keyboardType="ascii-capable"
                    onChangeText={FullnameHandler}
                    value={FullnameInput}
                />
                {/* <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='number of students'
                    keyboardType="Phone"
                    onChangeText={numberHandler}
                    value={numberInput}
                /> */}
                <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Reason Subtraction'
                    keyboardType="ascii-capable"
                    onChangeText={studentsHandler}
                    value={studentsInput}
                />
                
                <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Student name'
                    keyboardType="ascii-capable"
                    onChangeText={studentsHandler}
                    value={studentsInput}
                />

                <View style={styles.buttoncontainer}>
                        <Button title="Enter" onPress={() => {
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
            
            
            export default SubtractionConfirmation;