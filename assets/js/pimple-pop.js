var intervalTimerJerawat,
	timerState;
var random = new Random.Random();

const app = new Vue({
	el: '#app',
	data: {
		game: {
			actor: {
				'actor--small': {
					value: 1	
				},
				'actor--red': {
					value: 3
				},
				'actor--scar': {
					value: -1
				},
				'actor--whitehead': {
					value: -2
				},
				'actor--mystery': {
					value : {
						plus: 10,
						minus: -15
					}
				}
			},
			addPimple: this.addPimple,
			area: [],
			areaNumber: 35,
			code: {
				'A': {
					name: 'actor--small'
				},
				'B': {
					name: 'actor--red'
				},
				'C': {
					name: 'actor--scar'
				},
				'D': {
					name: 'actor--whitehead'
				},
				'E': {
					name: 'actor--mystery'
				}
			},
			countdown: 3,
			listNotAllowedAreaPimple: [5, 6, 8, 9, 10, 11, 13, 15, 16, 18, 19, 22, 27, 29, 30, 31, 33, 34],
			pimpleArea: [],
			readyPlay: this.readyPlay,
			removeAllPimple: this.removeAllPimple,
			removePimple: this.removePimple,
			resultsRandomArea: [],
			runTimer: this.runTimer,
			zit: 0,
			randomConfig: 0,
			start: this.start,
			state: {
				isReadyToPlay: false,
				persenProgress: 0,
				currentIndex: 0,
				patternIndex: null,
				mystery: null,
				arrIndexMystery: 0
			},
			time: 15,
			playingTime: 15
		}
	},
	computed: {
		isReadyToPlay: function () {
			return this.game.state.isReadyToPlay
		},
		patterns: function () {
			return patterns[this.randomConfig]
		}
	},
	methods: {
		addPimple: function () {
			var stateAddPimple = setInterval(function () {
				var randArea = this.randomArea(),
						actorPattern;
				if (this.game.time == '00') {
					clearInterval(stateAddPimple)
					this.removeAllPimple()
				}

				if (this.game.time != '00') {
					for (var i = 0; i < randArea.length; i++) {
						actorPattern = this.patterns.start[this.game.state.currentIndex] ? this.patterns.start[this.game.state.currentIndex].actor[i] : false
						this.game.area[randArea[i]].isShow = true
						this.game.area[randArea[i]].clickCount = 0
						this.game.area[randArea[i]].actor = actorPattern ? this.game.code[actorPattern].name : ''

						if (this.game.code[actorPattern] && this.game.code[actorPattern].name === 'actor--mystery') {
							this.game.area[randArea[i]].point = this.patterns.start[this.game.state.currentIndex].mystery_value
						}
						
						if (this.game.pimpleArea.length > 17) {
							this.game.pimpleArea[this.game.pimpleArea.length - i] = randArea[i]
						} 
						else {
							this.game.pimpleArea.push(randArea[i])
						}
					}
				}

				this.game.state.currentIndex++
			}.bind(this), 1000)
		},
		buildGameState: function () {
			// set area
			for (var i = 0; i < this.game.areaNumber; i++) {
				if ($SO.inArray(i, this.game.listNotAllowedAreaPimple) > -1) {
					this.$set(this.game.area, i, { isShow: false, actor: null, isAllowed: false, zitShow: false, clickCount: 0 })
				}
				else {	
					this.$set(this.game.area, i, { isShow: false, actor: null, isAllowed: true, zitShow: false, clickCount: 0 })	
				}
			}
		},
		getActor: function (e,{index, actor, show, point}) {
			if (show && e.isTrusted) {
				this.game.area[index].clickCount = this.game.area[index].clickCount + 1
				var zit = 0
				if (actor === 'actor--mystery') {
					zit = this.game.actor['actor--mystery'].value[point]
					
				}
				else {
					zit = this.game.actor[actor].value	
				}

				if (actor === 'actor--red' && this.game.area[index].clickCount < 3) {
					// zit = 0
				}

				if (!isNaN(zit)) {
					this.game.zit += zit
					// this.$store.dispatch('adjustZitPerGameJerawat', zit)
					// this.$store.dispatch('adjustZitJerawat', zit)

					if (
						(actor === 'actor--small' && this.game.area[index].clickCount > 0) ||
						(actor === 'actor--scar' && this.game.area[index].clickCount > 0) ||
						(actor === 'actor--whitehead' && this.game.area[index].clickCount > 0) ||
						(actor === 'actor--mystery' && this.game.area[index].clickCount > 0) ||
						// (actor === 'actor--red' && this.game.area[index].clickCount > 2)
						(actor === 'actor--red' && this.game.area[index].clickCount > 0)
					) {
						this.game.area[index].isShow = false
						this.game.area[index].actor = null
						this.game.area[index].zitShow = true
						if (zit !== 0) {
							e.target.nextElementSibling.innerHTML = zit > 0 ? '+'+zit : zit
							setTimeout(() => {
								this.game.area[index].zitShow = false
							}, 10);
						}
					}
				}
			}
		},
		randomArea: function () { 
			// use recursive concept
			// if doesnt meet empty area this function always call itselt until find a empty area
			var randomNum,
					results;

			if (this.game.resultsRandomArea.length >= 3) this.game.resultsRandomArea = []
			
			randomNum = random.integer(0, 34);

			if (this.game.pimpleArea.length > 9) {
				if (this.game.area[randomNum].isAllowed) {	
					if ($SO.size(this.game.resultsRandomArea) < 4) {
						this.game.area[randomNum].isShow = true
						this.game.resultsRandomArea.push(randomNum)
						if (this.game.resultsRandomArea.length === 3) {
							results = Array.prototype.slice.call(this.game.resultsRandomArea)
							return results
						}	
						else {
							return this.randomArea()
						}
						
					}
				}
				else {
					return this.randomArea()
				}
			}
			else {
				if (this.game.area[randomNum].isShow || !this.game.area[randomNum].isAllowed) {
					return this.randomArea()
				}
				else {
					if ($SO.size(this.game.resultsRandomArea) < 4) {
						this.game.area[randomNum].isShow = true
						this.game.resultsRandomArea.push(randomNum)
						if (this.game.resultsRandomArea.length === 3) {
							results = Array.prototype.slice.call(this.game.resultsRandomArea)
							return results
						}	
						else {
							return this.randomArea()
						}
						
					}
				}
			}
		},
		readyPlay: function () {
			this.$set(this.game, 'time', this.game.playingTime)	
			var readyState = setInterval(function() {
				
				if ($SO.type(this.game.countdown) === 'number') this.game.countdown--
				
				if ($SO.type(this.game.countdown) === 'string') {
					this.game.state.isReadyToPlay = true
					clearInterval(readyState);
				}

				if (this.game.countdown === 0) {
					this.game.countdown = 'Go!'
				}
			}.bind(this), 1000)
		},
		removePimple: function () {
			// FIFO flow
			var stateRemovePimple = setInterval(() => {
				var pimple,
						pimpleArea = Array.prototype.slice.call(this.game.pimpleArea, 0, 3);					
				for (var i = 0; i < pimpleArea.length; i++) {
					pimple = this.game.area[pimpleArea[i]]
					if (pimple.isShow) {
						pimple.isShow = false
						pimple.actor = null
						pimple.clickCount = 0
						this.game.pimpleArea.shift() // FIFO
					}
				}

				if (this.game.time == '00') {
					clearInterval(stateRemovePimple)
					this.removeAllPimple()
				}
			}, 2000)
		},
		removeAllPimple: function () {
			for (var i = 0; i < this.game.area.length; i++) {
				this.game.area[i].isShow = false
				this.game.area[i].actor = null
			}
		},
		runTimer: function () {
			timerState = setInterval(() => {
				this.game.state.persenProgress += (100 / this.game.playingTime)
				this.game.time--
				if ($SO.type(this.game.time) === 'number' && this.game.time < 10) {
					this.game.time = '0' + this.game.time
				}
				// the finish state of the game
				if (this.game.time == '00') {
					clearInterval(timerState)
					// this.$store.commit("setZits", 100)
					alert('Your score', this.game.zit);
				}
			}, 1000)
		},
		start: function () {
			var randArea = this.randomArea();
			for (var i = 0; i < randArea.length; i++) {
				this.game.area[randArea[i]].actor = this.game.code[this.patterns.ready.actor[i]].name
				if (this.game.code[this.patterns.ready.actor[i]].name === 'actor--mystery') {
					this.game.area[randArea[i]].point = this.patterns.ready.mystery_value
				}
				this.game.pimpleArea.push(randArea[i])
			}

			this.addPimple()
			this.removePimple()
		},
		forceQuit: function () {
			clearInterval(timerState)
			window.location.href = "/portfolio"
		},
	},
	watch: {
		isReadyToPlay: function (newVal) {
			if (newVal) {
				this.start()
				this.runTimer()
			}
		}
	},
	mounted: function () {
		this.readyPlay()
	},
	created: function () {
		this.randomConfig = random.integer(0, 2)
		this.buildGameState()
	}
})