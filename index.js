
		//Obteniendo elementos

		var clases = ['column', 'urlVideo', 'botton', 'container', 'embedVideo', 'flecha', 'size', 'code','copyBtn'];
		var el = {};

		clases.forEach((e,i) => {
			el[e] = document.querySelector(`.${e}`);
		})

		//Eventos
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
  			setInterval(e => {
				el.size.innerHTML = `${el.container.offsetWidth}x${el.container.offsetHeight}`;
				el.size.style.backgroundColor = '#9e9f95'
  			}, 800)
  				el.size.innerHTML = 'Copied!'
  				el.size.style.backgroundColor = 'tomato'
		}