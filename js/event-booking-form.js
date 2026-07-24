(function () {
    const utils = window.saaaEventBooking;
    const form = document.getElementById('booking-form');
    const eventTitleEl = document.getElementById('booking-event-title');
    const eventScheduleEl = document.getElementById('booking-event-schedule');
    const modalBackdrop = document.getElementById('booking-modal');
    const modalTitle = document.getElementById('booking-modal-title');
    const modalMessage = document.getElementById('booking-modal-message');
    const modalIcon = document.getElementById('booking-modal-icon');
    const modalOk = document.getElementById('booking-modal-ok');

    if (!form || !utils) return;

    const eventId = utils.getEventIdFromUrl();
    const event = utils.getEventById(eventId);

    if (!event || !utils.isBookingOpen(event)) {
        document.querySelector('.booking-main').innerHTML =
            '<div class="container booking-shell"><div class="booking-card">' +
            '<h1 class="booking-title">Registration unavailable</h1>' +
            '<p class="booking-lead">This event is not open for online registration yet.</p>' +
            '<a href="event-detail.html?id=' + encodeURIComponent(eventId || '') + '" class="btn btn-secondary">Back to event</a>' +
            '</div></div>';
        return;
    }

    document.title = 'Event Registration — ' + event.title;
    eventTitleEl.textContent = event.title;
    eventScheduleEl.textContent = utils.formatSchedule(event);

    const draft = utils.loadDraft(eventId);
    if (draft) {
        Object.keys(draft).forEach(function (key) {
            const field = form.elements.namedItem(key);
            if (!field) return;
            if (field.type === 'radio') {
                const radio = form.querySelector('input[name="' + key + '"][value="' + draft[key] + '"]');
                if (radio) radio.checked = true;
            } else {
                field.value = draft[key];
            }
        });
    }

    function showModal(title, message, isError) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modalIcon.textContent = isError ? '!' : '✓';
        modalIcon.className = 'booking-modal-icon ' + (isError ? 'is-error' : 'is-success');
        modalBackdrop.classList.add('is-open');
        modalBackdrop.setAttribute('aria-hidden', 'false');
    }

    function hideModal() {
        modalBackdrop.classList.remove('is-open');
        modalBackdrop.setAttribute('aria-hidden', 'true');
    }

    modalOk.addEventListener('click', hideModal);
    modalBackdrop.addEventListener('click', function (eventClick) {
        if (eventClick.target === modalBackdrop) hideModal();
    });

    function clearFieldErrors() {
        form.querySelectorAll('.booking-field').forEach(function (field) {
            field.classList.remove('has-error');
            const error = field.querySelector('.booking-field-error');
            if (error) error.textContent = '';
        });
    }

    function setFieldError(name, message) {
        const field = form.querySelector('[data-field="' + name + '"]');
        if (!field) return;
        field.classList.add('has-error');
        const error = field.querySelector('.booking-field-error');
        if (error) error.textContent = message;
    }

    function validateForm(data) {
        clearFieldErrors();
        let valid = true;

        if (!data.companyName.trim()) {
            setFieldError('companyName', 'Please enter company name.');
            valid = false;
        }
        if (!data.salutation) {
            setFieldError('fullName', 'Please select salutation.');
            valid = false;
        }
        if (!data.fullName.trim()) {
            setFieldError('fullName', 'Please enter full name.');
            valid = false;
        }
        if (!data.designation.trim()) {
            setFieldError('designation', 'Please enter designation.');
            valid = false;
        }
        if (!data.mobile.trim()) {
            setFieldError('mobile', 'Please enter mobile number.');
            valid = false;
        }
        if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            setFieldError('email', 'Please enter a valid email address.');
            valid = false;
        }
        if (!data.accreditedRep) {
            setFieldError('accreditedRep', 'Please select an option.');
            valid = false;
        }

        if (!valid) {
            showModal('Incomplete form', 'Please fill in all required information.', true);
        }

        return valid;
    }

    form.addEventListener('submit', function (submitEvent) {
        submitEvent.preventDefault();
        const formData = new FormData(form);
        const data = {
            companyName: String(formData.get('companyName') || ''),
            salutation: String(formData.get('salutation') || ''),
            fullName: String(formData.get('fullName') || ''),
            designation: String(formData.get('designation') || ''),
            mobile: String(formData.get('mobile') || ''),
            email: String(formData.get('email') || ''),
            accreditedRep: String(formData.get('accreditedRep') || '')
        };

        if (!validateForm(data)) return;

        utils.saveDraft(eventId, data);
        window.location.href = 'event-booking-summary.html?id=' + encodeURIComponent(eventId);
    });
})();
