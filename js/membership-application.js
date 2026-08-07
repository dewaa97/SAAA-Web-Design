(function () {
    var form = document.getElementById('membership-application-form');
    if (!form) return;

    function mountWidgets() {
        if (!window.SaaaImddFormWidgets) return;

        var api = SaaaImddFormWidgets;

        var membershipType = document.getElementById('membershipType');
        if (membershipType && !membershipType.dataset.membershipWidgetMounted) {
            api.mountComboboxFromSelect(membershipType, {
                placeholder: 'Select membership type',
                searchable: false,
                fieldKey: 'membershipType'
            });
            membershipType.dataset.membershipWidgetMounted = 'true';
        }

        ['iataMember', 'otherAssociations', 'criminalHistory', 'officialApprovedAs', 'officialProposer', 'officialSeconder'].forEach(function (id) {
            var select = document.getElementById(id);
            if (!select || select.dataset.membershipWidgetMounted) return;

            var widgetOptions = {
                placeholder: 'Select',
                searchable: false,
                fieldKey: id
            };

            if (id === 'iataMember') {
                widgetOptions.onChange = function () {
                    toggleConditionalField('iataUploadField', getSelectValue('iataMember') === 'Yes');
                };
            } else if (id === 'otherAssociations') {
                widgetOptions.onChange = function () {
                    toggleConditionalField('otherAssociationsField', getSelectValue('otherAssociations') === 'Yes');
                };
            } else if (id === 'criminalHistory') {
                widgetOptions.onChange = function () {
                    toggleConditionalField('criminalHistoryField', getSelectValue('criminalHistory') === 'Yes');
                };
            }

            api.mountComboboxFromSelect(select, widgetOptions);
            select.dataset.membershipWidgetMounted = 'true';
        });

        var declarationDate = document.getElementById('declarationDate');
        if (declarationDate && !declarationDate.dataset.membershipWidgetMounted) {
            api.mountDatePickerFromInput(declarationDate, {
                placeholder: 'Pick a date',
                fieldKey: 'declarationDate'
            });
            declarationDate.dataset.membershipWidgetMounted = 'true';
        }

        var iataUpload = document.getElementById('iataUpload');
        if (iataUpload && !iataUpload.dataset.membershipWidgetMounted) {
            api.mountFileUploadFromInput(iataUpload, {
                fieldKey: 'iataUpload',
                accept: '.pdf,.jpg,.jpeg,.png,.doc,.docx',
                compact: true
            });
            var uploadRoot = form.querySelector('[data-file-input][name="iataUpload"]');
            if (uploadRoot) {
                var zone = uploadRoot.closest('.file-upload');
                if (zone) {
                    var browse = zone.querySelector('.file-upload-browse');
                    if (browse) browse.textContent = 'Click to upload';
                }
            }
            iataUpload.dataset.membershipWidgetMounted = 'true';
        }
    }

    function toggleConditionalField(fieldId, show) {
        var field = document.getElementById(fieldId);
        if (!field) return;
        field.classList.toggle('is-visible', show);
        var input = field.querySelector('input, textarea, select');
        if (input && !show) {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else if (input.type !== 'file') {
                input.value = '';
            }
        }
    }

    function getSelectValue(id) {
        var hidden = form.querySelector('[data-combobox-input][name="' + id + '"]');
        if (hidden) return hidden.value ? String(hidden.value).trim() : '';
        var select = document.getElementById(id);
        return select && select.value ? String(select.value).trim() : '';
    }

    function setupConditionalFields() {
        var industryOthers = document.getElementById('industryOthers');
        if (industryOthers) {
            industryOthers.addEventListener('change', function () {
                toggleConditionalField('industryOthersField', industryOthers.checked);
            });
        }

        function bindYesNoSelect(id, fieldId) {
            toggleConditionalField(fieldId, getSelectValue(id) === 'Yes');
        }

        bindYesNoSelect('iataMember', 'iataUploadField');
        bindYesNoSelect('otherAssociations', 'otherAssociationsField');
        bindYesNoSelect('criminalHistory', 'criminalHistoryField');
    }

    mountWidgets();
    setupConditionalFields();

    function getFieldValue(name) {
        if (form.querySelector('input[type="radio"][name="' + name + '"]')) {
            var checkedRadio = form.querySelector('input[type="radio"][name="' + name + '"]:checked');
            return checkedRadio ? checkedRadio.value : '';
        }

        var checkbox = form.querySelector('input[type="checkbox"][name="' + name + '"]');
        if (checkbox) {
            return checkbox.checked ? checkbox.value : '';
        }

        var comboboxInput = form.querySelector('[data-combobox-input][name="' + name + '"]');
        if (comboboxInput) {
            return comboboxInput.value ? String(comboboxInput.value).trim() : '';
        }

        var field = form.querySelector('[name="' + name + '"]');
        return field && field.value ? String(field.value).trim() : '';
    }

    function getCheckedIndustries() {
        var names = [
            'industryFreightForwarder',
            'industryGroundHandling',
            'industryAirline',
            'industryPostCourier',
            'industryWarehousing',
            'industryLocalTrucking',
            'industryAirRelated',
            'industryGovernmentBodies',
            'industryOthers'
        ];

        return names.filter(function (name) {
            var input = form.querySelector('input[name="' + name + '"]');
            return input && input.checked;
        }).map(function (name) {
            return form.querySelector('input[name="' + name + '"]').value;
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var lines = ['SAAA Membership Application 2026', ''];

        function addSection(title) {
            lines.push(title);
            lines.push('');
        }

        function addLine(label, value) {
            if (value && String(value).trim()) {
                lines.push(label + ': ' + value);
            }
        }

        addSection('Membership Type & Classification');
        addLine('Membership Type', getFieldValue('membershipType'));
        var industries = getCheckedIndustries();
        if (industries.length) {
            lines.push('Industry Classification: ' + industries.join(', '));
        }
        if (document.getElementById('industryOthers') && document.getElementById('industryOthers').checked) {
            addLine('Other Industry (specify)', getFieldValue('industryOthersSpecify'));
        }

        addSection('Company Information');
        addLine('Company Type', getFieldValue('companyType'));
        addLine('Company Name', getFieldValue('companyName'));
        addLine('Main Office Address', getFieldValue('mainOfficeAddress'));
        addLine('Correspondence Address', getFieldValue('correspondenceAddress'));
        addLine('Telephone', getFieldValue('companyTelephone'));
        addLine('Fax', getFieldValue('companyFax'));
        addLine('Company Email', getFieldValue('companyEmail'));
        addLine('Company Website', getFieldValue('companyWebsite'));
        addLine('Staff Strength', getFieldValue('staffStrength'));

        addSection('Contact Person 1');
        addLine('Name', getFieldValue('contact1Name'));
        addLine('Designation', getFieldValue('contact1Designation'));
        addLine('Email', getFieldValue('contact1Email'));
        addLine('Contact Number (Office)', getFieldValue('contact1Office'));
        addLine('Contact Number (Mobile)', getFieldValue('contact1Mobile'));

        addSection('Contact Person 2');
        addLine('Name', getFieldValue('contact2Name'));
        addLine('Designation', getFieldValue('contact2Designation'));
        addLine('Email', getFieldValue('contact2Email'));
        addLine('Contact Number (Office)', getFieldValue('contact2Office'));
        addLine('Contact Number (Mobile)', getFieldValue('contact2Mobile'));

        addSection('Additional Information');
        addLine('Existing IATA Member', getFieldValue('iataMember'));
        addLine('Member of Other Logistics Associations', getFieldValue('otherAssociations'));
        addLine('Association Name(s)', getFieldValue('otherAssociationsDetails'));
        addLine('Criminal Offence History', getFieldValue('criminalHistory'));
        addLine('Criminal Offence Details', getFieldValue('criminalHistoryDetails'));

        addSection('Declaration');
        addLine('Authorised Signatory Name', getFieldValue('declarationName'));
        addLine('Designation', getFieldValue('declarationDesignation'));
        addLine('Date', getFieldValue('declarationDate'));

        lines.push('');
        lines.push('Please attach the following documents to your email before sending:');
        lines.push('1. ACRA Business Profile');
        lines.push('2. For freight forwarder ordinary member enrolment: two employee certificates as stated in the application form');
        if (getFieldValue('iataMember') === 'Yes') {
            lines.push('3. IATA supporting documents (also uploaded via the form if applicable)');
        }

        var subject = encodeURIComponent('SAAA Membership Application 2026');
        var body = encodeURIComponent(lines.join('\n'));
        window.location.href = 'mailto:saaasin@saaa.org.sg?subject=' + subject + '&body=' + body;
    });
})();
