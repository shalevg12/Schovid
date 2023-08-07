export const CREATE_GRADE = 'CREATE_GRADE';


export const createGrade = (Name,Class,lesson, grade) => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('https://schovid-59af4-default-rtdb.firebaseio.com/Grades.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name,
            Class,
            lesson,
             grade
        })
      });
      const resData = await response.json();
    

    dispatch({
      type: CREATE_GRADE,
      productData: {
        Name,
        Class,
        lesson,
         grade
      }
    });
  };
};
