from django.urls import path
from render.views import renderFE

urlpatterns = [
    path("", renderFE.as_view(), name="render")
]