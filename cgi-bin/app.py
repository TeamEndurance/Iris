from bottle import route, error, post, get, run, static_file, abort, redirect, response, request, template
from models import user
import json,urlparse
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
		status=user.User.login(entity)
		print status
		if status:
			response.set_cookie("sessionid", status)
			response.status=200
			return {"session":status}
		else:
			response.status=400
			return {"status":False}
	except Exception as e:
		print e
		abort(400, str(e))
run(host='localhost', port=8080, debug=True)