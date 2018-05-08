from flask import request, jsonify, make_response
from app import app, db
from app.models import Page


@app.route('/')
@app.route('/index')
@app.route('/pages')
def index():
    pages = Page.query.all()
    return jsonify(pages=[page.serialize() for page in pages])


@app.route('/pages', methods=['POST'])
def pages():
    data = request.json
    page = Page(
        url=data['url'],
        title=data.get('title') or 'default title',
        is_read=data.get('is_read') or 0,
        note=data.get('note') or '',
        score=data.get('score') or 0)
    db.session.add(page)
    db.session.commit()
    return make_response('success', 201)


@app.route('/pages/<int:page_id>', methods=['GET', 'DELETE', 'PATCH'])
def page(page_id):
    page = Page.query.get(page_id)
    if request.method == 'GET':
        return jsonify(page=page.serialize())
    elif request.method == 'DELETE':
        db.session.delete(page)
        db.session.commit()
        return make_response('', 204)
    elif request.method == 'PATCH':
        data = request.json
        for k in data.keys():
            setattr(page, k, data[k])
        db.session.commit()
        return make_response('', 204)
