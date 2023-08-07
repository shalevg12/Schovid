import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet ,Button, Alert , TouchableOpacity , Keyboard} from 'react-native';
import colors from '../../constants/Colors';
import Input from '../../components/Input';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Firebase ,{db} from '../../firebase/fire';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChildSignUp = props => {

    const [Parentemail, setParentEmail] = useState()
    const [id, setId] = useState()
    const [fullname, setFullname] = useState()
    const [phone, setParentPhone] = useState()
    const ChildAr= [];
    
    const AddItem = async (saveas,save) =>{
        try{
            console.log("saving to async storage: "+ save)
            await AsyncStorage.setItem(saveas,save)
        } catch (error){
            console.warn(error)
        }
    }

    useEffect(() => {
        _retrieveData();
    }, []); 

    _retrieveData= async () => {
        try{
            AsyncStorage.getItem('ParentFullname')
                .then(value => {
                    if(value!= null) {
                        setFullname(value)
                        console.log("ParentFullname: "+value)
                    }
                })
            AsyncStorage.getItem('ParentEmail')
                .then(value => {
                    if(value!= null) {
                        setParentEmail(value)
                        console.log("ParentEmail: "+value)
                    }
                })
            AsyncStorage.getItem('ParentId')
                .then(value => {
                    if(value!= null) {
                        setId(value)
                        console.log("ParentId: "+value)
                    }
                })
            AsyncStorage.getItem('ParentPhone')
                .then(value => {
                    if(value!= null) {
                        setParentPhone(value)
                        console.log("ParentPhone: "+value)
                    }
                })
        } catch (error){
            console.warn(error)
        }
    } 

    const signup = async() =>{ 
        try{
            const response = await Firebase.auth().createUserWithEmailAndPassword(IDInput+"@gmail.com", PassInput)
            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: email,
                    fullname: FullnameInput,
                    phonenum: PhoneInput,
                    id: IDInput,
                    Role: 'Child',      
                    ChildOf: fullname,
                    class: null,
                    checked: false
                }
                db.collection('Child')
                    .doc(FullnameInput)
                    .set(user)
                AddItem('ChildFullname',user.fullname);
                AddItem('ChildId', user.id)
                AddItem('ChildPhone', user.phonenum)
                
                db.collection('Parent').doc(fullname).update({Children:ChildAr});
                Alert.alert(
                    "Created Succesfully",
                    "Your Child User has been created succesfully!",
                    [
                      { text: "OK", onPress: () => props.navigation.navigate({routeName: 'ParentProfile'}) }
                    ]
                  );
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

    const [email, setEmail] = useState('')

    const EmailHandler = EmailText => {
        setEmail(EmailText)
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

    const [EmailInput, SetEmailInput] = useState('');

    const [PhoneInput,setPhone]= useState('');

    const PhoneHandler = PhoneText => {
        setPhone(PhoneText.replace(/^[0-9](9,12)/))
    }

    return (
        //<TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
            <View style={styles.InputContainer}>
                <Text>Please Register your child, {(fullname)}</Text>
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
                    testID={'phonenum'}
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Phone Number'
                    keyboardType="phone-pad"
                    onChangeText={PhoneHandler}
                    value={PhoneInput}
                    secureTextEntry={false}
                />
                <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Password'
                    keyboardType="phone-pad"
                    onChangeText={PassHandler}
                    value={PassInput}
                    secureTextEntry={true}
                />
                <Input 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Verify Password'
                    keyboardType="phone-pad"
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
                <Text>Updates will be send to : {(Parentemail)}</Text>
                <View style={styles.buttoncontainer}>
                        <Button title="Sign Up" onPress={() => {
                            if(PassInput!=''){
                                if(VerifyPass==PassInput){
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
                                  console.log("No Password!");
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


export default ChildSignUp;