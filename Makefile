# Convenience tasks for the monorepo

PYTHON ?= python3

.PHONY: setup hooks frontend backend

setup:
	$(MAKE) hooks
	$(MAKE) frontend
	$(MAKE) backend
	@echo "[ok] Monorepo setup complete"

hooks:
	@if ! command -v bun >/dev/null 2>&1; then \
		echo "[error] Bun executable not found. Install Bun (https://bun.sh) or update PATH before running make hooks."; \
		exit 1; \
	fi
	bun install || { \
		echo "[error] Root bun install failed."; \
		echo "        Try running: bun install"; \
		exit 1; \
	}
	@echo "[ok] Root hooks installed"

frontend:
	@if ! command -v bun >/dev/null 2>&1; then \
		echo "[error] Bun executable not found. Install Bun (https://bun.sh) or update PATH before running make frontend."; \
		exit 1; \
	fi
	@cd coello-one && bun install || { \
		echo "[error] Frontend bun install failed."; \
		echo "        Try running: cd coello-one && bun install"; \
		exit 1; \
	}
	@echo "[ok] Frontend dependencies installed"

backend:
	@if ! command -v $(PYTHON) >/dev/null 2>&1; then \
		echo "[error] Python executable '$(PYTHON)' not found. Install Python 3.11+ or run 'make PYTHON=python3 backend'."; \
		exit 1; \
	fi
	@cd flask-server && $(PYTHON) -m pip install -r requirements.txt || { \
		echo "[error] Failed to install backend requirements via $(PYTHON)."; \
		echo "        Try running: cd flask-server && $(PYTHON) -m pip install -r requirements.txt"; \
		exit 1; \
	}
	@cd flask-server && $(PYTHON) -m pip install -r requirements-dev.txt || { \
		echo "[error] Failed to install backend dev requirements via $(PYTHON)."; \
		echo "        Try running: cd flask-server && $(PYTHON) -m pip install -r requirements-dev.txt"; \
		exit 1; \
	}
	@echo "[ok] Flask dependencies installed"
