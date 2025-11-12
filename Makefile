# Convenience tasks for the monorepo

PYTHON ?= python3
BACKEND_VENV ?= .venv

.PHONY: setup hooks frontend backend backend-dev backend-clean

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
	@$(MAKE) -C flask-server install PYTHON=$(PYTHON) VENV=../$(BACKEND_VENV)
	@echo "[ok] Flask dependencies installed into $(BACKEND_VENV)"

backend-dev:
	@$(MAKE) -C flask-server dev PYTHON=$(PYTHON) VENV=../$(BACKEND_VENV)

backend-clean:
	rm -rf $(BACKEND_VENV)
	@echo "[ok] Removed backend virtual environment at $(BACKEND_VENV)"
