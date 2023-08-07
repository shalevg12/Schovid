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


class TeacherDetails extends React.Component {
    constructor(){
        super()
        this.state={
            StudentsName:[],
            TeacherEmail:null,
            TeacherName:null,
            TeacherPhone:null,
            ClassName:[],
            isLoaded:false,
        }
    }



    componentDidMount(){
        let ChildName = null    
        try{
            AsyncStorage.getItem('ChildFullname')
                .then(value => {
                    if(value!= null) {
                        ChildName=value;
                    }
                })
            } catch (error){
                console.warn(error)
        }
        db.collection('Class').get().then( snapshot =>{
            let teacherName=null;
            snapshot.forEach( doc =>{
                const KEY = Object.keys(doc.data());
                KEY.forEach( (key_id) => {
                    if(key_id=='studentsList'){
                        for(let i=0;i<doc.data().number;i++){
                            const data = doc.data().studentsList[i];
                            const tname = doc.data().ClassTeacher;
                            if(ChildName == data ){
                                teacherName=tname
                            }
                        }
                        this.setState({TeacherName:teacherName})
                    }
                })
            })
        }),
        db.collection('Class').get().then( snapshot =>{
            let classname=[];
            snapshot.forEach( doc =>{
                const KEY = Object.keys(doc.data());
                KEY.forEach( (key_id) => {
                    if(key_id=='ClassName'){
                        if(doc.data().ClassTeacher == this.state.TeacherName){
                            classname.push({
                                name:doc.data().ClassName
                            })
                        }
                        this.setState({ClassName:classname})
                    }
                })
            })
        },
        db.collection('Teacher').get().then( snapshot =>{
            let phonenum;
            let teacheremail;
            snapshot.forEach( doc =>{
                const KEY = Object.keys(doc.data());
                KEY.forEach( (key_id) => {
                    if(key_id=='fullname'){
                        if(doc.data().fullname == this.state.TeacherName){
                            phonenum=doc.data().phonenum
                            teacheremail=doc.data().email
                        }
                        this.setState({TeacherEmail:teacheremail})
                        this.setState({TeacherPhone:phonenum})
                    }
                })
            })
        }),
        this.setState({isLoaded:true})
        )
    }

    render(){
        if(this.state.isLoaded==true)
        return (
            <View>
                <Text>Teacher Name: {(this.state.TeacherName)}</Text> 
                <Text>Teacher PhoneNumber: {(this.state.TeacherPhone)}</Text>
                <Text>Teacher Email: {(this.state.TeacherEmail)}</Text> 
                <Text>Teaching Classes: </Text>
                {this.state.ClassName.map((item, index) => (
                  <TouchableOpacity
                     key = {item.name}
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
            
  
export default TeacherDetails;