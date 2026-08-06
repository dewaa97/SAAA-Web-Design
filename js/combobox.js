(function () {
    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function Combobox(root, options) {
        this.root = root;
        this.options = options.items.slice().sort(function (a, b) {
            return a.label.localeCompare(b.label);
        });
        this.placeholder = options.placeholder || 'Select an option';
        this.onChange = options.onChange || function () {};
        this.onClose = options.onClose || function () {};
        this.searchable = options.searchable !== false;
        this.selectedValue = options.value || '';
        this.filtered = this.options.slice();
        this.highlightIndex = -1;
        this.isOpen = false;

        if (!this.searchable) {
            this.root.classList.add('combobox--simple');
        }

        this.hiddenInput = root.querySelector('[data-combobox-input]');
        this.trigger = root.querySelector('[data-combobox-trigger]');
        this.valueEl = root.querySelector('[data-combobox-value]');
        this.content = root.querySelector('[data-combobox-content]');
        this.searchInput = root.querySelector('[data-combobox-search]');
        this.list = root.querySelector('[data-combobox-list]');
        this.emptyEl = root.querySelector('[data-combobox-empty]');

        this.bindEvents();
        this.renderValue();
        this.renderList();
    }

    Combobox.prototype.bindEvents = function () {
        const self = this;

        this.trigger.addEventListener('click', function () {
            self.toggle();
        });

        if (this.searchable && this.searchInput) {
            this.searchInput.addEventListener('input', function () {
                self.filter(self.searchInput.value);
            });

            this.searchInput.addEventListener('keydown', function (event) {
                self.handleKeydown(event);
            });
        }

        this.trigger.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                self.open();
            }
        });

        document.addEventListener('click', function (event) {
            if (!self.root.contains(event.target)) {
                self.close();
            }
        });
    };

    Combobox.prototype.getSelectedItem = function () {
        const self = this;
        return this.options.find(function (item) {
            return item.value === self.selectedValue;
        }) || null;
    };

    Combobox.prototype.renderValue = function () {
        const selected = this.getSelectedItem();
        if (selected) {
            this.valueEl.textContent = selected.label;
            this.valueEl.classList.remove('is-placeholder');
            this.hiddenInput.value = selected.value;
        } else {
            this.valueEl.textContent = this.placeholder;
            this.valueEl.classList.add('is-placeholder');
            this.hiddenInput.value = '';
        }
    };

    Combobox.prototype.renderList = function () {
        const self = this;
        this.list.innerHTML = '';

        this.filtered.forEach(function (item, index) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'combobox-item';
            button.setAttribute('role', 'option');
            button.dataset.value = item.value;
            button.innerHTML = self.searchable
                ? '<svg class="combobox-item-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                    '<polyline points="20 6 9 17 4 12"></polyline></svg>' +
                    '<span class="combobox-item-label">' + escapeHtml(item.label) + '</span>'
                : '<span class="combobox-item-label">' + escapeHtml(item.label) + '</span>';

            if (item.value === self.selectedValue) {
                button.classList.add('is-selected');
                button.setAttribute('aria-selected', 'true');
            }

            if (index === self.highlightIndex) {
                button.classList.add('is-highlighted');
                button.scrollIntoView({ block: 'nearest' });
            }

            button.addEventListener('click', function () {
                self.select(item.value);
            });

            self.list.appendChild(button);
        });

        const hasResults = this.filtered.length > 0;
        this.emptyEl.hidden = hasResults;
        this.list.hidden = !hasResults;
    };

    Combobox.prototype.filter = function (query) {
        const normalized = query.trim().toLowerCase();
        this.filtered = !normalized
            ? this.options.slice()
            : this.options.filter(function (item) {
                return item.label.toLowerCase().includes(normalized);
            });
        this.highlightIndex = this.filtered.length ? 0 : -1;
        this.renderList();
    };

    Combobox.prototype.select = function (value) {
        this.selectedValue = value;
        this.renderValue();
        this.renderList();
        this.close();
        this.onChange(this.getSelectedItem());
    };

    Combobox.prototype.open = function () {
        if (this.isOpen) return;
        this.isOpen = true;
        this.root.classList.add('is-open');
        this.trigger.setAttribute('aria-expanded', 'true');
        this.content.hidden = false;
        this.filter('');
        if (this.searchable && this.searchInput) {
            this.searchInput.value = '';
            window.requestAnimationFrame(function () {
                this.searchInput.focus();
            }.bind(this));
        }
    };

    Combobox.prototype.close = function () {
        if (!this.isOpen) return;
        this.isOpen = false;
        this.root.classList.remove('is-open');
        this.trigger.setAttribute('aria-expanded', 'false');
        this.content.hidden = true;
        this.highlightIndex = -1;
        this.onClose(this.getSelectedItem());
    };

    Combobox.prototype.toggle = function () {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    };

    Combobox.prototype.handleKeydown = function (event) {
        if (!this.isOpen) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (!this.filtered.length) return;
            this.highlightIndex = Math.min(this.highlightIndex + 1, this.filtered.length - 1);
            this.renderList();
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (!this.filtered.length) return;
            this.highlightIndex = Math.max(this.highlightIndex - 1, 0);
            this.renderList();
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            if (this.highlightIndex < 0 || !this.filtered[this.highlightIndex]) return;
            this.select(this.filtered[this.highlightIndex].value);
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            this.close();
            this.trigger.focus();
        }
    };

    Combobox.prototype.setInvalid = function (isInvalid) {
        this.trigger.classList.toggle('is-invalid', isInvalid);
    };

    Combobox.prototype.setValue = function (value) {
        this.selectedValue = value || '';
        this.renderValue();
        this.renderList();
    };

    Combobox.prototype.getValue = function () {
        return this.selectedValue;
    };

    Combobox.prototype.clear = function () {
        this.setValue('');
    };

    window.SaaaCombobox = {
        mount: function (root, options) {
            return new Combobox(root, options);
        }
    };
})();
