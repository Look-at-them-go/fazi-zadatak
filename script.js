window.onload=function(){
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData.entries());
    const img = convertBase64(obj.image);
    if(Users.length < 10){
        Users.push(createUser(firstCharacterUpper(obj.Firstname),
                            firstCharacterUpper(obj.Surname),
                            img));
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

