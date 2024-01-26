
const signup_form=document.getElementById('form-signup');
const signup_email=document.getElementById('s-email');
const signup_name=document.getElementById('s-name');
const signup_number=document.getElementById('s-number');
const signup_age=document.getElementById('s-age');
const signup_date=document.getElementById('s-date');
const signup_pass=document.getElementById('s-password');
const signup_cpass=document.getElementById('s-cpassword');
signup_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    checksignupInputs();
    const request = new XMLHttpRequest();
    request.onload = () => {
        let responseObject = null;
        try {
            responseObject = JSON.parse(request.responseText);
        } catch (e) {
            console.error('Could not parse JSON!');
        }
        if (responseObject) {
            handleResponse1(responseObject);
        }
    };
    const requestData = `useremail=${signup_email.value}&password=${signup_pass.value}&name=${signup_name.value}&mobile=${signup_number.value}&age=${signup_age.value}&date=${signup_date.value}&cpassword=${signup_cpass.value}`;
    console.log(requestData);
    request.open('post', 'php/register.php');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(requestData);
});
function handleResponse1 (responseObject) {
    if (responseObject.ok) {
        alert(responseObject.message);
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
function checksignupInputs(){
    const s_email=signup_email.value.trim();
    const s_password=signup_pass.value.trim();
    const name=signup_name.value.trim();
    const number=signup_number.value.trim();
    const age=signup_age.value.trim();
    const date=signup_date.value.trim();
    const cpassword=signup_cpass.value.trim();
    if(name===''){
        setErrorFor(signup_name,"Name connot be blank");
    }else{
        setSuccessFor(signup_name);
    }

    if(number===''){
        setErrorFor(signup_number,"M_Number cannot be blank");
    }
    else if(!isnumber(number)){
        setErrorFor(signup_number,"Invalid Number");
    }
    else{
        setSuccessFor(signup_number);
    }
    
    if(s_email===''){
        setErrorFor(signup_email,"Email connot be blank");
    }else if (!isEmail(s_email)) {
		setErrorFor(signup_email, 'Not a valid email');
	} else{
        setSuccessFor(signup_email);
    }
    
    if(age===''){
        setErrorFor(signup_age,"Age connot be blank");
    }else{
        setSuccessFor(signup_age);
    }
    
    if(date===''){
        setErrorFor(signup_date,"Dob connot be blank");
    }else{
        setSuccessFor(signup_date);
    }
    
    if(s_password===''){
        setErrorFor(signup_pass,"Password connot be blank");
    }else{
        setSuccessFor(signup_pass);
    }
    
    if(cpassword===''){
        setErrorFor(signup_cpass,"Password connot be blank");
    }else if(s_password!==cpassword){
        setErrorFor(signup_cpass,"Password doesn't match");
    }else{
        setSuccessFor(signup_cpass);
    }
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
