/*properties
    appendChild, createDocument, createElement, dockOpen, hOffset, opacity,
    setAttribute, setDockItem, src, vOffset
*/

function buildVitality(bg, icon, city, temp, degree) {
	var d, v, dock_bg, dock_icon, u, t, w;

	if (!widget.dockOpen) { return; }

	d = XMLDOM.createDocument();
	v = d.createElement("dock-item");
	v.setAttribute("version", "1.0");
	d.appendChild(v);

	dock_bg = d.createElement("image");
	dock_bg.setAttribute("src", bg);
	dock_bg.setAttribute("hOffset", 0);
	dock_bg.setAttribute("vOffset", 0);
	v.appendChild(dock_bg);

	widget.setDockItem(d, "fade");
}
