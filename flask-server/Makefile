PYTHON ?= python3
VENV ?= ../.venv
VENV_PYTHON := $(VENV)/bin/python
VENV_PIP := $(VENV)/bin/pip
FLASK_HOST ?= localhost
FLASK_PORT ?= 3500
FLASK_DEBUG_FLAG ?= --debug
CACHE_DIR ?= ../.cache/backend
CACHE_REQ := $(CACHE_DIR)/requirements.txt
CACHE_DEV_REQ := $(CACHE_DIR)/requirements-dev.txt
PIP_COMPILE := "$(VENV_PYTHON)" -m piptools compile
PIP_COMPILE_FLAGS ?=
PIP_VERSION_SPEC ?= "pip<25"
PIPTOOLS_VERSION ?= pip-tools==7.4.1
RUFF := "$(VENV_PYTHON)" -m ruff

.PHONY: format format-check lint lint-fix venv install dev clean-venv pip-tools compile cache-clean ci-check upgrade

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
	"$(VENV_PYTHON)" -m pip install --upgrade $(PIP_VERSION_SPEC) >/dev/null
	@echo "[ok] Virtual environment ready at $(VENV)"

pip-tools: venv
	@echo "[info] Ensuring pip-tools is available"
	@"$(VENV_PIP)" install $(PIPTOOLS_VERSION) >/dev/null

$(CACHE_REQ): requirements.in pip-tools
	@mkdir -p "$(CACHE_DIR)"
	@echo "[info] Compiling requirements.in -> $(CACHE_REQ)"
	@$(PIP_COMPILE) $(PIP_COMPILE_FLAGS) --resolver=backtracking --strip-extras --quiet --output-file "$(CACHE_REQ)" requirements.in

$(CACHE_DEV_REQ): requirements-dev.in pip-tools $(CACHE_REQ)
	@mkdir -p "$(CACHE_DIR)"
	@echo "[info] Compiling requirements-dev.in -> $(CACHE_DEV_REQ)"
	@$(PIP_COMPILE) $(PIP_COMPILE_FLAGS) --resolver=backtracking --strip-extras --quiet --output-file "$(CACHE_DEV_REQ)" requirements-dev.in

install: venv $(CACHE_REQ) $(CACHE_DEV_REQ)
	@echo "[info] Installing backend dependencies"
	@"$(VENV_PIP)" install -r "$(CACHE_REQ)" >/dev/null
	@"$(VENV_PIP)" install -r "$(CACHE_DEV_REQ)" >/dev/null
	@echo "[ok] Backend dependencies installed"

compile: $(CACHE_REQ) $(CACHE_DEV_REQ)
	@echo "[ok] Requirements compiled at $(CACHE_DIR)"

dev: install
	"$(VENV_PYTHON)" -m flask --app app.py run $(FLASK_DEBUG_FLAG) --host $(FLASK_HOST) --port $(FLASK_PORT)

clean-venv:
	rm -rf "$(VENV)"
	rm -rf "$(CACHE_DIR)"
	@echo "[ok] Removed virtual environment at $(VENV) and cache at $(CACHE_DIR)"

cache-clean:
	rm -rf "$(CACHE_DIR)"
	@echo "[ok] Cleared compiled requirements in $(CACHE_DIR)"

upgrade: cache-clean
	@$(MAKE) compile PIP_COMPILE_FLAGS="--upgrade"

ci-check: venv pip-tools
	@echo "[info] Verifying compiled lockfiles are up to date"
	@if [ -f "$(CACHE_REQ)" ]; then \
		$(PIP_COMPILE) --resolver=backtracking --strip-extras --quiet --dry-run --output-file "$(CACHE_REQ)" requirements.in >/dev/null; \
	else \
		echo "[warn] $(CACHE_REQ) is missing; run 'make backend' to generate it"; \
		exit 1; \
	fi
	@if [ -f "$(CACHE_DEV_REQ)" ]; then \
		$(PIP_COMPILE) --resolver=backtracking --strip-extras --quiet --dry-run --output-file "$(CACHE_DEV_REQ)" requirements-dev.in >/dev/null; \
	else \
		echo "[warn] $(CACHE_DEV_REQ) is missing; run 'make backend' to generate it"; \
		exit 1; \
	fi
	@echo "[ok] pip-compile dry run completed"

format: install
	"$(VENV_PYTHON)" -m black .

format-check: install
	"$(VENV_PYTHON)" -m black --check .

lint: install
	$(RUFF) check .

lint-fix: install
	$(RUFF) check . --fix
