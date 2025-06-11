<h1 align="center" id="title">JustPizza</h1>

<p align="center">Projekt aplikacji webowej do zamawiania pizzy, oferujący intuicyjny konfigurator, automatyczny koszyk i system zbierania opinii od klientów.</p>

---

## 📸 Zrzuty ekranu projektu

<p align="center">
  <img src="images/landingpage.png" alt="Zrzut ekranu projektu 1" width="450">
  &nbsp; &nbsp; &nbsp; &nbsp;
  <img src="images/menu.png" alt="Zrzut ekranu projektu 2" width="450">
</p>

---

## ✨ Kluczowe Funkcje

* **Automatyczny Koszyk:** Bezproblemowe dodawanie i zarządzanie produktami w koszyku.
* **Intuicyjny Konfigurator Pizzy:** Prosty i przyjazny dla użytkownika interfejs do tworzenia własnej pizzy.
* **Strona z Feedbackiem:** Dedykowana sekcja do zbierania opinii i sugestii od klientów.

---

## 🚀 Jak uruchomić projekt lokalnie?

Aby uruchomić projekt JustPizza na swoim komputerze, wykonaj poniższe kroki.

### Wymagania

Upewnij się, że masz zainstalowane:
* **Node.js** (zalecana wersja LTS)
* **npm** (zazwyczaj instalowany razem z Node.js)

### Klonowanie Repozytorium

1.  **Sklonuj repozytorium:**
    Otwórz terminal i sklonuj projekt na swój komputer:
    ```bash
    git clone [https://github.com/funes781/JustPizza.git](https://github.com/funes781/JustPizza.git)
    ```

2.  **Przejdź do katalogu projektu:**
    ```bash
    cd JustPizza
    ```

### Instalacja zależności

1.  **Zainstaluj wszystkie wymagane moduły:**
    Przejdź do katalogu głównego projektu w terminalu i uruchom:
    ```bash
    npm install
    ```
    To polecenie zainstaluje wszystkie zależności wymienione w pliku `package.json`.

### Uruchomienie aplikacji

1.  **Uruchom projekt w trybie deweloperskim:**
    Po zainstalowaniu zależności, możesz uruchomić aplikację w trybie deweloperskim, który pozwala na podgląd zmian na bieżąco:
    ```bash
    npm start
    ```
    Aplikacja zostanie uruchomiona na adresie `http://localhost:3000` (lub innym dostępnym porcie, jeśli 3000 jest zajęty).

2.  **Zbudowanie projektu do wdrożenia (opcjonalnie):**
    Jeśli chcesz przygotować projekt do produkcyjnego wdrożenia, możesz zbudować jego zoptymalizowaną wersję:
    ```bash
    npm run build
    ```
    Spowoduje to utworzenie folderu `build` z gotowymi plikami statycznymi.
