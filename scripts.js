function getWindowWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
};
function myFunction(x) {
    var n = getWindowWidth();
    //alert(n);
    if (n <= 600) {
        document.getElementById("sidebar").style.width = "100%";
    }
    else {
        document.getElementById("sidebar").style.width = "auto";
    }

    if (document.getElementById("sidebar").style.display == "block") {
        document.getElementById("sidebar").style.display = "none";
    }
    else {
        document.getElementById("sidebar").style.display = "block";
    }
    x.classList.toggle("change");
};