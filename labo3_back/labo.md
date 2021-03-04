### Labo n°3 Gestion de stock
Notre application doit être capable de gérer une collection de produits.

Différents utilisateurs vont intéragir avec l'application.

> ## Description

Vous allez devoir construire un système de gestion de stock qui va se composer<br>
 - d'un back-end connecté à une base de données de votre choix
 - d'une application front-end Angular qui servira d'interface avec l'utilisateur
 
 #### Back End
 Créer une Api Rest Service qui va exposer des urls via des requêtes Http.
 L'architecture doit être soignée avec l'organisation en package.
 La couche Modèle doit être complète
 - Entités
 - DTOS
 - Mapper
 - Repositories
 - Services
 - ...
 
 Le crud des entités principales du projet doit être implémentées.
 
 On doit pouvoir faire des recherches sur les produits et utilisateurs
 
 On doit aussi prévoir de la pagination pour l'affichage des produits
 
Un gestionnaire des exceptions doit être configuré (`@ControllerAdvice`)

#### Front End

Utilisation d'un template CSS de votre choix

Vous devez prévoir la logique pour gérér
- un espace utilisateur
- un affichage type master / detail de produits
- une recherche sur les produits
- Un système de d'authentification
- Un panier qui permet la création de commandes


> ## Entités

Le `produit` est caractérisé par
- un identifiant unique
- un nom
- une image
- une description (facultative)
- une ou plusieurs `catégorie`
- une date d'entrée du produit
- une date de mise à jour du produit
- une date de péremption (en fonction du type de produit)
- un prix d'achat
- une TVA
- une quantité
- un `historique` de mises à jour
- un `fournisseur`

L'`historique` doit maintenir
- un prix
- une date
- l'utilisateur qui à opérer une modification sur le produit

Un `fournisseur` est caractérisé par
- un id
- un nom d'entreprise
- statut social de l'entreprise
- secteur d'activité
- dates d'insertion / mise à jour
- Listes des produits qu'ils proposent

Chaque `utilisateur` est caratérisé par
- un id
- un nom / société
- un prénom
- un avatar
- un niveau d'accès (enum)
  - Client
  - Gérant / Employé
  - Administrateur
- un pseudo
- un mot de passe
- une adresse
- une liste de commandes (s'il est client)

Chaque `commande` est caractérisée par
- un id
- une reference
- une date de création
- une liste de produits
un prix total calculé par rapport à la liste de produits (dans le dto)
- est payée
- moyen de paiement
- l'utilisateur qui à passer la commande

