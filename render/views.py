from django.views.generic import TemplateView

# Create your views here.
class renderFE(TemplateView):
    template_name = "index.html"