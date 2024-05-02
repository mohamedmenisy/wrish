let subtotal=document.getElementById("subtotal")
let btnCheckout=document.getElementById("btnCheckout")
let btnCheckoutAlrt=document.getElementById("btnCheckoutAlrt")
let pNumber=0
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


// --------------------------------------------------------
let cartbody=document.getElementById("cartbody");
let crU=JSON.parse(localStorage.getItem("crUser"));
let allusers=JSON.parse(localStorage.getItem("AllUsers"));

// ----------------------------display
function display(){
    let result =""
    for (let i = 0; i < crU.cart.length; i++) {
        result+=`
        <tr>
        <td><img src="images/galary/${crU.cart[i].src}" ></td>
        <td>${crU.cart[i].wName}</td>
        <td>${crU.cart[i].price}</td>
        
        <td><i class="fa-solid fa-trash-can" onclick="deleteProduct(${i})"></i></td>
         </tr>
        
        `
        
    }
    cartbody.innerHTML=result
}
if (crU.cart != null) {
display()
}
// ---------------------------delete product 
function deleteProduct(index){
    for (let i = 0; i < allusers.length; i++) {
        if (crU.useremail == allusers[i].useremail &&  crU.userpassword == allusers[i].userpassword) {
            crU.cart.splice(index,1)
            localStorage.setItem("crUser",JSON.stringify(crU))
              allusers[i]=crU
  
        }
    }
   
    localStorage.setItem("AllUsers",JSON.stringify(allusers))
    display()
    location.reload()
}

// -------------------subtotal
function sumSubTotal(){
    let total=0
   for (let i = 0; i < crU.cart.length; i++) {
       total += Number(crU.cart[i].price)
   }
   return total;
}

subtotal.innerText="$"+sumSubTotal();

// ----------------------------checkout and send to email


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

//  ----------------------visa

let visacard=document.getElementById("visa");
let visaError=document.getElementById("visaError");
let visaNumber=""
visacard.addEventListener("change",(e)=>{
    
    if (visaValidation()) {
        visaNumber=e.target.value
        visaError.innerText=""
    }else{
        visaError.innerText="visa should be : **** - **** - **** - **** "
        visaError.style.color="red"
    }
});

function visaValidation(){
    return visacard.value.match(/^[1-9]{4}\s[1-9]{4}\s[1-9]{4}\s[1-9]{4}$/);
 }

//  ----------------------------cvv
let cvv=document.getElementById("cvv");
let cvvError=document.getElementById("cvvError");
let cvvNumber=""
cvv.addEventListener("change",(e)=>{
    
    if (cvvValidation()) {
        cvvNumber=e.target.value
        cvvError.innerText=""
    }else{
        cvvError.innerText="cvv should be : ****  "
        cvvError.style.color="red"
    }
});

function cvvValidation(){
    return cvv.value.match(/^[1-9]{4}$/);
 }







// --------------------------------
btnCheckout.addEventListener("click",()=>{

    if (!EmailValidation() || !visaValidation() || !cvvValidation()) {
        document.getElementById("btnCheckoutAlrtwrong").style.display="block"
        
       
       }else{

        (function(){
            emailjs.init("OqmF4_e-80-zl7F6H");
         })();
         var params={
            to:Uemail,
            message:"$"+sumSubTotal(),
            subject:"From:Admin WRISH",
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


// ---------------------------------

