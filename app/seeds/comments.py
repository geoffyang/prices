from app.models import db, Comment
from datetime import datetime

def seed_comments():
    c1 = Comment(
        service_id=1,
        user_id =1,
        comment="this price is outdated",
        )
    c2 = Comment(
        service_id=1,
        user_id =2,
        comment="agree, this price is outdated",
        )
    c3 = Comment(
        service_id=1,
        user_id =1,
        comment="any admins paying attention?",
        )


    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
