from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

import hello.views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'gettingstarted.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^meebly/rest', hello.views.rest, name='rest'),
    url(r'^meebly/new_page_id', hello.views.last_id, name='last_id'),
    
)
