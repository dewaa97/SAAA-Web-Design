(function () {
    const courses = window.saaaTrainingCourses || [];
    const root = document.querySelector('[data-training-book-root]');
    if (!root) return;

    const MAX_PARTICIPANTS = 5;

    const UEN_HELP =
        'The Unique Entity Number (UEN) should be of the sponsoring employer. This is also the entity which pays the salary of the trainee and other statutory benefits (such as CPF contribution, medical benefits, leave etc) to the trainee.';
    const COMPANY_EMAIL_HELP =
        'This Email address will be our primary contact for all course correspondences';

    const participantFieldDefs = [
        { key: 'traineeName', label: 'Trainee Name', type: 'text', required: true, hint: 'as per NRIC / FIN / Passport number' },
        { key: 'traineeId', label: 'Trainee ID', type: 'text', required: true, hint: 'NRIC / FIN / Passport number' },
        {
            key: 'traineeIdType',
            label: 'Trainee ID Type',
            type: 'select',
            required: true,
            options: [
                'Singapore Pink Identification Card',
                'Singapore Blue Identification Card',
                'FIN / Work Permit / SAF 11B',
                'Others'
            ]
        },
        { key: 'dateOfBirth', label: 'Date of Birth', type: 'text', required: true, placeholder: 'YYYY MM DD' },
        { key: 'participantDesignation', label: 'Designation', type: 'text', required: true },
        { key: 'qualifications', label: 'Qualifications', type: 'text', required: true },
        { key: 'participantContactNo', label: 'Contact No.', type: 'tel', required: true, hint: 'Personal Mobile Number - for course evaluation purpose' },
        { key: 'participantEmail', label: 'Email', type: 'email', required: true, hint: 'Personal Email Address - for course evaluation purpose', full: true },
        { key: 'participantAddress', label: 'Address', type: 'textarea', required: false, full: true }
    ];

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const course = courses.find(function (item) { return item.slug === slug; });

    function formatDuration(courseItem) {
        if (courseItem.dayCountLabel) return courseItem.dayCountLabel;
        return courseItem.dayCount === 1 ? '1 Day' : courseItem.dayCount + ' Days';
    }

    function formatLocation(courseItem) {
        if (courseItem.deliveryMode === 'virtual') return 'Virtual';
        return courseItem.classroomAddress;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function renderUnavailable(message) {
        root.innerHTML = '<div class="membership-form-card">' +
            '<h3>Registration unavailable</h3>' +
            '<p class="form-desc">' + message + '</p>' +
            '<div class="membership-form-actions">' +
            '<a href="training-courses.html" class="btn btn-secondary">Back to Training Courses</a>' +
            '</div></div>';
    }

    function fieldInput(id, name, label, type, required, extraAttrs, fullWidth, hint) {
        var reqMark = required ? ' *' : '';
        var hintHtml = hint ? '<span class="membership-field-hint">' + escapeHtml(hint) + '</span>' : '';
        return '<div class="membership-form-field' + (fullWidth ? ' full' : '') + '">' +
            '<label for="' + id + '">' + label + reqMark + '</label>' +
            '<input id="' + id + '" name="' + name + '" type="' + type + '"' +
            (required ? ' required' : '') +
            (extraAttrs ? ' ' + extraAttrs : '') +
            '>' + hintHtml + '</div>';
    }

    function fieldTextarea(id, name, label, required, rows, fullWidth, hint) {
        var reqMark = required ? ' *' : '';
        var hintHtml = hint ? '<span class="membership-field-hint">' + escapeHtml(hint) + '</span>' : '';
        return '<div class="membership-form-field' + (fullWidth ? ' full' : '') + '">' +
            '<label for="' + id + '">' + label + reqMark + '</label>' +
            '<textarea id="' + id + '" name="' + name + '" rows="' + (rows || 3) + '"' +
            (required ? ' required' : '') +
            '></textarea>' + hintHtml + '</div>';
    }

    function fieldSelect(id, name, label, required, options, fullWidth) {
        var reqMark = required ? ' *' : '';
        return '<div class="membership-form-field imdd-form-field' + (fullWidth ? ' full' : '') + '">' +
            '<label for="' + id + '">' + label + reqMark + '</label>' +
            '<select id="' + id + '" name="' + name + '"' + (required ? ' required' : '') + '>' +
            '<option value="">Select</option>' +
            options.map(function (opt) {
                return '<option value="' + escapeHtml(opt) + '">' + escapeHtml(opt) + '</option>';
            }).join('') +
            '</select></div>';
    }

    function mountCombobox(selectId, placeholder, onChange) {
        if (!window.SaaaImddFormWidgets) return;
        var select = document.getElementById(selectId);
        if (!select || select.tagName !== 'SELECT' || select.dataset.trainingWidgetMounted) return;
        window.SaaaImddFormWidgets.mountComboboxFromSelect(select, {
            placeholder: placeholder || 'Select',
            searchable: false,
            fieldKey: selectId,
            onChange: onChange
        });
        select.dataset.trainingWidgetMounted = 'true';
    }

    function mountDatepicker(inputId) {
        if (!window.SaaaImddFormWidgets) return;
        var input = document.getElementById(inputId);
        if (!input || input.dataset.trainingWidgetMounted) return;
        window.SaaaImddFormWidgets.mountDatePickerFromInput(input, {
            placeholder: 'Pick a date'
        });
        input.dataset.trainingWidgetMounted = 'true';
    }

    function renderParticipantFields(index) {
        return participantFieldDefs.map(function (def) {
            var fieldName = def.key + '_' + index;
            var fieldId = fieldName;
            if (def.type === 'textarea') {
                return fieldTextarea(fieldId, fieldName, def.label, def.required, 3, def.full, def.hint);
            }
            if (def.type === 'select') {
                return fieldSelect(fieldId, fieldName, def.label, def.required, def.options, def.full);
            }
            var extra = def.placeholder ? 'placeholder="' + escapeHtml(def.placeholder) + '"' : '';
            return fieldInput(fieldId, fieldName, def.label, def.type, def.required, extra, def.full, def.hint);
        }).join('');
    }

    function renderParticipantSections(count) {
        var container = document.getElementById('training-participant-sections');
        if (!container) return;
        if (!count || count < 1) {
            container.innerHTML = '';
            return;
        }
        var html = '';
        for (var i = 1; i <= count; i += 1) {
            html += '<div class="membership-form-section">' +
                '<h4>Participant Particulars #' + i + '</h4>' +
                '<div class="membership-form-grid">' + renderParticipantFields(i) + '</div></div>';
        }
        container.innerHTML = html;
        for (var j = 1; j <= count; j += 1) {
            mountCombobox('traineeIdType_' + j);
            mountDatepicker('dateOfBirth_' + j);
        }
    }

    if (!course) {
        renderUnavailable('Course not found.');
        return;
    }

    if (course.isOpeningSoon || !course.bookNowUrl) {
        renderUnavailable('This course is not open for online registration yet.');
        return;
    }

    document.title = 'Course Registration — ' + course.title + ' — SAAA';

    var isDgCourse = course.slug.indexOf('dg-') === 0;
    var courseDates = course.scheduleOptions || [];

    var courseDateField = courseDates.length > 1
        ? '<div class="membership-form-field imdd-form-field full">' +
            '<label for="courseDate">Course Date *</label>' +
            '<select id="courseDate" name="courseDate" required>' +
            '<option value="">Select a course date</option>' +
            courseDates.map(function (date) {
                return '<option value="' + escapeHtml(date) + '">' + escapeHtml(date) + '</option>';
            }).join('') +
            '</select></div>'
        : '<div class="membership-form-field full">' +
            '<label for="courseDate">Course Date *</label>' +
            '<input id="courseDate" name="courseDate" type="text" required readonly value="' + escapeHtml(courseDates[0] || 'To be confirmed') + '">' +
            '</div>';

    var dgCompanyFields =
        fieldInput('companyName', 'companyName', 'Company Name', 'text', true) +
        fieldInput('companyUen', 'companyUen', 'Company UEN', 'text', true, '', true, UEN_HELP) +
        fieldInput('contactPerson', 'contactPerson', 'Contact Person', 'text', true) +
        fieldInput('designation', 'designation', 'Designation', 'text', true) +
        fieldInput('contactNo', 'contactNo', 'Contact No.', 'tel', true) +
        fieldInput('faxNo', 'faxNo', 'Fax No.', 'text', false) +
        fieldInput('email', 'email', 'Email', 'email', true, '', true, COMPANY_EMAIL_HELP) +
        fieldTextarea('address', 'address', 'Address', true, 3, true);

    var staMemberField = '<div class="membership-form-field full">' +
        '<p class="membership-field-label">Is your company STA\'s member? *</p>' +
        '<div class="membership-radio-group">' +
        '<label class="membership-radio-item"><input type="radio" name="staMember" value="Yes" required> Yes</label>' +
        '<label class="membership-radio-item"><input type="radio" name="staMember" value="No"> No</label>' +
        '<label class="membership-radio-item"><input type="radio" name="staMember" value="Not applicable"> Not applicable</label>' +
        '</div></div>';

    var companyFields = isDgCourse
        ? dgCompanyFields
        : fieldInput('companyName', 'companyName', 'Company Name', 'text', true) +
            fieldInput('companyUen', 'companyUen', 'Company UEN', 'text', true, '', true, UEN_HELP) +
            staMemberField +
            fieldInput('contactPerson', 'contactPerson', 'Contact Person', 'text', true) +
            fieldInput('designation', 'designation', 'Designation', 'text', true) +
            fieldInput('contactNo', 'contactNo', 'Contact No.', 'tel', true) +
            fieldInput('faxNo', 'faxNo', 'Fax No.', 'text', false) +
            fieldInput('email', 'email', 'Email', 'email', true, '', true, COMPANY_EMAIL_HELP) +
            fieldTextarea('address', 'address', 'Address', true, 3, true);

    var totalParticipantsField =
        '<div class="membership-form-field imdd-form-field full">' +
        '<label for="totalParticipants">Total Participants *</label>' +
        '<select id="totalParticipants" name="totalParticipants" required>' +
        '<option value="">select a number</option>' +
        [1, 2, 3, 4, 5].map(function (n) {
            return '<option value="' + n + '">' + n + '</option>';
        }).join('') +
        '</select></div>';

    var dgrSection = isDgCourse
        ? '<div class="membership-form-section">' +
            '<h4>Additional Information</h4>' +
            '<div class="membership-form-plain">' +
            '<p class="membership-field-label">Do you have the DGR Manual 2026 Edition? *</p>' +
            '<span class="membership-field-hint">DGR Manual 2026 Edition, before GST: SAAA Member S$ 380.00 per copy / Non-SAAA Member S$ 450.00 per copy</span>' +
            '<div class="membership-radio-group membership-radio-group--stacked">' +
            '<label class="membership-radio-item">' +
            '<input type="radio" name="dgrManual" value="Yes - I will bring my own DGR book (latest edition) to the class." required>' +
            '<span>Yes - I will bring my own DGR book (latest edition) to the class.</span></label>' +
            '<label class="membership-radio-item">' +
            '<input type="radio" name="dgrManual" value="No - I would like to buy 1 copy of DGR book (for each trainee). Book fee is to be charged together with the Course fee.">' +
            '<span>No - I would like to buy 1 copy of DGR book (for each trainee). Book fee is to be charged together with the Course fee.</span></label>' +
            '</div></div></div>'
        : '';

    var termsSection =
        '<div class="membership-form-section">' +
        '<div class="membership-form-plain">' +
        '<div class="membership-form-field full">' +
        '<label class="membership-checkbox-item">' +
        '<input type="checkbox" name="termsAccepted" required>' +
        '<span>I agree with the Terms and Conditions as stated in the Information tab. *</span>' +
        '</label></div></div></div>';

    root.innerHTML = '<div class="membership-form-card">' +
        '<h3>Course Registration</h3>' +
        '<div class="training-book-course-banner">' +
        '<p class="training-book-course-title">' + escapeHtml(course.title) + '</p>' +
        '<p class="training-book-course-meta">' + escapeHtml(formatDuration(course)) + ' · ' + escapeHtml(formatLocation(course)) + '</p>' +
        '</div>' +
        '<form id="training-book-form">' +
        '<div class="membership-form-section">' +
        '<h4>Training Program Details</h4>' +
        '<div class="membership-form-grid">' + courseDateField + '</div></div>' +
        '<div class="membership-form-section">' +
        '<h4>Company Particulars</h4>' +
        '<div class="membership-form-grid">' + companyFields + '</div></div>' +
        '<div class="membership-form-section">' +
        '<h4>Participants</h4>' +
        '<div class="membership-form-grid">' + totalParticipantsField + '</div></div>' +
        '<div id="training-participant-sections"></div>' +
        dgrSection +
        termsSection +
        '<div class="membership-form-actions">' +
        '<button type="submit" class="btn btn-primary">Submit Registration</button>' +
        '<a href="training-course.html?slug=' + encodeURIComponent(course.slug) + '" class="btn btn-secondary">Cancel</a>' +
        '</div></form></div>';

    mountCombobox('courseDate', 'Select a course date');
    mountCombobox('totalParticipants', 'select a number', function () {
        var hidden = document.querySelector('[data-combobox-input][name="totalParticipants"]');
        var count = parseInt(hidden ? hidden.value : '0', 10) || 0;
        renderParticipantSections(Math.min(MAX_PARTICIPANTS, count));
    });

    document.getElementById('training-book-form').addEventListener('submit', function (submitEvent) {
        submitEvent.preventDefault();
        var form = submitEvent.target;
        var count = parseInt((form.elements.namedItem('totalParticipants') || {}).value || '0', 10) || 0;
        if (count < 1) {
            alert('Please select the number of participants.');
            return;
        }
        var formData = new FormData(form);
        var payload = {};
        formData.forEach(function (value, key) {
            payload[key] = String(value);
        });
        payload.course = course.title;
        var body = Object.keys(payload).map(function (key) {
            return key + ': ' + payload[key];
        }).join('%0D%0A');
        var subject = encodeURIComponent('Training Registration: ' + course.title);
        window.location.href = 'mailto:admin@saaa.org.sg?subject=' + subject + '&body=' + body;
    });
})();
