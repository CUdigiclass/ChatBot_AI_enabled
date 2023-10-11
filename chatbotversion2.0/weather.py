import requests
#
# # def Weather(city):
# #     api_address='http://api.openweathermap.org/data/2.5/weather?appid=0c42f7f6b53b244c78a418f4f181282a&q='
# #
# #     url = api_address + city
# #     json_data = requests.get(url).json()
# #     format_add = json_data['main']
# #     print(format_add)
# #     return format_add
#
# def Enquiry(fullname, mobile, DOB, ProgramInterested, City):
#     api_address= "http://127.0.0.1:8000/my-first-api?Data="
#     data={"FullName": fullname, "Email": email, "Mobile": mobile,
#      "ProgramInterested": ProgramInterested, "City": City, "DOB": DOB}
#
#     url = api_address + str(data)
#     json_data = requests.post(url,data)
#     #format_add = json_data['main']
#     print(json_add)
#     return json_add
#
#
#
# #"http://api.cuchd.in/api/chatbot/PostJsonRegistration?Data=

def run():
    api_address = "http://api.cuchd.in/api/chatbot/PostJsonRegistration?Data="
    data = {"FullName": "ragini", "Email": "ragini@gmail.com", "Mobile": "999999999",
            "ProgramInterested": "ProgramInterested", "City": "City", "DOB": "12/12/2000"}
    # "Mobile No Length cannot less than 10 digit"
    url = api_address + str(data)
    # json_data = requests.post(url,data)
    json_data = requests.get(url)
    print(str(json_data.content)[1:])
    if str(json_data.content)[1:] == "'saved'":
        print("Your details are saved with us, we will get back to you very soon:")
    elif str(json_data.content)[1:] == "'Already Exist'":
        print("Details are 'Already Exist' , You may call us <a href='tel:+1800121288800'>+1800121288800</a>")
    else:
        print("There is an exception occur while sending the details <br/>please do the enquiry again and check your details thoroughly")

    # format_add = json_data['main']
    # print(json_add)
    # return json_add
run()