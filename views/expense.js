const form=document.querySelector('form')

form.addEventListener('submit',addExpense)

async function addExpense(e){
    try{
        e.preventDefault()
        const expenseprice=document.getElementById('expenseprice').value
        const description=document.getElementById('description').value
        const typeofexpense=document.getElementById('typeofexpense').value
    
        let my_obj={
            expenseprice,
            description,
            typeofexpense
        }
    
        const res=await axios.post('http://localhost:4000/expense/addexpense', my_obj)
        console.log('add',res)
        showOnScreen(res.data)

    }
    catch(err){
        console.log(err)
    }
    
}

function showOnScreen(data){
    console.log('sos',data)
    const items=document.getElementById('items')
    const childHTML=`<li id="${data.id}">${data.expenseprice} - ${data.description} -${data.typeofexpense}
                    <button onclick="deleteExpense('${data.id}')" class="btn btn-danger">DELETE</button>
                     </li>`
    items.innerHTML=items.innerHTML + childHTML
}

window.addEventListener("DOMContentLoaded",async ()=>{
    try{
        const res=await axios.get('http://localhost:4000/expense/getexpense')
        for(let i=0;i<res.data.length;i++){
            showOnScreen(res.data[i])
        }
    }
    catch(err){
        console.log(err)
    }
})

async function deleteExpense(id){
    try{
       axios.delete(`http://localhost:4000/expense/deleteexpense/${id}`)
        .then(result=>removeExpenseFromScreen(id))
    }
    catch(err){
        console.log(err)
    }
}

function removeExpenseFromScreen(id){
    try{
        const items=document.getElementById('items')
        const exptobedeleted=document.getElementById(id)
        items.removeChild(exptobedeleted)
    }
    catch(err){
        console.log(err)
    }
}

