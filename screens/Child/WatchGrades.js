import React from 'react';
import {View, Text, StyleSheet ,Image, Button} from 'react-native';
import colors from '../../constants/Colors'

const WatchGrades = props => {
    return (
        <View style={styles.container}>
            <Text>Watch Grades</Text>
            

        </View>
    )
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
    }
})

export default WatchGrades;