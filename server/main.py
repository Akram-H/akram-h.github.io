import firebase_admin 
from firebase_admin import credentials, firestore

cred = credentials.Certificate('./SAK.json')
default_app = firebase_admin.initialize_app(cred)


db = firestore.client()


docs = db.collection('User').stream()

for doc in docs:
    
    #get Data and Calculate
    event = doc.to_dict().get('events')

    firstNumber = event.get('firstN')
    secondNumber = event.get('secondN')

    result = firstNumber+secondNumber


    #update the DataBank
    data = db.collection(u'User').document(doc.id)

    data.update({
        'events': {
            'done': True,
            'result': result
        }
    })