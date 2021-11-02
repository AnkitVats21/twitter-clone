from .responses import MetaDataResponse
from functools import wraps


def meta_data_response(meta=""):
    def deco(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            vanilla_response = f(*args, **kwargs)
            # if vanilla_response.status_code == 200:
            #     meta = "OK"
            return MetaDataResponse(
                vanilla_response.data, meta, status=vanilla_response.status_code
            )

        return decorated_function

    return deco
