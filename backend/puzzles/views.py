from rest_framework import viewsets
from .models import SudokuPuzzle
from .serializers import SudokuPuzzleSerializer

class SudokuPuzzleViewSet(viewsets.ModelViewSet):
    queryset = SudokuPuzzle.objects.all()
    serializer_class = SudokuPuzzleSerializer
