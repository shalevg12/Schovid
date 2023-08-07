import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet ,Button ,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileImage from '../../components/ProfileImage';
import colors from '../../constants/Colors'
import Input from '../../components/Input';

const GreenTav = props => {

    const [IDInput,setID]= useState('');

    const IDHandler = IDText => {
        setID(IDText.replace(/^[0-9](9,9)/))
    }

    return (
        <View style={styles.screen}>
            <Text>Health Declaration</Text>
            <View style={styles.ImageContainer}>
                <Image
                    source={require('../../assets/images/Green.png')}
                    resizeMode="cover"
                    style={styles.image}
                />
            </View>
            <Input
                    testID={'ID'} 
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='ID'
                    keyboardType="number-pad"
                    onChangeText={IDHandler}
                    value={IDInput}
            />
            <Button
                title="yes"
                onPress={() => {props.navigation.navigate({routeName:'ChildProfile'})}}
                style={styles.buttoncontainer}
            />
            <Button
                title="no"
                onPress={() => props.navigation.navigate({routeName:'SchoolDetails'})}
            />
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
        width: '85%', 
        height: '50%',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 5
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

export default GreenTav;
