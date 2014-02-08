import json
from django.http import Http404, HttpResponse

from .models import Player

def update_score(request):
	if request.is_ajax() and request.POST:
		try:
			user = request.user
			user_score = user.score
			curr_score = request.POST.get('game_score')
			
			if curr_score > user_score:
				user.score = curr_score
				user.save()

			msg = 'PASS'
			ajax_response = json.dumps(msg)

		except:
			
			msg = 'FAIL'
			ajax_response = json.dumps(msg)

		return HttpResponse(ajax_response, content_type='application/json')

	else:
		raise Http404