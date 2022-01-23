from flask import Flask, render_template, request, redirect, jsonify
from flask_cors import CORS, cross_origin
from werkzeug import secure_filename
import os

import wordleh_engine as WLE

app=Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/fetch_start_word', methods=['GET'])
@cross_origin()
def fetch_start_word():
    # Input validation - length parameter must be specified
    if 'length' not in request.args:
        return "[!] Error: Must specify 'length'"

    length = int(request.args.get('length'))
    return jsonify(WLE.get_start_word(length))


@app.route('/fetch_suitable_word', methods=['GET'])
@cross_origin()
def fetch_suitable_word():
    # Input validation - 
    #TODO

    length = request.args.get('length')
    excluded_letters = request.args.get('excluded').split(',')
    contained_letters = request.args.get('contained').split(',')
    positional_string = request.args.get('positional_string')

    return WLE.get_suitable_word(length, excluded_letters, contained_letters, positional_string)


'''
@app.route('/submitUpload', methods = ['POST'])
@cross_origin()
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        f.save(uploadFileDir + secure_filename(f.filename))
        return '[*] File Uploaded Successfully'
    else:
        return redirect("/error404", code=302)
'''

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port)