const data = window.PROJECT_OS;
const storageKey = "project-about-projects-editor-state";

const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const principleEl = document.getElementById("principle");
const rhythmEl = document.getElementById("rhythm");
const rulesEl = document.getElementById("rules");
const trackingPurposeEl = document.getElementById("tracking-purpose");
const trackingFilesEl = document.getElementById("tracking-files");
const navEl = document.getElementById("stage-nav");
const stageTitleEl = document.getElementById("stage-title");
const stagePurposeEl = document.getElementById("stage-purpose");
const questionsEl = document.getElementById("stage-questions");
const outputsEl = document.getElementById("stage-outputs");
const stopsEl = document.getElementById("stage-stops");
const seamsEl = document.getElementById("stage-seams");
const movesEl = document.getElementById("stage-moves");
const deliverablesEl = document.getElementById("stage-deliverables");
const healthyEl = document.getElementById("stage-healthy");
const warningEl = document.getElementById("stage-warning");
const reviewEl = document.getElementById("stage-review");
const antiEl = document.getElementById("stage-anti");
const editorSelectEl = document.getElementById("editor-select");
const editorTitleEl = document.getElementById("editor-title");
const editorDescriptionEl = document.getElementById("editor-description");
const editorFormEl = document.getElementById("editor-form");
const markdownOutputEl = document.getElementById("markdown-output");
const resetButtonEl = document.getElementById("reset-button");
const copyButtonEl = document.getElementById("copy-button");

let selectedStageSlug = data.stages[0].slug;
let selectedEditorKey = Object.keys(data.editors)[0];
let editorState = loadState();


function loadState() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}


function saveState() {
  window.localStorage.setItem(storageKey, JSON.stringify(editorState));
}


function fillList(element, items) {
  element.innerHTML = "";
  for (const item of items || []) {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  }
}


function getStage(slug) {
  return data.stages.find((stage) => stage.slug === slug) || data.stages[0];
}


function getEditor() {
  return data.editors[selectedEditorKey];
}


function getEditorValues() {
  if (!editorState[selectedEditorKey]) {
    editorState[selectedEditorKey] = {};
  }
  return editorState[selectedEditorKey];
}


function renderRules() {
  rulesEl.innerHTML = "";
  for (const rule of data.decision_rules) {
    const block = document.createElement("article");
    block.className = "rule-block";
    const heading = document.createElement("h3");
    heading.textContent = rule.name;
    const trigger = document.createElement("p");
    trigger.textContent = `Trigger: ${rule.trigger}`;
    const action = document.createElement("p");
    action.textContent = `Action: ${rule.action}`;
    block.append(heading, trigger, action);
    rulesEl.appendChild(block);
  }
}


function renderTracking() {
  trackingPurposeEl.textContent = data.tracking?.purpose || "";
  trackingFilesEl.innerHTML = "";
  for (const file of data.tracking?.files || []) {
    const li = document.createElement("li");
    li.textContent = `${file.name}: ${file.role}`;
    trackingFilesEl.appendChild(li);
  }
}


function renderStage(stage) {
  stageTitleEl.textContent = stage.title;
  stagePurposeEl.textContent = stage.purpose;
  fillList(questionsEl, stage.questions);
  fillList(outputsEl, stage.outputs);
  fillList(stopsEl, stage.stop_points);
  fillList(seamsEl, stage.seams);
  fillList(movesEl, stage.moves);
  fillList(deliverablesEl, stage.deliverables);
  fillList(healthyEl, stage.signals?.healthy || []);
  fillList(warningEl, stage.signals?.warning || []);
  fillList(reviewEl, stage.review_prompts);
  fillList(antiEl, stage.anti_patterns);

  for (const button of navEl.querySelectorAll("button")) {
    button.classList.toggle("active", button.dataset.slug === stage.slug);
  }
}


function renderNav() {
  navEl.innerHTML = "";
  for (const stage of data.stages) {
    const button = document.createElement("button");
    button.className = "stage-button";
    button.dataset.slug = stage.slug;
    button.textContent = stage.title;
    button.addEventListener("click", () => {
      selectedStageSlug = stage.slug;
      renderStage(stage);
    });
    navEl.appendChild(button);
  }
}


function inferEmptyValue(field) {
  if (field.type === "table") {
    return [["", "", "", ""]];
  }
  return "";
}


function ensureFieldValue(field, values) {
  if (!(field.id in values)) {
    values[field.id] = inferEmptyValue(field);
  }
}


function setFieldValue(field, value) {
  const values = getEditorValues();
  values[field.id] = value;
  saveState();
  renderMarkdown();
}


function renderField(field, values) {
  ensureFieldValue(field, values);

  const wrapper = document.createElement("section");
  wrapper.className = "field-card";

  const header = document.createElement("div");
  header.className = "field-header";

  const label = document.createElement("label");
  label.className = "field-label";
  label.textContent = field.label;

  const meta = document.createElement("p");
  meta.className = "field-meta";
  meta.textContent = `${getStage(field.stage).title}: ${field.hint}`;

  header.append(label, meta);
  wrapper.appendChild(header);

  const focusStage = () => {
    selectedStageSlug = field.stage;
    renderStage(getStage(field.stage));
  };

  if (field.type === "textarea") {
    const input = document.createElement("textarea");
    input.placeholder = field.placeholder || "";
    input.value = values[field.id];
    input.addEventListener("focus", focusStage);
    input.addEventListener("input", () => setFieldValue(field, input.value));
    wrapper.appendChild(input);
  } else if (field.type === "list") {
    const input = document.createElement("textarea");
    input.placeholder = field.placeholder || "";
    input.value = values[field.id];
    input.addEventListener("focus", focusStage);
    input.addEventListener("input", () => setFieldValue(field, input.value));
    wrapper.appendChild(input);
  } else if (field.type === "table") {
    const table = document.createElement("table");
    table.className = "slice-table";
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    for (const column of field.columns) {
      const th = document.createElement("th");
      th.textContent = column;
      headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const rows = values[field.id];
    rows.forEach((row, rowIndex) => {
      const tr = document.createElement("tr");
      row.forEach((cellValue, cellIndex) => {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = "text";
        input.value = cellValue;
        input.placeholder = field.columns[cellIndex];
        input.addEventListener("focus", focusStage);
        input.addEventListener("input", () => {
          const nextRows = rows.map((item) => [...item]);
          nextRows[rowIndex][cellIndex] = input.value;
          setFieldValue(field, nextRows);
        });
        td.appendChild(input);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrapper.appendChild(table);

    const addRowButton = document.createElement("button");
    addRowButton.type = "button";
    addRowButton.className = "secondary-button";
    addRowButton.textContent = "Add Row";
    addRowButton.addEventListener("click", () => {
      const nextRows = rows.map((item) => [...item]);
      nextRows.push(field.columns.map(() => ""));
      setFieldValue(field, nextRows);
      renderEditor();
    });
    wrapper.appendChild(addRowButton);
  }

  return wrapper;
}


function listItems(raw) {
  return String(raw || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}


function tableRows(rows) {
  return (rows || []).filter((row) => row.some((cell) => String(cell || "").trim()));
}


function markdownSection(label, value, type, columns) {
  if (type === "table") {
    const rows = tableRows(value);
    const header = `| ${columns.join(" | ")} |`;
    const divider = `| ${columns.map(() => "---").join(" | ")} |`;
    const body = rows.map((row) => `| ${row.map((cell) => String(cell || "").trim()).join(" | ")} |`);
    return [`## ${label}`, "", header, divider, ...body, ""];
  }

  if (type === "list") {
    const items = listItems(value);
    return [`## ${label}`, "", ...items.map((item) => `- ${item}`), ""];
  }

  return [`## ${label}`, "", String(value || "").trim(), ""];
}


function renderMarkdown() {
  const editor = getEditor();
  const values = getEditorValues();
  const lines = [`# ${editor.title}`, ""];
  for (const field of editor.fields) {
    ensureFieldValue(field, values);
    lines.push(...markdownSection(field.label, values[field.id], field.type, field.columns || []));
  }
  markdownOutputEl.textContent = lines.join("\n").replace(/\n{3,}/g, "\n\n");
}


function renderEditor() {
  const editor = getEditor();
  const values = getEditorValues();

  editorTitleEl.textContent = editor.title;
  editorDescriptionEl.textContent = editor.description;
  editorFormEl.innerHTML = "";

  for (const field of editor.fields) {
    editorFormEl.appendChild(renderField(field, values));
  }

  renderMarkdown();
}


function renderEditorOptions() {
  editorSelectEl.innerHTML = "";
  for (const [key, editor] of Object.entries(data.editors)) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = editor.title;
    editorSelectEl.appendChild(option);
  }
  editorSelectEl.value = selectedEditorKey;
}


function initButtons() {
  editorSelectEl.addEventListener("change", () => {
    selectedEditorKey = editorSelectEl.value;
    renderEditor();
  });

  resetButtonEl.addEventListener("click", () => {
    editorState[selectedEditorKey] = {};
    saveState();
    renderEditor();
  });

  copyButtonEl.addEventListener("click", async () => {
    const markdown = markdownOutputEl.textContent;
    await navigator.clipboard.writeText(markdown);
    copyButtonEl.textContent = "Copied";
    window.setTimeout(() => {
      copyButtonEl.textContent = "Copy Markdown";
    }, 1200);
  });
}


function init() {
  titleEl.textContent = data.title;
  subtitleEl.textContent = data.subtitle;
  principleEl.textContent = data.principle;
  fillList(rhythmEl, data.rhythm);
  renderRules();
  renderTracking();
  renderNav();
  renderEditorOptions();
  initButtons();
  renderStage(getStage(selectedStageSlug));
  renderEditor();
}


init();
