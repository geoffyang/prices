from .db import db
from .service_collections import service_collections


class Collection(db.Model):
    __tablename__ = 'collections'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, default="My Collection")
    # service_id = db.Column(db.Integer, db.ForeignKey("services.id"), nullable=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    # relationships
    # services = db.relationship('Service', backref='collection')
    services = db.relationship(
        "Service",
        secondary=service_collections,
        back_populates="collections"
    )

    def to_dict(self):
        return{
            "id": self.id,
            "name": self.name,
            # "services": [s.to_dict() for s in self.service_id],
            "user_id": self.user_id
        }
