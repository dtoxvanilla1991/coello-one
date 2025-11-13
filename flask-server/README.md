# Flask Server

## Quickstart

All commands below are run from the monorepo root (the directory that contains both `coello-one/` and `flask-server/`).

- Bootstrap or refresh the backend virtualenv and dependencies:

	```bash
	make backend
	```

- Launch the Flask API in debug mode (reuses the same virtualenv):

	```bash
	make backend-dev
	```

- Confirm the cached lockfile and virtualenv stay ignored:

	```bash
	make backend-status
	```

- Run the pip-tools drift check used in CI locally:

	```bash
	make backend-ci
	```

- Run Ruff lint checks (auto-fix with `make backend-lint-fix`):

	```bash
	make backend-lint
	```

- Upgrade cached dependency lockfiles to the latest PyPI releases:

	```bash
	make backend-upgrade
	```
Pass a different interpreter via `make PYTHON=/path/to/python3 backend` if Homebrew or pyenv manages your Python install.

## Manual commands (if needed)

If you need to run individual steps by hand, point at the managed virtualenv and the compiled lockfiles (generate them first with `make backend` or `make -C flask-server compile`):

```bash
../.venv/bin/python -m pip install -r ../.cache/backend/requirements.txt
../.venv/bin/python -m pip install -r ../.cache/backend/requirements-dev.txt
../.venv/bin/python -m flask --app app.py run --debug --host localhost --port 3500
```

This keeps the CLI on the project-controlled Python instead of any globally installed Flask plugins.

## Rebuilding the virtual environment

If the interpreter path breaks (for example after renaming directories or upgrading Python), you can start fresh with:

```bash
make backend-clean
make backend
```

Running the steps manually from within `flask-server/` looks like this:

```bash
rm -rf ../.venv
"$(command -v python3)" -m venv ../.venv
../.venv/bin/python -m pip install --upgrade "pip<25"
../.venv/bin/python -m pip install pip-tools==7.4.1
mkdir -p ../.cache/backend
../.venv/bin/python -m piptools compile --resolver=backtracking --strip-extras --output-file ../.cache/backend/requirements.txt requirements.in
../.venv/bin/python -m piptools compile --resolver=backtracking --strip-extras --output-file ../.cache/backend/requirements-dev.txt requirements-dev.in
../.venv/bin/python -m pip install -r ../.cache/backend/requirements.txt
../.venv/bin/python -m pip install -r ../.cache/backend/requirements-dev.txt
../.venv/bin/python -m piptools compile --resolver=backtracking --strip-extras --dry-run --output-file ../.cache/backend/requirements.txt requirements.in
../.venv/bin/python -m piptools compile --resolver=backtracking --strip-extras --dry-run --output-file ../.cache/backend/requirements-dev.txt requirements-dev.in
../.venv/bin/python -m ruff check .
```

Adjust the interpreter invocation if your Python executable lives elsewhere; the `make backend` target performs the same steps automatically.

Need to refresh to the newest PyPI releases by hand? Add `--upgrade` to the two `piptools compile` commands above before reinstalling.
