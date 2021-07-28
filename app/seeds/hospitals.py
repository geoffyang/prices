from app.models import db, Hospital


def seed_hospitals():
    h1 = Hospital(
        name='Mount Sinai Hospital', state='NY', zip='11355')
    h2 = Hospital(
        name='Booth Memorial Hospital', state='NY', zip='11366')


    db.session.add(h1)
    db.session.add(h2)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_hospitals():
    db.session.execute('TRUNCATE hospitals RESTART IDENTITY CASCADE;')
    db.session.commit()
