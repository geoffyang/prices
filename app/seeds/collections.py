from app.models import db, Collection

def seed_collections():
    c1=Collection(
        name="First Collection",
        # service_id=1,
        user_id=1
    )
    c2=Collection(
        name="First Collection",
        # service_id=2,
        user_id=1
    )

    db.session.add(c1)
    db.session.add(c2)
    db.session.commit()


def undo_collections():
    db.session.execute('TRUNCATE collections RESTART IDENTITY CASCADE;')
    db.session.commit()
