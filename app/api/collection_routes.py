from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Collection
from app.forms import NewCollection
collection_routes = Blueprint('collections', __name__)


# GET /api/collections/
@collection_routes.route('/')
@login_required
def getCollections():
    collections = Collection.query.filter(
        Collection.user_id == current_user.id).all()
    return {c.id: c.to_dict() for c in collections}


# POST /api/collections/
@collection_routes.route("/", methods=["POST"])
@login_required
def postCollection():
    form = NewCollection()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_collection = Collection(
            name=form.data['name'],
            user_id=current_user.id
        )
        db.session.add(new_collection)
        db.session.commit()
        return {
            "id": new_collection.id,
            "name": new_collection.name,
            "user_id": new_collection.user_id
        }
    return "bad data"


# GET /api/collections/<id>
@collection_routes.route("/<id>")
@login_required
def getCollection(id):
    collection = Collection.query.filter(Collection.id == id).one()
    return collection.to_dict()
