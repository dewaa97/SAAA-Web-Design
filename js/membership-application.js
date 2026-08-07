(function () {
    var form = document.getElementById('membership-application-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = new FormData(form);
        var lines = ['SAAA Membership Application', ''];

        function addSection(title) {
            lines.push(title);
            lines.push('');
        }

        function addField(label, name) {
            var value = formData.get(name);
            if (value && String(value).trim()) {
                lines.push(label + ': ' + value);
            }
        }

        function addCheckedGroup(label, names) {
            var selected = names.filter(function (name) {
                return form.querySelector('input[name="' + name + '"]:checked');
            }).map(function (name) {
                return form.querySelector('input[name="' + name + '"]').value;
            });
            if (selected.length) {
                lines.push(label + ': ' + selected.join(', '));
            }
        }

        addSection('Types of Membership');
        addCheckedGroup('Membership to enroll', ['membershipOrdinary', 'membershipAssociate']);
        addCheckedGroup('Industry Classification', [
            'industryFreightForwarder',
            'industryGroundHandling',
            'industryAirline',
            'industryPostCourier',
            'industryWarehousing',
            'industryLocalTrucking',
            'industryAirRelated',
            'industryGovernmentBodies',
            'industryOthers'
        ]);

        addSection('A. Details of Applicant Company');
        addCheckedGroup('Company Type', ['companyLimited', 'companyPartnership', 'companySole']);
        addField('Name of Applicant Company', 'companyName');
        addField('Address of Main Office', 'mainOfficeAddress');
        addField('Correspondence Address', 'correspondenceAddress');
        addField('Telephone', 'companyTelephone');
        addField('Fax', 'companyFax');
        addField('Email Address of Company', 'companyEmail');
        addField('Website Address of Company', 'companyWebsite');
        addField('Staff Strength of Company', 'staffStrength');

        addSection('Contact Person 1');
        addField('Name', 'contact1Name');
        addField('Designation', 'contact1Designation');
        addField('Email Address', 'contact1Email');
        addField('Contact Number (Office)', 'contact1Office');
        addField('Contact Number (Mobile)', 'contact1Mobile');

        addSection('Contact Person 2');
        addField('Name', 'contact2Name');
        addField('Designation', 'contact2Designation');
        addField('Email Address', 'contact2Email');
        addField('Contact Number (Office)', 'contact2Office');
        addField('Contact Number (Mobile)', 'contact2Mobile');

        addSection('B. Other Information');
        addField('Existing IATA member', 'iataMember');
        addField('Member of other logistics associations', 'otherAssociations');
        addField('Details of other associations', 'otherAssociationsDetails');
        addField('Directors/officers criminal offence history', 'criminalHistory');
        addField('Criminal offence details', 'criminalHistoryDetails');

        addSection('C. Applicant Declaration');
        addField('Signature Name', 'declarationName');
        addField('Designation', 'declarationDesignation');
        addField('Date', 'declarationDate');

        lines.push('');
        lines.push('Please attach the following documents to your email before sending:');
        lines.push('1. ACRA Business Profile');
        lines.push('2. For freight forwarder ordinary member enrolment: two employee certificates as stated in the application form');

        var subject = encodeURIComponent('SAAA Membership Application');
        var body = encodeURIComponent(lines.join('\n'));
        window.location.href = 'mailto:saaasin@saaa.org.sg?subject=' + subject + '&body=' + body;
    });
})();
