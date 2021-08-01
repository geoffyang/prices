from .db import db

service_collections = db.Table(
    "service_collections",
    db.Model.metadata,

    db.Column(
        "service_id",
        db.Integer,
        db.ForeignKey("services.id"),
        primary_key=True
    ),

    db.Column(
        "collection_id",
        db.Integer,
        db.ForeignKey("collections.id"),
        primary_key=True
    ),
)
