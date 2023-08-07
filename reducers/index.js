//import { from } from 'core-js/core/array'
import { combineReducers } from 'redux'
import { LOGIN, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD , SIGNOUT} from '../actions/user'
import{CREAT_GRADE}from '../actions/Grades'
import App from '../App'
import Grade from '../models/Grade'
import Grades from '../screens/Child/Grades'
import{CREATE_GRADE} from '../actions/Grades'
const initialState = {
    availableProducts: Grades,
    
  };

const user = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload
        case SIGNUP:
            return action.payload
        case SIGNOUT:
            return action.payload
        case UPDATE_EMAIL:
            return { ...state, email: action.payload }
        case UPDATE_PASSWORD:
            return { ...state, password: action.payload }
            //case CREAT_GRADE:
               // return {...state,grade:action.payload}
                case CREATE_GRADE:
      const newGrade = new Grade(
        action.gradeData.name,
        action.gradeData.Class,
        action.gradeData.lesson,
        action.gradeData.grade,
        );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newGrade),
        userProducts: state.userProducts.concat(newGrade)
      };
               
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user
})

export default rootReducer