from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('doctor/', views.doctor, name='doctor'),
    path('people/', views.people, name='people'),
    path('now/', views.now, name='now'),
    # path('people/data', views.people_data, name='people_data'),
    path('hypothesis/', views.hypothesis, name='hypothesis'),
    path('', views.main, name='main'),
    path('index/', views.index, name='index'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)