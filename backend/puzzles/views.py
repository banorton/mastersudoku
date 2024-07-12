from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils.sudoku import Puzzle

@api_view(['POST'])
def solve_puzzle(request):
    grid = request.data.get('grid', None)
    if grid is not None:
        new_grid = []
        for row in grid:
            for el in row:
                val = el if el else 0
                new_grid.append(val)
                
        try:
            p = Puzzle(new_grid)
        except:
            return Response({'error': 'Invalid puzzle'}, status=400)    
        
        try:
            p.solve()
        except:
            return Response({'error': 'Puzzle can not be solved'}, status=400)
        
        solved_grid = p.to_list()
        if solved_grid:
            return Response({'solved': 1, 'solved_grid': solved_grid})
            
    return Response({'error': 'Invalid data'}, status=400)
