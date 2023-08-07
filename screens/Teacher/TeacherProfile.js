import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import colors from '../../constants/Colors'
import { NavigationActions, StackActions } from 'react-navigation'

import { LogBox } from 'react-native'; /// unfreeze for running on phones
import { ScrollView } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']); /// unfreeze for running on phones

const TeacherProfile = props => {

    const [user, setUser] = useState()

    useEffect(() => {
        AsyncStorage.getItem('TeacherFullname')
                .then(value => {
                    if(value!= null) {
                        setUser(value)
                    }
                })
    }, []); 

    return (
        <View style={styles.screen}>
            {/* <ScrollView> */}
            <Text>Teacher Profile Screen</Text>
            <Text>Hello {user}</Text> 
            {/* <View style={styles.ImageContainer}>
                <Image
                    source={require('../../assets/images/TeacherIcon.jpg')}
                    resizeMode="cover"
                    style={styles.image}
                    />
            </View> */}
            <View>
                {/*<View style={styles.buttoncontainer}>
                    <Button
                        title="Enter Grades"
                        onPress={() => {
                            props.navigation.navigate({routeName:'EnterGrades'})}
                        }
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="Enter Presence"
                        onPress={() => props.navigation.navigate({routeName:'EnterPresence'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="View grades"
                        onPress={() => props.navigation.navigate({routeName:'ViewGrades'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="View presence"
                        //onPress={() => props.navigation.navigate({routeName:'ViewPresence'})}
                    />
                </View> */}
                {/* <View style={styles.buttoncontainer}>
                    <Button
                        title="create Class"
                        onPress={() => props.navigation.navigate({routeName:'createClass'})}
                    />
                </View> */}
                <View style={styles.buttoncontainer}>
                    <Button
                        title="Send Message"
                        onPress={() => props.navigation.navigate({routeName:'SendMessage'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="View Messages"
                        onPress={() => props.navigation.navigate({routeName:'Msgs'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="Create Tasks"
                        onPress={() => props.navigation.navigate({routeName:'CreateTask'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="create Class - Harel and Shahar"
                        onPress={() => props.navigation.navigate({routeName:'MakeClass'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="Edit Class"
                        onPress={() => props.navigation.navigate({routeName:'EditClass'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                    title="Watch School Details"
                    onPress={() => props.navigation.navigate({routeName:'SchoolDetails'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                    title="Watch Personal Details"
                    onPress={() => props.navigation.navigate({routeName:'PersonalDetails'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="Subtraction Confirmation"
                        onPress={() => props.navigation.navigate({routeName:'SubtractionConfirmation'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="Presence Correction"
                        onPress={() => props.navigation.navigate({routeName:'PresenceCorrection'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="Score Correction"
                        onPress={() => props.navigation.navigate({routeName:'ScoreCorrection'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="Make Class Schedule"
                        onPress={() => props.navigation.navigate({routeName:'MakeSchedule'})}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                        title="Logout"
                        onPress={() =>props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                              NavigationActions.navigate({
                                routeName: 'FirstScreen',}),],}))}
                    />
                </View>
            </View>
        {/* </ScrollView> */}
        </View>   
    );
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        //padding : 25,
        alignItems: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 10
    },
    ImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    buttonContainer:{
        width: 150,
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        color: 'red'
    }
})



export default TeacherProfile;