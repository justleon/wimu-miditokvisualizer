# WIMU-MidiTokVisualizer

MidiTok Visualizer to aplikacja webowa pozwalająca na wizualizację tokenizacji plików MIDI przez bibliotekę MidiTok.

Pozwala na:
- wgranie pliku MIDI z urządzenia
- wybranie tokenizera i jego parametrów
- przegląd wyodrębnionych tokenów w formacie przyjaznym dla użytkownika
- przegląd metryk symbolicznych (takich jak klucz, metrum, tempo) na podstawie MIDI

### Proces developerski

W celu zachowania zasad clean code, przed wrzuceniem commita na brancha, zaleca się wykonanie pre-commita. Aby uruchomić pre-commit, należy użyć komendy:

```
cd backend
pre-commit run --all-files
```

W skład skryptu pre-commit wchodzą:

- black (formatowanie)
- ruff (linting)
- isort (sortowanie importów)
- mypy (weryfikacja typowania)

### Budowanie i uruchamianie aplikacji

#### Aplikacja frontendowa

Podstawowe uruchamianie aplikacji:

```
cd frontend
npm install
npm run dev
```

Uruchamianie aplikacji przy pomocy Dockera:

```
cd frontend
docker build . -t frontend
docker run frontend -p 3000:3000
```

#### Aplikacja backendowa

Podstawowe uruchamianie aplikacji:

```
cd backend
poetry shell
poetry install
python -m core.main
```

lub

```
poetry run python -m core.main
```

Uruchamianie aplikacji przy pomocy Dockera:

```
cd backend
DOCKER_BUILDKIT=1 docker build --target=runtime . -t backend
docker run backend -p 8000:8000
```

#### Docker Compose

Możliwe jest również uruchomienie całego projektu przy użyciu Docker Compose:

```
docker-compose up --build
```

### Testowanie aplikacji

#### Aplikacja frontendowa

Testy jednostkowe uruchamiane są przy użyciu *jest*:

```
cd frontend
npm install
npm run test
```

### Aplikacja backendowa

Testy jednostkowe uruchamiane są przy użyciu *pytest*:

```
poetry shell
poetry install
pytest
```

lub:

```
poetry run pytest
```

### Logi

Zaimplementowano *middleware* na bazie *starlette*, który przy użyciu modułu *logging* tworzy logi dla każdego zapytania do serwera. Pojedynczy wpis w logach zawiera podstawowe dane dla pojedynczego zapytania oraz odpowiedzi serwera, jak również czas przetwarzania zapytania. Domyślnie logi zapisywane są do pliku *logfile.log*.

### Deployment

Obie aplikacje są hostowane na Heroku. Aplikacja frontendowa jest dostępna pod adresem: [https://wimu-frontend-ccb0bbc023d3.herokuapp.com](https://wimu-frontend-ccb0bbc023d3.herokuapp.com)
