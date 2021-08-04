from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Collection, Service, service_collections, Comment

comment_routes = Blueprint('comments', __name__)


# GET DELETE /api/comments/<id>/
@comment_routes.route("/<id>/", methods=['GET', 'DELETE', ])
@login_required
def deleteComment(id):
    comment = Comment.query.filter_by(id=id).one()
    if request.method == 'GET':
        return comment.to_dict()
    elif request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return {"deleted": id}
