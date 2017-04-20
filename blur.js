
	var canvasWidth = window.innerWidth
	var canvasHeight = window.innerHeight
	var radiaus = 50
	var time = null
	var leftMargin = 0
	var topMargin = 0

	var canvas = document.getElementById("canvas");

	var context = canvas.getContext("2d");

	canvas.width = canvasWidth
	canvas.height = canvasHeight


	var image = new Image()
	var clippingRegion = {x:400,y:200,r:radiaus}

	image.src = "indexcn.jpg"

	//图片加载完成之后
	image.onload = function(e){
		$("#blur_div").css("width",canvasWidth+'px')
		$("#blur_div").css("height",canvasHeight+'px')

		$("#blur_image").css ("width",image.width+'px')
		$("#blur_image").css ("height",image.height+'px')

		leftMargin = (image.width-canvas.width)/2
		topMargin = (image.height-canvas.height)/2

		$("#blur_image").css("left","-"+leftMargin+'px')
		$("#blur_image").css("top","-"+topMargin+'px')
		//初始化canvas
		initCanvas()
	}

	function initCanvas(){
		clearInterval(time)
		clippingRegion = {x:Math.random()*(canvas.width-2*radiaus)+50,y:Math.random()*(canvas.height-2*radiaus)+50,r:radiaus}
		draw(image,clippingRegion)
	}

	function setClippingRegion(clippingRegion){

		context.beginPath();

		context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2,false)

		context.clip()
	}			

	function draw(image){
		
		context.clearRect(0,0,canvas.width,canvas.height)

		context.save()
		setClippingRegion(clippingRegion)
		context.drawImage(image,
			leftMargin,topMargin,canvas.width,canvas.height,
			0,0,canvas.width,canvas.height)

		context.restore()
	}

	function reset(){
		initCanvas()
	}

	function show(){

		time = setInterval(function(){
			clippingRegion.r+=20
			draw(image,clippingRegion)			
		},30)
		
	}		