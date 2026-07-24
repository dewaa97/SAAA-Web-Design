(function () {
    const form = document.getElementById('login-form');
    const comboboxRoot = document.getElementById('company-combobox');
    if (!form || !comboboxRoot || !window.saaaContent || !window.SaaaCombobox) return;

    const companyItems = (saaaContent.loginCompanies || []).map(function (company) {
        return {
            value: company.id,
            label: company.name
        };
    });

    const companyCombobox = SaaaCombobox.mount(comboboxRoot, {
        placeholder: 'Select company',
        items: companyItems,
        onChange: function () {
            companyCombobox.setInvalid(false);
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!companyCombobox.getSelectedItem()) {
            companyCombobox.setInvalid(true);
            companyCombobox.open();
            return;
        }

        alert('Members Portal login is not yet connected. Please contact saaasin@saaa.org.sg for assistance.');
    });
})();
