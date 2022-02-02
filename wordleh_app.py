from flask import Flask, render_template, request, redirect, jsonify
from flask_cors import CORS, cross_origin
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

    suggested_word, pool_size =  WLE.get_start_word(length)

    response_json = {
        'suggested': suggested_word,
        'poolSize': pool_size
    }

    return jsonify(response_json)


@app.route('/fetch_suitable_word', methods=['GET'])
@cross_origin()
def fetch_suitable_word():
    # Input validation - 
    #TODO

    length = request.args.get('length')
    excluded_letters = request.args.get('excluded').split(',')
    contained_letters = request.args.get('contained').split(',')
    positional_string = request.args.get('positional_string')

    suggested, pool_size =WLE.get_suitable_word(length, excluded_letters, contained_letters, positional_string)

    response_json = {
        'suggested': suggested,
        'poolSize': pool_size
    }

    return jsonify(response_json)


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
    app.run(host='0.0.0.0', port=port)