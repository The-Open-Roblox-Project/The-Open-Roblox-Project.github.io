document.addEventListener("DOMContentLoaded", async function () {
	const sidebar = document.getElementById("sidebar");

	if (!sidebar)
		return;

	sidebar.innerHTML = (await (await fetch("shared/sidebar.html")).text());

	setTimeout(() => {
		const sidebarToggle = document.getElementById("sidebarToggle");
		const closeSidebar = document.getElementById("closeSidebar");
		const content = document.getElementById("content");

		console.log(window.innerWidth);

		function updateSidebarStyles() {
			if (window.innerWidth <= 1000) {
				sidebar.style.width = "100%";
				sidebarToggle.style.opacity = "0.5";
			} else {
				sidebar.style.width = "16.25em";
				sidebar.style.left = "0em";
				sidebarToggle.style.opacity = "1";
				content.style.marginLeft = "16.25em";
				content.style.width = `calc(100% - 16.25em)`;
			}
		}

		if (window.innerWidth <= 1000) {
			sidebar.style.left = "-100%";
			sidebarToggle.style.opacity = "0.5";
			content.style.marginLeft = "0em";
			content.style.width = "100%";
		}

		updateSidebarStyles();
		window.addEventListener("resize", updateSidebarStyles);

		sidebarToggle.addEventListener("click", function () {
			if (window.innerWidth <= 768) {
				sidebar.style.left = sidebar.style.left === "0em" ? "-100%" : "0em";
			} else {
				sidebar.style.left = sidebar.style.left === "0em" ? "-16.25em" : "0em";
				content.style.marginLeft = sidebar.style.left === "0em" ? "16.25em" : "0em";
				content.style.width = `calc(100% - ${content.style.marginLeft})`;
			}
		});

		closeSidebar.addEventListener("click", function () {
			sidebar.style.left = "-16.25em";
			content.style.marginLeft = "0em";
			content.style.width = "100%";
		});
	}, 100);
});
