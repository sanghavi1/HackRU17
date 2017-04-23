from flask import Flask, request, redirect#, send_from_directory, render_template
from twilio.twiml.messaging_response import MessagingResponse
from twilio import twiml
from send_sms import sendsms
app = Flask(__name__, static_folder="/app/static")#, template_folder="/app/templates")

@app.route('/', methods=['GET','POST'])
def main():
        """Respond to incoming calls with a simple text message."""
	if request.method != 'POST':
		sendsms()

	number = request.form['From']
	message_body = request.form['Body']
	resp = MessagingResponse().message("{}, Thanks for telling me about your day! You said: {}".format(number, message_body))
	return str(resp)
    
# @app.route("/index")
# def getcss():
#     sendsms()		
#     return send_from_directory("app/static/css", cssFile.css)

# @app.route('/')
# def gethtml():
# 	return send_from_directory("app/static/html", index.html)

app.run(debug=True, port = 5000)


		
	 
