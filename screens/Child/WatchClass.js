import React, { useEffect, useState } from 'react'; 
import { render } from 'react-dom';
import {TouchableOpacity,View, Text, StyleSheet , Button, ScrollView , ActivityIndicator , FlatList, Alert ,setState, CheckBox} from 'react-native';
import colors from '../../constants/Colors'
import firebase ,{db} from '../../firebase/fire'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Checkbox, List } from 'react-native-paper';
import { ListItem } from 'react-native-elements'
import Navigation from '../../navigation/Navigation'
import AsyncStorage from '@react-native-async-storage/async-storage';


class WatchClass extends React.Component {
    constructor(){
        super()
        this.state={
            StudentsName:[],
            ClassName:null,
            TeacherName:null,
            isLoaded:false,
            user:null
        }
    }

    _retrieveData() {
        try{
            AsyncStorage.getItem('ChildFullname')
                .then(value => {
                    if(value!= null) {
                        this.setState({user : value})
                    }
                })
        } catch (error){
            console.warn(error)
        }
    } 

    componentDidMount(){
        db.collection('Class').get().then( snapshot =>{
            let students = []
            let studentsName=[]
            let className=null;
            let teacherName=null;
            snapshot.forEach( doc =>{
                const KEY = Object.keys(doc.data());
                console.log("KEYS is :"+KEY);
                let verified=false;
                KEY.forEach( (key_id) => {
                    if(key_id=='studentsList'){
                        AsyncStorage.getItem('ChildFullname')
                        .then(value => {
                            if(value!= null) {
                                for(let j=0;j<doc.data().number;j++){
                                    if(doc.data().studentsList[j]==value){
                                        verified=true;
                                    }
                                }
                                if(verified==true){
                                    for(let i=0;i<doc.data().number;i++){
                                        const data = doc.data().studentsList[i];
                                        studentsName.push({
                                            name:data,
                                            id:i    
                                        })
                                    }
                                    className=doc.data().ClassName;
                                    teacherName=doc.data().ClassTeacher;
                                }
                            }
                            this.setState({StudentsName:studentsName})
                            this.setState({ClassName:className})
                            this.setState({TeacherName:teacherName})
                            this.setState({isLoaded:true})
                        })
                    }
                })
            })
        }
        )
    }

    render(){
        if(this.state.isLoaded==true)
        return (
            <View>
                <Text>Class Name: {(this.state.ClassName)}</Text> 
                <Text>Teacher Name: {(this.state.TeacherName)}</Text> 
                <Text>Students in the Class:</Text> 

                {this.state.StudentsName.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               ))
            }
            </View>
        ); 
        else{
            return(
                <Text>Nothing Loaded,Please wait!</Text>
            )
        }
    }
}
            
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
            
  
export default WatchClass;