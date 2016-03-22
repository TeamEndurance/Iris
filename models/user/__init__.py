"""
	User module providing various interactions with users.
	Two kinds of user
	org 
	user
"""
import config,pymongo
import gridfs,time,random
import json
import hashlib
import time
#enforce unique index on users index
db=config.getMongo()
db["users"].create_index([('email', pymongo.ASCENDING)],unique=True)
db["posts"].create_index([('location', "text")], default_language='english')

class User(object):
	db=config.getMongo()
	fs = gridfs.GridFS(db)
	def __init__(self,username,session_id):
		"""Initializes an user by verifying the user credentials"""
		if self.authUser({"username":username,"sessionid":session_id}):
			import config
			self._username=username
			self._sessionid=session_id
		else:
			#if invalid user raise an exception
			raise Exception

	@staticmethod
	def createUser(details):
		"""Create a new user"""
		name,username,email,password,user_type,mob_num,profile_pic=("","","","","","","")
		try:
			name=details["name"][0]
			username=details["username"][0]
			email=details["email"][0]
			password=details['password'][0]
			user_type=details["user_type"][0]
			mob_num=details["mob_num"][0]
			profile_pic=details["profile_pic"][0]
		except KeyError as e:
			#raise if few parameters are recieved
			raise Exception("Not all parameters are available")
		try:
			status=User.db["users"].insert({"_id":username,"name":name,"email":email,"password":User._encryptPassword(password),"user_type":user_type,'mob_num':mob_num,"profile_pic":profile_pic})
			if status:
				return True
			else:
				return False
		except pymongo.errors.DuplicateKeyError:
			#if user exists raise an exception
			raise Exception("User already exists")
	
	@staticmethod
	def checkUserName(details):
		"""Crecks for availability of a username"""
		username=""
		try:
			username=details["username"][0]
		except KeyError as e:
			#raise if few parameters are recieved
			raise Exception("Not all parameters are available")
		try:
			status=User.db["users"].find_one({"_id":username})
			if status:
				#user exists username unavailable
				return False
			else:
				#user not exists username available
				return True
		except Exception:
			raise Exception("Mongo error in checkUserName")

	@staticmethod
	def checkUserEmail(details):
		"""Crecks for availability of a email"""
		email=""
		try:
			email=details["email"][0]
		except KeyError as e:
			#raise if few parameters are recieved
			raise Exception("Not all parameters are available")
		try:
			status=User.db["users"].find_one({"email":email})
			if status:
				#user exists username unavailable
				return False
			else:
				#user not exists username available
				return True
		except Exception:
			raise Exception("Mongo error in checkUserEmail")

	@staticmethod
	def authUser(details):
		"""
			Autherizes user based on their session id and username
			This method will be called before every transaction
		"""
		try:
			username,sessionid=("","")
			try:
				username=details["username"]
				sessionid=details['sessionid']
			except KeyError as e:
				#raise if few parameters are recieved
				raise Exception("Not all parameters are available")
			u=User.db["session"].find_one({"_id":username})
			if sessionid in u["sessions"]:
				res=User.db["session_details"].find_one({"_id":sessionid})
				if res is not None:
					t=res["login_time"]
					now=int(time.time())
					if (now-t) > (60*60*24*1000):
						#session expired
						User.db["session"].update_one({"_id":username},{"$pull":{"sessions":sessionid}},True)
						User.db["session_details"].remove({"_id":sessionid})
						return False
					else:
						return True
				else:
					return False
			else:
				#If invalid credentials raise an Exception
				return False
		except:
			#raise Exception("Unable to authUser")
			return False
	@staticmethod
	def _encryptPassword(password):
		"""Encryting password before inserting"""
		m = hashlib.md5()
		m.update(password)
		return m.hexdigest()

	@staticmethod
	def _createSessionId(username):
		"""Generating random sessionid"""
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
				User.db["session_details"].insert_one({"_id":sess,"login_time":int(time.time())})
				return username,sess
			except Exception as e:
				print e
				raise Exception("Failed to generate session id")
		else:
			#If invalid credentials raise an Exception
			raise Exception("invalid credentials")

	@staticmethod
	def logout(username,sessionid):
		"""Takes username and sessionid then logout"""
		try:
			sess=User._createSessionId(username)
			User.db["session"].update_one({"_id":username},{"$pull":{"sessions":sessionid}},True)
			User.db["session_details"].remove({"_id":sessionid})
			return True
		except Exception as e:
			print e
			raise Exception("Failed to remove session id")
		else:
			#If invalid credentials raise an Exception
			raise Exception("invalid credentials")

	def getDetails(self):
		try:
			k=User.db["users"].find_one({"_id":self._username})
			del k["password"] #remove hashed password version
			if k:
				return k
			else:
				raise Exception("Unable to get user details")
		except Exception as e:
			print e
			raise Exception("Unable to get user details")


	def getPicture(self,hashh):
		try:
			k=User.fs.find_one({"md5":hashh})
			if k:
				return k.read()
			else:
				raise Exception("Unable to get user details")
		except Exception as e:
			print e
			raise Exception("Unable to get user details")
	@staticmethod
	def getUserPicture(username):
		try:
			hashh=User.db["users"].find_one({"_id":username})
			if hashh is None:
				raise Exception("Unable to get user details")
			k=User.fs.find_one({"md5":hashh["profile_pic"]})
			if k:
				return k.read()
			else:
				raise Exception("Unable to get user details")
		except Exception as e:
			print e
			raise Exception("Unable to get user details")


	def createPost(self,details):
		"""Creates a new post"""
		title,content,picture,anonyoumous,location,report_time,lat,longg=("","","","","","","","")
		try:
			title=details["title"][0]
			content=details["content"][0]
			picture=details["picture"][0]
			anonyoumous=details['anonyoumous'][0]
			location=details["location"][0]
			lat=details["lat"][0]
			longg=details["long"][0]
			report_time=int(time.time())
			post_id=str(self._username)+str(report_time)+str(int(random.random()*1000))
		except KeyError as e:
			#raise if few parameters are recieved
			raise Exception("Not all parameters are available")
		try:
			status=User.db["posts"].insert_one({"_id":post_id,"author":self._username,"title":title,"content":content,"picture":picture,"anonyoumous":anonyoumous,'location':location,"report_time":report_time,"lat":lat,"long":longg})
			print status
			if status:
				return True
			else:
				return False
		except pymongo.errors.DuplicateKeyError:
			#if user exists raise an exception
			raise Exception("Post already exists")

	def getCreatedPost(self,entity):
		"""Fetches the user created posts from db """
		start=0
		length=20
		try:
			start=int(entity["i"][0])
			length=int(entity["len"][0])
		except KeyError:
			pass
		try:
			a=list(User.db["posts"].find({}).sort([("report_time",-1)]).skip(start).limit(length))
			for d in a:
					if d["anonyoumous"] is True or d["anonyoumous"] == "true":
						d["author"]="anonyoumous"
			return json.dumps(a)
		except Exception as e:
			print e
			raise Exception("Unable to fetch")