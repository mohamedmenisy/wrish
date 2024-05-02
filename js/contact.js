let sendbtn=document.getElementById("submit");
let userEmail=document.getElementById("to");
let emailError=document.getElementById("emailError");
let Uemail=""
userEmail.addEventListener("change",(e)=>{
    
    if (EmailValidation()) {
        Uemail=e.target.value
        emailError.innerText=""
    }else{
        emailError.innerText="Email should be : example@gmail.com "
        emailError.style.color="red"
    }
});

function EmailValidation(){
    return userEmail.value.match(/^([\w\.\+]{1,})([^\W])(@)([\w]{4,8})(\.[\w]{2,4})+$/);
 }



sendbtn.addEventListener("click",()=>{

    if (!EmailValidation()) {
        document.getElementById("btnCheckoutAlrtwrong").style.display="block"
        
       }else{

        (function(){
            emailjs.init("OqmF4_e-80-zl7F6H");
         })();
         var params={
            to:document.getElementById("to").value,
            message:document.getElementById("message").value,
            subject:"subject: "+document.getElementById("subject").value,
         }
    
         var serviceID="service_z1sgfog";
         var templateID="template_1iblsyh";
         emailjs.send(serviceID,templateID,params).then(()=>{
            btnCheckoutAlrt.style.display="block"
         }).catch()
  
        }
  
})


document.querySelector(".successMessage input").addEventListener("click",()=>{
    btnCheckoutAlrt.style.display="none"
    location.reload()
})
document.querySelector(".wrongmessage input").addEventListener("click",()=>{
    btnCheckoutAlrt.style.display="none"
    location.reload()
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

