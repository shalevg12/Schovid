import {View, Text, StyleSheet ,Button } from 'react-native';
import colors from '../../constants/Colors'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import * as firebase from 'firebase'

const TeacherLogin = props => {

    const [user, setUser] = useState()

    // useEffect(() => {
    //     const loggedInUser = .getItem("user");
    //     if (loggedInUser) {
    //         const foundUser = (loggedInUser);
    //         setUser(foundUser);
    //     }
    // }, []);

    return (
        <View style={styles.screen}>
            <Text>Teacher Login Screen</Text>
            <Text>Hello {user}</Text>
            <View style={styles.buttoncontainer}>
                        <Button title="Login" onPress={() => {
                            props.navigation.navigate({routeName: 'TeacherProfile'})
                        }} color={colors.secondery} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default TeacherLogin;