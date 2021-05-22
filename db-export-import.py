

1) Access api url - 'http://localhost:3000/api/findall'

#-------------------------------------------------------- TERMINAL LOGIN PROCESS & EXPORT DB -----------------------------------#

1) Install mongodb or create mongodb container (go inside mongodb container - attach a volume of mongodb for data accessing)

2) come to atlas site -> click to project -> cluster -> connect -> connect with mongo shell -> Run your connection string in your command line (terminal login comm)
    eg. mongo "mongodb+srv://cluster0.vfu2v.mongodb.net/myFirstDatabase" --username prem
    (enter password and successfully logged in via terminal)
    
3) check dbs -> show databases; (list the dbs)

4) check db collections -> show collections; (list the collections)

5) list the collection results -> db.shiva_collection.find().pretty() #(list into json format)

 
#------------------------------------------------------- EXPORT MONGODB COLLECTION VIA TERMINAL ----------------------------------#

1) get inside mongodb container

2) now, run this command (inside mongodb container)
    mongoexport --uri mongodb+srv://prem@cluster0.vfu2v.mongodb.net/shiva_db --collection shiva_collection --out db_backup/shivadb.json #"db_backup" is mongodb container's mounted volume
    # will ask pass after this command

3) IMPORT TO PRODUCTION DB
        mongoimport --uri mongodb+srv://shiva_prod@cluster0.0pbc4.mongodb.net/production_db --collection production_collection --file db_backup/shivadb.json
    
 *prod user pass = 1234567890
 *stag user pass = 12345
