# Title: Http error handling decision

## Status

Proposed.

## Context

Pour toutes les erreurs d'entrées utilisateurs, on a besoin de déterminer comment les gérer.

## Decision

On renvoie le code d'erreur HTTP qui correspond le mieux et on renvoie une réponse dans le body qui est normalisée avec un format d'erreur spécifique.

{
    "err": "USERNAME_COLLISION",
    "field": "username"
}

## Consequences

What becomes easier or more difficult to do because of this change?

