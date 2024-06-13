const sendStringToServer = async (img1, img2) => {
    try {
        var output = {}
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            picture1: img1,
            picture2: img2,
         }),
      }).then( (r) => r.json())
        .then((data) => {output=data})
        .catch(error=> {console.log(error)});
        // .then( (responsejson) => console.log(responsejson));
    //   const data = await response.json();
    //   console.log(response); // Log the response from the server
      return output;
    } catch (error) {
      console.error('Error sending string:', error);
    }
}

const sendbackServer = async (sendback) => {
    try {
        var output = '';
      const response = await fetch('http://localhost:5000/send', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            result: sendback
         }),
      }).then( (r) => r.json())
        .then((data) => {output=data.result} )
        .catch(error=> {console.log(error)});
        // .then( (responsejson) => console.log(responsejson));
    //   const data = await response.json();
    //   console.log(response); // Log the response from the server
      return output;
    } catch (error) {
      console.error('Error sending string:', error);
    }
}

export {sendStringToServer, sendbackServer};