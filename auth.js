/*TODO
   - show error messages on page
   - add Google login?
   - add password strength checker?
 */

function signUp(){
	firebase.auth().createUserWithEmailAndPassword(
		document.getElementById("email").value,
		document.getElementById("pass").value)
	.then(() => {
		console.log(firebase.auth().currentUser);
		window.location.href = 'habits.html';
	})
	.catch(e => console.log(e.message));
}

function logIn(){
	firebase.auth().signInWithEmailAndPassword(
		document.getElementById("email").value,
		document.getElementById("pass").value)
	.then(() => {
		console.log(firebase.auth().currentUser);
		//window.location.href = 'habits.html';
	})
	.catch(e => console.log(e.message));
}

function logOut(){
	firebase.auth().signOut();
	console.log("Signed out");
	window.location.href = 'index.html';
}

//make sure auth object is done initializing before calling this
function redirect(){
	let user = firebase.auth().currentUser;
	console.log(user);
	if (user) {
		//window.location.replace('habits.html');
	}
	else {
		window.location.replace('login.html');
	}
}
