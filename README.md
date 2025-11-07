# Furniture App

Lühike juhend arendamiseks ja sagedasemate probleemide lahendamiseks.

## Kiired sammud (dev)
1. Paigalda sõltuvused:
   - npm install
2. Käivita Expo:
   - npx expo start
   - või puhasta cache: npx expo start -c

## Failistruktuuri olulisemad osad
- app/
  - (auth)/ — Login/Signup rout'id (pane failid täpselt siia: `app/(auth)/Signup/index.jsx`, `app/(auth)/Login/index.jsx`)
  - (tabs)/ — peamised vaated (Home, Favorites, Profile)
  - splash/index.jsx — splash ekraan
  - productdetails/index.jsx — toote detailid
  - My-Listings/ — kasutaja kuulutused (edit-listing/[id].jsx)
  - hooks/useProducts.js — HTTP päringu hook (näide fakestoreapi kasutamiseks)
  - (context)/ — Auth, Favorites, Listings context-id

## API / andmete laadimine
Hook näidis (salvesta `app/hooks/useProducts.js`):
- hook laadib andmed `https://fakestoreapi.com/products`
- tagastab: `{ products, loading, error, refresh }`

Kasutus näites: importida suhtelise teega `import useProducts from '../hooks/useProducts'` või `import useProducts from '@/hooks/useProducts'` vaid kui alias on seadistatud.

## Levinumad vead ja lahendused

- "Cannot find module '@/hooks/useProducts'":
  - Kasuta suhtelist importi või sea üles `@` alias (tsconfig.json + Metro/webpack).
  - Näide tsconfig.json:
    ```json
    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": { "@/*": ["app/*"] }
      }
    }
    ```
  - Pärast muudatusi taaskäivita VSCode/Expo.

- "No route named '(auth)/Signup'":
  - Kontrolli, et olemas on fail `app/(auth)/Signup.jsx` või .
  - Router failirajast sõltub — tee failinimi täpselt nii, nagu route'e kutsutakse.

- Splash ei ilmu:
  - Veendu, et  on olemas.
  - Kontrolli Root layouti `initialRouteName` ja et navigeerimist ei suunata kohe mujale.

- "Platform is not defined":
  - Lisa import: `import { Platform } from 'react-native'`.

- Topelt header/ülearune header My Listings peal:
  - Peida automaatne header ekraanil: lisa faili ülaossa:
    ```js
    export const options = { headerShown: false };
    ```

- Edit listing `Cannot read property 'id' of undefined`:
  - Kasuta  või `useSearchParams()` ja lisa kaitsed.
  - Kontrolli, et  context on laetud enne  kutsumist.

- Favorites ei kuva:
  - Veendu, et `useProducts` tagastab product objektidel õiged väljad (, `name` või , `image`, ).
  - Kontrolli, et `favorites` on massiiv ja id tüübid ühtivad (String vs Number).

- Image ei lae (`@/assets/...`):
  - Kasuta suhtelist teed `require('../../assets/images/opening_image.png')` või seadista `@` alias.

- Hoiatus: `props.pointerEvents is deprecated`:
  - Kasuta stiilis  kui vaja.

## Kasulikud näited

- Peida header ühel ekraanil:
  ```js
  // app/My-Listings/index.jsx
  export const options = { headerShown: false };
