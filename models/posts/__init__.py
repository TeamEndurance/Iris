"""
	Posts module
"""
import config,pymongo
import json
class Posts(object):
	db=config.getMongo()
	def __init__(self):
		pass
	@staticmethod
	def searchPosts(details):
		"""Searches posts based on location"""
		location=""
		start=0
		length=20
		try:
			location=details["location"][0]
			start=int(details["i"][0])
			length=int(details["len"][0])
		except KeyError as e:
			#raise if few parameters are recieved
			raise Exception("Not all parameters are available")
		try:
			a=list(Posts.db["posts"].find({"$text":{"$search":location}}).sort([("report_time",-1)]).skip(start).limit(length))
			for d in a:
					if d["anonyoumous"] is True or d["anonyoumous"] == "true":
						d["author"]="anonyoumous"
			return json.dumps(a)
		except Exception as e:
			print e
			raise Exception("Unable to fetch")

	@staticmethod
	def getMarkers():
		"""Fetches markers for map"""
		try:
			a=list(Posts.db["posts"].find({},{"lat":1,"long":1,"_id":0}))
			return json.dumps(a)
		except Exception as e:
			print e
			raise Exception("Unable to fetch")

	@staticmethod
	def getByPostId(idd):
		try:
			a=Posts.db["posts"].find_one({"_id":idd})
			if a :
				if a["anonyoumous"] is True or a["anonyoumous"] == "true":
					del a["author"]
					a["user"]={"picture":"default.jpg","name":"anonyoumous","email":""}
				else:
					u=Posts.db["users"].find_one({"_id":a["author"]})
					if u is None:
						a["user"]={"picture":"default.jpg","name":"anonyoumous","email":""}
					else:
						a["user"]=u
				return json.dumps(a)
			else:
				raise Exception("Unable to fetch")
		except Exception, e:
			raise Exception("Unable to fetch")