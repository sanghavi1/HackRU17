from twilio.rest import Client

def sendsms():
    # Your Account SID from twilio.com/console
    account_sid = "AC386dbcd830dc6c527ba603d502dda72e"
    # Your Auth Token from twilio.com/console
    auth_token  = "ab4a13eebaf65faf6ed08652b3dc633b"
    client = Client(account_sid, auth_token)
    message = client.messages.create(
        to="+12016889444", 
        from_="+12013545027",
        body="How are you doing today?")
    print(message.sid)


