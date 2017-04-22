from flask import Flask, request, send_from_directory, render_template
app = Flask(__name__, static_folder="/app/static")#, template_folder="/app/templates")

@app.route('/')
def main():
    return ("You are a bitch")
    
@app.route('/')
def getcss():
    return send_from_directory("/app/static/css", cssFile.css)

@app.route('/textthisbitch', methods=['POST'])
def twilapi():


app.run(debug=True, port = 5000)


