const db = firebase.firestore();
let userHabits = db.collection('example');  //change to user id

firebase.auth().onAuthStateChanged(user => start(user.uid));

function setUser(id){
	userHabits = db.collection(id);
}

async function getAll(){
	let ref = await userHabits.get();
	return ref.docs.map(doc => doc.id);
}

//todo after dates are added
function getToday(){

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

//will overwrite any docs with same name
//todo give warning if user attempts to add a duplicate habit
function add(name, habit){
	userHabits.doc(name).set(habit);
}

function update(name, fields){
	userHabits.doc(name).update(fields);
}

function markComplete(name){
	//todo get date and pass here
	update(name, {});
}

function buildHabit(cue, routine, reward, stack=null, steps=null){
	return {
		cue: cue,
		routine: routine,
		reward: reward,
		stack: stack,
		steps: steps,
		type: "build"
	}
}

function breakHabit(cue, routine, reward, replace=null, steps=null){
	return {
		cue: cue,
		routine: routine,
		reward: reward,
		replacement: replace,
		steps: steps,
		type: "break"
	}
}

//generates 3 example habits
function fillExample(){
	add('floss', buildHabit(
		'put on PJs',
		'floss',
		'brush teeth',
		'brush teeth'));
	add('journal', buildHabit(
		'eat breakfast',
		'write in journal',
		'look at cat photos',
		null,
		['one paragraph', 'one page', 'three pages']));
	add('stop snacking', breakHabit(
		'feel bored',
		'eat candy',
		'sugar',
		'go on a walk',
		['hide candy']));
}
