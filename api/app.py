from flask import Flask, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)

#Required
CORS(app)

#One endpoint for this project
@app.route('/')
def templateText():
    #Receive templateID from user, we could use this potentially
    templateID = request.args.get('template_id')

    report = """EXAM:
CT [_laterality_] [Generic Bone], [without or with] IV contrast

CLINICAL HISTORY:

TECHNIQUE:
Axial images were acquired through the [_laterality_] [generic bone]
[without or with] IV contrast. Reformatted images were reviewed.
Dose reduction technique was used including one or more of the following:
automated exposure control, adjustment of mA and kV according to patient size,
and/or iterative reconstruction.

COMPARISON:
None provided.

FINDINGS:

BONES:
No acute fracture or focal osseous lesion.

JOINTS:
No dislocation. The joint spaces are normal.

SOFT TISSUES:
The soft tissues are unremarkable.

IMPRESSION:

1. No acute osseous abnormality."""

    #Return hardcoded report value
    return report
