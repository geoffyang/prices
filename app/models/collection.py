from .db import db


class Collection(db.Model):
    __tablename__ = 'collections'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, default="My Collection")
    service_id = db.Column(db.Integer, db.ForeignKey(
        "services.id"), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id", ondelete="CASCADE"), nullable=False)

    services = db.relationship(
        'Service', backref='collection')

    def to_dict(self):
        return{
            "id": self.id,
            "name": self.name,
            # "services": [s.to_dict() for s in self.service_id],
            "user_id": self.user_id
        }
