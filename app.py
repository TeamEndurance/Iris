from bottle import route, error, post, get, run, static_file, abort, redirect, response, request, template
from models import user
import json,urlparse

@route('/')
def home():
    return template('static/index.html',name=request.environ.get('REMOTE_ADDR'))


@get('/user')
def user_info():
	"""Method to get user info"""
	return "Hello World!"

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
			response.set_cookie("username", det[0])
			response.set_cookie("sessionid", det[1])
			response.status=200
			return {"session":det[1]}
		else:
			response.status=400
			return {"status":False}
	except Exception as e:
		print e
		abort(400, str(e))


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