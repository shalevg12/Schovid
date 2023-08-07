import React from "react";
import renderer from "react-test-renderer";
import App from '../App';
import FirstScreen from "../screens/FirstScreen";
import TeacherSignUp from "../screens/Teacher/TeacherSignUp";
import TeacherSignIn from "../screens/Teacher/TeacherSignIn";
import ParentSignUp from "../screens/Parent/ParentSignUp";
import ParentSignIn from "../screens/Parent/ParentSignIn";
import TypeSignIn from "../screens/TypeSignin";

/*test('Open first screen', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).dispatch(FirstScreen);
});

it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<Button onClick={mockCallBack}>Ok!</Button>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
});*/

test('renders correctly across screens', () => {
    const tree = renderer.create().toJSON();
    expect(tree).toMatchSnapshot();
}); 

/*test('renders TypeSignIn screen', () => {
    const tree = renderer.create(<TypeSignIn/>).toJSON();
    //expect(tree.children.TypeSignIn).toMatchSnapshot();
});*/ 

let FindElement = function (tree ,element) {
    let result = undefined;
    for (node in tree.children){
        if (tree.children[node].props.testID ==  element)
            result = true;
    }
    return result;
}

//----Checks TeacherSignUp---
it('Find Element Fullname in TeacherSignUp', () =>{
    let tree =renderer.create(
        <TeacherSignUp/>).toJSON();
    
    expect(FindElement(tree, 'fullname')).toBeDefined();
})

it('Find Element Email in TeacherSignUp', () =>{
    let tree =renderer.create(
        <TeacherSignUp/>).toJSON();
    
    expect(FindElement(tree, 'fullname')).toBeDefined();
})

it('Find Element Phone in TeacherSignUp', () =>{
    let tree =renderer.create(
        <TeacherSignUp/>).toJSON();
    
    expect(FindElement(tree, 'phone')).toBeDefined();
})

it('Find Element ID in TeacherSignUp', () =>{
    let tree =renderer.create(
        <TeacherSignUp/>).toJSON();
    
    expect(FindElement(tree, 'id')).toBeDefined();
})

it('Find Element Pass in TeacherSignUp', () =>{
    let tree =renderer.create(
        <TeacherSignUp/>).toJSON();
    
    expect(FindElement(tree, 'password')).toBeDefined();
})

//----Checks TeacherSignIn---

it('Find Element Email in TeacherSignIn', () =>{
    let tree =renderer.create(
        <TeacherSignIn/>).toJSON();
    
    expect(FindElement(tree, 'email')).toBeDefined();
})

it('Find Element Pass in TeacherSignIn', () =>{
    let tree =renderer.create(
        <TeacherSignIn/>).toJSON();
    
    expect(FindElement(tree, 'password')).toBeDefined();
})

//----Checks ParentSignUp---
it('Find Element Fullname in ParentSignUp', () =>{
    let tree =renderer.create(
        <ParentSignUp/>).toJSON();
    
    expect(FindElement(tree, 'fullname')).toBeDefined();
})

it('Find Element Email in ParentSignUp', () =>{
    let tree =renderer.create(
        <ParentSignUp/>).toJSON();
    
    expect(FindElement(tree, 'fullname')).toBeDefined();
})

it('Find Element Phone in ParentSignUp', () =>{
    let tree =renderer.create(
        <ParentSignUp/>).toJSON();
    
    expect(FindElement(tree, 'phone')).toBeDefined();
})

it('Find Element ID in ParentSignUp', () =>{
    let tree =renderer.create(
        <ParentSignUp/>).toJSON();
    
    expect(FindElement(tree, 'id')).toBeDefined();
})

it('Find Element Pass in ParentSignUp', () =>{
    let tree =renderer.create(
        <ParentSignUp/>).toJSON();
    
    expect(FindElement(tree, 'password')).toBeDefined();
})

//----Checks ParentSignIn---
it('Find Element Email in ParentSignIn', () =>{
    let tree =renderer.create(
        <ParentSignIn/>).toJSON();
    
    expect(FindElement(tree, 'email')).toBeDefined();
})

it('Find Element Pass in ParentSignIn', () =>{
    let tree =renderer.create(
        <ParentSignIn/>).toJSON();
    
    expect(FindElement(tree, 'password')).toBeDefined();
})

// it('Move to Login screen', () => {
//     let FirstScreenPage = renderer.create(<FirstScreen />).getInstance();
//     FirstScreenPage.
//   });