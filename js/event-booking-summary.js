(function () {
    const utils = window.saaaEventBooking;
    const eventTitleEl = document.getElementById('booking-event-title');
    const eventScheduleEl = document.getElementById('booking-event-schedule');
    const attendeeNameEl = document.getElementById('summary-name');
    const attendeeEmailEl = document.getElementById('summary-email');
    const attendeeCompanyEl = document.getElementById('summary-company');
    const attendeeMobileEl = document.getElementById('summary-mobile');
    const attendeeDesignationEl = document.getElementById('summary-designation');
    const attendeeAccreditedEl = document.getElementById('summary-accredited');
    const paymentNameEl = document.getElementById('payment-item-name');
    const paymentAmountEl = document.getElementById('payment-amount');
    const subtotalEl = document.getElementById('payment-subtotal');
    const gstEl = document.getElementById('payment-gst');
    const grandTotalEl = document.getElementById('payment-grand-total');
    const netTotalEl = document.getElementById('payment-net-total');
    const proceedBtn = document.getElementById('booking-proceed');
    const modalBackdrop = document.getElementById('booking-modal');
    const modalTitle = document.getElementById('booking-modal-title');
    const modalMessage = document.getElementById('booking-modal-message');
    const modalIcon = document.getElementById('booking-modal-icon');
    const modalOk = document.getElementById('booking-modal-ok');
    const modalActions = document.getElementById('booking-modal-actions');

    if (!utils) return;

    const eventId = utils.getEventIdFromUrl();
    const event = utils.getEventById(eventId);
    const draft = utils.loadDraft(eventId);

    if (!event || !draft || !utils.isBookingOpen(event)) {
        window.location.href = 'event-booking.html?id=' + encodeURIComponent(eventId || '');
        return;
    }

    document.title = 'Booking Summary — ' + event.title;
    eventTitleEl.textContent = event.title;
    eventScheduleEl.textContent = utils.formatSchedule(event);

    const displayName = draft.salutation + ' ' + draft.fullName;
    attendeeNameEl.textContent = displayName.trim();
    attendeeEmailEl.textContent = draft.email;
    attendeeCompanyEl.textContent = draft.companyName;
    attendeeMobileEl.textContent = draft.mobile;
    attendeeDesignationEl.textContent = draft.designation;
    attendeeAccreditedEl.textContent = draft.accreditedRep;

    const ticketPrice = typeof event.ticketPrice === 'number' ? event.ticketPrice : 0;
    const gstRate = 0;
    const gstAmount = ticketPrice * gstRate;
    const grandTotal = ticketPrice + gstAmount;

    paymentNameEl.textContent = event.title;
    paymentAmountEl.textContent = utils.formatCurrency(ticketPrice);
    subtotalEl.textContent = utils.formatCurrency(ticketPrice);
    gstEl.textContent = utils.formatCurrency(gstAmount);
    grandTotalEl.textContent = utils.formatCurrency(grandTotal);
    netTotalEl.textContent = utils.formatCurrency(grandTotal);

    let successMode = false;

    function showSuccessModal(referenceCode) {
        successMode = true;
        modalTitle.textContent = 'Booking Confirmed';
        modalMessage.textContent =
            'Thank you for your registration. Your booking reference is ' + referenceCode +
            '. A confirmation email will be sent to ' + draft.email + '.';
        modalIcon.textContent = '✓';
        modalIcon.className = 'booking-modal-icon is-success';
        modalActions.innerHTML =
            '<a href="event-detail.html?id=' + encodeURIComponent(eventId) + '" class="btn btn-primary">Back to Event</a>' +
            '<a href="events.html" class="btn btn-secondary">View All Events</a>';
        modalBackdrop.classList.add('is-open');
        modalBackdrop.setAttribute('aria-hidden', 'false');
    }

    modalBackdrop.addEventListener('click', function (eventClick) {
        if (eventClick.target === modalBackdrop && !successMode) {
            modalBackdrop.classList.remove('is-open');
        }
    });

    proceedBtn.addEventListener('click', function () {
        const referenceCode = utils.createReferenceCode();
        utils.clearDraft();
        showSuccessModal(referenceCode);
        proceedBtn.disabled = true;
        proceedBtn.textContent = 'Submitted';
    });
})();
