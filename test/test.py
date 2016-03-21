import pymongo
client = pymongo.MongoClient('182.72.248.19', 27017)
print client
db=client["cron-dbpedia"]
print db.collection_names()
