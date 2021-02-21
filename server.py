from flask import Flask, render_template, request

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def home():
  return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def home():
  return render_template('signup.html')

@app.route('/signup', methods=['GET', 'POST'])
def home():
  return render_template('login.html')

if __name__ == "__main__":
  app.run(debug=True)
