import sqlite3   #enable control of an sqlite database
import csv       #facilitates CSV I/O
import hashlib
import uuid


#==========================================================
'''
TABLE CREATION
Database
'''

def table_creation():
    f="data/app.db"
    db = sqlite3.connect(f) #open if f exists, otherwise create
    c = db.cursor()         #facilitates db ops

    #Create the users table
    user_table = 'CREATE TABLE users (username TEXT PRIMARY KEY, password BLOB);'
    c.execute(user_table)

    #Create the notes table
    notes_table = 'CREATE TABLE notes (note_id INTEGER PRIMARY KEY, username TEXT, note_type TEXT, order_id INTEGER, color TEXT, pinned BOOLEAN, archived BOOLEAN, reminder_time DATETIME, reminder_repeat TEXT);'
    c.execute(notes_table)

    #Create the labels table
    labels_table = 'CREATE TABLE labels (note_id INTEGER, label TEXT);'
    c.execute(labels_table)

    #Create the list table
    list_table = 'CREATE TABLE list (note_id INTEGER, item TEXT, item_num INTEGER, checked BOOLEAN, image TEXT);'
    c.execute(list_table)

    #Create the notlist table
    notlist_table = 'CREATE TABLE notlist (note_id INTEGER, content TEXT, image TEXT);'
    c.execute(notlist_table)

    db.commit()
    db.close()

    
#USER TABLE STUFF

def hash_password(password):
    key = uuid.uuid4().hex
    return hashlib.sha256(key.encode() + password.encode()).hexdigest()+':' + key

def check_password(hashed_password, user_password):
    password, key = hashed_password.split(':')
    return password == hashlib.sha256(key.encode()+user_password.encode()).hexdigest()

#add a user to user table
def add_user(new_username, new_password):
    f="data/app.db"
    db = sqlite3.connect(f) #open if f exists, otherwise create
    c = db.cursor()         #facilitates db ops

    hash_pass = hash_password(new_password)
    print ('The string to store in the db is: ' + hash_pass)
    c.execute('INSERT INTO users VALUES (?,?)',[new_username, hash_pass])
    db.commit()
    db.close()

#if username exist, return true
def check_username(userN):
    f="data/app.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    users = c.execute('SELECT username FROM users;')
    result = False
    for x in users:
        if (x[0] == userN):
            result = True
    db.close()
    return result

#NOTES TABLE STUFF

#adds a note to table
#reminder_time MUST be in format "yyyy-mm-dd hh:mm:ss"
#pinned and archived are booleans, username, note_type, color, and remider_repeat are strings
#note_type is either "list" or "notlist"

def add_note(username, note_type, color, pinned, archived, reminder_time, remider_repeat):
    f="data/app.db"
    db = sqlite3.connect(f)
    c = db.cursor()

    #write code to get note_id and order_id

    c.execute('INSERT INTO notes VALUES (?,?,?,?,?,?,?,?,?)',[note_id, username, note_type, order_id, color, pinned, archived, reminder_time, reminder_repeat])
    db.commit()
    db.close()

#LABELS TABLE STUFF

#LIST TABLE STUFF

#NOTLIST TABLE STUFF

if __name__ == '__main__':
    #table_creation()
    user = 'testa'
    if not check_username(user):
        add_user('testa', 'hi')
