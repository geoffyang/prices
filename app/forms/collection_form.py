from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, BooleanField, SelectField, SubmitField
from wtforms.validators import DataRequired


class NewCollection(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    submit = SubmitField()

