from flask import Flask, render_template, request, session, redirect, url_for, flash
from utils import database

app= Flask(__name__)

#temp dictionary of usernames & passwords
#dict = {'username':'pass'}

app.secret_key = "idk"

@app.route('/', methods=['POST', 'GET'])
def root():
    return render_template('base.html',title='Welcome!')

@app.route('/login')
def login():
    return render_template('login.html',title='Login')

@app.route('/signup', methods = ['POST','GET'])
def signup():
    username = request.form['user']
    password = request.form['pass']
    if username == '':
        flash('Please enter a username')
        return redirect(url_for('login'))
    if password == '':
        flash('Please enter a password')
        return redirect(url_for('login'))
    #check if user in database
    #if not, add the user & pass
    database.add_user(username,password)
    flash('User created!')    
    return redirect(url_for('login'))

@app.route('/welcome', methods = ['POST','GET'])
def welcome():
    if 'username' in session:
        notes = database.get_notes(session['username'])
        d = {}
        for i in range(0,len(notes)):
            d[str(i)] = notes[i]
        #print d
        return render_template('welcome.html',username=session['username'],notes=d)
    else:
        username = request.form['user']
        password = request.form['pass']
    if username == '':
        flash('Please enter a username')
        return redirect(url_for('login'))
    if password == '':
        flash('Please enter a password')
        return redirect(url_for('login'))
    userExists = database.check_username(username)
    if not userExists:
        flash('User does not exist')
        return redirect(url_for('login'))
    else:
        #need to fix the password fxn
        passCheck = database.check_login(username,password)
        if passCheck:      
            session['username'] = username
            flash(username + 'has successfully logged in')
            return redirect(url_for('welcome'))
        else:
            flash('Incorrect Password')
            return redirect(url_for('login'))

@app.route('/logout/',methods = ['POST','GET'])
def logout():
    username = session.pop('username')
    flash(username + ' has successfully logged out')
    return redirect(url_for('root'))

#submitting a new note
@app.route("/note", methods = ['GET','POST'])
def newNote():
    title = request.form['title']
    content = request.form['content']
    print title
    print content
    user = session['username']
    note_type = "notlist"
    color = "blue"
    pinned = True
    archived = False
    database.add_note(user,note_type,color,pinned,archived,content)
    return redirect(url_for('welcome'))

if __name__ == '__main__':
    app.debug = True
    app.run()
