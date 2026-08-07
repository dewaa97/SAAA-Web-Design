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

        ['iataMember', 'otherAssociations', 'criminalHistory'].forEach(function (id) {
            var select = document.getElementById(id);
            if (!select || select.dataset.membershipWidgetMounted) return;
            api.mountComboboxFromSelect(select, {
                placeholder: 'Select',
                searchable: false,
                fieldKey: id
            });
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
    }

    mountWidgets();

    function getFieldValue(name) {
        if (form.querySelector('input[type="radio"][name="' + name + '"]')) {
            var checkedRadio = form.querySelector('input[type="radio"][name="' + name + '"]:checked');
            return checkedRadio ? checkedRadio.value : '';
        }

        var checkbox = form.querySelector('input[type="checkbox"][name="' + name + '"]');
        if (checkbox) {
            return checkbox.checked ? checkbox.value : '';
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

        addSection('Primary Contact');
        addLine('Name', getFieldValue('contact1Name'));
        addLine('Designation', getFieldValue('contact1Designation'));
        addLine('Email', getFieldValue('contact1Email'));
        addLine('Office Number', getFieldValue('contact1Office'));
        addLine('Mobile Number', getFieldValue('contact1Mobile'));

        addSection('Secondary Contact');
        addLine('Name', getFieldValue('contact2Name'));
        addLine('Designation', getFieldValue('contact2Designation'));
        addLine('Email', getFieldValue('contact2Email'));
        addLine('Office Number', getFieldValue('contact2Office'));
        addLine('Mobile Number', getFieldValue('contact2Mobile'));

        addSection('Additional Information');
        addLine('Existing IATA Member', getFieldValue('iataMember'));
        addLine('Member of Other Logistics Associations', getFieldValue('otherAssociations'));
        addLine('Association Details', getFieldValue('otherAssociationsDetails'));
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

        var subject = encodeURIComponent('SAAA Membership Application 2026');
        var body = encodeURIComponent(lines.join('\n'));
        window.location.href = 'mailto:saaasin@saaa.org.sg?subject=' + subject + '&body=' + body;
    });
})();
