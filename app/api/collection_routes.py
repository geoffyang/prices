from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Collection

collection_routes = Blueprint('collections', __name__)


# GET /api/collections/
@collection_routes.route('/')
@login_required
def getCollections():
    collections = Collection.query.filter(Collection.user_id == current_user.id).all()
    return {}


# GET /api/collections/<id>
