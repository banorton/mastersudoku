from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import solve_puzzle

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('solve/', solve_puzzle, name='solve_puzzle'),
]