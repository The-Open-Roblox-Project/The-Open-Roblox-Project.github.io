document.addEventListener("DOMContentLoaded", async function () {
	document.getElementById("sidebar").innerHTML = (await (await fetch("shared/sidebar.html")).text());

	setTimeout(() => {
		const sidebar = document.getElementById("sidebar");
		const sidebarToggle = document.getElementById("sidebarToggle");
		const closeSidebar = document.getElementById("closeSidebar");
		const content = document.getElementById("content");

		if (window.innerWidth <= 768) {
			sidebar.style.left = window.innerWidth <= 768 ? "-100%" : "-16.25em";
			content.style.marginLeft = "0em";
			content.style.width = "100%";
		}

		function updateSidebarStyles() {
			if (window.innerWidth <= 768) {
				sidebar.style.width = "100%";
			} else {
				sidebar.style.width = "16.25em";
				sidebar.style.left = "0em";
				content.style.marginLeft = "16.25em";
				content.style.width = `calc(100% - 16.25em)`;
			}
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
			sidebar.style.left = window.innerWidth <= 768 ? "-100vw" : "-16.25em";
			content.style.marginLeft = "0em";
			content.style.width = "100%";
		});
	}, 100);
});
