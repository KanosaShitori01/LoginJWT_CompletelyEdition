from rest_framework.views import exception_handler
def handle_code_status(exc, content):
    response = exception_handler(exc, content)
    if response is not None and response.status_code == 403: 
        response.status_code = 401
    return response