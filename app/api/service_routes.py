from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Collection, Service, service_collections, Comment
from app.forms import NewComment
service_routes = Blueprint('services', __name__)


# GET DELETE /api/services/<id>/
@service_routes.route("/<id>/", methods=['GET', 'DELETE'])
@login_required
def getService(id):
    # try:
        service = Service.query.filter_by(id=id).first()
        if request.method == 'GET':
            return service.to_dict()
        elif request.method == 'DELETE':
            db.session.delete(service)
            db.session.commit()
            return {"deleted": id}
    # except:
        # return {}


# POST /api/services/<id>/comments/
@service_routes.route("/<service_id>/comments/", methods=['POST'])
@login_required
def addComment(service_id):
    form = NewComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("FORM DATA _______", form.data)
    if form.validate_on_submit():
        new_comment = Comment(
            service_id=service_id,
            user_id=current_user.id,
            comment=form.data['comment']
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return "bad comment input"


# # PUT DELETE /api/services/<service_id>/comments/<comment_id>/
# @service_routes.route("/<service_id>/comments/<comment_id>", methods=['PUT', 'DELETE'])
# @login_required
# def editComments(service_id, comment_id):
#     comment = Comment.query.filter_by(id=comment_id)
#     if request.method == "DELETE":
#         pass
#     elif request.method == "PUT":
#         pass
