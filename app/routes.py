from flask import render_template, flash, redirect, url_for, request
from app import app


@app.route('/')
@app.route('/index')
def index():
    return "hello world"
