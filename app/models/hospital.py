from .db import db


class Hospital(db.Model):
    __tablename__ = 'hospitals'

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(30), nullable=False, unique=True)

    state = db.Column(db.String(2), nullable=False)

    zip = db.Column(db.Integer, nullable=True)
