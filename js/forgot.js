const forgot_form=document.getElementById("forgot-form");
const forgot_email=document.getElementById('f-email');
forgot_form.addEventListener('submit',(e) => {
    e.preventDefault();
    if(forgot_form_validate()){
        const request = new XMLHttpRequest();
        request.onload = () => {
            let responseObject = null;
            try {
                responseObject = JSON.parse(request.responseText);
            } catch (e) {
                console.error('Could not parse JSON!');
            }
            if (responseObject) {
                fhandleResponse1(responseObject);
            }
        }
        const requestData = `email=${forgot_email.value}`;
        console.log(requestData);
        request.open('post', '../php/forgot_email.php');
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(requestData);
    }
});
function fhandleResponse1 (responseObject) {
    if (responseObject.ok) {
        const  request=new XMLHttpRequest();
        const requestData1 = `email=${forgot_email.value}`;
        request.open('post', '../php/reset_password.php');
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(requestData1);
    } else {
        const messages=document.getElementById("form-messages");
        while (messages.firstChild) {
            messages.removeChild(messages.firstChild);
        }
        responseObject.message.forEach((message) => {
            const li = document.createElement('li');
            li.textContent = message;
            messages.appendChild(li);
        });
        messages.style.display = "block";
    }
}
function forgot_form_validate(){
    const f_email=forgot_email.value.trim();
    let status=false;
    if(f_email===''){
        setErrorFor(forgot_email,"email cannot be blank");
        status=false;
    }else if(!isEmail(f_email)){
        setErrorFor(forgot_email,"Invalid email");
        status=false;
    }else{
        setSuccessFor(forgot_email);
        status=true;
    }
    return status;
}

function setErrorFor(input, message){
    const field=input.parentElement;
    const small=field.querySelector('small');
    small.innerText=message;
    field.classList.add("error");
    field.classList.remove("success");
}
function setSuccessFor(input){
    const field=input.parentElement;
    field.classList.remove("error");
    field.classList.add("success");
}
function isnumber(number){
    return /^[0][1-9]\d{9}$|^[1-9]\d{9}$|^[+91]{3}\d{10}$/.test(number);
} 

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
