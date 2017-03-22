# Notifications

Notifications are automatically wrapped with the send of a message if the user is registred to receive push notifications.


## Register

In order to receive notifications, the application has to register the user by registering in our server the notification token of the current user for the current app.

this can be done by using the register User api:

      POST http://api.cvd.io/messaging/notifications/registerUser
      { 
        "area": "stickers", 
        "application":"PopularStickers", 
        "notificationToken":"cOYzItgOd8I:APA91bHAx7PZnG03hjPa1td4ZXCVT1ia-wORQ9rc74Txv_ZrrhTJvnqWOYcRD50w_KGGUZxgbyJzJxKU3Nio2J-qWPUw3AI_38QLh5kqzZ2eW8rkkxJeFtcXnq3T4lNz9wd7PQmuIuy2", 
        "deviceId":"7c9c5f92fc0a7ec5"
      }
      
      
      
      
the json payload must contain the following data:

* area : the name of the area used for the messages and their content
* application : the application name 
* notificationToken : the firebase notification token generated for this app and device
* deviceId : the id to identify the user device


You'll receive in return:

OK
{
  "status": "registred"
}

OR

BAD REQUEST
{
  "status": "error"
}

