
		//Obteniendo elementos

		var clases = ['column', 'urlVideo', 'botton', 'container', 'embedVideo', 'flecha', 'size', 'code','copyBtn'];
		var el = {};

		clases.forEach((e,i) => {
			el[e] = document.querySelector(`.${e}`);
		})

		//Eventos url
		var urlVideoArray = [];
		var idVideo= "";

		el.botton.addEventListener("click", event =>{
			event.preventDefault();
			urlVideoArray = el.urlVideo.value.replace("v=", "/").split('/');
			idVideo = urlVideoArray[urlVideoArray.length - 1];
			el.embedVideo.src = `https://www.youtube.com/embed/${idVideo}`;
		})

		const clickHandle = (elemento)  => {

			elemento.addEventListener("click", event => {
			event.preventDefault();
			el.size.innerHTML = `${el.container.offsetWidth}x${el.container.offsetHeight}`;
			el.code.value =  `<iframe width="${el.container.offsetWidth}" height="${el.container.offsetHeight} "id="video" src="https://www.youtube.com/embed/${idVideo}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
			})	
		}

		clickHandle(el.botton)
		clickHandle(el.container)
		clickHandle(el.flecha)

		const copy = () => {
			el.code.select();
  			el.code.setSelectionRange(0, 99999);
  			document.execCommand('copy')
  			
  			el.size.innerHTML = 'Copied!'
  			el.size.style.backgroundColor = 'tomato'
  			setTimeout(() => {
  				el.size.innerHTML = "" + el.container.offsetWidth + " x " + el.container.offsetHeight;
				el.size.style.backgroundColor = '#9e9f95'
  			},800)
  		}



	//Resize
var mouseXPrev = 0
var mouseYPrev = 0
var mouseTouchXPrev = 0
var mouseTouchYPrev = 0
var containerXPrev  = 160
var containerYPrev  = 90

	const  resizeX = e => {
				el.container.style.width =(containerXPrev * -1.3 + (mouseXPrev - e.screenX)) * -1 + 'px'
				//el.container.style.height = el.container.style.width.replace('px','') / 1.7 + 'px'
				el.container.style.height = (containerYPrev * -1.3 + (mouseYPrev - e.screenY)) * -1 + 'px'
			}

	const  resizeXTouch = e => {
				el.container.style.width = (containerXPrev * -1.1+ (mouseTouchXPrev - e.changedTouches[0].screenX)) *  -1 +  'px'
				//el.container.style.height = el.container.style.width.replace('px','') / 1.7 + 'px'
				el.container.style.height = (containerYPrev * -1.1 + (mouseTouchYPrev - e.changedTouches[0].screenY)) * -1 + 'px'
			}



	const removeResize = e => {
			e.preventDefault()

			el.size.innerHTML = `${el.container.offsetWidth}x${el.container.offsetHeight}`;
			el.code.value =  `<iframe width="${el.container.offsetWidth}" height="${el.container.offsetHeight} "id="video" src="https://www.youtube.com/embed/${idVideo}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
			setTimeout(()=>{
						el.flecha.removeEventListener('mousemove', resizeX)
						window.removeEventListener('mousemove', resizeX)
						el.container.removeEventListener('mousemove', resizeX)
						el.embedVideo.removeEventListener('mousemove', resizeX)
						
						el.flecha.removeEventListener('touchmove', resizeXTouch)
						window.removeEventListener('touchmove', resizeXTouch)
						el.container.removeEventListener('touchmove', resizeXTouch)
						el.embedVideo.removeEventListener('mousemove', resizeXTouch)

						containerXPrev  = el.container.style.width.replace('px','')  - 30
						containerYPrev  = el.container.style.height.replace('px','')  - 30 
			},20)			
	}

	// Evento

		el.flecha.addEventListener('mousedown', (e) => {
			console.log('se hizo click')
			mouseXPrev = e.screenX
			mouseYPrev = e.screenY

			window.addEventListener('mousemove', resizeX)
			el.container.addEventListener('mousemove', resizeX)
			el.flecha.addEventListener('mousemove', resizeX)
			el.embedVideo.addEventListener('mousemove', resizeX)

			window.addEventListener('mouseup', removeResize)
			console.log('ya están los eventos')
	})

		el.flecha.addEventListener('touchstart', (e) => {

			mouseTouchXPrev = e.changedTouches[0].screenX
			mouseTouchYPrev = e.changedTouches[0].screenY


			window.addEventListener('touchmove', resizeXTouch)
			el.container.addEventListener('touchmove', resizeXTouch)
			el.flecha.addEventListener('touchmove', resizeXTouch)
			el.embedVideo.addEventListener('touchmove', resizeXTouch)

			window.addEventListener('touchend', removeResize)

	})

