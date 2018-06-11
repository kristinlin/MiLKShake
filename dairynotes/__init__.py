from flask import Flask, render_template, request, session, redirect, url_for, flash
from utils import database

app= Flask(__name__)

#temp dictionary of usernames & passwords
#dict = {'username':'pass'}

app.secret_key = "idk"

@app.route('/', methods=['POST', 'GET'])
def root():
    if 'username' in session:
        return redirect(url_for('welcome'))
    return render_template('base.html',title='Welcome!')

@app.route('/login')
def login():
    if 'username' in session:
        return redirect(url_for('welcome'))
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
    userExists = database.check_username(username)
    if userExists:
        flash('User already exists')
        flash('Please choose a different username')
    else:
        database.add_user(username,password)
        flash('User created!')    
    return redirect(url_for('login'))

@app.route('/welcome', methods = ['POST','GET'])
def welcome():
    if 'username' in session:
        notes = database.get_nonarch_notes(session['username'])
        d = {}
        for i in range(0,len(notes)):
            d[str(i)] = notes[i]
        #print d
        return render_template('welcome.html',username=session['username'],notes=d)
    else:
        try:
            username = request.form['user']
            password = request.form['pass']
        except:
            flash('Please login first')
            return redirect(url_for('login'))
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
            flash(username + ' has successfully logged in')
            return redirect(url_for('welcome'))
        else:
            flash('Incorrect Password')
            return redirect(url_for('login'))
        
@app.route('/archiveNote', methods = ['GET','POST'])
def archiveNote():
    jsdata = request.form['javascript_data']
    id = int(jsdata)
    print id
    database.archive(id)
    notes = database.get_nonarch_notes(session['username'])
    print notes
    return redirect(url_for('welcome'))

@app.route('/unarchiveNote', methods = ['GET','POST'])
def unarchiveNote():
    jsdata = request.form['javascript_data']
    id = int(jsdata)
    print id
    database.unarchive(id)
    notes = database.get_arch_notes(session['username'])
    print notes
    return redirect(url_for('welcome'))

@app.route('/deleteNote', methods = ['GET','POST'])
def deleteNote():
    jsdata = request.form['javascript_data']
    id = int(jsdata)
    print id
    #change to database delete function later
    #database.delete(id)
    notes = database.get_nonarch_notes(session['username'])
    print notes
    return redirect(url_for('welcome'))
        
@app.route('/logout/',methods = ['POST','GET'])
def logout():
    if 'username' in session:
        username = session.pop('username')
        flash(username + ' has successfully logged out')
        return redirect(url_for('root'))
    else:
        flash('Please login first')
        return redirect(url_for('login'))

#submitting a new note
@app.route("/note", methods = ['POST'])
def newNote():
    title = request.form['title']
    print title
    #print request.form.items()
    #print request.form.getlist('content')
    content = request.form['content']
    print content
    checklist = request.form.getlist('cb')
    print checklist
    check = request.form.getlist('check')
    print check
    checked = []
    for i in range(0,len(checklist)):
        if checklist[i] in check:
            checked.append(True)
        else:
            checked.append(False)
    print checked
    color = request.form['color']
    print color
    user = session['username']
    if content == '':
        note_type = "list"
    else:
        note_type = "notlist"
    pinned = True
    archived = False
    if note_type == "notlist":
        database.add_note(user,title,note_type,color,pinned,archived,content)
    else:
        database.add_note(user,title,note_type,color,pinned,archived,checklist, checked_items=checked)
    return redirect(url_for('welcome'))

@app.route("/archive",methods = ['GET','POST'])
def archive():
    if 'username' in session:
        notes = database.get_arch_notes(session['username'])
        d = {}
        for i in range(0,len(notes)):
            d[str(i)] = notes[i]
        return render_template('archive.html',notes=d)
    else:
        flash('Please login first')
        return redirect(url_for('login'))

if __name__ == '__main__':
    app.debug = True
    app.run()
