class GoodItem {
	name = ''
	price = 0
	count = 1

	constructor (name, price) {
		this.name = name
		this.price = price
	}

	inc () {
		this.count++
	}

	dec () {
		this.count--
	}

    getAddBtn () {
    	const btn = document.createElement('button')
    	btn.classList.add('button')
    	btn.innerText = 'Купить'

    	btn.addEventListener('click', () => {
    		const CartInstance = new Cart()
    		CartInstance.add(this)
    		console.log(CartInstance)
    	})

    	return btn
    }

    getMainTemplate () {
	const { price, name } = this
	const block = document.createElement('div')

	block.classList.add('good')

	block.innerHTML = `
		<div class="good__img">
			<div>NO IMAGE PROVIDED</div>
		</div>

		<div class="good__meta">Товар: <span>${name}</span></div>
		<div class="good__meta">Цена: <span>${price}</span></div>
    `
    block.appendChild(this.getAddBtn())

    return block;
   }

   getMinusBtn () {
   	const btn = document.createElement('button')
   	btn.classList.add('man_btn')
   	btn.innerText = '-'

   	btn.addEventListener('click', () => {
   		const CartInstance = new Cart()
   	CartInstance.remove(this)
   	})

   	return btn
   }

   getPlusBtn () {
   	const btn = document.createElement('button')
   	btn.classList.add('man_btn')
   	btn.innerText = '+'

   	btn.addEventListener('click', () => {
   		const CartInstance = new Cart()
   	CartInstance.add(this)
   	})

   	return btn
   }

getCartTemplate () {
	const { name, price, count } = this
	const block = document.createElement('div')

	block.classList.add('cart')

	block.innerHTML = `
		<div class="cart__item">
			${name}: ${price} X ${count} = ${price * count}
		</div>

    `
    block.appendChild(this.getMinusBtn())
    block.appendChild(this.getPlusBtn())
    return block;
   }

}

class List {
	items = []

	constructor (items = []) {
		this.items = items
	}

	findGood (good) {
		return this.items.filter(item => item.name === good.name)[0] //проверка на дубляж
	}

	add(item) {
		const exist = this.findGood(item)
		if (exist) {
			exist.inc()
		} else {
		this.items.push(item)
		}
		this.render()
	}

	remove (item) {
		const exist = this.findGood(item)
		if (exist.count > 1) {
			exist.dec()
		} else {
			this.items = this.items.filter(good => item.name !== good.name)
		}
		this.render()
	}

	render () {
	}
}

class Cart extends List {
	constructor () {
		if (Cart._instance) {
			return Cart._instance
		}
		super()
		this.init()
		Cart._instance = this
	}

	init () {
		const block = document.createElement('div')
		block.classList.add('cart')

		const btn = document.createElement('div')
		btn.innerText = 'Корзина'
		btn.classList.add('btn')
		btn.addEventListener('click', () => {
			this.toggle()
		})

		const List = document.createElement('div')
		List.classList.add('cart__list')

		block.appendChild(btn)
		block.appendChild(List)

		const placeToRender = document.querySelector('header')
		if (placeToRender) {
			placeToRender.appendChild(block)
		}
	this.render()
	}

	toggle () {
		const list = document.querySelector('.cart__list')
		list.classList.toggle('shown')
	}

  getEmptyBlock () {
  	const block = document.createElement('div')
  	block.classList.add('cart__empty')
  	block.innerText = 'Не будь лузером, купи!'
  	return block
  }

  getSumBlock() {
  	const sum = this.items.reduce((sum, good) => {
  		return sum + good.price * good.count
  	}, 0)



  	const block = document.createElement('div')
  	block.classList.add('.cart__sum')
  	block.innerText = `Итого: ${sum}`

  	return block
  }

  render () {
  	const placeToRender = document.querySelector('.cart__list')
  	placeToRender.innerHTML = ''

  	if (!this.items.length) {
  		placeToRender.appendChild(this.getEmptyBlock())
  	} else {
  		this.items.forEach(good => {
  			placeToRender.appendChild(good.getCartTemplate())
  		})
  		placeToRender.appendChild(this.getSumBlock())
  	}
  }
}

class GoodsList extends List {
	constructor () {
		super()
	}

	render () {
		const placeToRender = document.querySelector('.goods-list')
		placeToRender.innerHTML = ''

		if (placeToRender) {
			this.items.forEach(good => {
				const block = good.getMainTemplate()
				placeToRender.appendChild(block)
			})
		}
	}
}

const GoodsListInstance = new GoodsList()
GoodsListInstance.add(new GoodItem('buzz', 1000))
GoodsListInstance.add(new GoodItem('tommygun', 5000))
GoodsListInstance.add(new GoodItem('pipboy', 10000))

const CartInstance = new Cart()

GoodsListInstance.render()


