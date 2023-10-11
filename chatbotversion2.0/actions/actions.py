# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []
#
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import requests
from rasa_sdk.events import AllSlotsReset
#from weather import Enquiry
from pymongo import MongoClient

# MongoDB connection configuration
MONGODB_HOST = "mongodb://localhost:27017"
MONGODB_PORT = 27017  # Default MongoDB port
DATABASE_NAME = "rasadb"

# Connect to MongoDB
client = MongoClient(MONGODB_HOST, MONGODB_PORT)
db = client[DATABASE_NAME]
user_data_collection = db["conversations"]


# .find({},{sender_id: 1,slots: { full_name: 1 },_id: 0});


from rasa_sdk import Action
from rasa_sdk.events import ActionExecuted

# class ActionPauseConversation(Action):
#     def name(self):
#         return "action_pause_conversation"
#
#     def run(self, dispatcher: CollectingDispatcher, tracker, domain):
#         dispatcher.utter_message("I am transferring this chat to an agent")
#         return [ActionExecuted("action_listen")]
#
# class ActionResumeConversation(Action):
#     def name(self):
#         return "action_resume_conversation"
#
#     def run(self, dispatcher: CollectingDispatcher, tracker, domain):
#         # Perform any necessary actions to prepare for the resumed conversation
#         dispatcher.utter_message("The conversation is resumed.")
#         return [ActionExecuted("action_session_start")]


class GetSlotValueAction(Action):
    def name(self):
        return "action_weather_api"

    def run(self, dispatcher: CollectingDispatcher,tracker: Tracker,domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        sender_id = tracker.sender_id
        user_data_collection = db["conversations"]
        projection = {"slots": 1, "_id": 0}
        #user_data = user_data_collection.find_one({"sender_id": sender_id},projection)
        query = {"sender_id": sender_id}
        results = user_data_collection.find(query, projection)
        for result in results:
            if "slots" in result:
                slots = result["slots"]
        fullname=slots['full_name']
        email = slots['email']
        mobile = slots['mobile']
        ProgramInterested = slots['program']
        City = slots["city"]
        DOB = slots["dob"]
        api_address = "http://api.cuchd.in/api/chatbot/PostJsonRegistration?Data="
        data = {"FullName": fullname, "Email": email, "Mobile": mobile,
                "ProgramInterested": ProgramInterested, "City": City, "DOB": DOB}
        # "Mobile No Length cannot less than 10 digit"
        print(data)
        url = api_address + str(data)
        json_data = requests.get(url)
        if str(json_data.content)[1:]=="'saved'":
             dispatcher.utter_message(text="Your details are saved with us, we will get back to you very soon:)")
        elif str(json_data.content)[1:]=="'Already Exist'":
             dispatcher.utter_message(text="Details are 'Already Exist' , You may call us <a href='tel:+1800121288800'>+1800121288800</a>")
        else:
            dispatcher.utter_message(text="There is an exception occur while sending the details <br/>please do the enquiry again and check your details thoroughly")
            buttons = []
            dispatcher.utter_message(buttons=[{"payload": "/enquiry", "title": "Click here for another Enquiry"}])
            return [AllSlotsReset()]

        return [AllSlotsReset()]


from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_weather_api"
#
#     # def run(self, dispatcher: CollectingDispatcher,
#     # tracker: Tracker,
#     # domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#     #     city=tracker.latest_message['text']
#     #     temp=int(Weather(city)['temp']-273)
#     #     dispatcher.utter_template("utter_temp",
#     #         tracker,temp=temp)
#     #
#     #     return []
#
#     def run(self, dispatcher: CollectingDispatcher,
#     tracker: Tracker,
#     domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         fullname = tracker.get_slot('full_name')
#         email = tracker.get_slot('email')
#         mobile = tracker.get_slot('mobile')
#         ProgramInterested = tracker.get_slot('program')
#         City = tracker.get_slot('city')
#         DOB= tracker.get_slot('dob')
#         #print(fullname,email,mobile,ProgramInterested,City,DOB)
#         api_address = "http://api.cuchd.in/api/chatbot/PostJsonRegistration?Data="
#         data = {"FullName": fullname, "Email": email, "Mobile": mobile,
#                 "ProgramInterested": ProgramInterested, "City": City, "DOB": DOB}
#        # "Mobile No Length cannot less than 10 digit"
#         url = api_address + str(data)
#         #json_data = requests.post(url,data)
#         json_data = requests.get(url)
#         dispatcher.utter_message(tracker.sender_id)
#         if str(json_data.content)[1:]=="'saved'":
#             dispatcher.utter_message(text="Your details are saved with us, we will get back to you very soon:)")
#         elif str(json_data.content)[1:]=="'Already Exist'":
#             dispatcher.utter_message(text="Details are 'Already Exist' , You may call us <a href='tel:+1800121288800'>+1800121288800</a>")
#         else:
#             dispatcher.utter_message(text="There is an exception occur while sending the details <br/>please do the enquiry again and check your details thoroughly")
#             buttons = []
#             dispatcher.utter_message(buttons=[{"payload": "/enquiry", "title": "Click here for another Enquiry"}])
#             return [AllSlotsReset()]
#
#
#
#         # format_add = json_data['main']
#         #print(json_add)
#         #return json_add
#         return [AllSlotsReset()]
