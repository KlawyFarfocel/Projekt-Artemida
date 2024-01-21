# Projekt-Artemida
Aplikacja do zarządzania Polskim Związkiem Łowieckim dla Małopolski

## Skład Projektu
 - Maciej Śmierciak -> React.js
 - Michał Jonak -> Laravel/NySQL

## Wymagania
- Zainstalowane następujące elementy
  - PHP
  - Node.js
  - Composer
  - npm
  - Serwer MySql
## Sposób uruchamiania projektu
    1. Zaimportować bazę MySQL – plik artemida.sql znajduje się w  głównym katalogu projektu
    2. Otworzyć terminal i w katalogu głównym wydać polecenie „composer install”, by doinstalować zależności PHP
    3. Również w katalogu głównym wydać polecenie „php artisan serve”, by uruchomić serwer Laravela
    4. Otworzyć drugi terminal, przejść do katalogu „react” i wydać polecenie „npm install”, by doinstalować wszystkie niezbędne zależności javascriptowe
    5. W drugim terminalu, w folderze „react”, wydać polecenie „npm run dev”, by uruchomić serwer React
    6.	Uruchomić serwer MySQL

### Dostęp do aplikacji
Po wykonaniu powyższych kroków, aplikacja będzie dostępna pod adresem http://localhost:3000
