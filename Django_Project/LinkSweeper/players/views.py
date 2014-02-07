from django.shortcuts 		import render, redirect, render_to_response, get_object_or_404
from django.contrib.auth    import  authenticate, login, logout
from django.template        import  RequestContext

from django.contrib.auth.decorators import login_required


from .models import Player
from .forms import UserForm

def game_view(request):

	callBackDict = {}

	# Get user
	user = request.user
	callBackDict.update(user = user)

	# Get list of users
	list_of_users = Player.objects.all()
	callBackDict.update(list_of_users = list_of_users)

	if 'login' in request.POST:
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(username=username, password=password)

		if user is not None:
			if user.is_active:
				try:
					login(request, user)
				except:
					msg = 'Oops, something went wrong'
					callBackDict.update(msg = msg)
				
				return render_to_response(
						'linksweeper.html',
						callBackDict,
						context_instance=RequestContext(request),
					)
			else:
				# Return to a 'diasbled account page'
				msg = 'Disabled Account'
				callBackDict.update(msg = msg)

				return render_to_response(
						'linksweeper.html',
						callBackDict,
						context_instance=RequestContext(request),
					)
		else:
			# Invalid login error msg
			msg = 'Invalid Login'
			callBackDict.update(msg = msg)

			return render_to_response(
					'linksweeper.html',
					callBackDict,
					context_instance=RequestContext(request),
				)

	if 'register' in request.POST:
		user_form = UserForm(data=request.POST, prefix='user-form')

		if user_form.is_valid():
			username = user_form.cleaned_data['username']
			password = user_form.cleaned_data['password']
			user = Player.objects.create_user(username=username, password=password)
			user.save()

			new_user 	= authenticate(
					                username = username,
					                password = password,
			            )

			try:
				login(request, new_user)
			except:
				msg = 'Something went wrong'
				callBackDict.update(msg = msg)
			
			return render_to_response(
					'linksweeper.html',
					callBackDict,
					context_instance=RequestContext(request),
				)

		msg = 'Username is taken' 
		callBackDict.update(msg = msg)

		return render_to_response(
				'linksweeper.html',
				callBackDict,
				context_instance=RequestContext(request),
			)

	user_form = UserForm(prefix='user-form')
	callBackDict.update(user_form = user_form)

	return render_to_response(
			'linksweeper.html',
			callBackDict,
			context_instance=RequestContext(request),
		)

@login_required
def logout_view(request):
	logout(request)
	return redirect('/')