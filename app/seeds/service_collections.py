from app.models import db, service_collections


def seed_service_collections():

    db.session.execute(service_collections.insert().values(
        service_id=1, collection_id=1))
    db.session.execute(service_collections.insert().values(
        service_id=2, collection_id=1))
    db.session.execute(service_collections.insert().values(
        service_id=3, collection_id=1))
    db.session.execute(service_collections.insert().values(
        service_id=4, collection_id=1))
    db.session.execute(service_collections.insert().values(
        service_id=2, collection_id=2))
    db.session.execute(service_collections.insert().values(
        service_id=3, collection_id=2))
    db.session.execute(service_collections.insert().values(
        service_id=4, collection_id=2))
    db.session.execute(service_collections.insert().values(
        service_id=2, collection_id=4))
    db.session.execute(service_collections.insert().values(
        service_id=3, collection_id=4))
    db.session.execute(service_collections.insert().values(
        service_id=4, collection_id=4))


    db.session.commit()


def undo_service_collections():

    db.session.execute('TRUNCATE service_collections RESTART IDENTITY CASCADE;')
    db.session.commit()
