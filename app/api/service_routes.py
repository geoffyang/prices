from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Collection, Service, service_collections
# # from app.forms import NewCollection
service_routes = Blueprint('services', __name__)



# GET DELETE /api/services/<id>/
@service_routes.route("/<id>/", methods=['GET', 'DELETE'])
@login_required
def getService(id):
    service = Service.query.filter_by(id = id).one()
    if request.method == 'GET':
        # print("NO))))))))))OOOOOOOOOOOOOO services", service.to_dict()["comments"])
        return service.to_dict()
    elif request.method == 'DELETE':
        db.session.delete(service)
        db.session.commit()
        return {"deleted":id}
