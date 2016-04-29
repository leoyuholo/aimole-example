import sys

# write your compute function
# it takes in a 8 * 8 board, your disc and your opponents' disc
# return your next move by returning an tuple of [x, y]
def compute(me, opponent, board):
	# only valid for the first move, give this AI more capability!
	if me == 'W':
		return (2, 3)
	else:
		return (4, 2)

while True:
	# read my disc symbol and opponent's disc symbol
	s = sys.stdin.readline()
	me = s[0]
	opponent = s[2]

	# read game board
	board = [sys.stdin.readline() for i in range(8)]

	# compute my move
	(row, col) = compute(me, opponent, board)

	# output my move
	print '%d %d' % (row, col)
