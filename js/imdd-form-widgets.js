(function () {
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function pad(value) {
        return String(value).padStart(2, '0');
    }

    function toIsoDate(year, month, day) {
        return year + '-' + pad(month + 1) + '-' + pad(day);
    }

    function parseIsoDate(value) {
        if (!value) return null;
        var parts = value.split('-');
        if (parts.length !== 3) return null;
        return {
            year: Number(parts[0]),
            month: Number(parts[1]) - 1,
            day: Number(parts[2])
        };
    }

    function formatDisplayDate(value) {
        var parsed = parseIsoDate(value);
        if (!parsed) return '';
        return parsed.day + ' ' + MONTHS[parsed.month] + ' ' + parsed.year;
    }

    function mountComboboxFromSelect(select, options) {
        if (!select || !window.SaaaCombobox) return null;

        var field = select.closest('.imdd-form-field');
        var label = field ? field.querySelector('label') : null;
        var labelId = label ? label.id || (select.id + '-label') : select.id + '-label';
        if (label && !label.id) label.id = labelId;

        var items = [];
        Array.from(select.options).forEach(function (option) {
            if (!option.value) return;
            items.push({ value: option.value, label: option.textContent.trim() });
        });

        var isSimple = options.searchable === false;
        var chevronIcon = isSimple
            ? '<path d="m6 9 6 6 6-6"></path>'
            : '<path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path>';

        var root = document.createElement('div');
        root.className = 'combobox' + (isSimple ? ' combobox--simple' : '');
        root.innerHTML =
            '<input type="hidden" name="' + escapeHtml(select.name) + '" data-combobox-input>' +
            '<button type="button" class="combobox-trigger" data-combobox-trigger aria-haspopup="listbox" aria-expanded="false" aria-labelledby="' + escapeHtml(labelId) + '">' +
                '<span class="combobox-value is-placeholder" data-combobox-value>' + escapeHtml(options.placeholder || 'Select') + '</span>' +
                '<svg class="combobox-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                    chevronIcon +
                '</svg>' +
            '</button>' +
            '<div class="combobox-content" data-combobox-content hidden>' +
                (options.searchable === false ? '' :
                    '<div class="combobox-search-wrap">' +
                        '<input type="text" class="combobox-search" data-combobox-search placeholder="' + escapeHtml(options.searchPlaceholder || 'Search...') + '" aria-label="Search options" autocomplete="off">' +
                    '</div>') +
                '<ul class="combobox-list" data-combobox-list role="listbox"></ul>' +
                '<p class="combobox-empty" data-combobox-empty hidden>No results found.</p>' +
            '</div>';

        select.replaceWith(root);

        var combobox = SaaaCombobox.mount(root, {
            items: items,
            placeholder: options.placeholder || 'Select',
            value: options.value || select.value || '',
            searchable: options.searchable !== false,
            onChange: function () {
                if (field) field.classList.remove('has-error');
                if (options.onChange) options.onChange();
            },
            onClose: options.onClose || function () {}
        });

        combobox.fieldKey = options.fieldKey || select.name;
        return combobox;
    }

    function DatePicker(root, options) {
        this.root = root;
        this.onChange = options.onChange || function () {};
        this.placeholder = options.placeholder || 'Pick a date';
        this.hiddenInput = root.querySelector('[data-date-input]');
        this.trigger = root.querySelector('[data-date-trigger]');
        this.valueEl = root.querySelector('[data-date-value]');
        this.popover = root.querySelector('[data-date-popover]');
        this.monthEl = root.querySelector('[data-date-month]');
        this.gridEl = root.querySelector('[data-date-grid]');
        this.viewDate = new Date();
        this.selectedDate = parseIsoDate(this.hiddenInput.value);

        if (this.selectedDate) {
            this.viewDate = new Date(this.selectedDate.year, this.selectedDate.month, this.selectedDate.day);
        }

        this.bindEvents();
        this.renderValue();
        this.renderCalendar();
    }

    DatePicker.prototype.bindEvents = function () {
        var self = this;

        this.trigger.addEventListener('click', function () {
            self.toggle();
        });

        this.root.querySelector('[data-date-prev]').addEventListener('click', function (event) {
            event.stopPropagation();
            self.viewDate.setMonth(self.viewDate.getMonth() - 1);
            self.renderCalendar();
        });

        this.root.querySelector('[data-date-next]').addEventListener('click', function (event) {
            event.stopPropagation();
            self.viewDate.setMonth(self.viewDate.getMonth() + 1);
            self.renderCalendar();
        });

        document.addEventListener('click', function (event) {
            if (!self.root.contains(event.target)) self.close();
        });
    };

    DatePicker.prototype.renderValue = function () {
        if (this.hiddenInput.value) {
            this.valueEl.textContent = formatDisplayDate(this.hiddenInput.value);
            this.valueEl.classList.remove('is-placeholder');
        } else {
            this.valueEl.textContent = this.placeholder;
            this.valueEl.classList.add('is-placeholder');
        }
    };

    DatePicker.prototype.renderCalendar = function () {
        var self = this;
        var year = this.viewDate.getFullYear();
        var month = this.viewDate.getMonth();
        var firstDay = new Date(year, month, 1).getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var today = new Date();

        this.monthEl.textContent = MONTHS[month] + ' ' + year;
        this.gridEl.innerHTML = '';

        for (var i = 0; i < firstDay; i++) {
            var empty = document.createElement('span');
            empty.className = 'date-picker-day is-outside';
            empty.setAttribute('aria-hidden', 'true');
            this.gridEl.appendChild(empty);
        }

        for (var day = 1; day <= daysInMonth; day++) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'date-picker-day';
            button.textContent = String(day);

            var iso = toIsoDate(year, month, day);
            if (this.hiddenInput.value === iso) button.classList.add('is-selected');
            if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day) {
                button.classList.add('is-today');
            }

            button.addEventListener('click', (function (selectedIso) {
                return function (event) {
                    event.stopPropagation();
                    self.selectDate(selectedIso);
                };
            })(iso));

            this.gridEl.appendChild(button);
        }
    };

    DatePicker.prototype.selectDate = function (iso) {
        this.hiddenInput.value = iso;
        this.selectedDate = parseIsoDate(iso);
        this.renderValue();
        this.renderCalendar();
        this.close();
        this.onChange(iso);
    };

    DatePicker.prototype.open = function () {
        this.root.classList.add('is-open');
        this.popover.hidden = false;
    };

    DatePicker.prototype.close = function () {
        this.root.classList.remove('is-open');
        this.popover.hidden = true;
    };

    DatePicker.prototype.toggle = function () {
        if (this.root.classList.contains('is-open')) this.close();
        else this.open();
    };

    DatePicker.prototype.getValue = function () {
        return this.hiddenInput.value;
    };

    DatePicker.prototype.setInvalid = function (isInvalid) {
        this.trigger.classList.toggle('is-invalid', isInvalid);
    };

    function mountDatePickerFromInput(input, options) {
        var field = input.closest('.imdd-form-field');
        var label = field ? field.querySelector('label') : null;
        var labelId = label ? label.id || (input.id + '-label') : input.id + '-label';
        if (label && !label.id) label.id = labelId;

        var root = document.createElement('div');
        root.className = 'date-picker';
        root.innerHTML =
            '<input type="hidden" name="' + escapeHtml(input.name) + '" value="' + escapeHtml(input.value || '') + '" data-date-input>' +
            '<button type="button" class="date-picker-trigger" data-date-trigger aria-labelledby="' + escapeHtml(labelId) + '">' +
                '<span class="date-picker-value' + (input.value ? '' : ' is-placeholder') + '" data-date-value>' +
                    escapeHtml(input.value ? formatDisplayDate(input.value) : (options.placeholder || 'Pick a date')) +
                '</span>' +
                '<svg class="date-picker-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                    '<rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>' +
                '</svg>' +
            '</button>' +
            '<div class="date-picker-popover" data-date-popover hidden>' +
                '<div class="date-picker-header">' +
                    '<button type="button" class="date-picker-nav" data-date-prev aria-label="Previous month">&lsaquo;</button>' +
                    '<div class="date-picker-month" data-date-month></div>' +
                    '<button type="button" class="date-picker-nav" data-date-next aria-label="Next month">&rsaquo;</button>' +
                '</div>' +
                '<div class="date-picker-weekdays">' +
                    WEEKDAYS.map(function (day) { return '<span class="date-picker-weekday">' + day + '</span>'; }).join('') +
                '</div>' +
                '<div class="date-picker-grid" data-date-grid></div>' +
            '</div>';

        input.replaceWith(root);

        var picker = new DatePicker(root, {
            placeholder: options.placeholder || 'Pick a date',
            onChange: function (iso) {
                if (field) field.classList.remove('has-error');
                if (options.onChange) options.onChange(iso);
            }
        });

        picker.fieldKey = options.fieldKey || input.name;
        return picker;
    }

    function FileUpload(root, options) {
        this.root = root;
        this.onChange = options.onChange || function () {};
        this.accept = options.accept || '';
        this.zone = root.querySelector('[data-file-zone]');
        this.input = root.querySelector('[data-file-input]');
        this.preview = root.querySelector('[data-file-preview]');
        this.nameEl = root.querySelector('[data-file-name]');
        this.removeBtn = root.querySelector('[data-file-remove]');

        if (this.accept) this.input.setAttribute('accept', this.accept);
        this.bindEvents();
    }

    FileUpload.prototype.bindEvents = function () {
        var self = this;

        this.zone.addEventListener('click', function () {
            self.input.click();
        });

        this.zone.addEventListener('dragover', function (event) {
            event.preventDefault();
            self.root.classList.add('is-dragover');
        });

        this.zone.addEventListener('dragleave', function () {
            self.root.classList.remove('is-dragover');
        });

        this.zone.addEventListener('drop', function (event) {
            event.preventDefault();
            self.root.classList.remove('is-dragover');
            if (event.dataTransfer.files && event.dataTransfer.files[0]) {
                self.input.files = event.dataTransfer.files;
                self.updatePreview();
            }
        });

        this.input.addEventListener('change', function () {
            self.updatePreview();
        });

        this.removeBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            self.clear();
        });
    };

    FileUpload.prototype.updatePreview = function () {
        var file = this.input.files && this.input.files[0];
        if (!file) {
            this.clear();
            return;
        }

        this.root.classList.add('has-file');
        this.nameEl.textContent = file.name;
        this.root.classList.remove('is-invalid');
        var field = this.root.closest('.imdd-form-field');
        if (field) field.classList.remove('has-error');
        this.onChange(file);
    };

    FileUpload.prototype.clear = function () {
        this.input.value = '';
        this.root.classList.remove('has-file');
        this.nameEl.textContent = '';
        this.onChange(null);
    };

    FileUpload.prototype.getFile = function () {
        return this.input.files && this.input.files[0] ? this.input.files[0] : null;
    };

    FileUpload.prototype.setInvalid = function (isInvalid) {
        this.root.classList.toggle('is-invalid', isInvalid);
    };

    function mountFileUploadFromInput(input, options) {
        var field = input.closest('.imdd-form-field');
        var root = document.createElement('div');
        root.className = 'file-upload' + (options.compact ? ' file-upload--compact' : '');
        root.innerHTML =
            '<input type="file" class="file-upload-input" data-file-input name="' + escapeHtml(input.name) + '">' +
            '<div class="file-upload-zone" data-file-zone role="button" tabindex="0">' +
                '<svg class="file-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>' +
                    '<polyline points="17 8 12 3 7 8"></polyline>' +
                    '<line x1="12" y1="3" x2="12" y2="15"></line>' +
                '</svg>' +
                '<div class="file-upload-title">Upload Resume</div>' +
                '<div class="file-upload-hint">PDF, DOC, or DOCX up to 10MB</div>' +
                '<div class="file-upload-browse">Click to browse or drag and drop</div>' +
            '</div>' +
            '<div class="file-upload-preview" data-file-preview>' +
                '<div class="file-upload-file">' +
                    '<div class="file-upload-file-icon" aria-hidden="true">PDF</div>' +
                    '<span class="file-upload-file-name" data-file-name></span>' +
                '</div>' +
                '<button type="button" class="file-upload-remove" data-file-remove>Remove</button>' +
            '</div>';

        input.replaceWith(root);

        var widget = new FileUpload(root, {
            accept: options.accept || input.getAttribute('accept') || '',
            onChange: options.onChange
        });

        widget.fieldKey = options.fieldKey || input.name;
        return widget;
    }

    window.SaaaImddFormWidgets = {
        mountComboboxFromSelect: mountComboboxFromSelect,
        mountDatePickerFromInput: mountDatePickerFromInput,
        mountFileUploadFromInput: mountFileUploadFromInput,
        formatDisplayDate: formatDisplayDate
    };
})();
