from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Collection, Service, service_collections
from app.forms import NewCollection
from sqlalchemy.orm import joinedload

collection_routes = Blueprint('collections', __name__)


# GET POST /api/collections/
@collection_routes.route('/', methods=['GET', 'POST'])
@login_required
def getCollections():
    if request.method == 'GET':
        collections = Collection.query.filter(
            Collection.user_id == current_user.id).all()
        return {c.id: c.to_dict() for c in collections}
    elif request.method == 'POST':
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


# GET DELETE /api/collections/<id>/
@collection_routes.route("/<id>/", methods=['GET', 'DELETE'])
@login_required
def getCollection(id):
    collection = Collection.query.filter(Collection.id == id).one()

    if request.method == 'GET':
        return collection.to_dict()
    elif request.method == 'DELETE':
        db.session.delete(collection)
        db.session.commit()
        return {"deleted": id}

#########################################
#                                       #
#              services                 #
#                                       #
#########################################

# GET /api/collections/<id>/services
@collection_routes.route('/<collection_id>/services')
@login_required
def getServicesInCollection(collection_id):

    return Collection.query.get(collection_id).to_dict()["services"]

    # services = collection.services
    # return {service.id:service for service in services}

    # if request.method == 'GET':
    #     rows = db.session.execute(
    #     f"SELECT * FROM services FULL JOIN service_collections ON services.id=service_collections.service_id FULL JOIN collections ON  service_collections.collection_id=collections.id WHERE service_collections.collection_id={collection_id}").fetchall()

    #     services = {row[0] : {
    #             "id":row[0],
    #             "billing_code":row[1],
    #             "cpt_code":row[2],
    #             "service_description":row[3],
    #             "list_price":float(row[4]),
    #             "discounted_price":float(row[5]),
    #             "domain":row[6],
    #             "subdomain":row[7],
    #             "hospital_id":row[8],
    #             "status":row[9],
    #             "user_id":row[10]
    #         } for row in rows}

    #     return services

    # attempt 1
    # services = Service.query.filter(
    #     Service.services.any(id={Collection.id})).all()

    # attempt 2
    # services = Collection.query.filter(Collection.id==1).options(joinedload(Collection.services)).all()

    # attempt 3
    # services = db.session.query(Collection) \
    #                     .filter(Collection.id==1) \
    #                     .options(joinedload(Collection.services))

    # attempt 4
    # services = Service.query.filter(Service.collections.any(id={Collection.id})).all()

    # attempt 5
    # services = Collection.query.get(collection_id).services

    # return {service.id:service.to_dict() for service in services}

    # attempt 6

    # return services


# GET POST DELETE /api/collections/<id>/services/<id>
@collection_routes.route('/<collection_id>/services/<service_id>')
@login_required
def serviceInCollection(collection_id, service_id):
    pass
