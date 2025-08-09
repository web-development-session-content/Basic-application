

// function outerFunction(){

//         let a= "outerFunctionVariable";
//     return function innerFunction(){

//         console.log(a);

//     }
// }

// let returnFunction = outerFunction();

// returnFunction(); //closure


function createUserSession(username,email){
    let isLoggedIn = true;
    return {
        getUserInfo: function (){
            return `${username}, email: ${email}`
        },
        logout: function(){
            isLoggedIn = false;
            return `${username} logged out`
        }
    }
}

const session = createUserSession("mahesh","mahesh@gmail.com"); //object

console.log(session.username);

console.log(session.getUserInfo());
console.log(session.logout())