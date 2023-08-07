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


class PPersonalDetails extends React.Component {
    constructor(){
        super()
        this.state={
            Name:null,
            PhoneNum:null,
            Email:null,
            ID:null,
            Classes:[],
            isLoaded:false
        }
    }



    componentDidMount(){
        let ParentName = null    
        try{
            AsyncStorage.getItem('ParentFullname')
                .then(value => {
                    if(value!= null) {
                        ParentName=value;
                    }
                })
            } catch (error){
                console.warn(error)
        }
        console.log("ParentName is : "+ParentName)
        db.collection('Parent').get().then( snapshot =>{
            let parentName=null;
            let phone=null;
            let temail=null;
            let Id=null;
            snapshot.forEach( doc =>{
                const KEY = Object.keys(doc.data());
                KEY.forEach( (key_id) => {
                    if(key_id=='fullname'){
                        if(doc.data().fullname == ParentName){
                            console.log("inside1")
                            parentName = doc.data().fullname
                            phone = doc.data().phonenum
                            temail = doc.data().email
                            Id = doc.data().id
                        }
                        this.setState({PhoneNum:phone})
                        this.setState({Email:temail})
                        this.setState({ID:Id})
                        this.setState({Name:parentName})
                        console.log("parentName "+this.state.Name)
                        console.log("phone "+this.state.PhoneNum)
                        console.log("temail "+this.state.Email)
                        console.log("Id "+this.state.ID)
                    }
                })
            })
        })
        this.setState({isLoaded:true})
    }


    render(){
        if(this.state.isLoaded==true)
        return (
            <View>
                <Text>Name: {(this.state.Name)}</Text> 
                <Text>PhoneNumber: {(this.state.PhoneNum)}</Text>
                <Text>Email: {(this.state.Email)}</Text> 
                <Text>ID: {(this.state.ID)}</Text> 
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
            
  
export default PPersonalDetails;