from django.shortcuts 		import render, redirect, render_to_response, get_object_or_404
from django.template        import  RequestContext


def link_gen_test(request):
    return render_to_response(
           'link_gen_test.html',
           {},
           context_instance=RequestContext(request)
           )


