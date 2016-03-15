from bottle import route, error, post, get, run, static_file, abort, redirect, response, request, template
from models import user
config=user.config
import pymongo,os
import json,urlparse
import gridfs,random,time
import hashlib
db=config.getMongo()
@route('/')
def home():
	username=request.get_cookie('username')
	sessionid=request.get_cookie('sessionid')
	if username and sessionid:
		#user is already logged in redirect
		redirect("/feed")
	else:
		return template('static/index.html',name=request.environ.get('REMOTE_ADDR'))
@route('/feed')
def feed():
	username=request.get_cookie('username')
	sessionid=request.get_cookie('sessionid')
	if username and sessionid:
		if user.User.authUser({"username":username,"sessionid":sessionid}):
			return template('static/feed.html',name=request.environ.get('REMOTE_ADDR'))
		else:
			response.set_cookie("sessionid", "",max_age=60*60*24,path="/")
			response.set_cookie("username", "",max_age=60*60*24,path="/")
			redirect("/")
	else:
		redirect("/")
@post('/user')
def user_insert():
	"""Method for signup"""
	data = request.body.readline()
	if not data:
		abort(400, 'No data received')
	else:
		entity = dict(urlparse.parse_qs(data))
	try:
		status=user.User.createUser(entity)
		if status:
			response.status=200
			response.body=json.dumps({"status":True})
		else:
			response.status=400
			response.body=json.dumps({"status":False})
	except Exception as e:
		print e
		abort(400, str(e))

@post('/user/login')
def user_login():
	"Login for user and write session id on cookie"
	data = request.body.readline()
	if not data:
		abort(400, 'No data received')
	else:
		entity = dict(urlparse.parse_qs(data))
	try:
		det=user.User.login(entity) #tuple of username and session id
		if det:
			response.set_cookie("username", det[0],max_age=60*60*24,path="/") #1 day persistent login
			response.set_cookie("sessionid", det[1],max_age=60*60*24,path="/")
			response.status=200
			return {"session":det[1]}
		else:
			response.status=400
			return {"status":False}
	except Exception as e:
		print e
		abort(400, str(e))

@post('/user/logout')
def user_logout():
	"Logout for user"
	username=request.get_cookie('username')
	sessionid=request.get_cookie('sessionid')
	print username,sessionid,"dude"
	if not username or not sessionid:
		response.status=400
		return
	try:
		det=user.User.logout(username,sessionid) #tuple of username and session id
		print det
		if det:
			print "heree"
			response.set_cookie("username","",max_age=60*60*24,path="/") #1 day persistent login
			response.set_cookie("sessionid","",max_age=60*60*24,path="/")
		else:
			response.status=400
	except Exception as e:
		print e
		abort(400, str(e))

@post('/user/check')
def user_name_check():
	"Login for user and write session id on cookie"
	data = request.body.readline()
	if not data:
		abort(400, 'No data received')
	else:
		entity = dict(urlparse.parse_qs(data))
	try:
		avail=user.User.checkUserName(entity) #tuple of username and session id
		if avail:
			response.status=200
			return {"status":True}
		else:
			response.status=400
			return {"status":False}
	except Exception as e:
		print e
		abort(400, str(e))

@route('/upload', method='POST')
def do_upload():
	fs = gridfs.GridFS(db)
	upload = request.files.file
	print upload
	name, ext = os.path.splitext(upload.filename)
	if ext not in ('.png', '.jpg', '.jpeg'):
		abort(400, "File extension not allowed.")
		return
	filename=str(int(time.time()))+str(int(random.random()*1000))+ext
	raw=upload.file.read()
	fs.put(raw,filename=filename)
	md5=hashlib.md5(raw).hexdigest()
	return {"file_id":md5} #this will be sent along with the registeration form

# Static Routes
@get('/static/<filename:re:.*\.js>')
def javascripts(filename):
    return static_file(filename, root='static/js')

@get('/static/<filename:re:.*\.css>')
def stylesheets(filename):
	print filename
	return static_file(filename, root='static/css')

@get('/static/<filename:re:.*\.(jpg|png|gif|ico)>')
def images(filename):
    return static_file(filename, root='static/img')

@get('/static/<filename:re:.*\.(eot|ttf|woff|svg)>')
def fonts(filename):
    return static_file(filename, root='static/fonts')


run(host='localhost', port=8080, debug=True)