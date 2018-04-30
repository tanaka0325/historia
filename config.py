import os

basedir = os.path.abspath(os.path.dirname(__file__))
database_name = 'historia.db'


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, database_name)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
