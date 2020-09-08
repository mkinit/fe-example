function jsFSVS(parent,child){
	const main = document.querySelector(parent)
	const main_child = main.querySelectorAll(child)
	let current_view = 0 //当前屏数，从0开始
	let old_time = 0 //记录滚动时间，避免频繁滚动
	let touch_start = 0 //记录移动端手指点击的Y位置
	let touch_end = 0 //记录移动端手指离开的Y位置
	function compareTime() { //对比时间，大于0.5秒才可以再次滚动
		return new Date().valueOf() - old_time < 500
	}

	//移动端
	document.onmousewheel = (e) => {
		scroll(e.wheelDeltaY)
	}

	document.ontouchstart = (e) => {
		touch_start = e.touches[0].clientY
	}

	document.ontouchend = (e) => {
		touch_end = e.changedTouches[0].clientY
		scroll()
	}

	document.addEventListener('touchmove', (e) => { //移除滑动会拖动页面的动作
		e.preventDefault()
	}, { passive: false })

	function scroll(wheelDeltaY) { //滚动函数
		if (wheelDeltaY < 0 || touch_start - touch_end > 0) {
			if (current_view >= main_child.length - 1 || compareTime()) return //限制最小top
			old_time = new Date().valueOf()
			current_view += 1
		} else {
			if (current_view <= 0 || compareTime()) return //限制最大top
			old_time = new Date().valueOf()
			current_view -= 1
		}
		main.style.top = -current_view + '00%'
	}
}