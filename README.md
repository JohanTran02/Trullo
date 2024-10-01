## 1. Motivera ditt val av databas

När jag började tänka på kraven över hur datan ska hanteras. Mängden data kan variera i objekten och exempelvis beskrivningar i uppgiftsobjekt kan vara kortare eller längre relativt till andra uppgifter. Dessutom krävs det inte att datan är lagrad på ett strukturerad sätt eftersom det jag vill är att bara hämta det jag behöver. Det är därför jag bestämde mig för att använda av MongoDB som är en NOSQL-databas och använder BSON(Binary Javascript Object Notation) för att spara datan som JSON-document. Till skillnad från MySQL som är en SQL-databas är datan utformad i tabeller, kolumner och rader som är relevant för att hantera data som är statiskta som exempelvis bankuppgifter.

## 2. Redogör vad de olika teknikerna (ex. verktyg, npm-paket, etc.) gör i applikationen

- ### NodeJS
  Det är en Javascript runtime environment som innehåller alla verktyg för att köra Javascript utanför webbläsaren och kod på server side.
- ### ExpressJS
  En web application framework som är till för att bygga RESTful APIs med Node.js
- ### TypeScript
  Ett programmeringspråk som är byggd på JavaScript som tillägger mer funktionalitet för att typa data.
- ### Mongoose
  Mongoose är en ODM(Object Data modeling) bibliotek för MongoDB och Node.js. Den är till för att hantera relationer mellan data, medför schemavalidering och används för att översätta mellan objekten i kod och representationen i MongoDB.
- ### JWT(JSON Web Token)
  Är till för att dela data mellan frontend och backend i form av krypterad JSON.
- ### BCrypt
  Npm-paket som används för password hashing och ser till att man inte lagrar sensitiv data i databasen.

## 3. Redogör översiktligt hur applikationen fungerar

Applikationen använder sig av RESTful APIs och efterliknar Trello vilket gör det möjligt att skapa olika projekt som innehåller flera uppgifter. Det går att skapa, ta bort och ändra uppgifter. Det gäller också för användare och beroende på vilka användarens behörighet som antingen är admin eller user begränsas resurser och information som syns. Applikationen använder sig av JWT för att implementera autentisering och behörigheter när man registrar eller loggar in.
