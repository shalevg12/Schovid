import React, { useEffect, useState } from 'react'; 
import { render } from 'react-dom';
import {TouchableOpacity,View, Text, StyleSheet , Button, ScrollView , ActivityIndicator , FlatList, Alert ,setState, CheckBox} from 'react-native';
import colors from '../../constants/Colors'
import firebase ,{db} from '../../firebase/fire'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Checkbox, List } from 'react-native-paper';
import { ListItem } from 'react-native-elements'

class MakeAClass extends React.Component {
    constructor(){
        super()
        this.state= {
            students: null,
            isLoaded: false,
            check:true,
            user:null
        }
    }
   
    // getStudentsOnQeueu = async () => {
    //     let students = await this.studentsRef.orderByChild("fullname")
    //     return students
    //   }
    componentDidMount(){
        // console.log('mounted')
        // db.collection('Teacher').get().then( snapshot =>{
        //     const students = []
        //     snapshot.forEach( doc =>{
        //         KEY = Object.keys(doc.data());
        //         console.log("KEYS are :"+KEY);
        //         KEY.forEach( (key_id) => {
        //             if(key_id=='fullname'){
        //                 const data = doc.data()
        //                 console.log(data)
        //                 students.push(data)
        //                 console.log('name is:'+doc.data().fullname)
        //             }
        //             else{

        //             }
        //         })
        //     })
        //     this.setState({ students: students})
        //     this.setState({isLoaded:true})
        //     //getStudentsOnQeueu();
        // }
        _retrieveData();
        console.log('mounted')
        db.collection('Child').get().then( snapshot =>{
            const students = []
            snapshot.forEach( doc =>{
                const KEY = Object.keys(doc.data());
                console.log("KEYS is :"+KEY);
                KEY.forEach( (key_id) => {
                    if(key_id=='class'){
                        if(doc.data().class == null ){
                            const data = doc.data()
                            console.log(data)
                            students.push(data)
                            console.log('name is:'+doc.data().fullname)
                            //names.push(doc.data().fullname)
                        }
                    }
                    else{

                    }
                })
            })
            this.setState({ students : students})
            this.setState({isLoaded: true})
            //this.students=students;
            //isLoaded=true;

        }
        )
        .catch( error => Alert.alert('Error',error.message))
    }

    _retrieveData= async () => {
        try{
            AsyncStorage.getItem('TeacherFullname')
                .then(value => {
                    if(value!= null) {
                        setUser(value)
                    }
                })
        } catch (error){
            console.warn(error)
        }
    } 
    
    signup = async() =>{ 
        try{
            const response = await Firebase.auth().signInWithEmailAndPassword('Elihu222@gmail.com', '123123')
            if (response.user.uid) {
                const Class = {
                    fullname: FullnameInput,
                    number:numberInput,
                    students:studentsInput,    
                }
                db.collection('Classes')
                    .doc(FullnameInput)
                    .set(Class)

                props.navigation.navigate({routeName: 'TeacherProfile'});
            }

        } catch (e){
            console.log(e);
            alert(e);
        }
    }

    renderStudentList(){
        if(this.state.isLoaded!=false)
        return this.state.students.map((item,key)=> {
            return(

                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" , }} key={key} onPress={()=> 
                {this.onChecked(item.fullname)}}>
                    <CheckBox value={this.state.students.checked} onChange={()=> {this.checkBox_Test}}/>
                    <Text style={{fontWeight:"bold"}}>{item.fullname}</Text>
                </TouchableOpacity>
                /* <CheckBox
                    uncheckedColor={'#b3b4b5'}
                    checkedColor={"#911830"}
                    title = {item.fullname}
                    checkedIcon="stop"
                    checked={item.checked}
                    onPress={()=>this.onChecked(item.fullname)}
                /> */
                // <View>
                //     <CheckBox
                //         value={this.state.checked}
                //         onClick={() => this.value = !this.value}
                //         />
                //     <Text>{item.fullname}</Text>
                // </View>
            )
        })
    }

    clickEventListener(item) {
        Alert.alert(item.fullname, item.email)
    }

    onChecked(id){
        const data = this.state.students
        const index = data.findIndex(x => x.id === id);
        console.log('id is '+ id)
        console.log('index is '+index)
        const isInList = false;
        const checked = []
        if(checked.length > 0){
            console.log('checked length wasnt 0')
            for(let i=0;i<checked.length;i++){
                if(checked[i]==data[index])
                    isInList = true;
            }
            if(isInList== false)
                checked.push(data[index]);
        }
        else{
            console.log('checked length was 0')
            console.log('data is' + data[index])
            checked.push(data[index]);
        }
        this.setState({ checked: checked})  
    }

    // getSelectedStudents(){
    //     var keys = this.state.students.map((t) => t.key)
    //     const checks = this.state.students.map((t) => t.checked)
    //     let selected = [] 
    //     for (let i=0;i<checks.length; i++){
    //         if(checks[i] == true ){
    //             selected.push(keys[i])
    //         }
    //         if(isInList== false)
    //             checked.push(data[index]);
    //     }
    //     else{
    //         console.log('checked length was 0')
    //         console.log('data is' + data[index])
    //         checked.push(data[index]);
    //     }
    //     this.setState({ checked: checked})
    // }

    getSelectedStudents(){
        var keys = this.state.students.map((t) => t.key)
        const checks = this.state.students.map((t) => t.checked)
        let selected = [] 
        for (let i=0;i<checks.length; i++){
            if(checks[i] == true ){
                selected.push(keys[i])
            }
        }
        console.log(selected)
    }

    render(){
        return (
            // <View style={styles.InputContainer}>
            //     <Text>Enter Grades</Text>
            //     <FlatList 
            //     data = {this.state.students}
            //     renderItem ={({item}) =>
            //         // <RadioButton
            //         //     value ={item.fullname}
            //         //     onPress={() => this.checked=value}
            //         // />
            //     <Text>
            //         {`Student name: ${item.fullname}\n`}
            //         {`Email is: ${item.email}`}
            //     </Text>
            //     }
            //     />
            //     <RadioForm
            //         radio_props={this.dataList}
                    
            //         onPress={(value) => {this.setState({value:value})}}
            //     />
            // {this.renderStudentList()}
            // {/* <Button
            //         title="Update Students "
            //         onPress={() => {
            //         {this.getSelectedStudents}}
            //         }
            //     /> */}
            // </View>

            // <View>
            //     {this.state.students.map((item,index) =>(
            //         <ListItem key={index}>
            //             <Checkbox
            //                 style={{marginRight: 30}}
            //                 checked={this.state.deletionArray.includes(index)}
            //                 />
            //                 <body>
            //                     <Text>{item.fullname}</Text>
            //                 </body>
            //         </ListItem>
            //     ))}
            // </View>


            //works from here on!!
        <View style={styles.container}>
            <FlatList style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={this.state.students}
                horizontal={false}
                numColumns={3}
                keyExtractor= {(item) => {
                return item.fullname;
            }}
            renderItem={({item}) => {
                if(item.class==null){
                    return (
                        <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
                            <View style={styles.cardFooter}>
                                <View style={{alignItems:"center", justifyContent:"center"}}>
                                    <Text style={styles.name}>{item.fullname}</Text>
                                    <Text style={styles.position}>No Assigned Class!</Text>
                                    <TouchableOpacity style={styles.UpdateButton} onPress={()=> this.clickEventListener(item)}>
                                        <Text style={styles.UpdateButtonText}>Assign Class</Text>  
                                    </TouchableOpacity>
                                </View>
                            </View>
                      </TouchableOpacity>
                    )
                }
                else{
                    return (
                        <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
                            <View style={styles.cardFooter}>
                                <View style={{alignItems:"center", justifyContent:"center"}}>
                                    <Text style={styles.name}>{item.fullname}</Text>
                                    <Text style={styles.position}>{item.class}</Text>
                                </View>
                            </View>
                      </TouchableOpacity>
                    )
                }

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
            
  
export default MakeAClass;