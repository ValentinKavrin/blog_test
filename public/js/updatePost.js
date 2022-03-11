const form = document.getElementById("form");

form.onsubmit = async function (event) {
    event.preventDefault()
    try {
        const token = localStorage.getItem('token')
        const res = await fetch('http://localhost:5000/api/post/', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: new FormData(form)
        })
        if (res.status === 201){
            document.location.href = './index.html'
        } else {
            alert('Something went wrong')
        }
    } catch (error) {
        alert(error)
    }
    return false
};