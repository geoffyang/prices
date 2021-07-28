from .db import db
from datetime import datetime

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)

    billing_code = db.Column(db.Integer, nullable=False)
    cpt_code = db.Column(db.String(10), nullable=True)

    service_description = db.Column(db.String(140), nullable=False)

    list_price = db.Column(db.NUMERIC(9, 2), nullable=True)
    discounted_price = db.Column(db.NUMERIC(9, 2), nullable=True)
    domain = db.Column(db.String(20), nullable=True)
    subdomain = db.Column(db.String(20), nullable=True)
    status = db.Column(db.String(20))
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at=db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
