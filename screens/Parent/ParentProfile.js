import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet ,Button ,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileImage from '../../components/ProfileImage';
import colors from '../../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions, StackActions } from 'react-navigation'

const ParentProfile = props => {

    const [user, setUser] = useState()

    useEffect(() => {
        AsyncStorage.getItem('ParentFullname')
                .then(value => {
                    if(value!= null) {
                        setUser(value)
                    }
                })
    }, []); 

    return (
        <View style={styles.screen}>
            <Text>Parent Profile Screen</Text>
            <Text>Hello {(user)}</Text> 
            <View style={styles.ImageContainer}>
                <Image
                    source={require('../../assets/images/ParentIcon.jpg')}
                    resizeMode="cover"
                    style={styles.image}
                />
            </View>
            <Button
                title="Register a child"
                onPress={() => {props.navigation.navigate({routeName:'ChildSignUp'})}}
                style={styles.buttoncontainer}
            />
            <Button
                title="Child profiles"
                onPress={() => {props.navigation.navigate({routeName:'ChildProfile'})}}
                style={styles.buttoncontainer}
            />
            <Button
                title="Watch School Details"
                onPress={() => props.navigation.navigate({routeName:'SchoolDetails'})}
            />
            <Button
                title="Health Declaration"
                onPress={() => props.navigation.navigate({routeName:'GreenTav'})}
            />
            <Button
                title="Personal Details"
                onPress={() => props.navigation.navigate({routeName:'PPersonalDetails'})}
            />  
                    <Button
                        title="Logout"
                        onPress={() =>props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                              NavigationActions.navigate({
                                routeName: 'FirstScreen',}),],}))}
                    />
            
        {/*} <Button title='Logout' onPress={this.handleSignout} /> */}
        </View>  
    /*<ScrollView>
        <View style={styles.screen}>
        <Text>Parent Profile Screen</Text>
        <Image
            source={require('../../assets/images/ParentIcon.jpg')}
            resizeMode="cover"
            style={styles.image}
        />
        <Button
            title="Add a child"
            onPress={() => {props.navigation.navigate({routeName:'ChildSignUp'})}}
        />
        <Button
            title="Child profile"
            onPress={() => {props.navigation.navigate({routeName:'ChildProfile'})}}
        />
        </View>
    </ScrollView>*/
    
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageContainer: {
        width: 300,
        height: 300,
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
        width: 250,
        height: 150,
        justifyContent: 'center',
        paddingBottom: 100 ,
        paddingTop: 10,
        borderRadius: 10
    }
})

export default ParentProfile;