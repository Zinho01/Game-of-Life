# Game-of-Life

Conway's Game of Life is een simulatie van cellulaire automaten, uitgevonden door de wiskundige John Conway in 1970. Het is een Multispeler-spel waarin de evolutie van cellen wordt bepaald door hun omgeving volgens een paar eenvoudige regels. Dit project bevat een interactieve versie van het spel met de volgende functionaliteiten: Clear, Random, Start, Pause, en Restart.

## Inhoudsopgave

1. [Installatie](#installatie)
2. [Hoe te gebruiken](#hoe-te-gebruiken)
3. [Functies](#functies)
4. [Spelregels](#spelregels)

## Installatie

1. Clone deze repository naar je lokale machine:
    ```bash
    git clone https://github.com/Zinho01/Game-of-Life.git
    ```

2. Navigeer naar de projectmap:
    ```bash
    cd Game-of-Life
    ```

3. open de html via vscode live sever

## Hoe te gebruiken

Bij het starten van het programma verschijnt een raster op het scherm dat de spelwereld vertegenwoordigt. De cellen in het raster kunnen zich in twee toestanden bevinden: levend of dood.

### Besturingselementen

- **Clear**: Verwijdert alle levende cellen van het raster en reset het spel naar een lege staat.
- **Random**: Vult het raster met een willekeurige configuratie van levende en dode cellen.
- **Start**: Start de simulatie, waardoor de cellen beginnen te evolueren volgens de spelregels.
- **Pause**: Pauzeert de simulatie, waardoor de huidige staat van het spel bewaard blijft.
- **Restart**: Herstart het spel met de laatst opgeslagen configuratie.

## Functies

- **Interactief raster**: Klik op individuele cellen om hun toestand (levend/dood) handmatig te wijzigen.
- **Dynamische simulatie**: Bekijk de evolutie van cellen in real-time.
- **Gebruiksvriendelijke interface**: Besturing via knoppen en muisklikken.

## Spelregels

Conway's Game of Life volgt vier eenvoudige regels:

1. **Overbevolking**: Een levende cel met meer dan drie levende buren sterft.
2. **Isolement**: Een levende cel met minder dan twee levende buren sterft.
3. **Levensvatbaarheid**: Een levende cel met twee of drie levende buren blijft leven.
4. **Voortplanting**: Een dode cel met precies drie levende buren wordt levend.

Bit Academy deepdive
