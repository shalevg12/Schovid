export const CREATE_PRESENCE = 'CREATE_PRESENCE';


export const createPresence = (Name,Class,lesson, grade) => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('https://schovid-59af4-default-rtdb.firebaseio.com/presence.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name,
            Class,
            lesson,
            presence
        })
      });
      const resData = await response.json();
    

    dispatch({
      type: CREATE_PRESENCE,
      productData: {
        Name,
        Class,
        lesson,
        presence
      }
    });
  };
};
