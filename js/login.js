let userEmail=document.getElementById("userEmail");
let userPassword=document.getElementById("userPassword");
// error
let emailError=document.getElementById("emailError");
let passError=document.getElementById("passError");
let loginBtn=document.getElementById("submit");
let ErrorMessage=document.getElementById("ErrorMessage");

let admin={
    email:"mohamedmenisy@gmail.com",
    pass:"123456Mm@"
};
localStorage.setItem("admin",JSON.stringify(admin));


// --------------------userEmail
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
    return userEmail.value.match(/^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/);
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

   function checkEmail(email,password){

    if (email == admin.email && password ==admin.pass) {
        return "admin";
    }else{
        let Users=JSON.parse(localStorage.getItem("AllUsers"))
        if (Users!=null) {
            for (let i = 0; i < Users.length; i++) {
                if (email == Users[i].useremail &&  password == Users[i].userpassword) {
                   localStorage.setItem("crUser",JSON.stringify(Users[i]));
                    return "member";
                }
            }
        }
    }

}



// ----------------------login
loginBtn.addEventListener("click",()=>{
    if ( !EmailValidation() || !passwordValidation() ) {
     ErrorMessage.innerText="Complete Your Data"
     ErrorMessage.style.display="block"
     setTimeout(()=>ErrorMessage.style.display="none",2000)
    
    }else{
     
     let check= checkEmail(Uemail,Upass);
     if (check == "admin") {
        localStorage.setItem("userType","admin")
        location.assign("dashboard.html")
     }else if (check == "member"){
        localStorage.setItem("userType","member")
        location.assign("index.html")
         
     }else{
        localStorage.setItem("userType","anonymous")
        location.assign("register.html")
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