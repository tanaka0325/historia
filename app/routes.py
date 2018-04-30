from flask import render_template, flash, redirect, url_for, request, jsonify, json
from app import app
from app.models import Page


@app.route('/')
@app.route('/index')
def index():
    pages = Page.query.all()
    return jsonify(pages=[page.serialize() for page in pages])
