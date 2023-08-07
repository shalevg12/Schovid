// import React, { useEffect, useState } from 'react'; 
// import { render } from 'react-dom';
// import {TouchableOpacity,View, Text, StyleSheet , Button, ScrollView , ActivityIndicator , FlatList, Alert ,setState, CheckBox} from 'react-native';
// import colors from '../../constants/Colors'
// import firebase ,{db} from '../../firebase/fire'
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// import { Checkbox, List } from 'react-native-paper';
// import { ListItem } from 'react-native-elements'
// import Navigation from '../../navigation/Navigation'
// import AsyncStorage from '@react-native-async-storage/async-storage';


// class EditClass extends React.Component {
//     constructor(){
//         super()
//         this.state= {
//             students: null,
//             isLoaded: false,
//             check:true,
//             user:null,
//             userEmail:null,
//             ShowStudentList: false,
//             NumOfStudents: 0,
//             NumOfGrades:0,
//             ClassNameVar:null,
//             GradeYear: ['FirstGrade','SecondGrade','ThirdGrade','FourthGrade','FifthGrade','SixthGrade'],
//             data: [],
//             class:[]
//         }
//     }
//     componentDidMount(){
//         db.collection('Class').get().then( snapshot =>{
//             let classes = []
//             snapshot.forEach( doc =>{
//                 let KEY = Object.keys(doc.data());
//                 console.log("KEYS are :"+KEY);
//                 KEY.forEach( (key_id) => {
//                     if(key_id=='ClassName'){
//                         let cl=doc.data().ClassName
//                         let ct=doc.data().ClassTeacher
//                         let nm=doc.data().number
//                         let sl=doc.data().studentsList
//                         classes.push({
//                             classname:cl,
//                             classteacher:ct,
//                             classstudentsnum:nm,
//                             classstudnets:sl
//                         })
//                         console.log("ClassName: "+doc.data().ClassName)
//                         console.log("ClassTeacher: "+doc.data().ClassTeacher)
//                         console.log("Number: "+doc.data().number)
//                         console.log("StudentList: "+doc.data().studentsList)
//                     }
//                 })
//             })
//             this.setState({ class: classes})
//             this.setState({isLoaded:true})
//             console.log("class:"+this.state.class.classname)
//             //getStudentsOnQeueu();
//         })
//         .catch( error => Alert.alert('Error',error.message))
//     }

//     // RegisterClass =(id)= async() =>{ 
//     //     try{
//     //         const nameofclass=this.CheckClassName();
//     //         console.log("nameofclass: "+nameofclass)
//     //         var keys = this.state.students.map((t) => t.fullname)
//     //         const checks = this.state.students.map((t) => t.checked)
//     //         let selected = [] 
//     //         for (let i=0;i<checks.length; i++){
//     //             if(checks[i] == true ){
//     //                 selected.push(keys[i])
//     //             }
//     //         }
//     //         const Teacher = this.state.user;
//     //         //console.log("Teacher name : "+Teacher)
//     //         //console.log("User is: " + this.state.user)
//     //         //console.log("Students to update: "+selected)
//     //         const response = await firebase.auth().signInWithEmailAndPassword('HarelElihu@gmail.com', '123123')
//     //         if (response.user.uid) {
//     //             const Class = {
//     //                 ClassName:nameofclass,
//     //                 ClassTeacher: "Harel Elihu",
//     //                 number: this.state.NumOfStudents,
//     //                 studentsList: selected
//     //             }
//     //             db.collection('Class')
//     //                 .doc(nameofclass)
//     //                 .set(Class)
//     //             for(let i=0;i<selected.length;i++){
//     //                 console.log(selected[i])
//     //                 db.collection('Child').doc(selected[i]).update({class: nameofclass});
//     //             }
//     //             Alert.alert("Class Created!","Class Was Created Successfully!")

//     //             // db.collection('Child').get().then( snapshot =>{
//     //             //     const students = []
//     //             //     snapshot.forEach( doc =>{
//     //             //         const KEY = Object.keys(doc.data());
//     //             //         //console.log("KEYS is :"+KEY);
//     //             //         KEY.forEach( (key_id) => {
//     //             //             if(key_id=='class'){
//     //             //                 if(doc.data().class == null ){
//     //             //                     const data = doc.data()
//     //             //                     //console.log(data)
//     //             //                     students.push(data)
//     //             //                     //console.log('name is:'+doc.data().fullname)
//     //             //                 }
//     //             //             }
//     //             //             else{
        
//     //             //             }
//     //             //         })
//     //             //     })
//     //         }

//     //     } catch (e){
//     //         console.log(e);
//     //         alert(e);
//     //     }
//     // }

//     // getSelectedStudents(){
//     //     var keys = this.state.students.map((t) => t.fullname)
//     //     const checks = this.state.students.map((t) => t.checked)
//     //     let selected = [] 
//     //     for (let i=0;i<checks.length; i++){
//     //         if(checks[i] == true ){
//     //             selected.push(keys[i])
//     //         }
//     //     }

//     //     var keysG = this.state.data.map((t) => t.id)
//     //     const checksG = this.state.data.map((t) => t.checked)
//     //     let selectedG = [] 
//     //     for (let i=0;i<checksG.length; i++){
//     //         if(checksG[i] == true ){
//     //             selectedG.push(keysG[i])
//     //         }
//     //     }
//     //     this.state.NumOfGrades = selectedG.length
//     //     this.state.NumOfStudents = selected.length
        
//     //     if(this.state.NumOfStudents == 0 ){
//     //         Alert.alert("Error!","No students selected!")
//     //     }
//     //     if(this.state.NumOfGrades == 1){
//     //         if(this.state.NumOfStudents>0){
//     //             //RegisterClass();
//     //             //Alert.alert("Selected Students:",""+selected)
//     //             //alert("Should Register Class Now!")
//     //             //this.CheckClassName()
//     //             this.RegisterClass()
//     //         }
//     //     }
//     //     if(this.state.NumOfGrades != 1){
//     //         Alert.alert("Invalid!","Invalid Number of classes chosen!")
//     //     }
//     // };

//     // renderStudentList(){
//     //     if(this.state.isLoaded!=false)
//     //     return this.state.students.map((item,key)=> {
//     //         return(
//     //             <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" , }} key={key} onPress={()=> 
//     //             {this.onChecked(item.fullname)}}>
//     //                 <CheckBox value={item.checked} onChange={()=> {this.checkBox_Test}}/>
//     //                 <Text style={{fontWeight:"bold"}}>{item.fullname}</Text>
//     //                 {/* {(console.log('Key:'+ key))} */}
//     //             </TouchableOpacity>
//     //         )
//     //     })
//     // }

//     // renderClassList(){
//     //     if(this.state.isLoaded!=false)
//     //     return this.state.data.map((item,key)=> {
//     //         return(
//     //             <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" , }} key={key} onPress={()=> 
//     //             {this.onCheckedGrade(item.id)}}>
//     //                 <CheckBox value={item.checked} onChange={()=> {this.checkBox_Test}}/>
//     //                 <Text style={{fontWeight:"bold"}}>{item.key}</Text>
//     //                 {/* {(console.log('Key:'+ key))} */}
//     //             </TouchableOpacity>  
//     //         )
//     //     })
//     // }

//     // CheckClassName(){
//     //     if(this.state.isLoaded!=false){
//     //         for(let i=0;i<this.state.data.length;i++){
//     //             if(this.state.data[i].checked)
//     //                 return this.state.data[i].key
//     //         }
//     //     }
//     //     // return this.state.data.map((item,key)=>{
//     //     //     if(item.checked==true){
//     //     //         this.setState({ClassNameVar : item.key})
//     //     //         console.log("fromCheckClassName:" +item.key)
//     //     //         //this.RegisterClass(item.key)
//     //     //         return item.key
//     //     //     }
//     //     // })
//     // }

//     // onChecked(fullname){
//     //     const data = this.state.students
//     //     const index = data.findIndex( x => x.fullname === fullname)
//     //     //console.log('id is '+ fullname)
//     //     //console.log('index is '+index)
//     //     data[index].checked = !data[index].checked
//     //     this.setState({ students: data})  
//     // }

//     // onCheckedGrade(id){
//     //     const temp = this.state.data
//     //     const index = temp.findIndex( x => x.id === id)
//     //     //console.log('id is '+ fullname)
//     //     //console.log('index is '+index)
//     //     temp[index].checked = !temp[index].checked
//     //     this.setState({ data: temp})
//     // }

//     renderStudentList(){
//         if(this.state.isLoaded!=false)
//         return this.state.class.map((item,key)=> {
//             return(
//                 <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" , }} key={key} onPress={()=> 
//                 {this.onChecked(item.fullname)}}>
//                     <CheckBox value={this.state.students.checked} onChange={()=> {this.checkBox_Test}}/>
//                     <Text style={{fontWeight:"bold"}}>{item.fullname}</Text>
//                 </TouchableOpacity>
//             )
//         })
//     }

//     clickEventListener(item) {
//         Alert.alert(item.fullname, item.email)
//     }

//     onChecked(id){
//         const data = this.state.students
//         const index = data.findIndex(x => x.id === id);
//         console.log('id is '+ id)
//         console.log('index is '+index)
//         const isInList = false;
//         const checked = []
//         if(checked.length > 0){
//             console.log('checked length wasnt 0')
//             for(let i=0;i<checked.length;i++){
//                 //console.log('checked list is:'+checked[i])
//                 if(checked[i]==data[index])
//                     isInList = true;
//             }
//             if(isInList== false)
//                 checked.push(data[index]);
//         }
//         else{
//             console.log('checked length was 0')
//             console.log('data is' + data[index])
//             checked.push(data[index]);
//         }
//         this.setState({ checked: checked})
        
//     }

//     getSelectedStudents(){
//         var keys = this.state.students.map((t) => t.key)
//         const checks = this.state.students.map((t) => t.checked)
//         let selected = [] 
//         for (let i=0;i<checks.length; i++){
//             if(checks[i] == true ){
//                 selected.push(keys[i])
//             }
//         }
//         console.log(selected)
//     }

//     render(){
//         if(this.state.isLoaded)
//         return (
//         <View style={styles.container}>
//             <FlatList style={styles.list}
//                 contentContainerStyle={styles.listContainer}
//                 data={this.state.students}
//                 horizontal={false}
//                 numColumns={2}
//                 keyExtractor= {(item) => {
//                 return item.fullname;
//             }}
//             renderItem={({item}) => {
//                 return (
//                 <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
//                     <View style={styles.cardFooter}>
//                         <View style={{alignItems:"center", justifyContent:"center"}}>
//                             <Text style={styles.name}>{item.ClassName}</Text>
//                             <Text style={styles.position}>{item.ClassTeacher}</Text>
//                             <TouchableOpacity style={styles.UpdateButton} onPress={()=> this.clickEventListener(item)}>
//                                 <Text style={styles.UpdateButtonText}>Enter Grades</Text>  
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//                 )
//             }}/>
//         </View>
//         );  
//         else{
//             return(
//                 <View>
//                     <Text>Still Loading, Please wait!</Text>
//                 </View>
//             )
//         }  
//     }
// }
            
//             const styles = StyleSheet.create({
//                 screen: {
//                     marginTop: 5,
//                     marginBottom: 10,
//                     width: '100%',
//                     //height: windowHeight /15,
//                     borderColor: '#acc',
//                     borderRadius: 3,
//                     borderWidth: 1,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     backgroundColor: '#fff'
//                 },
//                 InputContainer: {
//                     padding: 10,
//                     flex: 1,
//                     fontSize: 16,
//                     color: '#333',
//                     justifyContent: 'center',
//                     alignItems: 'center'
//                 },
//                 inputField: {
//                     padding: 10,
//                     marginTop: 5,
//                     marginBottom: 10,
//                     fontSize: 16,
//                     borderRadius: 8,
//                     borderWidth: 1
//                 },
//                 container: {
//                     flex: 1,
//                     paddingBottom: 22
//                 },
//                 preloader: {
//                   left: 0,
//                   right: 0,
//                   top: 0,
//                   bottom: 0,
//                   position: 'absolute',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 },
//                 UpdateButton: {
//                     marginTop:10,
//                     height:45,
//                     width:150,
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     borderRadius:30,
//                     backgroundColor: "#00BFFF",
//                   },
//                 UpdateButtonText:{
//                     color: "#FFFFFF",
//                     fontSize:18,
//                   },
//                   card:{
//                     shadowColor: '#00000021',
//                     shadowOffset: {
//                       width: 0,
//                       height: 6,
//                     },
//                     shadowOpacity: 0.37,
//                     shadowRadius: 7.49,
//                     elevation: 12,
                
//                     marginVertical: 5,
//                     backgroundColor:"white",
//                     flexBasis: '46%',
//                     marginHorizontal: 5,
//                   },
//                   cardFooter: {
//                     paddingVertical: 17,
//                     paddingHorizontal: 16,
//                     borderTopLeftRadius: 1,
//                     borderTopRightRadius: 1,
//                     flexDirection: 'row',
//                     alignItems:"center", 
//                     justifyContent:"center"
//                   },
//                   list: {
//                     paddingHorizontal: 5,
//                     backgroundColor:"#E6E6E6",
//                   },
//                   listContainer:{
//                    alignItems:'center'
//                   },
//                   name:{
//                     fontSize:18,
//                     flex:1,
//                     alignSelf:'center',
//                     color:"#008080",
//                     fontWeight:'bold'
//                   },
//                   position:{
//                     fontSize:14,
//                     flex:1,
//                     alignSelf:'center',
//                     color:"#696969"
//                   }
                  
//             })
            
  
// export default EditClass;