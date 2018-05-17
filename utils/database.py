import sqlite3   #enable control of an sqlite database
import csv       #facilitates CSV I/O
import hashlib
import uuid


#==========================================================
'''
TABLE CREATION
Database
'''

def tableCreation():
    f="app.db"
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


#ADD VALUES TO TABLES

#user table stuff

def hash_password(password):
    key = uuid.uuid4().hex
    return hashlib.sha256(key.encode() + password.encode()).hexdigest()+':' + key

def check_password(hashed_password, user_password):
    password, key = hashed_password.split(':')
    return password == hashlib.sha256(key.encode()+user_password.encode()).hexdigest()

#add a user to user table
def addUser(new_username, new_password, new_type):
    f="app.db"
    db = sqlite3.connect(f) #open if f exists, otherwise create
    c = db.cursor()         #facilitates db ops

    hash_pass = hash_password(new_password)
    print ('The string to store in the db is: ' + hash_pass)
    c.execute('INSERT INTO users VALUES (?,?)',[new_username, hash_pass])
    db.commit()
    db.close()

#if username exist, return true
def checkUsername(userN):
    f="data/restaurant_reservations.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    users = c.execute('SELECT username FROM users;')
    result = False
    for x in users:
        if (x[0] == userN):
            result = True
    db.close()
    return result
