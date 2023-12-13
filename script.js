window.onload=function(){

const form = document.querySelector('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData.entries());
    const img = convertBase64(obj.image);
    if(!validateData(obj)){
        alert("Invalid data");
        return;
    }
    if(Users.length < 10){
        var user = createUser(firstCharacterUpper(obj.Firstname),firstCharacterUpper(obj.Surname),img);
        Users.push(user);
        
        var userCanvas = document.createElement("canvas");

        userCanvas.setAttribute("id", user.id);
        userCanvas.setAttribute("width", 679);
        userCanvas.setAttribute("height", 382);

        var wrapper = document.getElementById("canv");
        wrapper.appendChild(userCanvas);

        drawCard(user)

    } else {alert("You can have no more than 10 users")}
    console.log(Users);
});
}

const Users = [];


// get random number from range 100001-100010
function randomId(){
    min = 100001;
    max = 100010;
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function isUnique(id, users){
    for (var i = 0; i < users.length; i++) {
        if(users[i].id == id){
            return false;
        }
    }
    return true;
}

// generates random ids untill the isUniqe check returns true
function generateId(users){
    while (true) {
        id = randomId();
        if(isUnique(id, users)){
            break;
        }
    }
    return id;
}

function validateData(user){
    return user.Firstname.trim().length != 0 && user.Surname.trim().length != 0
}

function createUser(firstName,surname, image){
    id = generateId(Users);
    const newUser = {
        id: id,
        firstname: firstName,
        surname: surname,
        image: image
    }
    return newUser;
}

function firstCharacterUpper(str){
    const tempArr = str.split(" ");
    for (var i = 0; i < tempArr.length; i++){
        tempArr[i] = tempArr[i].charAt(0).toUpperCase() + tempArr[i].slice(1).toLowerCase();
    }
    const result = tempArr.join(" ");
    return result;
}


// convert the uploaded image to base64
async function convertBase64(image){
    var promise = new Promise(function(resolve){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };
    });
    var image = await promise;
    return image;
}

async function drawCard(user){
    var c = document.getElementById(user.id);
    var ctx = c.getContext("2d");


    // inital rectangles
    ctx.fillStyle = `rgb(6,19,54)`;
    ctx.fillRect(0, 0, 679, 382);

    ctx.fillStyle = `rgb(237,28,36)`;
    ctx.fillRect(0, 314, 679, 39);

    ctx.fillStyle = `rgb(255,255,255)`;
    ctx.fillRect(0, 352, 679, 30);

    // draws the image
    var image = new Image();
    image.onload = function() {
    ctx.drawImage(image, 46, 34,196,248);
    };
    image.src = await user.image;

    // draws the name and surname
    ctx.font = "26px Open Sans";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(user.firstname + " " + user.surname, c.width*0.63 , c.height*0.65 );

    //draws the id
    ctx.font = "26px Open Sans";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("ID " + user.id, 590 , 342 );
}

