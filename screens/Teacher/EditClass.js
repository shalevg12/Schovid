import React, { useEffect, useState } from 'react'; 
import { render } from 'react-dom';
import {TouchableOpacity,View, Text, StyleSheet , Button, ScrollView , ActivityIndicator , FlatList, Alert ,setState, CheckBox} from 'react-native';
import colors from '../../constants/Colors'
import firebase ,{db} from '../../firebase/fire'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Checkbox, List } from 'react-native-paper';
import { ListItem } from 'react-native-elements'

class EditClass extends React.Component {
    constructor(){
        super()
        this.state= {
            students: null,
            isLoaded: false,
            check:true
        }
    }

    componentDidMount(){
        console.log('mounted')
        db.collection('Class').get().then( snapshot =>{
            const students = []
            snapshot.forEach( doc =>{
                let KEY = Object.keys(doc.data());
                console.log("KEYS are :"+KEY);
                KEY.forEach( (key_id) => {
                    if(key_id=='ClassName'){
                        const data = doc.data()
                        //console.log(data)
                        students.push(data)
                        //console.log('name is:'+doc.data().fullname)
                    }
                })
            })
            this.setState({ students: students})
            this.setState({isLoaded:true})
        })
        .catch( error => Alert.alert('Error',error.message))
    }

    clickEventListener(item) {
        // let cn = item.ClassName
        // let ct = item.ClassTeacher
        // let nm = item.number
        // let sl = item.studentsList
        Alert.alert(""+item.ClassName,""+ item.studentsList)
        this.props.navigation.navigate({routeName: 'ClassDetails'});
        //this.props.navigation.navigate({routename:'ClassDetails'});
        // this.props.navigation.navigate({routeName: 'ClassDetails'}, {
        //     classname:cn,
        //     classteacher:ct,
        //     classstudentsnum:nm,
        //     classstudnets:sl
        //   });
    }

    render(){
        return (
        <View style={styles.container}>
            <FlatList style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={this.state.students}
                horizontal={false}
                numColumns={2}
                keyExtractor= {(item) => {
                return item.fullname;
            }}
            renderItem={({item}) => {
                return (
                <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
                    <View style={styles.cardFooter}>
                        <View style={{alignItems:"center", justifyContent:"center"}}>
                            <Text style={styles.name}>Class: {item.ClassName}</Text>
                            <Text style={styles.position}>Class Teacher: </Text>
                            <Text> {item.ClassTeacher}</Text>
                            <TouchableOpacity style={styles.UpdateButton} onPress={()=> this.clickEventListener(item)}>
                                <Text style={styles.UpdateButtonText}>Edit Class</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
              </TouchableOpacity>
            )
          }}/>
      </View>
    );
      
        
    }

}
            
            const styles = StyleSheet.create({
                screen: {
                    marginTop: 5,
                    marginBottom: 10,
                    width: '100%',
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
                    fontSize: 16,
                    borderRadius: 8,
                    borderWidth: 1
                },
                container: {
                    flex: 1,
                    paddingBottom: 22
                },
                preloader: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                UpdateButton: {
                    marginTop:10,
                    height:45,
                    width:150,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius:30,
                    backgroundColor: "#00BFFF",
                  },
                UpdateButtonText:{
                    color: "#FFFFFF",
                    fontSize:18,
                  },
                  card:{
                    shadowColor: '#00000021',
                    shadowOffset: {
                      width: 0,
                      height: 6,
                    },
                    shadowOpacity: 0.37,
                    shadowRadius: 7.49,
                    elevation: 12,
                
                    marginVertical: 5,
                    backgroundColor:"white",
                    flexBasis: '46%',
                    marginHorizontal: 5,
                  },
                  cardFooter: {
                    paddingVertical: 17,
                    paddingHorizontal: 16,
                    borderTopLeftRadius: 1,
                    borderTopRightRadius: 1,
                    flexDirection: 'row',
                    alignItems:"center", 
                    justifyContent:"center"
                  },
                  list: {
                    paddingHorizontal: 5,
                    backgroundColor:"#E6E6E6",
                  },
                  listContainer:{
                   alignItems:'center'
                  },
                  name:{
                    fontSize:18,
                    flex:1,
                    alignSelf:'center',
                    color:"#008080",
                    fontWeight:'bold'
                  },
                  position:{
                    fontSize:14,
                    flex:1,
                    alignSelf:'center',
                    color:"#696969"
                  }
                  
            })
            
            
        
export default EditClass;