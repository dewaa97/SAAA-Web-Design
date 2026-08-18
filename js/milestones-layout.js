/**
 * Groups same-year milestone entries under one year label with bullet items.
 */
(function applyMilestonesLayout() {
  document.querySelectorAll(".milestone-events").forEach(function (list) {
    groupMilestoneEvents(list);
  });
})();

function groupMilestoneEvents(list) {
  var items = Array.prototype.slice.call(list.querySelectorAll(":scope > li"));
  if (!items.length) {
    return;
  }

  var groups = [];
  var groupMap = Object.create(null);

  items.forEach(function (item) {
    var yearEl = item.querySelector(".milestone-year");
    if (!yearEl) {
      return;
    }

    var year = yearEl.textContent.trim();
    var clone = item.cloneNode(true);
    var cloneYear = clone.querySelector(".milestone-year");
    if (cloneYear) {
      cloneYear.remove();
    }

    var textHtml = clone.innerHTML.trim();
    if (!groupMap[year]) {
      groupMap[year] = { year: year, texts: [] };
      groups.push(groupMap[year]);
    }
    groupMap[year].texts.push(textHtml);
  });

  list.classList.add("milestone-events-grouped");
  list.innerHTML = "";

  groups.forEach(function (group) {
    var groupItem = document.createElement("li");
    groupItem.className = "milestone-year-group";

    var yearSpan = document.createElement("span");
    yearSpan.className = "milestone-year";
    yearSpan.textContent = group.year;
    groupItem.appendChild(yearSpan);

    var subList = document.createElement("ul");
    subList.className = "milestone-year-items";

    group.texts.forEach(function (textHtml) {
      var subItem = document.createElement("li");
      subItem.innerHTML = textHtml;
      subList.appendChild(subItem);
    });

    groupItem.appendChild(subList);
    list.appendChild(groupItem);
  });
}
