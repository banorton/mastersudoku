from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SudokuPuzzleViewSet

router = DefaultRouter()
router.register(r'puzzles', SudokuPuzzleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]