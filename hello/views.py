from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import Greeting
from .models import Page

# csrf_excempt is really bad. 
# figure out a better way to do this.
@csrf_exempt
def rest(request):
	if request.method == "GET":
	    pages = Page.objects.all()
	    return render(request, 'pages.html', {'pages': pages})
	if request.method == "PUT":
		try:
			page = Page()
			page.title = request.body
			page.save()
			pages = Page.objects.all()
			return render(request, 'pages.html', {'pages': pages})
		except:
			return render(request, 'pages.html', {'pages': pages})
	if request.method == "DELETE":
		Page.objects.filter(id=request.body).delete()
		return HttpResponse("Successfully deleted specified page")
	if request.method == "POST":
		json_data = json.loads(request.body.decode("UTF-8"))
		page_id = json_data["id"]
		new_title = json_data["new_title"]
		page = Page.objects.filter(id=page_id)[0]
		page.title = new_title
		page.save()

		pages = Page.object.all()
		return render(request, 'pages.html', {'pages': pages})