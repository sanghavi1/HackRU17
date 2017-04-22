from twilio.rest import Client

# Your Account SID from twilio.com/console
account_sid = "AC386dbcd830dc6c527ba603d502dda72e"
# Your Auth Token from twilio.com/console
auth_token  = "ab4a13eebaf65faf6ed08652b3dc633b"

client = Client(account_sid, auth_token)

message = client.messages.create(
    to="+17328533909", 
    from_="+15017250604",
    body="Hello from Python!")

print(message.sid)


