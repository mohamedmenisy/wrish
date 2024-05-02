let carts =document.getElementById("carts");
let myarr =[]

var myProducts = [
    {src:"1.jpg" ,catg:"FOSSIL",wName:"BERING AURORA COLLECTION",price:"75.00"},
    {src:"2.jpg" ,catg:"FOSSIL",wName:"BERING ROSE GOLD STEEL MESH",price:"350.00"},
    {src:"3.jpg" ,catg:"MASERATI",wName:"BERING TITANIUM SUNRAY ORANGE",price:"200.00"},
    {src:"4.jpg" ,catg:"CASTUS FIESTA",wName:"CACTUS SUMMER SPLASH",price:"350.00"},
    {src:"5.jpg" ,catg:"DANIEL WELLINGTON",wName:"CLUSE LA BOHEME",price:"80.00"},
    {src:"6.jpg" ,catg:"TAG HEUER",wName:"CLUSE MINUIT",price:"79.00"},
    {src:"7.jpg" ,catg:"HALF DANNAL",wName:"ESPRIT KYLA 2 TONE",price:"99.00"},
    {src:"8.jpg" ,catg:"FOSSIL",wName:"FOSSIL 3 HAND SPORTS",price:"99.00"},
    {src:"9.jpg" ,catg:"HALF DANNAL",wName:"ME3105",price:"90.00"},
];
if (localStorage.getItem("arrayofProducts") != null) {
    myarr=JSON.parse(localStorage.getItem("arrayofProducts"));
}else{
    myarr=myProducts;
}


function display(){
    let results=""
    for (let i = 0; i < myarr.length; i++) {
       results+=`
       
       <div class="cart col-4">
       <div class="head">
           <img src="images/galary/${myarr[i].src}" alt="">
       </div>
       <div class="text">
            
           <h3>${myarr[i].wName}</h3>
           
           <p class="text-muted">Lorem ipsum dolor sit amet.</p>
       </div>
       <div class="cartFooter"><input type="button" onclick="SendToDiscripption(${i})" id="seeMore" value="See More"></div>
      
        </div>
       
       
       `
        
    }
    carts.innerHTML=results;
}
display()

function SendToDiscripption(productIndex){
     localStorage.setItem("product",JSON.stringify(myarr[productIndex]));
     location.assign("Description.html")
}








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