from twilio.rest import Client

def sendsms():
    # Your Account SID from twilio.com/console
    account_sid = "ACf4e6e2b01c31b2a04344e6995ea62d87"
    # Your Auth Token from twilio.com/console
    auth_token  = "e88828f170b783f25134140d9b3b729b"
    client = Client(account_sid, auth_token)
    message = client.messages.create(
        to="+17328533909", 
        from_="+13473219867",
        body="How are you doing today?")
    print(message.sid)


