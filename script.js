// Simple background controller
// Usage:
//   Background.image = '02_Assets/Buoy_1.png';
//   Background.setBackground();
// Or use Background.setBackground(url) to set and apply in one call.

const Background = {
	// image path relative to the HTML file
	image: '',

	// Apply the current image to the #bg element
	setBackground(url) {
		const bgEl = document.getElementById('bg');
		if (!bgEl) return;
		if (url) this.image = url;
		if (this.image) {
			bgEl.style.backgroundImage = `url('${this.image}')`;
		} else {
			bgEl.style.backgroundImage = '';
		}

		// Update dependent UI after changing the background
		if (typeof updateTravelVisibility === 'function') updateTravelVisibility();
        if (typeof updateReturnVisibility === 'function') updateReturnVisibility();
	}
};

Background.setBackground('01_Background/Background_1.png');

// Small updater to show/hide the travelDiv based on the current background.
// Placed here so setBackground can call it during initial run as well.
function updateTravelVisibility() {
	const placeLand = document.getElementById('placeLand');
	const b = document.getElementById('buoyFound');
	const t = document.getElementById('travelDiv');
	if (!t) return;
	if (Background.image === "01_Background/Background_2.png") {
		t.style.display = 'none';
		b.style.display = 'none'; // Hide buoy when on Background 2
		placeLand.style.display = 'block'; // Show placeLand when on Background 2
	} else {
		t.style.display = 'block';
		placeLand.style.display = 'none'; // Hide placeLand when not on Background 2
	}
}

function updateReturnVisibility() {
	const t = document.getElementById('returnDiv');
	if (!t) return;
	if (Background.image === "01_Background/Background_1.png") {
		t.style.display = 'none';
	} else {
		t.style.display = 'block';
	}
}




// Get the elements from the HTML
const travelDiv = document.getElementById('travelDiv');
const returnDiv = document.getElementById('returnDiv');
const buoyFloat = document.getElementById('buoyFloat');
const placeLand = document.getElementById('placeLand');


let background = "01_Background/Background_1.png"; // unused - keep or remove if not needed

// Add event listeners to the clickable elements
// Important: pass a function reference, don't call setBackground immediately.
travelDiv.addEventListener('click', () => Background.setBackground("01_Background/Background_2.png"));

returnDiv.addEventListener('click', () => {Background.setBackground("01_Background/Background_1.png");updatebuoyFoundVisibility()});



updateTravelVisibility();
updateReturnVisibility();








const buoyInventory = document.getElementById('buoyInventory');

const buoyFound = document.getElementById('buoyFound');

var buoyInven = 0; // Track if buoy is in inventory (0 = no, 1 = yes)
var buoyPlaced = 1; // Track if buoy is placed in scene (0 = no, 1 = yes)
var buoyGrab = 0; // Track if buoy is in inventory (0 = no, 1 = yes)
var buoyFloatState = 0; // Track if buoy is floating (0 = no, 1 = yes)
var buoyPower = 0; // Track if buoy has power (0 = no, 1 = yes)z

// --- Debug panel: show current values of buoyInven and buoyGrab ---
// Create a small fixed panel in the page to display variable values for debugging.
const debugPanel = document.createElement('div');
debugPanel.id = 'debugPanel';
debugPanel.style.position = 'fixed';
debugPanel.style.right = '10px';
debugPanel.style.bottom = '10px';
debugPanel.style.background = 'rgba(0,0,0,0.7)';
debugPanel.style.color = '#fff';
debugPanel.style.padding = '8px';
debugPanel.style.fontFamily = 'Segoe UI, Roboto, Arial, sans-serif';
debugPanel.style.fontSize = '12px';
debugPanel.style.lineHeight = '1.3';
debugPanel.style.zIndex = '9999';
debugPanel.style.whiteSpace = 'pre';
document.addEventListener('DOMContentLoaded', () => {
	// In case script runs before body exists; append when DOM is ready.
	if (!document.body.contains(debugPanel)) document.body.appendChild(debugPanel);
});

function updateDebug() {
	// Ensure panel is attached even if DOMContentLoaded already fired.
	if (!document.body.contains(debugPanel)) document.body.appendChild(debugPanel);
	// Show the two variables and current background for context.
	debugPanel.innerText = `buoyInven: ${buoyInven}\nbuoyPlaced: ${buoyPlaced}\nbuoyGrab: ${buoyGrab}\nBackground: ${Background.image}`;
}

// Ensure the element exists before manipulating it (script is at end of body so it should).
if (buoyFound) {
	function updatebuoyFoundVisibility() {
		if (buoyPlaced === 1) {
			buoyFound.style.display = 'block';
		} else {
			buoyFound.style.display = 'none';
		}
		// Mark as collected (set to 1 rather than incrementing repeatedly)
		updateDebug();
	}

	// Pass the function reference instead of calling it immediately.
	// Attach click handler to buoyFound
	buoyFound.addEventListener('click', function (e) {
		if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
		buoyPlaced = 0;
		buoyInven = 1;
		updatebuoyFoundVisibility();
		updateBuoyInventoryVisibility();
		updateDebug();
	});
}

// Helper to show/hide the inventory element based on buoyInven value.
function updateBuoyInventoryVisibility() {
	if (!buoyInventory) return;
	if (buoyInven === 1) {
		buoyInventory.style.display = 'block';
	} else {
		buoyInventory.style.display = 'none';
	}
}

function updateBuoyFloatVisibility() {
	if (!buoyFloat) return;
	if (buoyFloatState === 1) {
		buoyFloat.style.display = 'block';
	} else {
		buoyFloat.style.display = 'none';
	}
}

// Ensure initial state is correct on load
updateBuoyFloatVisibility();
updateBuoyInventoryVisibility();
updateDebug();



$(document).mousemove(function(e) {
  $("#follow1").css({
    left: e.pageX,
    top: e.pageY
  });
});


const follow1 = document.getElementById('follow1');



// Ensure the element exists before manipulating it (script is at end of body so it should).
if (buoyInventory) {
	// Make sure it's shown by default. You can change this to 'none' if you want hidden initially.
    follow1.style.display = 'none';


	function updateFollow1Visibility() {
	if (buoyGrab === 1) {
		follow1.style.display = 'block';
	} else {
		follow1.style.display = 'none';
	}
		
		updateBuoyInventoryVisibility();
		updateDebug();
	}

	// Pass the function reference instead of calling it immediately.
	// Prevent the click from bubbling up to `#content` which triggers placeBuoy()
	// (that was causing #buoyFound to reappear immediately).
	buoyInventory.addEventListener('click', function (e) {
		e.stopPropagation && e.stopPropagation();
		buoyGrab = 1;
		buoyInven = 0;
		updateFollow1Visibility();
	});
}


const bg = document.getElementById('bg');

if (bg) bg.addEventListener('click', function (e) {
	if (buoyGrab === 1) {
		// When the content area is clicked, place the buoy if it's being held.
		if (Background.image === "01_Background/Background_1.png") {
			buoyPlaced = 1;
			const x = e.pageX;
			const y = e.pageY;
			if (buoyFound) {
				buoyFound.style.left = (x - 25) + 'px'; // Center the buoy (assuming 50px width)
				buoyFound.style.top = (y - 50) + 'px'; // Adjust as needed to position above click point
			}
		}
	}

	// In all cases reset buoyGrab (buoy is no longer in the 'grab' state after clicking)
	buoyGrab = 0;

	// Refresh related UI/state
	updateFollow1Visibility();
	updateBuoyFloatVisibility();
	updatebuoyFoundVisibility();
	updateDebug();
});
	



if (placeLand) placeLand.addEventListener('click', function (e) {
	if (buoyGrab === 1) {
		// When the content area is clicked, place the buoy if it's being held.
			buoyFloatState = 1;
			const x = e.pageX;
			const y = e.pageY;
			if (buoyFloat) {
				buoyFloat.style.left = (x - 25) + 'px'; // Center the buoy (assuming 50px width)
				buoyFloat.style.top = (y - 50) + 'px'; // Adjust as needed to position above click point
			}
	}

	// In all cases reset buoyGrab (buoy is no longer in the 'grab' state after clicking)
	buoyGrab = 0;

	// Refresh related UI/state
	updateFollow1Visibility();
	updateBuoyFloatVisibility();
	updatebuoyFoundVisibility();
	updateDebug();
});

	// Pass the function reference instead of calling it immediately.
	// Attach click handler to buoyFound
buoyFloat.addEventListener('click', function (e) {
	if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
	buoyFloatState = 0;
	buoyInven = 1;
	updatebuoyFoundVisibility();
	updateBuoyInventoryVisibility();
	updateBuoyFloatVisibility();
	updateDebug();
});