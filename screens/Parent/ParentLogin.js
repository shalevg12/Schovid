import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet ,Button } from 'react-native';
import colors from '../../constants/Colors'
import * as firebase from 'firebase'

const ParentLogin = props => {
    onLoginPress = () => {
        
    }

    return (
        <View style={styles.screen}>
            <Text>Parent Login Screen</Text>
            <View style={styles.buttoncontainer}>
                        <Button title="Login" onPress={() => {
                            props.navigation.navigate({routeName: 'ParentProfile'})
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

export default ParentLogin;