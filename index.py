from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import requests
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/getBooks', methods = ['GET', 'POST'])
def fun():
    
    
    if 'title' in request.args and request.args['title']:
        title = request.args['title']
        res = requests.get(f"https://frappe.io/api/method/frappe-library?title={title}&page={request.args['page']}")
    else:
        res = requests.get(f"https://frappe.io/api/method/frappe-library?page={request.args['page']}")
    
    try:
        res = res.json()['message']
    except:
        res = []
    
    return res


# I die
@app.route('/getMembers', methods = ['GET', 'POST'])
def getMembers():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()
    
    if 'name' in request.args and request.args['name']:
        temp = cursor.execute(f"SELECT * FROM MEMBERS WHERE name LIKE '%{(request.args['name'])}%'").fetchall()
    else:
        temp = cursor.execute("SELECT * FROM MEMBERS").fetchall()
    
    response = []
    
    for person in temp:
        details = {}        
        details['memberID'] = person[0]; details['name'] = person[1]; details['address'] = person[2]; details['dob'] = person[3]; details['debt'] = person[4]
        
        response.append(details)
        
    return response

@app.route('/deleteMember', methods = ['POST'])
def deleteMembers():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()
    req = request.json
    
    
    try:
        cursor.execute("delete from MEMBERS where memberID = (?)", (req['memberID'],))
        connect.commit()
        return f"Deleted {cursor.rowcount} items!"
    except:
        return f"Internal server error!"
    
@app.route('/addMember', methods = ['POST'])
def addMembers():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()
    req = request.json
    
    # print(req)
    
    try:
        cursor.execute(f"insert into MEMBERS(name, address, dob, debt) values(?,?,?,?)", (req['name'], req['address'], req['dob'], 0))
        connect.commit()
        return f"Added {cursor.rowcount} items!"
    except:
        return f"Internal server error!"
    
@app.route('/updateMember', methods = ['POST'])
def updateMembers():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()
    req = request.json
    
    try:
        if 'name' in req and req['name']:
            cursor.execute(f"update MEMBERS set name = (?) where memberID = (?)", (req['name'],  req['id']))
        if 'address' in req and req['address']:
            cursor.execute(f"update MEMBERS set address = (?) where memberID = (?)", (req['address'],  req['id']))
        if 'dob' in req and req['dob']:
            cursor.execute(f"update MEMBERS set dob = (?) where memberID = (?)", (req['dob'],  req['id']))
        
        connect.commit()
        return f"Updated {cursor.rowcount} items!"
    except:
        return f"Internal server error!"

@app.route('/clearDebt', methods = ['POST'])
def clearDebts():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()
    req = request.json
    
    id = req['memberID']
    dot = req['dot']
    
    try:
        temp = cursor.execute("SELECT debt FROM MEMBERS where memberID=(?)", (id, )).fetchall(); currDebt = temp[0][0]
        
        cursor.execute("insert into TRANSACTIONS(memberID, amount, dot) values(?,?,?)", (id, currDebt, dot))
        cursor.execute(f"update members set debt = 0 where memberID=(?)", (id, ))
        connect.commit()
        
        return f"All debts of member with ID {id} cleared!"
    except:
        return f"Internal Server Error!"
    
    
@app.route('/issueBook', methods = ['POST'])
def issueBooks():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()
    req = request.json
    
    nums = cursor.execute("select debt from members where memberID = (?)", (req['memberID'],)).fetchall()[0][0]
    available = cursor.execute("select count(bookID) from BOOKS where bookID = (?)", (req['isbn'],)).fetchall()[0][0]
    
    if nums>=500:
        return f"Cannot issue anymore books to member with ID {req['memberID']}. Debt exceeds Rs.500."
    if available:
        return f"Book unavailable!"

    try:
        cursor.execute(f"insert into issues(memberID, bookID, doi) values(?,?,?)", (req['memberID'], req['isbn'], req['doi']))
        
        
        temp = cursor.execute("SELECT debt FROM MEMBERS where memberID=(?)", (req['memberID'], )).fetchall(); currDebt = temp[0][0]
        # print(req)
        cursor.execute(f"update MEMBERS set debt = {currDebt+100} where memberID = (?)", (req['memberID'],))
        
  
        response = requests.get(f"https://frappe.io/api/method/frappe-library?isbn={req['isbn']}")
        response = response.json()['message'][0]
        cursor.execute(f"insert into BOOKS(bookID, title, authors, publisher) values(?,?,?,?)", (response['isbn'], response['title'], response['authors'], response['publisher']))
        connect.commit()
    
        return f"Book with isbn {req['isbn']} issued to member with ID {req['memberID']}!"
    except:
        return f"Internal server error!"
    
@app.route('/returnBook', methods = ['POST'])
def returnBooks():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()
    req = request.json
    
    memberID = req['memberID']; isbn = req['isbn']; dor = req['dor']
    
    doi = ""
    try:
        stuff = cursor.execute("select doi, memberID from issues where bookID = (?)", (isbn,)).fetchall()   
        print(stuff)
        doi = stuff[0][0]
        if stuff[0][1]!=memberID: return f"Book wasn't issued to the current user in the first place!"
    except:
        return f"Book wasn't issued in the first place!"
    
    dor = dor.split('-')
    doi = doi.split('-')
    
    # print(doi, dor)
    
    temp = cursor.execute("SELECT debt FROM MEMBERS where memberID=(?)", (memberID, )).fetchall(); currDebt = temp[0][0]
    
    if dor[0]>doi[0]:
        cursor.execute(f"update MEMBERS set debt = {currDebt+(int(dor[0])-int(doi[0]))*10000} where memberID = (?)", (memberID, ))
    elif dor[1]>doi[1]:
        cursor.execute(f"update MEMBERS set debt = {currDebt+ (int(dor[1])-int(doi[1]))*500 } where memberID = (?)", (memberID, ))
    else:
        cursor.execute(f"update MEMBERS set debt = {currDebt+(int(dor[2])-int(doi[2]))*100 if int(dor[2])-int(doi[2])>14 else currDebt } where memberID = (?)", (memberID, ))
    connect.commit()    
    
    try:
        cursor.execute(f"delete from issues where bookID = (?)", (isbn, ))
        connect.commit()
        
        # temp = cursor.execute("SELECT debt FROM MEMBERS where memberID=(?)", (memberID, )).fetchall(); currDebt = temp[0][0]
        # cursor.execute(f"update MEMBERS set debt = {currDebt-100} where memberID = (?)", (memberID, ))
        # connect.commit()
        
        cursor.execute("delete from BOOKS where bookID = (?)", (isbn, ))
        connect.commit()
        
        
        return f"Book with isbn {req['isbn']} returned by member with ID {req['memberID']}!"
    except:
        return f"Internal server error!"
    
@app.route('/getTransaction', methods = ['GET'])  
def getTransaction():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()    

    res = cursor.execute(f"select * from TRANSACTIONS").fetchall()
    ans = []
    for transaction in res:
        name = cursor.execute(f"select name from MEMBERS where memberID=(?)", (transaction[1], )).fetchall()[0][0]    
        temp = {}
        temp['amount']= transaction[2]
        temp['dot']=transaction[3]
        temp['name']= name
        ans.append(temp)

    return ans[::-1]

@app.route('/getIssuedBooks', methods = ['GET', 'POST'])
def getIssuedBooks():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()
    
    try:
        if request.method == 'GET':
            res = cursor.execute("select * from ISSUES").fetchall()
        else:
            req = request.json
            res = cursor.execute(f"select * from ISSUES where memberID = {req['memberID']}").fetchall()
    except:
        return f"Internal Server Error!"
    
    return res

if __name__=='__main__':
    app.run(debug=True)
    
