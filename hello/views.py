from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import Greeting
from .models import Page

@csrf_exempt
def last_id(request):
	try:
		page = Page()
		page.title = ""
		page.save()
		page = Page.objects.latest(field_name='id')
	except:
		return HttpResponse(1)
	return HttpResponse(page.id)

# csrf_exempt is really bad. 
# figure out a better way to do this.
@csrf_exempt
def rest(request):
	if not request.user.is_authenticated():
		res = HttpResponse("Unauthorized")
		res.status_code = 401
		return res
	if request.method == "GET":
	    pages = Page.objects.all()
	    return render(request, 'pages.html', {'pages': pages})
	if request.method == "POST":
		try:
			json_data = json.loads(request.body.decode("UTF-8"))
			page_id = json_data["id"]
			new_title = json_data["title"]
			page = Page()
			page.title = new_title
			page.save()
			pages = Page.objects.all()
			return render(request, 'pages.html', {'pages': pages})
		except:
			return render(request, 'pages.html', {'pages': pages})
	if request.method == "DELETE":
		Page.objects.filter(id=request.body).delete()
		return HttpResponse("Successfully deleted specified page")
	if request.method == "PUT":
		json_data = json.loads(request.body.decode("UTF-8"))
		page_id = json_data["id"]
		new_title = json_data["title"]
		page = Page.objects.filter(id=page_id)[0]
		page.title = new_title
		page.save()
		pages = Page.objects.all()
		return render(request, 'pages.html', {'pages': pages})

def loggedin(request):
	return render(request, 'logged_in_view.html', {'request': request})