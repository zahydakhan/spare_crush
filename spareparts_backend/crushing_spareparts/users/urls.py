from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView
from rest_framework_jwt.views import obtain_jwt_token

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('api-token-auth/', obtain_jwt_token),
]
