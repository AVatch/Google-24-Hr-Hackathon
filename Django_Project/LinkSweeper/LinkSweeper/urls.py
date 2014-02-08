from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'players.views.game_view'),
    url(r'^logout/$', 'players.views.logout_view'),

    # Ajax calls
    url(r'^ajax/update/score/$', 'players.ajax.update_score'),

    url(r'^admin/', include(admin.site.urls)),
)
