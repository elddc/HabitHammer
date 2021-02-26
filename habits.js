const db = firebase.firestore();
let userHabits = db.collection('example');  //change to user id

function setUser(id){
	userHabits = db.collection(id);
}

function getHabit(name){
	return new Promise((resolve, reject) => {
		userHabits.doc(name).get().then(doc => {
			if (doc.exists)
				resolve(doc.data());
			else
				reject(Error("Document not found"));
		}).catch(e => reject(e));
	});
}

function add(name, habit){
	userHabits.doc(name).set(habit);
}

function buildHabit(cue, routine, reward, stack=false, steps=false){
	return {
		cue: cue,
		routine: routine,
		reward: reward,
		stack: stack,
		steps: steps,
		type: "build"
	}
}

function breakHabit(cue, routine, reward, replace=false, steps=false){
	return {
		cue: cue,
		routine: routine,
		reward: reward,
		replacement: replace,
		steps: steps,
		type: "break"
	}
}
