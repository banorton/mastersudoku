from rest_framework import serializers
from .models import SudokuPuzzle

class SudokuPuzzleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SudokuPuzzle
        fields = '__all__'
