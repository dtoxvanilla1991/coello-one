PYTHON ?= python3
VENV ?= ../.venv
VENV_PYTHON := $(VENV)/bin/python
VENV_PIP := $(VENV)/bin/pip
FLASK_HOST ?= localhost
FLASK_PORT ?= 3500
FLASK_DEBUG_FLAG ?= --debug

.PHONY: format format-check venv install dev clean-venv

venv:
	@PY_CMD=$$(command -v $(PYTHON)); \
	if [ -z "$$PY_CMD" ]; then \
		echo "[error] Python executable '$(PYTHON)' not found. Set PYTHON=/path/to/python3"; \
		exit 1; \
	fi; \
	if [ ! -d "$(VENV)" ] || [ ! -x "$(VENV_PYTHON)" ]; then \
		echo "[info] Creating virtual environment at $(VENV) with $$PY_CMD"; \
		"$$PY_CMD" -m venv "$(VENV)"; \
	else \
		SHEBANG=$$(head -n 1 "$(VENV_PYTHON)" 2>/dev/null); \
		if echo "$$SHEBANG" | grep -q '^#!'; then \
			VENV_BASE=$${SHEBANG#\#!}; \
			if [ ! -x "$$VENV_BASE" ]; then \
				echo "[warn] Virtualenv interpreter $$VENV_BASE missing; rebuilding"; \
				rm -rf "$(VENV)"; \
				"$$PY_CMD" -m venv "$(VENV)"; \
			fi; \
		fi; \
	fi; \
	"$(VENV_PYTHON)" -m pip install --upgrade pip >/dev/null
	@echo "[ok] Virtual environment ready at $(VENV)"

install: venv
	@echo "[info] Installing backend dependencies"
	@"$(VENV_PIP)" install -r requirements.txt >/dev/null
	@if [ -f requirements-dev.txt ]; then \
		"$(VENV_PIP)" install -r requirements-dev.txt >/dev/null; \
	fi
	@echo "[ok] Backend dependencies installed"

dev: install
	"$(VENV_PYTHON)" -m flask --app app.py run $(FLASK_DEBUG_FLAG) --host $(FLASK_HOST) --port $(FLASK_PORT)

clean-venv:
	rm -rf "$(VENV)"
	@echo "[ok] Removed virtual environment at $(VENV)"

format: install
	"$(VENV_PYTHON)" -m black .

format-check: install
	"$(VENV_PYTHON)" -m black --check .
