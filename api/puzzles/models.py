from django.db import models

class SudokuPuzzle(models.Model):
    grid = models.TextField()  # You can store the puzzle as a string or a JSON
    solved = models.TextField(blank=True, null=True)  # This will store the solution

    def __str__(self):
        return self.grid
