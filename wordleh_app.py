from flask import Flask, render_template, request, redirect
from flask_cors import CORS, cross_origin
from werkzeug import secure_filename
import os

import wordleh_engine as WLE

app=Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/queryWords', methods=['GET'])
@cross_origin()
def queryWords():
    return "[+] IT WORKS!"

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