import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';


import colors from '../constants/Colors'


import FirstScreen from '../screens/FirstScreen'
import TypeSignin from '../screens/TypeSignin';

import ParentLogin from '../screens/Parent/ParentLogin'
import ParentProfile from '../screens/Parent/ParentProfile'
import ParentSignUp from '../screens/Parent/ParentSignUp'
import ParentSignIn from '../screens/Parent/ParentSignIn'
import GreenTav from '../screens/Parent/GreenTav'

import TeacherLogin from '../screens/Teacher/TeacherLogin'
import TeacherProfile from '../screens/Teacher/TeacherProfile'

import TeacherSignIn from '../screens/Teacher/TeacherSignIn'
import TeacherSignUp from '../screens/Teacher/TeacherSignUp'


import PresenceCorrection from '../screens/Teacher/PresenceCorrection'
import ScoreCorrection from '../screens/Teacher/ScoreCorrection'



import createClass from '../screens/Teacher/createClass'
import ViewPresence from '../screens/Teacher/ViewPresence'
import ViewGrades from '../screens/Teacher/ViewGrades'
import EnterGrades from  '../screens/Teacher/EnterGrades'
import SubtractionConfirmation from '../screens/Teacher/SubtractionConfirmation'

import EnterPresence from  '../screens/Teacher/EnterPresence'
import WatchGrades from '../screens/Child/WatchGrades'
import WatchPresence from '../screens/Child/WatchPresence'

import ChildLogin from '../screens/Child/ChildLogin'
import ChildProfile from '../screens/Child/ChildProfile'
import ChildSignUp from '../screens/Child/ChildSignUp'
import ChildSignIn from '../screens/Child/ChildSignIn'
import SchoolDetails from '../screens/Child/SchoolDetails'
import TeacherDetails from '../screens/Child/TeacherDetails'
import Signup from '../screens/Signup';
import ChildProfiles from '../screens/Parent/ChildProfiles2';
import WatchClass from '../screens/Child/WatchClass';
import MakeClass from '../screens/Teacher/MakeClass'
import MakeAClass from '../screens/Teacher/MakeAClass'
import EditClass from '../screens/Teacher/EditClass'
import ClassDetails from '../screens/Teacher/ClassDetails'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PersonalDetails from '../screens/Teacher/PersonalDetails'

import MakeSchedule from '../screens/Teacher/MakeSchedule'
import PPersonalDetails from '../screens/Parent/PPersonalDetails'
import CPersonalDetails from '../screens/Child/CPersonalDetails'
import MsgToTeacher from '../screens/Child/MsgToTeacher'
import WatchMessages from '../screens/Child/WatchMessages'

import CreateTask from '../screens/Teacher/CreateTask'
import Msgs from '../screens/Teacher/Msgs'
import SendMessage from '../screens/Teacher/SendMessage'
import WatchScheduale from '../screens/Child/WatchScheduale'

//import ParentSignUp from '../screens/Parent/ParentSignUp' //Invariant Violation
//import ParentSignIn from '../screens/Parent/ParentSignIn' //Invariant Violation


const AppNavigator = createStackNavigator({
    //App Pages
    FirstScreen:{ screen: FirstScreen ,headerTitle: 'Schovid'},
    TypeSignin:{ screen: TypeSignin ,headerTitle: 'Schovid',},
    Signup:{screen: Signup ,headerTitle: 'Schovid',},

    //Parent Pages
    ParentSignUp:{ screen:  ParentSignUp ,headerTitle: 'Schovid'},
    ParentLogin:{ screen:  ParentLogin ,headerTitle: 'Schovid'},
    ParentProfile:{ screen:  ParentProfile ,headerTitle: 'Schovid'},
    ParentSignIn: {screen:  ParentSignIn ,headerTitle: 'Schovid'},
    ChildProfiles: {screen: ChildProfiles, headerTitle: 'Schovid'},
    GreenTav:{ screen: GreenTav ,headerTitle: 'Schovid'},
    TeacherDetails:{ screen: TeacherDetails ,headerTitle: 'Schovid'},
    PPersonalDetails : { screen:  PPersonalDetails ,headerTitle: 'Schovid'},

    //Teacher Pages
    TeacherSignIn:{ screen:  TeacherSignIn ,headerTitle: 'Schovid'},
    TeacherSignUp:{ screen:  TeacherSignUp ,headerTitle: 'Schovid'},
    TeacherLogin:{ screen:  TeacherLogin ,headerTitle: 'Schovid'},
    TeacherProfile:{ screen:  TeacherProfile ,headerTitle: 'Schovid'},
    EnterGrades:{ screen:  EnterGrades ,headerTitle: 'Schovid'},
    EnterPresence:{ screen: EnterPresence ,headerTitle: 'Schovid'},
    MakeClass: { screen: MakeClass, headerTitle: 'Schovid'},
    MakeAClass: { screen: MakeAClass, headerTitle: 'Schovid'},
    EditClass: { screen: EditClass,headerTitle:'Schovid'},
    ClassDetails: { screen: ClassDetails,headerTitle:'Schovid'},
    PersonalDetails: {screen : PersonalDetails,headerTitle:'Schovid'},
    MakeSchedule : {screen : MakeSchedule,headerTitle:'Schovid'},
    CreateTask: {screen: CreateTask,headerTitle:'Schovid'},
    SendMessage: { screen:SendMessage,headerTitle:'Schovid'},
    Msgs: {  screen:Msgs,headerTitle:'Schovid'},



    ScoreCorrection:{ screen: ScoreCorrection ,headerTitle: 'Schovid'},
                                          
    ViewGrades:{ screen: ViewGrades ,headerTitle: 'Schovid'},
    ViewPresence :{screen:ViewPresence,headerTitle: 'Schovid'},
    createClass :{screen:createClass,headerTitle:'Schovid'},
    SubtractionConfirmation :{screen:SubtractionConfirmation,headerTitle:'Schovid'},
    PresenceCorrection:{ screen:  PresenceCorrection ,headerTitle: 'Schovid'},

    //Child Pages
    ChildSignIn:{ screen:  ChildSignIn ,headerTitle: 'Schovid'},
    ChildSignUp:{ screen:  ChildSignUp ,headerTitle: 'Schovid'},
    ChildLogin:{ screen:  ChildLogin ,headerTitle: 'Schovid'},
    ChildProfile:{ screen:  ChildProfile ,headerTitle: 'Schovid'},
    WatchGrades:{ screen:  WatchGrades ,headerTitle: 'Schovid'},
    SchoolDetails:{screen: SchoolDetails,headerTitle:'Schovid'},
    WatchPresence:{ screen:  WatchPresence ,headerTitle: 'Schovid'},
    WatchClass: { screen:  WatchClass ,headerTitle: 'Schovid'},
    CPersonalDetails : { screen:  CPersonalDetails ,headerTitle: 'Schovid'},
    MsgToTeacher: {screen: MsgToTeacher,headerTitle:'Schovid'},
    WatchMessages: {screen: WatchMessages,headerTitle:'Schovid'},
    WatchScheduale: {screen: WatchScheduale,headerTitle:'Schovid'},

    Signup:{ screen:  Signup ,headerTitle: 'Schovid'}

},
{
    defaultNavigationOptions : {
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTintColor: colors.title
    }
}
);

export default createAppContainer(AppNavigator);