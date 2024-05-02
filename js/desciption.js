
let myProduct=JSON.parse(localStorage.getItem("product"));
let devItem=document.getElementById("item")
let myitem =`
<div class="itemimg ">
<img src="images/galary/${myProduct.src}" alt="">
</div>
<div class="itemdesc ">
<p class="text-muted">${myProduct.catg}</p>
<h2 class="name">${myProduct.wName}</h2>
<p >Price : <span class="text-muted">$${myProduct.price}</span></p>
<div class="hr"></div>

<p class="desc text-muted">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

</p>

<div class="addcart"><input type="button" onclick="addToCart()" value="ADD TO CART"></div>
</div>

`
devItem.innerHTML=myitem

let allusers=JSON.parse(localStorage.getItem("AllUsers"))
let cU=JSON.parse(localStorage.getItem("crUser"));

function addToCart(){
    if (localStorage.getItem("userType")=="admin") {
        // cart.push(myProduct);
        // localStorage.setItem("cart",JSON.stringify(cart))
        
    }if(localStorage.getItem("userType")=="member"){
        
        if (allusers!=null) {
            for (let i = 0; i < allusers.length; i++) {
                if (cU.useremail == allusers[i].useremail &&  cU.userpassword == allusers[i].userpassword) {
                      cU.cart.push(myProduct)
                      localStorage.setItem("crUser",JSON.stringify(cU))
                      allusers[i]=cU
                      
                    
                }
            }
        }
        
        localStorage.setItem("AllUsers",JSON.stringify(allusers))

    }else{
        location.assign("login.html")
    }
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