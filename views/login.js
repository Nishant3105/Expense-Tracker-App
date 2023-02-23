const form=document.querySelector('form')

form.addEventListener('submit',userLogin)

async function userLogin(e){
    e.preventDefault()
    const email=document.getElementById('email').value
    const password=document.getElementById('password').value

    let my_obj={
        email,
        password
    }
    console.log(my_obj)

    const res=await axios.post('http://localhost:4000/user/login', my_obj)
    document.innerHTML=`${res}`
}