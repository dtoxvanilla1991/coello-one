# Convenience tasks for the monorepo

PYTHON ?= python3
BACKEND_VENV ?= .venv

.PHONY: setup hooks frontend backend backend-dev backend-clean backend-status backend-ci backend-upgrade backend-lint backend-lint-fix smoke-stock

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

backend-status:
	@git status --short --ignored $(BACKEND_VENV)

backend-ci:
	@$(MAKE) -C flask-server ci-check PYTHON=$(PYTHON) VENV=../$(BACKEND_VENV)

backend-upgrade:
	@$(MAKE) -C flask-server upgrade PYTHON=$(PYTHON) VENV=../$(BACKEND_VENV)
	@echo "[ok] Flask dependencies upgraded"

backend-lint:
	@$(MAKE) -C flask-server lint PYTHON=$(PYTHON) VENV=../$(BACKEND_VENV)

backend-lint-fix:
	@$(MAKE) -C flask-server lint-fix PYTHON=$(PYTHON) VENV=../$(BACKEND_VENV)

smoke-stock:
	@set -e; \
	BASE_URL=$${FLASK_API_BASE_URL:-http://localhost:3500}; \
	SLUG=$${STOCK_SMOKE_SLUG:-one-sleeve-classic}; \
	PING_URL="$$BASE_URL/api/stock?slug=$$SLUG"; \
	if command -v curl >/dev/null 2>&1 && curl -sf "$$PING_URL" >/dev/null 2>&1; then \
		echo "[info] Using existing Flask at $$BASE_URL"; \
	else \
		if [ -n "$$FLASK_API_BASE_URL" ]; then \
			echo "[error] FLASK_API_BASE_URL is set to $$FLASK_API_BASE_URL but server is not reachable."; \
			exit 1; \
		fi; \
		echo "[info] Starting Flask for smoke test on http://localhost:3500"; \
		$(PYTHON) flask-server/app.py >/dev/null 2>&1 & PID=$$!; \
		trap 'kill $$PID >/dev/null 2>&1 || true' EXIT INT TERM; \
		READY=0; \
		for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do \
			sleep 0.25; \
			if command -v curl >/dev/null 2>&1 && curl -sf "$$PING_URL" >/dev/null 2>&1; then \
				READY=1; \
				break; \
			fi; \
		done; \
		if [ "$$READY" -ne 1 ]; then \
			echo "[error] Flask did not become ready at $$BASE_URL"; \
			exit 1; \
		fi; \
	fi; \
	echo "[info] Running stock reserve/release smoke test"; \
	$(PYTHON) flask-server/scripts/smoke_stock.py
