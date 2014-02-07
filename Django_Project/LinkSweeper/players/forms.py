from django 			import forms

from .models import Player

class UserForm(forms.ModelForm):
	username 	= forms.CharField(
					max_length = 50,
					required   = True,
					widget     = forms.TextInput(
							attrs = {
								'class': 'form-control',
								'name' : 'Username',
								'id'   : 'username',
								'placeholder': 'Username',
								'autocomplete': 'on',
							}
						),
			)

	password = forms.CharField(
							label="Password",
							widget=forms.PasswordInput(
							render_value=False,
							attrs={
								'class': 'form-control',
								'name':  'Password',
								'id':	 'password',
								'placeholder': 'Password',
							}

						),
					)

	class Meta:
		model = Player
		fields = ('username', 'password')
