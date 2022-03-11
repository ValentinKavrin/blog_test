let parent = document.querySelector('#container');

async function getPosts() {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch('http://localhost:5000/api/posts/user/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        const posts = await res.json()
        renderPosts(posts)
    } catch (error) {
        alert(error);
    }
}

function renderPosts(posts) {
    posts.forEach(element => {
        addPost(element)
    });
}

function addPost(postData) {
    let post = document.createElement('div');
    post.classList.add('post-item')

    let title = document.createElement('h1');
    title.classList.add('post-item__title')
    title.innerHTML = postData.title
    post.appendChild(title)

    let login = document.createElement('p');
    //login.classList.add('post-item__title')
    login.innerHTML = postData.login
    post.appendChild(login)

    let text = document.createElement('p');
    //login.classList.add('post-item__title')
    text.innerHTML = postData.text
    post.appendChild(text)

    let data = document.createElement('p');
    //login.classList.add('post-item__title')
    data.innerHTML = postData.createdAt
    post.appendChild(data)

    parent.appendChild(post);
}

document.body.onload = getPosts()
