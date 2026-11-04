from flask import jsonify


def success_response(data=None, message="Success", status_code=200, meta=None):
    payload = {
        "status": "success",
        "message": message,
        "data": data if data is not None else {},
    }
    if meta is not None:
        payload["meta"] = meta
    return jsonify(payload), status_code


def error_response(message="An error occurred", status_code=400, errors=None):
    payload = {
        "status": "error",
        "message": message,
    }
    if errors is not None:
        payload["errors"] = errors
    return jsonify(payload), status_code
