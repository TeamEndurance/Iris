config={
	"mongo_uri":"mongodb://127.0.0.1:27017/iris"
}

def getMongo():
	global config
	from pymongo import MongoClient as mc
	db=mc(config["mongo_uri"])["iris"]
	return db
