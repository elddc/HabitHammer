function signUp(){
	firebase.auth().createUserWithEmailAndPassword(
		document.getElementById("email").value,
		document.getElementById("pass").value)
	.then(() => console.log("signup successful"))
	.catch(e => console.log(e.message));
	window.location.href = '/habits';
}

function logIn(){
	firebase.auth().createUserWithEmailAndPassword(
		document.getElementById("email").value,
		document.getElementById("pass").value)
	.then(() => console.log("login successful"))
	.catch(e => console.log(e.message));
	window.location.href = '/habits';
}

function logOut(){
	firebase.auth().signOut();
	console.log("Signed out");
	window.location.href = '/';
}
