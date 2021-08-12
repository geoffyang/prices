from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Collection, Service, service_collections, Comment
from app.forms import NewComment
service_routes = Blueprint('services', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# GET DELETE /api/services/<id>/
@service_routes.route("/<id>/", methods=['GET', 'DELETE'])
@login_required
def getService(id):
    service = Service.query.filter_by(id=id).first()
    if request.method == 'GET':
        return service.to_dict()
    elif request.method == 'DELETE':
        db.session.delete(service)
        db.session.commit()
        return {"deleted": id}



# POST /api/services/<id>/comments/
@service_routes.route("/<service_id>/comments/", methods=['POST'])
@login_required
def addComment(service_id):
    form = NewComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            service_id=service_id,
            user_id=current_user.id,
            comment=form.data['comment']
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# GET /api/services/domains/<domain>/
@service_routes.route("/subdomains/<subdomain>/")
@login_required
def getSubdomain(subdomain):
    services = Service.query.filter_by(subdomain=subdomain).all()
    if len(services) > 0:
        return {s.id: s.to_dict() for s in services}
    return {}
