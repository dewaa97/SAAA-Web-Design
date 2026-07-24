(function () {
    const companyInput = document.getElementById('company-name');
    const datalist = document.getElementById('company-list');
    const form = document.getElementById('login-form');
    if (!companyInput || !window.saaaContent) return;

    saaaContent.loginCompanies.forEach(function (c) {
        const opt = document.createElement('option');
        opt.value = c.name;
        datalist.appendChild(opt);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Members Portal login is not yet connected. Please contact saaasin@saaa.org.sg for assistance.');
    });
})();
