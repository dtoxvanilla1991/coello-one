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

Pass a different interpreter via `make PYTHON=/path/to/python3 backend` if Homebrew or pyenv manages your Python install.

## Manual commands (if needed)

If you need to run individual steps by hand, point at the managed virtualenv:

```bash
../.venv/bin/python -m pip install -r requirements.txt
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
../.venv/bin/python -m pip install --upgrade pip
../.venv/bin/python -m pip install -r requirements.txt
```

Adjust the interpreter invocation if your Python executable lives elsewhere; the `make backend` target performs the same steps automatically.
