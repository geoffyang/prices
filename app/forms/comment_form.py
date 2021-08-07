from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, BooleanField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length


class NewComment(FlaskForm):
    comment = StringField('Comment', validators=[
        DataRequired(),
        Length(0, 2, "Please keep under 250 characters")
    ])
    # submit = SubmitField()
