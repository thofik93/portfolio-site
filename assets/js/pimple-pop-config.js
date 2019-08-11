var patterns = [
	{
		ready: {
			actor: ['A', 'A', 'A']
		},
		start: [
			{ 
				actor: ['B', 'A', 'A'] 
			}, {
				actor: ['B', 'B', 'A']
			}, {
				actor: ['C', 'A', 'A']
			}, {
				actor: ['B', 'B', 'B']
			}, {
				actor: ['B', 'B', 'A']
			}, {
				actor: ['B', 'B', 'A']
			}, {
				actor: ['A', 'B', 'A']
			}, {
				actor: ['B', 'C', 'A']
			}, {
				actor: ['A', 'C', 'A']
			}, {
				actor: ['B', 'C', 'A']
			}, {
				actor: ['B', 'D', 'A']
			}, {
				actor: ['A', 'B', 'A']
			}, {
				actor: ['B', 'A', 'A']
			}, {
				actor: ['B', 'E', 'A'],
				mystery_value: 'plus'
			}, {
				actor: ['D', 'E', 'A'],
				mystery_value: 'plus'
			}, {
				actor: ['B', 'E', 'B'],
				mystery_value: 'minus' // end
			}
		]
	},
	{
		ready: {
			actor: ['A', 'D', 'A']
		},
		start: [
			{ 
				actor: ['B', 'C', 'A'] 
			}, {
				actor: ['D', 'B', 'A']
			}, {
				actor: ['E', 'A', 'E'],
				mystery_value: 'plus'
			}, {
				actor: ['A', 'B', 'A']
			}, {
				actor: ['D', 'A', 'B']
			}, {
				actor: ['B', 'E', 'B'],
				mystery_value: 'minus'
			}, {
				actor: ['B', 'B', 'B']
			}, {
				actor: ['B', 'A', 'A']
			}, {
				actor: ['C', 'B', 'B']
			}, {
				actor: ['B', 'D', 'B']
			}, {
				actor: ['A', 'B', 'A']
			}, {
				actor: ['B', 'B', 'E'],
				mystery_value: 'plus'
			}, {
				actor: ['B', 'D', 'B']
			}, {
				actor: ['A', 'C', 'B']
			}, {
				actor: ['A', 'B', 'B'] // end
			}
		]
	},
	{
		ready: {
			actor: ['B', 'E', 'B'],
			mystery_value: 'plus'
		},
		start: [
			{ 
				actor: ['C', 'E', 'B'],
				mystery_value: 'minus' 
			}, {
				actor: ['E', 'E', 'B'],
				mystery_value: 'plus'
			}, {
				actor: ['A', 'D', 'B']
			}, {
				actor: ['C', 'B', 'B']
			}, {
				actor: ['E', 'A', 'B'],
				mystery_value: 'plus'
			}, {
				actor: ['B', 'B', 'A']
			}, {
				actor: ['B', 'A', 'A']
			}, {
				actor: ['B', 'B', 'B']
			}, {
				actor: ['A', 'B', 'C']
			}, {
				actor: ['B', 'B', 'B']
			}, {
				actor: ['E', 'B', 'B'],
				mystery_value: 'plus'
			}, {
				actor: ['A', 'C', 'A']
			}, {
				actor: ['B', 'A', 'A']
			}, {
				actor: ['E', 'E', 'C'],
				mystery_value: 'plus'
			}
		]
	}
]