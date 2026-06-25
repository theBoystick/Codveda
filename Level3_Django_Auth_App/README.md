# Django Task Manager - Advanced Authentication App

## 📋 Aperçu
Application Django avancée de gestion de tâches avec système d'authentification complet incluant :
- ✅ Inscription utilisateur avec validation
- ✅ Connexion/Déconnexion sécurisée
- ✅ Réinitialisation de mot de passe par email
- ✅ Gestion complète des tâches (CRUD)
- ✅ Profils utilisateur avec avatar
- ✅ Dashboard avec statistiques
- ✅ Filtrage et recherche de tâches

## 🎯 Objectifs réalisés
- ✅ Authentification utilisateur robuste
- ✅ Modèles Django avec relations (OneToOne, ForeignKey)
- ✅ Vues protégées avec @login_required
- ✅ Validation de formulaires côté serveur
- ✅ Gestion des messages flash
- ✅ Templates HTML réutilisables

## 🛠️ Installation

### 1. Créer un environnement virtuel
\`\`\`bash
python -m venv venv
venv\\Scripts\\activate
\`\`\`

### 2. Installer les dépendances
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 3. Configuration initiale
\`\`\`bash
# Appliquer les migrations
python manage.py migrate

# Créer un superutilisateur
python manage.py createsuperuser

# Collecter les fichiers statiques
python manage.py collectstatic
\`\`\`

### 4. Lancer le serveur
\`\`\`bash
python manage.py runserver
\`\`\`

Accéder à : http://localhost:8000

## 📁 Structure du projet
\`\`\`
Level3_Django_Auth_App/
├── requirements.txt       # Dépendances Python
├── settings.py            # Configuration Django
├── urls.py                # Routage
├── views.py               # Logique métier
├── models.py              # Modèles de base de données
├── wsgi.py                # WSGI application
├── templates/             # Templates HTML
│   ├── base.html         # Template parent
│   ├── home.html         # Page d'accueil
│   ├── login.html        # Formulaire de connexion
│   ├── register.html     # Formulaire d'inscription
│   ├── dashboard.html    # Dashboard utilisateur
│   ├── task_list.html    # Liste des tâches
│   ├── task_form.html    # Formulaire de tâche
│   └── password_reset.html
├── static/                # CSS, JS statiques
└── media/                 # Avatars utilisateurs
\`\`\`

## 🔐 Fonctionnalités d'authentification

### Inscription
- Validation des mots de passe (min 8 caractères)
- Confirmation du mot de passe
- Vérification de l'unicité du nom d'utilisateur
- Email requis

### Connexion
- Authentification par username/password
- Redirection automatique au dashboard
- Messages de bienvenue

### Réinitialisation de mot de passe
- Email de confirmation
- Token sécurisé
- Nouvelle page de connexion après réinitialisation

## 📊 Gestion des tâches

### Modèle Task
- **Titre** : Requis
- **Description** : Optionnel
- **Statut** : À faire, En cours, Complétée
- **Priorité** : Basse, Moyenne, Élevée
- **Date limite** : Optionnel
- **Propriétaire** : Lié à l'utilisateur

### Opérations CRUD
- Créer, lire, mettre à jour, supprimer
- Filtrage par statut et priorité
- Recherche par titre/description
- Marquage rapide comme complétée

## 🎨 Design
- Interface responsive et moderne
- Formulaires avec validation
- Messages flash pour feedback utilisateur
- Dashboard avec statistiques en temps réel

## 📝 Exemples d'utilisation

### Créer une tâche
1. Se connecter
2. Aller à "Créer une tâche"
3. Remplir titre, description, priorité
4. Soumettre

### Réinitialiser le mot de passe
1. Aller à la page login
2. Cliquer sur "Mot de passe oublié?"
3. Entrer l'email
4. Suivre le lien dans l'email
5. Créer un nouveau mot de passe

## 🔒 Sécurité
- Hachage des mots de passe avec PBKDF2
- Protection CSRF sur tous les formulaires
- Vérification des permissions sur les tâches
- Validation côté serveur obligatoire

## 📦 Dépendances principales
- Django 4.2.0
- Django REST Framework 3.14.0
- python-dotenv pour variables d'environnement
- Pillow pour la gestion des images

## 🚀 Prochaines étapes possibles
- Intégration d'une API REST complète
- Notifications email avancées
- Système de partage de tâches
- Application mobile
- Tests unitaires complets
