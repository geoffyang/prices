from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, BooleanField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length


class NewCollection(FlaskForm):
    name = StringField('Name', validators=[
        DataRequired(),
        Length(-1, 40, "Please keep message under 40 characters")
    ])
