from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from datetime import datetime

comment_routes = Blueprint('comments', __name__)
from app.models import User, db, Collection, Service, service_collections, Comment
from app.forms import NewComment



# GET DELETE /api/comments/<id>/
@comment_routes.route("/<id>/", methods=['GET', 'DELETE', 'PUT'])
@login_required
def deleteComment(id):
    comment = Comment.query.filter_by(id=id).one()
    if request.method == 'GET':
        return comment.to_dict()
    elif request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return {"deleted": id}
    elif request.method == 'PUT':

        # pull data off request.data and validate it
        form = NewComment()
        #maybe returns errors to front end

        print("HHHHHHHHHHHHHHHHH form data HHHHHHHHHHHHHHHHHHHHHHHHHHHHH",request.form)

        # attempt 1
        setattr(comment, "comment", form.data['comment'])
        setattr(comment, "updated_at", datetime.utcnow())
        db.session.commit()
        return {"edited": id}

        # attempt 2
        # form.populate_obj(comment)
        # comment.updated_at = datetime.utcnow()
        # db.session.add(comment)
        # db.session.commit()
        # return {"edited":id}
