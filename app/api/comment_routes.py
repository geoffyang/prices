from app.forms import NewComment
from app.models import User, db, Collection, Service, service_collections, Comment
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from datetime import datetime

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# GET DELETE PUT /api/comments/<id>/
@comment_routes.route("/<id>/", methods=['GET', 'DELETE', 'PUT'])
@login_required
def deleteComment(id):
    comment = Comment.query.get(id)
    if request.method == 'GET':
        return comment.to_dict()
    elif request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return {"deleted": id}
    elif request.method == 'PUT':
        form = NewComment()
        form['csrf_token'].data = request.cookies['csrf_token']
        print(">>>>>>>>>>>>>>>>>>>>>>>put request", form.data)
        if form.validate_on_submit():
            setattr(comment, "comment", form.data['comment'])
            setattr(comment, "updated_at", datetime.utcnow())
            db.session.commit()
            return comment.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

        # alternate method
        # form.populate_obj(comment)
        # comment.updated_at = datetime.utcnow()
        # db.session.add(comment)
        # db.session.commit()
        # return {"edited":id}
