
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
			console.log(el.urlVideo,urlVideoArray)
			idVideo = urlVideoArray[urlVideoArray.length - 1];
			console.log('idVideo')
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
var mousePrev = 0
var mouseTouchPrev = 0
var containerPrev  =-160

	const  resizeX = e => {
				el.container.style.width = (containerPrev + (mousePrev - e.clientX)) * -1 + 'px'
				el.container.style.height = el.container.style.width.replace('px','') / 1.7 + 'px'
			}

	const  resizeXTouch = e => {
				el.container.style.width = (containerPrev + (mouseTouchPrev - e.changedTouches[0].clientX))  * -1.3 + 'px'
				el.container.style.height = el.container.style.width.replace('px','') / 1.7 + 'px'
			}



	const removeResize = e => {
			window.removeEventListener('mousemove', resizeX)
			window.removeEventListener('mouseup', removeResize)
			el.container.removeEventListener('mouseup', removeResize)
			
			window.removeEventListener('touchmove', resizeXTouch)
			el.container.removeEventListener('touchmove', resizeXTouch)
			window.removeEventListener('touchend', removeResize)
			

	}

	// Evento

		el.flecha.addEventListener('mousedown', (e) => {
			
			mousePrev = e.clientX

			window.addEventListener('mousemove', resizeX)
			el.container.addEventListener('mousemove', resizeX)
			window.addEventListener('mouseup', removeResize)
	})

		el.flecha.addEventListener('touchstart', (e) => {

			mouseTouchPrev = e.changedTouches[0].clientX
			
			window.addEventListener('touchmove', resizeXTouch)
			el.container.addEventListener('touchmove', resizeXTouch)
			window.addEventListener('touchend', removeResize)
	})