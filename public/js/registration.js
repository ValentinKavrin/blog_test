document.forms.registration.onsubmit = async function (event) {
    event.preventDefault()
    try {
        const user = {
            login: this.login.value,
            firstName: this.firstName.value,
            secondName: this.secondName.value,
            password: this.password.value
        }
        const res = await fetch('http://localhost:5000/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        if (res.status === 201){
            document.location.href = './login.html'
        } else {
            alert('Something went wrong')
        }
    } catch (error) {
        alert(error)
    }
    return false
};