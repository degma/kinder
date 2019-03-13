
const categories = async () => {
    try {
        const requestBody = {
            query: `
                  query {
                    categories {
                      _id
                      name
                    }
                  }
                `
        };
    
        fetch('http://localhost:8080/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                const catlist = resData.data.categories;
                console.log("martinnnnnnnnnnnn" +catlist);
                return catlist;
    
            })
            .catch(err => {
                console.log(err);
            });

    } catch (err) {
        throw err;
      }
        

}

export const catList = categories;