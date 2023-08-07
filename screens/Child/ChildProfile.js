import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet ,Image, Button} from 'react-native';
import colors from '../../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions, StackActions } from 'react-navigation'

const ChildProfile = props => {

    const [user, setUser] = useState()

    useEffect(() => {
        AsyncStorage.getItem('ChildFullname')
                .then(value => {
                    if(value!= null) {
                        setUser(value)
                    }
                })
    }, []); 

    return (
        <View style={styles.screen}>
            <Text>Child Profile Screen</Text>
            <Text>Hello {(user)}</Text>   
            <View style={styles.ImageContainer}>
                <Image
                    source={require('../../assets/images/ChildIcon.jpg')}
                    resizeMode="cover"
                    style={styles.image}
                />
            </View>
            <Button
                title="Watch Grades"
                onPress={() => props.navigation.navigate({routeName:'WatchGrades'})}
            />
            <Button
                title="Message Teacher"
                onPress={() => props.navigation.navigate({routeName:'MsgToTeacher'})}
            />
            <Button
                title="Watch Messages"
                onPress={() => props.navigation.navigate({routeName:'WatchMessages'})}
            />
            <Button
                title="Watch Presence"
                onPress={() => props.navigation.navigate({routeName:'WatchPresence'})}
            />
            <Button
                title="Watch Class Details"
                onPress={() => props.navigation.navigate({routeName:'WatchClass'})}
            /> 
           <Button
                title="Watch School Details"
                onPress={() => props.navigation.navigate({routeName:'SchoolDetails'})}
            /> 
            <Button
                title="Teacher Details"
                onPress={() => props.navigation.navigate({routeName:'TeacherDetails'})}
            />
            <Button
                title="Personal Details"
                onPress={() => props.navigation.navigate({routeName:'CPersonalDetails'})}
            />  
                    <Button
                        title="Logout"
                        onPress={() =>props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                              NavigationActions.navigate({
                                routeName: 'FirstScreen',}),],}))}
                    />
            
            {/*<Button title='Logout' onPress={this.handleSignout} />*/}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
})

export default ChildProfile;