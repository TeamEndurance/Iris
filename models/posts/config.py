config={
	"mongo_uri":"mongodb://127.0.0.1:27017/iris"
}
"""

config={
	"mongo_uri":"mongodb://tilak:TILAK05051995@ds039145.mlab.com:39145/iris"
}

"""
def getMongo():
	global config
	from pymongo import MongoClient as mc
	db=mc(config["mongo_uri"])["iris"]
	return db
