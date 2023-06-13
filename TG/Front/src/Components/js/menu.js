export function menu_vai() {
	let vai = document.querySelector("#vai");
	let volta = document.querySelector("#volta");
	vai.style.display = "none";
	volta.style.display = "block";
	let box = document.querySelector(".a");
	let currentMargin = parseInt(box.style.marginLeft, 10) || 0;
	box.style.marginLeft = currentMargin + 100 + "vw";	
}

export function menu_volta() {
	let vai = document.querySelector("#vai");
	let volta = document.querySelector("#volta");
	volta.style.display = "none";
	vai.style.display = "block";

	let box = document.querySelector(".a");
	let currentMargin = parseInt(box.style.marginLeft, 10) || 0;
	box.style.marginLeft = currentMargin - 100 + "vw";
}