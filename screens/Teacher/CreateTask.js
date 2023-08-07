import React, { useEffect, useState } from 'react'; 
import { render } from 'react-dom';
import {TouchableOpacity,View, Text, StyleSheet , Button, ScrollView , ActivityIndicator , TextInput , FlatList, Alert ,setState, CheckBox} from 'react-native';
import colors from '../../constants/Colors'
import firebase ,{db} from '../../firebase/fire'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Checkbox, List } from 'react-native-paper';
import { ListItem } from 'react-native-elements'
import Navigation from '../../navigation/Navigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/Input';


class CreateTask extends React.Component {
    constructor(){
        super()
        this.state= {
            ClassName:[],
            NumOfClass:0,
            cName:null,
            From: ['Childs', 'Parents'],
            data: [],
            description: null,
            msub:null,
            mdesc:null,
            dtf:null
        }
    }

    componentDidMount(){
        let Temp = this.state.From
        let FormatData = []
        for(let i=0;i<Temp.length;i++){
            console.log("1")
            FormatData.push({
                id:i,
                key:Temp[i],
                checked:false
            })
        }
        this.setState({data:FormatData})
        db.collection('Class').get().then( snapshot =>{
            const students = []
            let cname = [];
            snapshot.forEach( doc =>{
                const KEY = Object.keys(doc.data());
                KEY.forEach( (key_id) => {
                    if(key_id=='ClassName'){
                        //console.log("Classname: "+doc.data().ClassName)
                        cname.push({
                            name:doc.data().ClassName,
                            checked:false
                        }) 
                    }
                })
            })
            this.setState({ ClassName : cname})
        })
        .catch( error => Alert.alert('Error',error.Task))
    }

    _retrieveData(){
        try{
            AsyncStorage.getItem('TeacherFullname')
                .then(value => {
                    //console.log("value is: "+value)
                    if(value!= null) {
                        this.setState({user:value})
                        //console.log(this.state.user)
                    }
                })
        } catch (error){
            console.warn(error)
        }
    } 

    CheckClassName(){
        if(this.state.isLoaded!=false){
            for(let i=0;i<this.state.ClassName.length;i++){
                if(this.state.ClassName[i].checked)
                    return this.state.ClassName[i].key
            }
        }
    }

    RegisterSchedule = async() =>{ 
        try{
            //console.log("nameofday "+nameofday)
            let cname=null
            var keys2 = this.state.ClassName.map((t) => t.name)
            const checks2 = this.state.ClassName.map((t) => t.checked) 
            for (let i=0;i<checks2.length; i++){
                if(checks2[i] == true ){
                    cname=keys2[i]
                }
            }
            this.setState({cName : cname })
            //console.log("nameofclass: "+cname)
            var keys = this.state.ClassName.map((t) => t.name)
            const checks = this.state.ClassName.map((t) => t.checked)
            let selected = [] 
            for (let i=0;i<checks.length; i++){
                if(checks[i] == true ){
                    selected.push(keys[i])
                }
            }
           
            console.log("ClassName: "+cname)
            if(this.state.msub !=null && this.state.mdesc != null){
                let desc = this.state.mdesc;
                let sub = this.state.msub
                let to=[]
                var keys3 = this.state.data.map((t) => t.key)
                const checks3 = this.state.data.map((t) => t.checked)
                let selected3 = [] 
                for (let i=0;i<checks3.length; i++){
                    if(checks3[i] == true ){
                        console.log("its: "+keys3[i])
                        selected3.push(keys3[i])                        
                    }
                }
                const response = await firebase.auth().signInWithEmailAndPassword('HarelElihu@gmail.com', '123123')
                if (response.user.uid) {
                    const Tasks = {
                        Subject: sub,
                        description: desc,
                        DataToFinish: dtf,
                        //MsgTo: selected3,
                        classname:cname
                    }
                    db.collection('Tasks')
                        .doc(cname+sub)
                        .set(Tasks)
                    Alert.alert(
                        "Task Created!",
                        "Task Was Created Successfully!",
                        [
                        { text: "OK", onPress: () => this.props.navigation.navigate({routeName: 'TeacherProfile'}) }
                        ]
                    );
                }
        }

        } catch (e){
            console.log(e);
            alert(e);
        }
    }

    getSelectedDay(){

        //checks classname
        var keys2 = this.state.ClassName.map((t) => t.name)
        const checks2 = this.state.ClassName.map((t) => t.checked)
        let selected2 = [] 
        for (let i=0;i<checks2.length; i++){
            if(checks2[i] == true ){
                selected2.push(keys2[i])
            }
        }

        var keys = this.state.data.map((t) => t.name)
        const checks = this.state.data.map((t) => t.checked)
        let selected = [] 
        for (let i=0;i<checks.length; i++){
            if(checks[i] == true ){
                selected.push(keys[i])
            }
        }

        // console.log("number of days: "+selected.length)
        // console.log("number of class: "+selected2.length)
        //cName=selected2[0]
      
        if(selected2.length == 0 ){
             Alert.alert("Error!","Didnt Select a Class!")
        }
    //     if(selected.length == 0 ){
    //         Alert.alert("Error!","Please choose who to send message!!")
    //    }
       if(selected2.length >=1 ){
            if(this.state.msub!=null ){
                if(this.state.mdesc!=null ){
                    this.RegisterSchedule();
                }
            }
        }
    };

    renderClassNameList(){
        if(this.state.isLoaded!=false)
        return this.state.ClassName.map((item,key)=> {
            return(
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" , }} key={key} onPress={()=> 
                {this.onChecked(item.name)}}>
                    <CheckBox value={item.checked} onChange={()=> {this.checkBox_Test}}/>
                    <Text style={{fontWeight:"bold"}}>{item.name}</Text>
                </TouchableOpacity>
            )
        })
    }

    //
    renderFromList(){
        if(this.state.isLoaded!=false)
        return this.state.data.map((item,key)=> {
            return(
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" , }} key={key} onPress={()=> 
                {this.onCheckedFrom(item.id)}}>
                    <CheckBox value={item.checked} onChange={()=> {this.checkBox_Test}}/>
                    <Text style={{fontWeight:"bold"}}>{item.key}</Text>
                </TouchableOpacity>  
            )
        })
    }


    CheckDay(){
        if(this.state.isLoaded!=false){
            for(let i=0;i<this.state.data.length;i++){
                if(this.state.data[i].checked)
                    return this.state.data[i].key
            }
        }
    }

    onChecked(name){
        const data = this.state.ClassName
        const index = data.findIndex( x => x.name === name)
        data[index].checked = !data[index].checked
        this.setState({ ClassName: data})  
    }

    onCheckedFrom(id){
        const data = this.state.data
        const index = data.findIndex( x => x.id === id)
        data[index].checked = !data[index].checked
        this.setState({ data: data})  
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>Choose Class To Send Task:</Text>
                    {this.renderClassNameList()}
                    <Text>Task Subject:</Text>
                    <Input
                    testID={'fullname'}
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Subject Name'
                    keyboardType="ascii-capable"
                    onChangeText={(val)=>this.setState({msub:val})}
                    //value={}
                    />
                    <Text>Task Description:</Text>
                    <View>
                    <TextInput
                        style={styles.input}
                        //value={number}
                        placeholder="Task"
                        keyboardType="ascii-capable"
                        multiline
                        numberOfLines={4}
                        onChangeText={text =>this.setState({mdesc:text})}
                    />

                    <Input
                    testID={'data'}
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Data to Finish'
                    keyboardType="ascii-capable"
                    onChangeText={(val)=>this.setState({dtf:val})}
                    //value={}
                    />
                    {/* <Input
                    testID={'fullname'}
                    style={styles.inputField2}
                    blurOnSubmit
                    autoCorrect={false}
                    multiline
                    numberOfLines={4}
                    placeholder='Message'
                    keyboardType="ascii-capable"
                    onChangeText={(val)=>this.setState({mdesc:val})}
                    //value={}
                    /> */}
                    </View>
                    <Button  
                        title="Create Task"
                        onPress={()=>{
                            this.getSelectedDay();

                        }
                        }/>
                </ScrollView>
            </View>
        );    
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
                input: {
                    height: 80,
                    margin: 6,
                    borderRadius: 8,
                    borderWidth: 1,
                    fontSize: 16,
                  },
                inputField: {
                    padding: 10,
                    marginTop: 5,
                    marginBottom: 10,
                    width: 250,
                    //height: windowHeight /15,
                    fontSize: 16,
                    borderRadius: 8,
                    borderWidth: 1
                },
                inputField2: {
                    // padding: 10,
                    // marginTop: 5,
                    // marginBottom: 10,
                    width: 395,
                    height:150,
                    //height: windowHeight /15,
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
            
  
export default CreateTask;