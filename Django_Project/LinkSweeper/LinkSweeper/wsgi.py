"""
WSGI config for LinkSweeper project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/howto/deployment/wsgi/
"""

import os
import socket


if socket.gethostname() == "web425.webfaction.com":
	os.environ.setdefault("DJANGO_SETTINGS_MODULE", "LinkSweeper.settings_deploy")
else:
	os.environ.setdefault("DJANGO_SETTINGS_MODULE", "LinkSweeper.settings")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "LinkSweeper.settings_deploy")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
