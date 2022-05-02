window.onload = () =>{
	setInterval(()=>{
		fetch("/turnos")
			.then(data=>data.json())
				.then(json => {
					var turnos = document.querySelectorAll(".turno");
					var aforos = document.querySelectorAll(".aforo");
					var max = document.querySelectorAll(".aforo_maximo");
					let count = 0;
					json.forEach(element => {
						turnos[count].textContent = element.turno_actual;
						aforos[count].textContent = element.aforo_actual;
						max[count].textContent = element.aforo_maximo;
						count++;
					});
				});
	},2000);
}