document.forms.login.onsubmit = async function (event) {
    event.preventDefault()
    try {
        const user = {
            login: this.login.value,
            password: this.password.value
        }
        const res = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        if (res.status === 200){
            const token = await res.json()
            localStorage.setItem('token', token)
            document.location.href = './index.html'
        } else {
            alert('Something went wrong')
        }
    } catch (error) {
        alert(error)
    }
    return false
};