# Évaluation continue : version GitHub + Firebase

## 1. Créer le projet Firebase (gratuit)
1. Allez sur https://console.firebase.google.com → **Ajouter un projet**.
2. **Build → Authentication → Commencer → Adresse e-mail/Mot de passe → Activer**.
3. **Build → Firestore Database → Créer une base de données** (mode production, région proche).
4. Onglet **Règles** : collez ceci puis **Publier** :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/students/{id} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
5. **Paramètres du projet (⚙️) → Vos applications → </> Web** : enregistrez l'app, puis copiez `apiKey`, `authDomain`, `projectId`, `appId`.
6. Collez ces valeurs dans `firebase-config.js`.
7. **Authentication → Paramètres → Domaines autorisés → Ajouter** : `VOTRE-NOM.github.io`.

## 2. Mettre sur GitHub
Déposez `index.html` et `firebase-config.js` dans le dépôt, puis **Settings → Pages → Branch main / root**.

## 3. Utiliser
Ouvrez le site, **⚙️ Enregistrement automatique → créez un compte** (e-mail + mot de passe), puis utilisez le même compte sur chaque appareil.
Les données de chaque compte sont isolées par les règles ci-dessus.
