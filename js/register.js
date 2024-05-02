let userName=document.getElementById("userName");
let userEmail=document.getElementById("userEmail");
let userPassword=document.getElementById("userPassword");
let userPhone=document.getElementById("userPhone");
let register=document.getElementById("submit");
// error Elements------------------------------------------------------------
let nameError=document.getElementById("nameError");
let emailError=document.getElementById("emailError");
let passError=document.getElementById("passError");
let phoneError=document.getElementById("phoneError");
let ErrorMessage=document.getElementById("ErrorMessage");


let allUsers=[]
if (JSON.parse(localStorage.getItem("AllUsers"))!=null) {
     allUsers=JSON.parse(localStorage.getItem("AllUsers"))
}



// ----------------------------------userName
let Uname=""
userName.addEventListener("change",(e)=>{

    if (nameValidation()) {
        Uname=e.target.value
        nameError.innerText=""
    }else{
        nameError.innerText="Your name and father name"
        nameError.style.color="red"
    }
});

function nameValidation(){
    return userName.value.match(/^[A-Za-z]{3,9}\s[A-Za-z]{3,9}\s?$/);
 }
//  -------------------------------userEmail
let Uemail=""
userEmail.addEventListener("change",(e)=>{
    
    if (EmailValidation()) {
        Uemail=e.target.value
        emailError.innerText=""
    }else{
        emailError.innerText="Email should be : ahmed@gmail.com "
        emailError.style.color="red"
    }
});

function EmailValidation(){
    return userEmail.value.match(/^([\w\.\+]{1,})([^\W])(@)([\w]{4,8})(\.[\w]{2,4})+$/);
 }
 //  -------------------------------userPassword
 let Upass=""
userPassword.addEventListener("change",(e)=>{
   
    if (passwordValidation()) {
        Upass=e.target.value
        passError.innerText=""
    }else{
        passError.innerHTML=`
        <ul>
        
        <li>Password should be:</li>
        <li>6 Numbers</li>
        <li>1 character uppercase </li>
        <li>1 character lowercase </li>
        <li>special character like @ or # </li>
        </ul>
        
        `
        passError.style.color="red"
    }
});

function passwordValidation(){
    return userPassword.value.match(/^[1-9]{6}[A-Z]{1}[a-z]{1}@|#$/);
 }
 //  -------------------------------userPhone
 let Uphone=""
userPhone.addEventListener("change",(e)=>{
    
    if (phoneValidation()) {
        Uphone=e.target.value
        phoneError.innerText=""
    }else{
        phoneError.innerHTML="Your Phone Number must start with (010|012|011|015) + eight digits"
        phoneError.style.color="red"
    }
});
function phoneValidation(){
    return userPhone.value.match(/^(010|011|012|015)[1-9]{8}$/);
 }








//  create user

function createUser(){
    let user={
        username:Uname,
        useremail:Uemail,
        userpassword:Upass,
        userphone:Uphone,
        cart:[]
    }
    return user;
}

function checkEmail(U){
    if (JSON.parse(localStorage.getItem("AllUsers"))!=null) {
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].useremail == U.useremail) {
               
                return true;
            }
        }
    }
  

}



//  ----------------------------------register
register.addEventListener("click",()=>{
   if (!nameValidation() || !EmailValidation() || !passwordValidation() || !phoneValidation()) {
    ErrorMessage.innerText="Complete Your Data"
    ErrorMessage.style.display="block"
    setTimeout(()=>ErrorMessage.style.display="none",2000)
   
   }else{
    let myUser = createUser();
    let check= checkEmail(myUser);
    if (check) {
        ErrorMessage.innerText="this email is already exists "
         ErrorMessage.style.display="block"
        setTimeout(()=>ErrorMessage.style.display="none",2000)

    }else{
        allUsers.push(myUser);
        localStorage.setItem("AllUsers",JSON.stringify(allUsers))
        location.assign("login.html")
        
    }
   }
})





// handel pages--------------------------------------------------------------------------
let cartPage=document.getElementById("cart")
let LoginPage=document.getElementById("liLogin")
let RegisterPage=document.getElementById("liRegister")
let logOutBtn=document.getElementById("liLogout")
let dashboard=document.getElementById("dash");



if (localStorage.getItem("userType")=="admin") {
dashboard.style.display="inline-block"
cartPage.style.display="none"
LoginPage.style.display="none"
RegisterPage.style.display="none"
logOutBtn.style.display="inline-block"

}else if(localStorage.getItem("userType")=="member"){
    dashboard.style.display="none"
    cartPage.style.display="inline-block"
    LoginPage.style.display="none"
    RegisterPage.style.display="none"
    logOutBtn.style.display="inline-block"
}else{
    cartPage.style.display="none"
    dashboard.style.display="none"
}
logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("userType")
    location.assign("login.html")
})