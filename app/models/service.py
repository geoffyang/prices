from .db import db
from datetime import datetime
from .service_collections import service_collections


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
    hospital_id = db.Column(
        db.Integer,
        db.ForeignKey("hospitals.id", ondelete='CASCADE'),
        nullable=False
    )
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    status = db.Column(db.String(20))
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    # relationships
    hospital = db.relationship('Hospital', backref=db.backref(
        "services", passive_deletes=True))
    collections = db.relationship(
        "Collection",
        secondary=service_collections,
        back_populates="services"
    )

    def to_dict(self):
        return{
            "id": self.id,
            "billing_code": self.billing_code,
            "cpt_code": self.cpt_code,
            "service_description": self.service_description,
            "list_price": round(float(self.list_price), 2),
            "discounted_price": round(float(self.discounted_price), 2),
            "domain": self.domain,
            "subdomain": self.subdomain,
            "hospital_id": self.hospital_id,
            "status": self.status,
            "comments": {c.id: c.to_dict() for c in self.comments}
        }
