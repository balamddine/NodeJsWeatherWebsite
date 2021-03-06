    // this function is used in all modern browser 
    //on client side javascript ( it will not run in server side nodejs application)
    // fetch('http://puzzle.mead.io/puzzle').then((response) => {
    //     response.json().then((data) => {
    //         console.log(data)
    //     })
    // })



    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');

    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';
        const location = search.value;
        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }

            })
        })
    })