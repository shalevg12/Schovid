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


class MakeSchedule extends React.Component {
    constructor(){
        super()
        this.state= {
            day:null,
            timeStart:null,
            timeEnd:null,
            ClassName:[],
            NumOfDays:0,
            NumOfClass:0,
            DayList: ['Sunday','Monday','Tuesday','Wednesday','Thursday'],
            timeS: ['08:00','09:00','10:00','11:00','12:00','13:00'],
            timeE: ['09:00','10:00','11:00','12:00','13:00','14:00'],
            lesson: ['History','English','Hebrew','Computer'],
            data: [],
            data1: [],
            data2:[],
            data3:[],
            cName:null,
            sHour: 0,
            eHour: 0,
            numeoflesson: 0
        }
    }
    componentDidMount(){
        _retrieveData();
        let Temp = this.state.DayList
        let FormatData = []
        for(let i=0;i<Temp.length;i++){
            FormatData.push({
                id:i,
                key:Temp[i],
                checked:false
            })
        }
        this.setState({data: FormatData})
        //TimeStart
        let Temp1 = this.state.timeS
        let FormatData1 = []
        for(let i=0;i<Temp1.length;i++){
            FormatData1.push({
                id:i,
                key:Temp1[i],
                checked:false
            })
        }
        this.setState({data1: FormatData1})

        //TimeEnd
        let Temp2 = this.state.timeE
        let FormatData2 = []
        for(let i=0;i<Temp2.length;i++){
            FormatData2.push({
                id:i,
                key:Temp2[i],
                checked:false
            })
        }
        this.setState({data2: FormatData2})

        //Lesson
        let Temp3 = this.state.lesson
        let FormatData3 = []
        for(let i=0;i<Temp3.length;i++){
            FormatData3.push({
                id:i,
                key:Temp3[i],
                checked:false
            })
        }
        this.setState({data3: FormatData3})


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
        .catch( error => Alert.alert('Error',error.message))
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
            const nameofday=this.CheckDay();
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
            //Starting Hour
            let sHour=null;
            var keysdata1 = this.state.data1.map((t) => t.key)
            const checksdata1 = this.state.data1.map((t) => t.checked)
            for (let i=0;i<checksdata1.length; i++){
                if(checksdata1[i] == true ){
                    console.log("Checking shour: "+keysdata1[i])
                    sHour=keysdata1[i]
                }
            }
            //EndingHour
            let eHour=null;
            var keysdata2 = this.state.data2.map((t) => t.key)
            const checksdata2 = this.state.data2.map((t) => t.checked) 
            for (let i=0;i<checksdata2.length; i++){
                if(checksdata2[i] == true ){
                    eHour=keysdata2[i]
                }
            }
            //Lesson
            var les=null;
            var keysdata3 = this.state.data3.map((t) => t.key)
            const checksdata3 = this.state.data3.map((t) => t.checked)
            for (let i=0;i<checksdata3.length; i++){
                if(checksdata3[i] == true ){
                    les=keysdata3[i]
                }
            }

            console.log("Day: "+nameofday)
            console.log("StartHour: "+sHour)
            console.log("EndHour: "+eHour)
            console.log("ClassName: "+cname)
            console.log("Lesson: "+les)
            const response = await firebase.auth().signInWithEmailAndPassword('HarelElihu@gmail.com', '123123')
            if (response.user.uid) {
                const Schedule = {
                    Day: nameofday,
                    StartHour: sHour,
                    EndHour: eHour,
                    ClassName: cname,
                    Lesson: les
                }
                db.collection('Schedule')
                    .doc(cname)
                    .set(Schedule)
                Alert.alert("Schedule Created!","Schedule Was Created Successfully!")
            }

        } catch (e){
            console.log(e);
            alert(e);
        }
    }

    getSelectedDay(){
        //check days
        var keys = this.state.data.map((t) => t.name)
        const checks = this.state.data.map((t) => t.checked)
        let selected = [] 
        for (let i=0;i<checks.length; i++){
            if(checks[i] == true ){
                selected.push(keys[i])
            }
        }
        this.setState({NumOfDays:selected.length})
        //checks classname
        var keys2 = this.state.ClassName.map((t) => t.name)
        const checks2 = this.state.ClassName.map((t) => t.checked)
        let selected2 = [] 
        for (let i=0;i<checks2.length; i++){
            if(checks2[i] == true ){
                selected2.push(keys2[i])
            }
        }
        this.setState({NumOfClass:selected2.length})
        cName:selected2[0]

        //checks starting hour
        var keys3 = this.state.data1.map((t) => t.key)
        const checks3 = this.state.data1.map((t) => t.checked)
        let selectedSH = [] 
        for (let i=0;i<checks3.length; i++){
            if(checks3[i] == true ){
                selectedSH.push(keys3[i])
            }
        }
        
        //checks ending hour
        var keys4 = this.state.data2.map((t) => t.key)
        const checks4 = this.state.data2.map((t) => t.checked)
        let selectedEH = [] 
        var shourcheck=null;
        for (let i=0;i<checks4.length; i++){
            if(checks4[i] == true ){
                selectedEH.push(keys4[i])
                shourcheck=keys4[i]
                
            }
        }


        //checks number of lessons
        var keys5 = this.state.data3.map((t) => t.key)
        const checks5 = this.state.data3.map((t) => t.checked)
        let selectedL = [] 
        for (let i=0;i<checks5.length; i++){
            if(checks5[i] == true ){
                selectedL.push(keys5[i])
            }
        }

        // console.log("number of days: "+selected.length)
        // console.log("number of class: "+selected2.length)
        //cName=selected2[0]
        if(selected.length == 0 ){
            Alert.alert("Error!","No days selected!")
        }
        if(selected.length == 1 ){
            if(selected2.length == 1 ){
                if(selectedSH.length == 1 ){
                    if(selectedEH.length == 1 ){
                        if(selectedL.length == 1 ){
                            this.RegisterSchedule();
                        }
                        if(selectedL.length == 0 ){
                            Alert.alert("Error!","Didnt Select a Lesson!")
                        }
                        if(selectedL.length > 1 ){
                            Alert.alert("Error!","Selected too many Lessons!")
                        }
                    }
                    if(selectedEH.length == 0 ){
                        Alert.alert("Error!","Didnt Select an Ending Hour!")
                    }
                    if(selectedEH.length > 1 ){
                        Alert.alert("Error!","Selected too many Ending Hours!")
                    }
                }
                if(selectedSH.length == 0 ){
                    Alert.alert("Error!","Didnt Select a Starting Hour!")
                }
                if(selectedSH.length > 1 ){
                    Alert.alert("Error!","Selected too many Starting Hours!")
                }
            }
            if(selected2.length == 0 ){
                Alert.alert("Error!","Didnt Select a Class!")
            }
            if(selected2.length > 1 ){
                Alert.alert("Error!","Too Many Classes selected!")
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

    renderDaysList(){
        if(this.state.isLoaded!=false)
        return this.state.data.map((item,key)=> {
            return(
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" , }} key={key} onPress={()=> 
                {this.onCheckedDay(item.id)}}>
                    <CheckBox value={item.checked} onChange={()=> {this.checkBox_Test}}/>
                    <Text style={{fontWeight:"bold"}}>{item.key}</Text>
                </TouchableOpacity>  
            )
        })
    }

    renderStartTimeList(){
        if(this.state.isLoaded!=false)
        return this.state.data1.map((item,key)=> {
            return(
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" , }} key={key} onPress={()=> 
                {this.onCheckedStartTime(item.id)}}>
                    <CheckBox value={item.checked} onChange={()=> {this.checkBox_Test}}/>
                    <Text style={{fontWeight:"bold"}}>{item.key}</Text>
                </TouchableOpacity>  
            )
        })
    }

    renderEndTimeList(){
        if(this.state.isLoaded!=false)
        return this.state.data2.map((item,key)=> {
            return(
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" , }} key={key} onPress={()=> 
                {this.onCheckedEndTime(item.id)}}>
                    <CheckBox value={item.checked} onChange={()=> {this.checkBox_Test}}/>
                    <Text style={{fontWeight:"bold"}}>{item.key}</Text>
                </TouchableOpacity>  
            )
        })
    }

    renderLessonList(){
        if(this.state.isLoaded!=false)
        return this.state.data3.map((item,key)=> {
            return(
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" , }} key={key} onPress={()=> 
                {this.onCheckedLesson(item.id)}}>
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

    onCheckedStartTime(id){
        const temp1 = this.state.data1
        const index1 = temp1.findIndex( x => x.id === id)
        temp1[index1].checked = !temp1[index1].checked
        this.setState({ data1: temp1})
    }

    onCheckedEndTime(id){
        const temp2 = this.state.data2
        const index2 = temp2.findIndex( x => x.id === id)
        temp2[index2].checked = !temp2[index2].checked
        this.setState({ data2: temp2})
    }

    onCheckedLesson(id){
        const temp3 = this.state.data3
        const index3 = temp3.findIndex( x => x.id === id)
        temp3[index3].checked = !temp3[index3].checked
        this.setState({ data3: temp3})
    }

    onCheckedDay(id){
        const temp = this.state.data
        const index = temp.findIndex( x => x.id === id)
        temp[index].checked = !temp[index].checked
        this.setState({ data: temp})
    }


    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>Choose Class To Enter Schedule:</Text>
                    {this.renderClassNameList()}
                    <Text>Choose Day:</Text>
                    {this.renderDaysList()}
                    <Text>Choose Starting Hour:</Text>
                    {this.renderStartTimeList()}
                    <Text>Choose Ending Hour:</Text>
                    {this.renderEndTimeList()}
                    <Text>Choose Lesson:</Text>
                    {this.renderLessonList()}
                    <Button  
                        title="Enter Schedule"
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
            
  
export default MakeSchedule;