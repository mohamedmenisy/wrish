var myarr =[];
let fileImg=document.getElementById("file");
let Pname=document.getElementById("Pname");
let Pprice=document.getElementById("Pprice");
let Pcatg=document.getElementById("Pcatg");
let btn=document.getElementById("addButton");


//  original Array of Products
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


// display My array
    function display(){
        // check if arrayofProducts is in localStorage or not
        if (localStorage.getItem("arrayofProducts") != null) {
            myarr=JSON.parse(localStorage.getItem("arrayofProducts"));
        }else{
            myarr=myProducts;
        }
        var allrow=""
        for (let i = 0; i < myarr.length; i++) {
            allrow+=`
            <tr>
            <td><img src="images/galary/${myarr[i].src}" ></td>
            <td>${myarr[i].wName}</td>
            <td><span>$</span>${myarr[i].price}</td>
            <td><i class="fa-solid fa-pen-to-square" onclick="getData(${i})"></i></td>
            <td><i class="fa-solid fa-trash-can" onclick="deletepr(${i})"></i></td>
            </tr>
            `
            
        }
        tbody.innerHTML=allrow
    }

  display()
 
//   delete product--------------------
    function deletepr(index){
        myarr.splice(index,1)
        localStorage.setItem("arrayofProducts",JSON.stringify(myarr));
        display();
    }

// btn add and update---------------------------
    btn.addEventListener("click" ,()=>{
        if (btn.value=="AddProduct") {
            addProduct();
            display();
            location.reload();
        }else{
            update()
            display()
            btn.value="AddProduct"
            location.reload();
        }
      
    });

// --------------------------------add product
    function addProduct(){
        let newProduct={
            src:fileImg.value.slice(12),
            catg:Pcatg.value,
            wName:Pname.value,
            price:Pprice.value
        }
        
        myarr.push(newProduct)
        localStorage.setItem("arrayofProducts",JSON.stringify(myarr));
    }




   let globalIndex=0
    // get data ----------------------------
    function getData(index){
        globalIndex=index
        Pname.value=myarr[index].wName
        Pprice.value=myarr[index].price
        Pcatg.value=myarr[index].catg
        btn.value="update" 
    }
    // update product-------------------------
    function update() {
        let   product={
            src:myarr[globalIndex].src,
            wName:Pname.value,
            price:Pprice.value,
            catg:Pcatg.value,
        }
        myarr[globalIndex]=product
        localStorage.setItem('arrayofProducts',JSON.stringify(myarr));
        
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