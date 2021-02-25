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
		window.location.href = 'habits.html';
	})
	.catch(e => console.log(e.message));
}

function logIn(){
	firebase.auth().signInWithEmailAndPassword(
		document.getElementById("email").value,
		document.getElementById("pass").value)
	.then(() => {
		window.location.href = 'habits.html';
	})
	.catch(e => console.log(e.message));
}

function logOut(){
	firebase.auth().signOut();
	console.log("Signed out");
	window.location.href = 'index.html';
}

//user is firebase.auth().currentUser
function redirect(user){
	if (user) {
		window.location.replace('habits.html');
		console.log(user.uid);
	}
	else {
		window.location.replace('login.html');
	}
}
