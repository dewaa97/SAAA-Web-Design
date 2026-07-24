(function () {
    const storageKey = 'saaaEventBookingDraft';

    function getEventIdFromUrl() {
        return new URLSearchParams(window.location.search).get('id');
    }

    function getEventById(id) {
        if (!window.saaaContent || !id) return null;
        return saaaContent.events.find(function (event) {
            return event.id === id;
        }) || null;
    }

    function isBookingOpen(event) {
        return event && event.registrationStatus === 'Register Now';
    }

    function formatSchedule(event) {
        return event.displayDate + ', ' + event.time;
    }

    function getBookingUrl(eventId) {
        return 'event-booking.html?id=' + encodeURIComponent(eventId);
    }

    function saveDraft(eventId, formData) {
        sessionStorage.setItem(storageKey, JSON.stringify({
            eventId: eventId,
            formData: formData,
            savedAt: Date.now()
        }));
    }

    function loadDraft(eventId) {
        try {
            const raw = sessionStorage.getItem(storageKey);
            if (!raw) return null;
            const draft = JSON.parse(raw);
            if (!draft || draft.eventId !== eventId) return null;
            return draft.formData;
        } catch (error) {
            return null;
        }
    }

    function clearDraft() {
        sessionStorage.removeItem(storageKey);
    }

    function formatCurrency(amount) {
        return '$' + Number(amount || 0).toFixed(2);
    }

    function createReferenceCode() {
        const stamp = Date.now().toString(36).toUpperCase();
        return 'SAAA-' + stamp.slice(-8);
    }

    window.saaaEventBooking = {
        storageKey: storageKey,
        getEventIdFromUrl: getEventIdFromUrl,
        getEventById: getEventById,
        isBookingOpen: isBookingOpen,
        formatSchedule: formatSchedule,
        getBookingUrl: getBookingUrl,
        saveDraft: saveDraft,
        loadDraft: loadDraft,
        clearDraft: clearDraft,
        formatCurrency: formatCurrency,
        createReferenceCode: createReferenceCode
    };
})();
