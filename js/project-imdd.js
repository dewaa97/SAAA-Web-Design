(function () {
    var content = window.projectImddContent;
    if (!content) return;

    var pageId = document.body.getAttribute('data-imdd-page') || 'home';

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function getInitials(name) {
        return name
            .split(/\s+/)
            .filter(function (word) {
                return word && !/^(pte|ltd|sg|s|\(|\))$/i.test(word);
            })
            .slice(0, 2)
            .map(function (word) { return word.charAt(0).toUpperCase(); })
            .join('');
    }

    function getHubIcon(icon) {
        var icons = {
            home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z"/></svg>',
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 10v6"/><path d="M12 7h.01"/></svg>',
            calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>',
            building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M9 11h1M9 15h1M14 7h1M14 11h1M14 15h1M8 21v-4h8v4"/></svg>',
            users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
            briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
            mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
        };

        return icons[icon] || icons.info;
    }

    function getApplyCompanies() {
        return content.companies.filter(function (company) {
            return company.hasApply;
        });
    }

    function renderInstitutionMarquee() {
        var track = document.getElementById('imdd-institution-track');
        if (!track) return;

        var items = content.institutions.slice().sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

        var html = items.map(function (item) {
            var inner = '<img src="' + escapeHtml(item.logo) + '" alt="' + escapeHtml(item.name) + ' logo" loading="lazy">';
            if (item.url) {
                return (
                    '<a class="imdd-institution-logo" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer" title="' + escapeHtml(item.name) + '">' +
                        inner +
                    '</a>'
                );
            }

            return '<span class="imdd-institution-logo">' + inner + '</span>';
        }).join('');

        track.innerHTML = html + html;
    }

    function renderHubNav() {
        var grid = document.getElementById('imdd-hub-nav');
        if (!grid) return;

        grid.innerHTML = content.hubNav.map(function (item) {
            var isActive = item.id === pageId;
            var shortLabel = item.shortLabel || item.label;
            return (
                '<a href="' + escapeHtml(item.href) + '" class="imdd-subnav-link' + (isActive ? ' is-active' : '') + '" title="' + escapeHtml(item.description) + '"' + (isActive ? ' aria-current="page"' : '') + '>' +
                    '<span class="imdd-subnav-icon" aria-hidden="true">' + getHubIcon(item.icon) + '</span>' +
                    '<span class="imdd-subnav-label imdd-subnav-label-full">' + escapeHtml(item.label) + '</span>' +
                    '<span class="imdd-subnav-label imdd-subnav-label-short">' + escapeHtml(shortLabel) + '</span>' +
                '</a>'
            );
        }).join('');
    }

    function renderTestimonialCard(item) {
        return (
            '<article class="imdd-testimonial-card">' +
                '<div class="quote-icon">"</div>' +
                '<blockquote>' + escapeHtml(item.quote) + '</blockquote>' +
                '<div class="author">' + escapeHtml(item.name) + '</div>' +
                '<div class="role">' + escapeHtml(item.role) + '</div>' +
            '</article>'
        );
    }

    function initTestimonialCarousel() {
        var root = document.querySelector('[data-imdd-testimonials-carousel]');
        if (!root) return;

        var track = root.querySelector('#imdd-testimonials-track');
        var prev = root.querySelector('[data-imdd-testimonials-prev]');
        var next = root.querySelector('[data-imdd-testimonials-next]');
        var dotsWrap = root.querySelector('[data-imdd-testimonials-dots]');
        var slideIndex = 0;
        var isAnimating = false;

        function getVisibleCount() {
            return window.innerWidth >= 1024 ? 2 : 1;
        }

        function getCardStep() {
            var card = track.querySelector('.imdd-testimonial-card');
            if (!card) return 0;
            var styles = window.getComputedStyle(track);
            var gap = parseFloat(styles.gap || styles.columnGap || '20') || 20;
            return card.getBoundingClientRect().width + gap;
        }

        function buildTrack() {
            var visible = getVisibleCount();
            var cards = content.testimonials.map(renderTestimonialCard);
            if (!cards.length) return;

            var cloneStart = cards.slice(0, visible).join('');
            var cloneEnd = cards.slice(-visible).join('');

            track.style.transition = 'none';
            track.innerHTML = cloneEnd + cards.join('') + cloneStart;
            slideIndex = visible;
            updatePosition(false);
            renderDots();
        }

        function updatePosition(animate) {
            track.style.transition = animate ? 'transform 0.35s ease' : 'none';
            track.style.transform = 'translateX(-' + (slideIndex * getCardStep()) + 'px)';
        }

        function renderDots() {
            if (!dotsWrap) return;

            var total = content.testimonials.length;
            var visible = getVisibleCount();
            var active = ((slideIndex - visible) % total + total) % total;
            dotsWrap.innerHTML = '';

            for (var i = 0; i < total; i++) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'imdd-testimonials-dot' + (i === active ? ' active' : '');
                dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
                dot.addEventListener('click', (function (index) {
                    return function () {
                        slideIndex = getVisibleCount() + index;
                        updatePosition(true);
                        renderDots();
                    };
                })(i));
                dotsWrap.appendChild(dot);
            }
        }

        function move(direction) {
            if (isAnimating) return;
            isAnimating = true;
            slideIndex += direction;
            updatePosition(true);
        }

        track.addEventListener('transitionend', function () {
            var visible = getVisibleCount();
            var total = content.testimonials.length;

            if (slideIndex >= total + visible) {
                slideIndex = visible;
                updatePosition(false);
            } else if (slideIndex < visible) {
                slideIndex = total + visible - 1;
                updatePosition(false);
            }

            isAnimating = false;
            renderDots();
        });

        if (prev) prev.addEventListener('click', function () { move(-1); });
        if (next) next.addEventListener('click', function () { move(1); });
        window.addEventListener('resize', buildTrack);
        buildTrack();
    }

    function renderObjectives() {
        var list = document.getElementById('imdd-objectives');
        if (!list) return;

        list.innerHTML = content.objectives.map(function (item, index) {
            return (
                '<li>' +
                    '<span class="num">' + (index + 1) + '</span>' +
                    '<span>' + escapeHtml(item) + '</span>' +
                '</li>'
            );
        }).join('');
    }

    function renderPhases() {
        var grid = document.getElementById('imdd-phases');
        if (!grid) return;

        grid.innerHTML = content.phases.map(function (phase) {
            return (
                '<article class="imdd-phase-card">' +
                    '<div class="phase-label">Phase ' + escapeHtml(phase.phase) + '</div>' +
                    '<h4>' + escapeHtml(phase.title) + '</h4>' +
                    '<p>' + escapeHtml(phase.description) + '</p>' +
                '</article>'
            );
        }).join('');
    }

    function renderTrainingProgrammes() {
        var list = document.getElementById('imdd-training-list');
        if (!list) return;

        var intro = document.getElementById('imdd-training-intro');
        if (intro) intro.textContent = content.trainingIntro;

        list.innerHTML = content.trainingProgrammes.map(function (programme) {
            return (
                '<article class="imdd-program-card">' +
                    '<div class="imdd-program-card-image">' +
                        '<img src="' + escapeHtml(programme.image) + '" alt="' + escapeHtml(programme.title) + '" loading="lazy">' +
                    '</div>' +
                    '<div class="imdd-program-card-body">' +
                        '<h3>' + escapeHtml(programme.title) + '</h3>' +
                        '<div class="imdd-event-meta">' +
                            '<div><strong>Date:</strong> ' + escapeHtml(programme.date) + '</div>' +
                            '<div><strong>Time:</strong> ' + escapeHtml(programme.time) + '</div>' +
                            '<div><strong>Location:</strong> ' + escapeHtml(programme.location) + '</div>' +
                            '<div><strong>Course Fee:</strong> ' + escapeHtml(programme.fee) + '</div>' +
                        '</div>' +
                    '</div>' +
                '</article>'
            );
        }).join('');
    }

    function renderEmployerQuestions() {
        var list = document.getElementById('imdd-employer-questions');
        if (!list) return;

        list.innerHTML = content.employerQuestions.map(function (question) {
            return (
                '<li>' +
                    '<span class="icon">?</span>' +
                    '<span>' + escapeHtml(question) + '</span>' +
                '</li>'
            );
        }).join('');
    }

    function renderApplicantIntro() {
        var wrap = document.getElementById('imdd-applicant-intro');
        if (!wrap) return;

        wrap.innerHTML = content.applicantIntro.map(function (paragraph) {
            return '<p class="imdd-lead">' + escapeHtml(paragraph) + '</p>';
        }).join('');
    }

    function renderCompanyOptions(selectedName) {
        var options = ['<option value="">Select</option>'];
        getApplyCompanies().forEach(function (company) {
            var selected = selectedName && company.name === selectedName ? ' selected' : '';
            options.push('<option value="' + escapeHtml(company.name) + '"' + selected + '>' + escapeHtml(company.name) + '</option>');
        });
        return options.join('');
    }

    function ensureFieldError(field) {
        if (!field) return null;
        var error = field.querySelector('.imdd-field-error');
        if (!error) {
            error = document.createElement('p');
            error.className = 'imdd-field-error';
            error.setAttribute('aria-live', 'polite');
            field.appendChild(error);
        }
        return error;
    }

    var internshipRequiredFields = {
        firstCompany: { type: 'combobox', widgetKey: 'firstCompany', message: 'Choose an option.' },
        firstPosition: { type: 'text', inputId: 'imdd-position-1', message: 'Enter an answer.' },
        applicantName: { type: 'text', inputId: 'applicantName', message: 'Enter an answer.' },
        applicantEmail: { type: 'text', inputId: 'applicantEmail', message: 'Enter an answer.' },
        applicantPhone: { type: 'text', inputId: 'applicantPhone', message: 'Enter an answer.' },
        applicantResume: { type: 'file', widgetKey: 'applicantResume', message: 'Upload a file.' }
    };

    function clearFieldError(fieldKey, form) {
        var field = form.querySelector('[data-imdd-field="' + fieldKey + '"]');
        if (!field) return;
        field.classList.remove('has-error');
        var error = field.querySelector('.imdd-field-error');
        if (error) error.textContent = '';

        var widgets = getInternshipWidgets(form);
        var rule = internshipRequiredFields[fieldKey];
        if (rule && rule.type === 'combobox' && widgets && widgets[rule.widgetKey]) {
            widgets[rule.widgetKey].setInvalid(false);
        }
        if (rule && rule.type === 'file' && widgets && widgets[rule.widgetKey]) {
            widgets[rule.widgetKey].setInvalid(false);
        }
    }

    function setFieldError(fieldKey, message, form) {
        var field = form.querySelector('[data-imdd-field="' + fieldKey + '"]');
        if (!field) return;
        field.classList.add('has-error');
        ensureFieldError(field).textContent = message;

        var widgets = getInternshipWidgets(form);
        var rule = internshipRequiredFields[fieldKey];
        if (rule && rule.type === 'combobox' && widgets && widgets[rule.widgetKey]) {
            widgets[rule.widgetKey].setInvalid(true);
        }
        if (rule && rule.type === 'file' && widgets && widgets[rule.widgetKey]) {
            widgets[rule.widgetKey].setInvalid(true);
        }
    }

    function clearFormErrors(form) {
        Object.keys(internshipRequiredFields).forEach(function (fieldKey) {
            clearFieldError(fieldKey, form);
        });
    }

    function isInternshipFieldValid(form, fieldKey) {
        var rule = internshipRequiredFields[fieldKey];
        if (!rule) return true;

        var widgets = getInternshipWidgets(form);

        if (rule.type === 'combobox') {
            var combobox = widgets && widgets[rule.widgetKey];
            return !!(combobox && combobox.getValue());
        }

        if (rule.type === 'file') {
            var upload = widgets && widgets[rule.widgetKey];
            return !!(upload && upload.getFile());
        }

        var input = document.getElementById(rule.inputId);
        if (!input || !String(input.value || '').trim()) return false;

        if (fieldKey === 'applicantEmail' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
            return false;
        }

        return true;
    }

    function validateInternshipField(form, fieldKey, showError) {
        if (!internshipRequiredFields[fieldKey]) return true;

        if (isInternshipFieldValid(form, fieldKey)) {
            clearFieldError(fieldKey, form);
            return true;
        }

        if (showError) {
            setFieldError(fieldKey, internshipRequiredFields[fieldKey].message, form);
        }
        return false;
    }

    function markRequiredLabels(form) {
        form.querySelectorAll('[data-imdd-required]').forEach(function (field) {
            var label = field.querySelector('label');
            if (!label || label.querySelector('.imdd-required-mark')) return;
            label.insertAdjacentHTML('beforeend', '<span class="imdd-required-mark" aria-hidden="true">*</span>');
        });
    }

    function initInternshipFormValidation(form) {
        if (!form || form.dataset.imddValidationBound) return;
        form.dataset.imddValidationBound = 'true';

        markRequiredLabels(form);

        Object.keys(internshipRequiredFields).forEach(function (fieldKey) {
            var rule = internshipRequiredFields[fieldKey];
            if (rule.type === 'text' && rule.inputId) {
                var input = document.getElementById(rule.inputId);
                if (!input) return;

                input.addEventListener('blur', function () {
                    var field = input.closest('[data-imdd-field]');
                    if (field) field.dataset.imddTouched = 'true';
                    validateInternshipField(form, fieldKey, true);
                });

                input.addEventListener('input', function () {
                    var field = input.closest('[data-imdd-field]');
                    if (field && field.dataset.imddTouched === 'true') {
                        validateInternshipField(form, fieldKey, true);
                    } else if (String(input.value || '').trim()) {
                        clearFieldError(fieldKey, form);
                    }
                });
            }
        });

        form.addEventListener('focusout', function (event) {
            var field = event.target.closest('[data-imdd-field][data-imdd-required]');
            if (!field) return;

            var fieldKey = field.getAttribute('data-imdd-field');
            var rule = internshipRequiredFields[fieldKey];
            if (!rule) return;

            if (rule.type === 'combobox' || rule.type === 'file') {
                window.setTimeout(function () {
                    if (!form.contains(document.activeElement) || !field.contains(document.activeElement)) {
                        field.dataset.imddTouched = 'true';
                        validateInternshipField(form, fieldKey, true);
                    }
                }, 120);
            }
        });
    }

    function getInternshipWidgets(form) {
        return form._imddWidgets || null;
    }

    function mountInternshipFormWidgets(form) {
        if (!form || !window.SaaaImddFormWidgets) return null;

        var widgets = form._imddWidgets || {};
        var widgetsApi = SaaaImddFormWidgets;

        ['imdd-company-1', 'imdd-company-2', 'imdd-company-3', 'imdd-company-4'].forEach(function (id, index) {
            var select = document.getElementById(id);
            if (!select || select.dataset.imddWidgetMounted) return;
            var fieldKeys = ['firstCompany', 'secondCompany', 'thirdCompany', 'fourthCompany'];
            var fieldKey = fieldKeys[index];
            widgets[fieldKey] = widgetsApi.mountComboboxFromSelect(select, {
                placeholder: 'Select company',
                searchPlaceholder: 'Search company...',
                fieldKey: fieldKey,
                onClose: function () {
                    var field = form.querySelector('[data-imdd-field="' + fieldKey + '"]');
                    if (!field || !field.hasAttribute('data-imdd-required')) return;
                    field.dataset.imddTouched = 'true';
                    validateInternshipField(form, fieldKey, true);
                },
                onChange: function () {
                    clearFieldError(fieldKey, form);
                }
            });
        });

        ['internshipStart', 'internshipEnd'].forEach(function (id) {
            var input = document.getElementById(id);
            if (!input || input.dataset.imddWidgetMounted) return;
            var fieldKey = id === 'internshipStart' ? 'internshipStart' : 'internshipEnd';
            widgets[fieldKey] = widgetsApi.mountDatePickerFromInput(input, {
                placeholder: 'Pick a date',
                fieldKey: fieldKey
            });
            input.dataset.imddWidgetMounted = 'true';
        });

        var resumeInput = document.getElementById('applicantResume');
        if (resumeInput && !resumeInput.dataset.imddWidgetMounted) {
            widgets.applicantResume = widgetsApi.mountFileUploadFromInput(resumeInput, {
                accept: '.pdf,.doc,.docx',
                fieldKey: 'applicantResume',
                onChange: function (file) {
                    if (file) {
                        clearFieldError('applicantResume', form);
                    } else {
                        var field = form.querySelector('[data-imdd-field="applicantResume"]');
                        if (field && field.dataset.imddTouched === 'true') {
                            validateInternshipField(form, 'applicantResume', true);
                        }
                    }
                }
            });

            var resumeField = form.querySelector('[data-imdd-field="applicantResume"]');
            var resumeZone = resumeField && resumeField.querySelector('[data-file-zone]');
            if (resumeZone) {
                resumeZone.addEventListener('click', function () {
                    if (resumeField) resumeField.dataset.imddTouched = 'true';
                });
            }
        }

        form._imddWidgets = widgets;
        return widgets;
    }

    function mountEmployerFormWidgets() {
        var select = document.getElementById('employerMember');
        if (!select || select.dataset.imddWidgetMounted || !window.SaaaImddFormWidgets) return;

        SaaaImddFormWidgets.mountComboboxFromSelect(select, {
            placeholder: 'Select',
            searchable: false,
            fieldKey: 'employerMember'
        });
        select.dataset.imddWidgetMounted = 'true';
    }

    function validateInternshipForm(form) {
        var valid = true;

        Object.keys(internshipRequiredFields).forEach(function (fieldKey) {
            var field = form.querySelector('[data-imdd-field="' + fieldKey + '"]');
            if (field) field.dataset.imddTouched = 'true';
            if (!validateInternshipField(form, fieldKey, true)) {
                valid = false;
            }
        });

        if (!valid) {
            var firstError = form.querySelector('.imdd-form-field.has-error');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return valid;
    }

    function initInternshipApplicationForm() {
        var root = document.getElementById('imdd-internship-form');
        if (!root) return;

        var app = content.internshipApplication;
        var titleEl = document.getElementById('imdd-application-title');
        var closedEl = document.getElementById('imdd-application-closed');
        var formEl = root.querySelector('form');

        if (!app.open) {
            if (titleEl) titleEl.textContent = 'Project IMDD Internship Application';
            if (formEl) formEl.style.display = 'none';
            var descEl = root.querySelector('.form-desc');
            if (descEl) descEl.style.display = 'none';
            if (closedEl) {
                closedEl.textContent = app.closedMessage;
                closedEl.hidden = false;
            }
            return;
        }

        if (titleEl) {
            titleEl.textContent = 'Project IMDD Internship Application for the ' + app.eventLabel;
        }
        if (closedEl) closedEl.hidden = true;
        if (formEl) formEl.style.display = '';

        var params = new URLSearchParams(window.location.search);
        var preselect = params.get('company') || '';

        ['imdd-company-1', 'imdd-company-2', 'imdd-company-3', 'imdd-company-4'].forEach(function (id, index) {
            var select = document.getElementById(id);
            if (!select) return;
            select.innerHTML = renderCompanyOptions(index === 0 ? preselect : '');
        });

        if (formEl) {
            mountInternshipFormWidgets(formEl);
            initInternshipFormValidation(formEl);
        }
    }

    function renderCompanies() {
        var grid = document.getElementById('imdd-companies-grid');
        if (!grid) return;

        var app = content.internshipApplication;
        var companies = content.companies.slice().sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

        grid.innerHTML = companies.map(function (company) {
            var logoHtml = company.logo
                ? '<img src="' + escapeHtml(company.logo) + '" alt="' + escapeHtml(company.name) + ' logo">'
                : '<span class="imdd-company-initials">' + escapeHtml(getInitials(company.name)) + '</span>';

            var links = '';
            if (company.url) {
                links += '<a class="imdd-company-action imdd-company-action-outline" href="' + escapeHtml(company.url) + '" target="_blank" rel="noopener noreferrer">Read More</a>';
            }
            if (company.hasApply && app.open) {
                links += '<a class="imdd-company-action imdd-company-action-primary" href="project-imdd-apply.html?company=' + encodeURIComponent(company.name) + '">Apply</a>';
            }

            return (
                '<article class="imdd-company-card">' +
                    '<div class="imdd-company-logo">' + logoHtml + '</div>' +
                    '<h4>' + escapeHtml(company.name) + '</h4>' +
                    (links ? '<div class="imdd-company-actions">' + links + '</div>' : '') +
                '</article>'
            );
        }).join('');
    }

    function initCompaniesActions() {
        var applyBtn = document.getElementById('imdd-apply-btn');
        var brochureLink = document.getElementById('imdd-brochure-link');
        var app = content.internshipApplication;
        var brochure = content.brochure;

        if (brochureLink && brochure) {
            brochureLink.href = brochure.fileUrl;
            brochureLink.textContent = brochure.label + ' ' + brochure.year;
            brochureLink.target = '_blank';
            brochureLink.rel = 'noopener noreferrer';
        }

        if (applyBtn) {
            if (app.open) {
                applyBtn.href = 'project-imdd-apply.html';
                applyBtn.style.display = '';
            } else {
                applyBtn.style.display = 'none';
            }
        }
    }

    function renderCaseStudy() {
        var wrap = document.getElementById('imdd-case-study');
        if (!wrap) return;

        wrap.innerHTML =
            '<h3>' + escapeHtml(content.caseStudy.title) + '</h3>' +
            content.caseStudy.paragraphs.map(function (paragraph) {
                return '<p>' + escapeHtml(paragraph) + '</p>';
            }).join('');
    }

    function bindForms() {
        var forms = document.querySelectorAll('[data-imdd-form]');
        forms.forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                var formType = form.getAttribute('data-imdd-form');

                if (formType === 'Internship Application' && !validateInternshipForm(form)) {
                    return;
                }

                var formData = new FormData(form);
                var lines = ['Project IMDD ' + formType + ' Submission', ''];

                if (formType === 'Internship Application' && content.internshipApplication.eventLabel) {
                    lines.push('Event: ' + content.internshipApplication.eventLabel);
                    lines.push('');
                }

                if (formType === 'Internship Application') {
                    var widgets = getInternshipWidgets(form);
                    var fieldMap = [
                        ['First Company', widgets && widgets.firstCompany ? widgets.firstCompany.getValue() : formData.get('First Company')],
                        ['First Company Position', formData.get('First Company Position')],
                        ['Second Company', widgets && widgets.secondCompany ? widgets.secondCompany.getValue() : formData.get('Second Company')],
                        ['Second Company Position', formData.get('Second Company Position')],
                        ['Third Company', widgets && widgets.thirdCompany ? widgets.thirdCompany.getValue() : formData.get('Third Company')],
                        ['Third Company Position', formData.get('Third Company Position')],
                        ['Fourth Company', widgets && widgets.fourthCompany ? widgets.fourthCompany.getValue() : formData.get('Fourth Company')],
                        ['Fourth Company Position', formData.get('Fourth Company Position')],
                        ['Your Name', formData.get('Your Name')],
                        ['Education Institution', formData.get('Education Institution')],
                        ['Internship Start Date', widgets && widgets.internshipStart ? widgets.internshipStart.getValue() : formData.get('Internship Start Date')],
                        ['Internship End Date', widgets && widgets.internshipEnd ? widgets.internshipEnd.getValue() : formData.get('Internship End Date')],
                        ['Contact Email', formData.get('Contact Email')],
                        ['Contact Phone Number', formData.get('Contact Phone Number')]
                    ];

                    fieldMap.forEach(function (entry) {
                        if (entry[1] && String(entry[1]).trim()) {
                            lines.push(entry[0] + ': ' + entry[1]);
                        }
                    });

                    var resumeWidget = widgets && widgets.applicantResume;
                    var resumeFile = resumeWidget ? resumeWidget.getFile() : null;
                    if (resumeFile) {
                        lines.push('Resume File: ' + resumeFile.name + ' (please attach this file to your email)');
                    }
                } else {
                    formData.forEach(function (value, key) {
                        if (String(value).trim()) {
                            lines.push(key + ': ' + value);
                        }
                    });
                }

                lines.push('');
                lines.push('Disclaimer: By providing information in this application form, you agree that SAAA@Singapore may collect, use and disclose your personal data for the processing of this application and the administration of Project IMDD.');

                var subject = encodeURIComponent('Project IMDD — ' + formType);
                var body = encodeURIComponent(lines.join('\n'));
                window.location.href = 'mailto:' + content.contactEmail + '?subject=' + subject + '&body=' + body;
            });
        });
    }

    function initStaticContent() {
        var quoteEl = document.getElementById('imdd-quote-text');
        var quoteSource = document.getElementById('imdd-quote-source');
        var introEl = document.getElementById('imdd-intro');
        var missionEl = document.getElementById('imdd-mission');
        var contactIntroEl = document.getElementById('imdd-contact-intro');
        var contactLinks = document.querySelectorAll('[data-imdd-contact]');
        var spotlightImage = document.getElementById('imdd-spotlight-image');

        if (quoteEl) quoteEl.textContent = '"' + content.quote.text + '"';
        if (quoteSource) quoteSource.textContent = '— ' + content.quote.author + ' · Source: ' + content.quote.source;
        if (introEl) introEl.textContent = content.intro;
        if (missionEl) missionEl.textContent = content.mission;
        if (spotlightImage) {
            spotlightImage.src = 'images/project-imdd/hero-outreach.jpg';
            spotlightImage.alt = 'Project IMDD outreach and mentorship';
        }
        if (contactIntroEl && content.contactIntro) {
            contactIntroEl.textContent = content.contactIntro;
        }
        contactLinks.forEach(function (link) {
            if (link.tagName === 'A') {
                link.href = 'mailto:' + content.contactEmail;
            }

            var emailEl = link.querySelector('.imdd-contact-email');
            if (emailEl) {
                emailEl.textContent = content.contactEmail;
                return;
            }

            if (link.childElementCount === 0) {
                link.textContent = content.contactEmail;
            }
        });
    }

    renderInstitutionMarquee();
    renderHubNav();
    renderObjectives();
    renderPhases();
    renderTrainingProgrammes();
    renderEmployerQuestions();
    renderApplicantIntro();
    renderCompanies();
    initCompaniesActions();
    initInternshipApplicationForm();
    mountEmployerFormWidgets();
    initTestimonialCarousel();
    renderCaseStudy();
    bindForms();
    initStaticContent();
})();
