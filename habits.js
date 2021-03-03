const db = firebase.firestore();
const fs = firebase.firestore;
let userHabits = db.collection('example');  //change to user id

firebase.auth().onAuthStateChanged(user => start(user.uid));

function setUser(id){
	userHabits = db.collection(id);
}

async function getAll(){
	let all = await userHabits.get();
	return all.docs.map(doc => doc.id);
}

function getTodo(){
	return new Promise((resolve, reject) => {
		let todo = [];
		let today = new Date();
		today.setHours(0, 0, 0, 0)
		userHabits.where('last', '<', today).get().then(snapshot => {
			snapshot.forEach(doc => todo.push(doc.id));
			resolve(todo);
		}).catch(e => reject(e));
	});
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
	userHabits.doc(name).update({
		last: fs.Timestamp.now(),
		times: fs.FieldValue.arrayUnion(fs.Timestamp.now())
	});
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

/* functions to add
 - getDone(): gets habits done today
 */
