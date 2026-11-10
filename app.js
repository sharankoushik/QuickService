/* Helper functions used by the provider pages */

/* Book Now: show the booking box for this provider */
function book(button) {
    var card = button.closest(".card");
    card.querySelector(".booking").style.display = "block";
    button.textContent = "Booking Started";
    button.disabled = true;
}

/* Get the user's location and show the sharing options */
function getLocation(button) {
    var card = button.closest(".card");
    var status = card.querySelector(".loc");
    var options = card.querySelector(".loc-actions");

    if (!navigator.geolocation) {
        status.textContent = "Your browser does not support location.";
        return;
    }

    status.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(
        function (position) {
            var link = "https://www.google.com/maps?q=" +
                position.coords.latitude + "," + position.coords.longitude;
            var phone = card.dataset.phone;
            var name = card.dataset.name;

            status.textContent = "Location found.";
            options.innerHTML = '<a class="button outline" href="' + link + '" target="_blank">Open in Google Maps</a> ' +
                '<button onclick="copyLink(\'' + link + '\', this)">Copy Link</button>';

            if (phone) {
                var text = "Hello " + name + ", I booked you on QuickService. My location: " + link;
                options.innerHTML += ' <a class="button" target="_blank" href="https://wa.me/91' + phone +
                    '?text=' + encodeURIComponent(text) + '">Send on WhatsApp</a>';
            }
        },
        function () {
            status.textContent = "Could not get your location. Please allow location access.";
        }
    );
}

/* Copy the location link */
function copyLink(link, button) {
    navigator.clipboard.writeText(link);
    button.textContent = "Copied";
}


/* City listings without published phone numbers: keep contact actions honest. */
function contactUnavailable(button) {
    var card = button.closest(".card");
    var notice = card.querySelector(".contact-notice");
    if (!notice) {
        notice = document.createElement("p");
        notice.className = "contact-notice muted";
        notice.setAttribute("role", "status");
        card.querySelector(".actions").insertAdjacentElement("afterend", notice);
    }
    notice.textContent = "Contact number is not listed for this provider yet. You can still use Book Now to share your location.";
}
