from datetime import datetime
from app import db


class Page(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False, unique=True)
    title = db.Column(db.String)
    is_read = db.Column(db.Boolean, nullable=False, default=0)
    note = db.Column(db.Text)
    score = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return '<Page {}>'.format(self.title)

    def serialize(self):
        return {
            'id': self.id,
            'url': self.url,
            'title': self.title,
            'is_read': self.is_read,
            'note': self.note,
            'score': self.score,
            'created_at': self.created_at
        }
