'use strict';
function getPoolData(){
	return {
            UserPoolId: 'USERPOOL_ID_HERE',
            ClientId: 'APPCLIENT_ID_HERE'
        };
}

window.onload = function() {
    let regForm = document.getElementById('doRegister');
    if (regForm !== null) {
        regForm.onsubmit = function(event) {
            event.preventDefault();
            const regData = new FormData(event.target);
            let username = regData.get('register-username');
            let password = regData.get('register-password');
            let email = regData.get('register-email');
            doRegister(username, password, email);
        }
    }

    let verifyForm = document.getElementById('doVerify');
    if (verifyForm !== null) {
        verifyForm.onsubmit = function(event) {
            event.preventDefault();
            const verifyData = new FormData(event.target);
            let username = verifyData.get('verify-username');
            let code = verifyData.get('verify-code');
            doVerify(username, code);
        }
    }

    let loginForm = document.getElementById('doLogin');
    if (loginForm !== null) {
        loginForm.onsubmit = function(event) {
            event.preventDefault();
            const loginData = new FormData(event.target);
            let username = loginData.get('login-username');
            let password = loginData.get('login-password');
            doLogin(username, password);
        }
    }
};

function doRegister(username, password, email) {
    console.log("Registration");
    let dataEmail = {
        Name : 'email',
        Value : email
    };
    let dataName = {
        Name : 'preferred_username',
        Value : username
    };
    let attributeList = [ new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail),
        new AmazonCognitoIdentity.CognitoUserAttribute(dataName) ];
    console.log(username);
    console.log(email);
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(getPoolData());
    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            console.log(err);
        }
        else {
            let cognitoUser = result.user;	    	
            console.log(cognitoUser);
        }
    });
}

function doVerify(username, code) {
    console.log("Verification");
    console.log(username);
    console.log(code);
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(getPoolData());
    let userData = {
        Username : username,
        Pool : userPool
    };
   	let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result){
        if (err) {
            console.log(err);
        }
        else {
            console.log(cognitoUser);
        }
    });
}

function doLogin(username, password) {
    console.log("Login");
    console.log(username);
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(getPoolData());
    let userData = {
        Username : username,
        Pool : userPool
    };
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    let userAuth = {
        Username : username,
        Password : password
    }
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(userAuth);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            let accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken);
        },
 
        onFailure: function(err) {
            console.log(err);
        }});
}
