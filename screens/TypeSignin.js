import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import colors from '../constants/Colors';

const TypeSignin= props => {
    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button title="Sign In as Teacher" onPress={() => {
                    props.navigation.navigate({routeName: 'TeacherSignIn'})
                    }} color={colors.secondery} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Sign In as Parent" onPress={() => {
                    props.navigation.navigate({routeName: 'ParentSignIn'});
                    }} color={colors.secondery}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Sign In as Child" onPress={() => {
                    props.navigation.navigate({routeName: 'ChildSignIn'});
                    }} color={colors.secondery}/>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding : 100,
        alignItems: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer:{
        width: 250,
        height: 150,
        justifyContent: 'center',
        paddingBottom: 100 ,
        borderRadius: 10
    }
})


export default TypeSignin;