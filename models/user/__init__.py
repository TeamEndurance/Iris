"""
	User module providing various interactions with users.
	Two kinds of user
	org 
	user
"""
import config,pymongo

#enforce unique index on users index
db=config.getMongo()
db["users"].create_index([('email', pymongo.ASCENDING)],unique=True)

class User(object):
	db=config.getMongo()
	def __init__(self,username,session_id):
		"""Initializes an user by verifying the user credentials"""
		if self.authUser(username,session_id):
			import config
			self._user=username
			self._session_id=session_id
		else:
			#if invalid user raise an exception
			raise Exception

	@staticmethod
	def createUser(details):
		"""Create a new user"""
		name,username,email,password,user_type,mob_num=("","","","","","")
		try:
			name=details["name"][0]
			username=details["username"][0]
			email=details["email"][0]
			password=details['password'][0]
			user_type=details["user_type"][0]
			mob_num=details["mob_num"][0]
		except KeyError as e:
			#raise if few parameters are recieved
			raise Exception("Not all parameters are available")
		try:
			status=User.db["users"].insert({"_id":username,"name":name,"email":email,"password":User._encryptPassword(password),"user_type":user_type,'mob_num':mob_num})
			if status:
				return True
			else:
				return False
		except pymongo.errors.DuplicateKeyError:
			#if user exists raise an exception
			raise Exception("User already exists")
	

	def _authUser(self,details):
		"""
			Autherizes user based on their session id and username
			This method will be called before every transaction
		"""
		username,sessionid=("","")
		try:
			username=details["username"][0]
			sessionid=details['sessionid'][0]
		except KeyError as e:
			#raise if few parameters are recieved
			raise Exception("Not all parameters are available")
		u=User.db["session"].find_one({"_id":username})
		if sessionid in u["sessions"]:
			return True
		else:
			#If invalid credentials raise an Exception
			return False
	@staticmethod
	def _encryptPassword(password):
		"""Encryting password before inserting"""
		import hashlib
		m = hashlib.md5()
		m.update(password)
		return m.hexdigest()

	@staticmethod
	def _createSessionId(username):
		"""Generating random sessionid"""
		import hashlib
		import time
		m = hashlib.md5()
		m.update(username+str(time.time()))
		return m.hexdigest()
	@staticmethod
	def login(details):
		"""Takes username and password returns a sessionid"""
		username,password=("","")
		try:
			username=details["username"][0]
			password=details['password'][0]
		except KeyError as e:
			#raise if few parameters are recieved
			raise Exception("Not all parameters are available")
		ps=User._encryptPassword(password)
		u=User.db["users"].find_one({"_id":username})
		if ps == u["password"] and username == u["_id"]:
			try:
				sess=User._createSessionId(username)
				User.db["session"].update_one({"_id":username},{"$push":{"sessions":sess}},True)
				return username,sess
			except Exception as e:
				print e
				raise Exception("Failed to generate session id")
		else:
			#If invalid credentials raise an Exception
			raise Exception("invalid credentials")
