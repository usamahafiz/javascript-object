//show toast
const showNotification = (msg,type)=>{
    let bgColor;
    switch(type){
        case 'error':
        bgColor = "linear-gradient(to right, #93291e, #ed213a)";
         break;
        case 'success':
        bgColor = "linear-gradient(to right, #1D976C, #93F9B9)";
        break;
        default:
            bgColor = "fff";

    }

    Toastify({
        text: msg,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: bgColor
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

function showOutput(output){
    document.getElementById("output").innerHTML= output
}

function clearoutput(){
    document.getElementById("output").innerHTML= ""
}

const getFieldValue=(id)=>{
    return document.getElementById(id).value
}
//generate random id
function getRandomId(){
    return Math.random().toString(36).slice(2)
}
//get current year in footer
let year= new Date().getFullYear()
document.getElementById("year").innerHTML= year

//email pattern 
let emailValidation = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

//add users which show in table

let users= []

const handleSubmit=()=>{

    event.preventDefault()
    
    let firstname= getFieldValue("firstname");
    let lastname= getFieldValue("lastname");
    let email= getFieldValue("email");
    let dateofbirth= getFieldValue("date");

    //console.log(emailValidation.test(email))
    firstname= firstname.trim()
    lastname= lastname.trim()
    email= email.trim()

    if(firstname.length<3){
        showNotification("Firstname should be at least 3 characters", "error")
        return
    }

    if(lastname.length<3){
        showNotification("Lastname should be at least 3 characters", "error")
        return
    }
    if(!emailValidation.test(email)){
        showNotification("Please write your correct email", "error");
        return;
    }
    if(!dateofbirth){
        showNotification("Please select your date of birth", "error")
        return;
    }

    let user={
        firstname,
        lastname,
        email,
        dateofbirth,
        //calculate age
        calculateAge: function(){
            let now= new Date()
            let birthDate= new Date(this.dateofbirth)
            let todayTime= now.getTime()
            let birthTime= birthDate.getTime()
            let msDiff= todayTime- birthTime
            let age= Math.floor(msDiff/(1000 * 60 * 60 * 24 * 365))
            return age
            
        }

    }

    user.id=getRandomId();
    user.datecreated=new Date().getTime();
    user.status="active";
    user.role="student";

    let userFound= users.find(presentemail=>presentemail.email==email)
    if(userFound){
        showNotification("User already exists", "error");
        return;
    }
    else{
        users.push(user)
        showNotification("User has been added successfully","success")
    }
    // showOutput(users)
    console.log(users)

}

//show table 
function showtable(){
    if(!users.length){
        showNotification("No single user found", "#")
        return
    }

    let tablestartingcode=  `<div class = "table-responsive"><table class="table text-center">`
    let tableheading= `<tr><th>#</th><th>Firstname</th><th>Lastname</th><th>Email</th><th>Date of Birth</th><th>Age</th>`
    let tableendingcode = `</div></table>`
    let tablebody= ""
    users.forEach((presentemail, index)=>{
        tablebody+= `<tr><td>${index+1}</td><td>${presentemail.firstname}</td><td>${presentemail.lastname}</td><td>${presentemail.email}</td><td>${presentemail.dateofbirth}</td><td>${presentemail.calculateAge()}</td>`
    })

    let table= tablestartingcode+tableheading+tablebody+tableendingcode
    document.getElementById("output").innerHTML=table

}

//print users in console
const printuser = () =>[
    showNotification("User has been printed in console.","success"),
    console.log(users)
   
]



