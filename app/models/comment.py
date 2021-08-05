
from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)

    # FK
    service_id = db.Column(db.Integer,
                           db.ForeignKey("services.id",
                                         ondelete='CASCADE'),
                           nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey("users.id"),
                        nullable=False)

    comment = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)

    # relationships
    user = db.relationship('User', backref=db.backref("comments"))
    service = db.relationship('Service', backref=db.backref(
        "comments"), passive_deletes=True)

    def to_dict(self):
        post_date = self.updated_at
        am_pm = post_date.strftime("%p").lower()
        display_time = post_date.strftime(f"%-I{am_pm} %b %Y")
        return{
            "id":self.id,
            "service_id":self.service_id,
            "user_id":self.user_id,
            "comment":self.comment,
            # "created_at":self.created_at,
            "display_time":display_time
        }
