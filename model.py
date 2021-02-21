import firebase_admin
from firebase_admin import firestore, credentials

cred = credentials.Certificate(".data/serviceAcct.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
habits_ref = db.collection('habits').document(u'example')

def get_habits():
  fill_ex()
  return habits_ref.get().to_dict() 

def fill_ex():
  add('floss', build_habit('put on PJs',
                           'floss',
                           'brush teeth',
                           stack='brush teeth'))  
  
  add('journal', build_habit('eat breakfast',
                             'write in journal',
                             'look at cat photos',
                             ['one paragraph', 'one page', 'three pages']))
  
  add('snacking', break_habit('feel bored',
                              'eat candy',
                              'sugar',
                              ['hide candy'],
                              'go on a walk'))

def add(name, habit):  
  habits_ref.update({
    name: habit
  })
  
def build_habit(cue, routine, reward, steps=None, stack=None):
  return {
    'cue': cue,
    'routine': routine,
    'reward': reward,
    'stack': stack,
    'steps': steps,
    'type': 'build'
  }

def break_habit(cue, routine, reward, steps=None, replace=None):
  return {
    'cue': cue,
    'routine': routine,
    'reward': reward,
    'replacement': replace,
    'type': 'break'
  }