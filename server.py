from flask import Flask, render_template, redirect

import model
import json

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
#app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def home():
  return render_template('index.html')

@app.route('/about')
def about():
  return render_template('about.html')

@app.route('/signup')
def signup():
  return render_template('signup.html')

@app.route('/login')
def login():
  return render_template('login.html')

@app.route('/app')
def re():
  return render_template('redirect.html')

@app.route('/habits')
def habits():
  all = model.get_habits()
  return render_template('habits.html', dict=all, j=json.dumps(all))

if __name__ == "__main__":
  app.run(debug=True)