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