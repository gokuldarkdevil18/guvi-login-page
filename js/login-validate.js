const login_form=document.getElementById('login-form');
const login_email=document.getElementById('l-email');
const login_pass=document.getElementById('l-password');
const messages=document.getElementById('form-messages');
login_form.addEventListener('submit', e =>{
    e.preventDefault();
    if(checkInputs()){
        const request = new XMLHttpRequest();
        request.onload = () => {
            let responseObject = null;
            try {
                responseObject = JSON.parse(request.responseText);
            } catch (e) {
                console.error('Could not parse JSON!');
            }
            if (responseObject) {
                handleResponse(responseObject);
            }
        };
        const requestData = `useremail=${login_email.value}&password=${login_pass.value}`;
        console.log(requestData);
        request.open('post', 'php/check-login.php');
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(requestData);
    }
});
function handleResponse (responseObject) {
    if (responseObject.ok) {
        location.href = '../main.html';
    } else {
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
function checkInputs(){
    const email=login_email.value.trim();
    const password=login_pass.value.trim();
    let status=true;
    if(email===''){
        setErrorFor(login_email,"Email connot be blank");
        status=false;
    }else if (!isEmail(email)) {
		setErrorFor(login_email, 'Not a valid email');
        status=false;
	} else{
        setSuccessFor(login_email);
        status=true;
    }
    if(password===''){
        setErrorFor(login_pass,"Password connot be blank");
        status =false;
    }else{
        setSuccessFor(login_pass);
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
