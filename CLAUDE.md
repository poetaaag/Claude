# giuliadalbon.com — contexte de travail

Ce fichier est lu automatiquement par Claude Code au démarrage.
Le placer à la racine du dossier du site.

---

## Le projet

Site vitrine de Giulia Dal Bon, peintre et muraliste formée à l'Accademia di Belle Arti di Brera, installée à Menton. Elle vend des fresques murales sur commande et des ateliers de peinture.

**Objectif unique du site : qu'une personne qui veut une fresque murale trouve Giulia et la contacte.** Référencement Google et citation par les LLM.

205 pages, trois langues : italien à la racine, français sous `/fr/`, anglais sous `/en/`. Hébergé sur Netlify.

---

## Règles de travail, non négociables

1. **Décrire précisément chaque modification avant de coder.** Attendre le oui, le non ou les corrections. Ne jamais coder sans qu'il sache exactement ce qui va être fait.
2. **Aucune phrase d'ambiance vide.** Interdit : "la peinture peut ouvrir l'air d'une pièce", "un langage mural adapté à l'atmosphère". Uniquement des faits utiles et des mots-clés.
3. **Le haut de page reste propre**, centré sur "Contacter Giulia". Tout le contenu SEO va en bas de page.
4. **Jamais de temps de trajet ni de distance depuis Menton.** Ça freine le client lointain. Mettre en avant qu'elle se déplace très facilement, partout.
5. **Mobile first.** Le CSS a 225 règles en `min-width` contre 118 en `max-width`. Toute modification desktop dans un `@media (min-width: 980px)`. Le mobile ne doit jamais bouger.
6. **Ne pas changer la police ni la typographie** sans demande explicite.
7. **Un seul changement visuel à la fois**, puisque seule sa vérification à l'écran fait foi.
8. **Ne rien livrer qui n'a pas été demandé.**

---

## Tarifs

Grille validée par Giulia. Le prix dépend de la complexité du dessin, pas du client.

| Type de dessin | Prix |
|---|---|
| Motif simple, floral, botanique | 150 € / m² |
| Motif détaillé, figuratif | 250 € / m² |
| Trompe-l'œil, plafond, faux marbre | 350 € / m² |
| Façade extérieure | 150 € / m² + échafaudage |

**Pas de minimum de commande.** "Devis gratuit sous 48h, sans engagement" doit accompagner tout affichage de prix.

Les prix sont centralisés dans le bloc `pricing` de `assets/site-config-v154.js`, rendus par `renderPricing()` dans `assets/script-v170.js`.

---

## Ce que Giulia veut

Elle a peu de commandes. Elle veut travailler, y compris sur de petits projets et pour des gens aux budgets modestes. Les clients aisés doivent payer correctement, ce que la grille au m² assure naturellement.

Elle se déplace partout. Le client offre en général l'hébergement et paie le voyage. Ce qui compte pour elle : voyager, rencontrer des gens qui veulent sa peinture, vivre de son art.

---

## Mots-clés

Le même service porte plusieurs noms. Une page qui n'en contient qu'un se coupe des autres requêtes.

**Italien.** Piège : "murales" seul renvoie au street art. Il faut aussi `decorazione pareti`, `dipinti murali`, `pittura murale`, `murales su commissione`, `trompe l'oeil`, `affresco`, `preventivo`, `quanto costa un murales`.

**Français.** `fresque murale`, `peinture murale`, `muraliste`, `décor mural`, `décoration murale`, `peinture décorative`, `trompe-l'œil`, `devis`, `prix au m²`, `combien coûte`.

**Anglais.** `mural`, `wall mural`, `hand-painted wall`, `wall painting`, `decorative painting`, `trompe-l'oeil`, `quote`, `how much`.

Dans les trois langues, **la requête qui convertit est le prix**.

---

## État du référencement

Le site ressort **premier sur Google pour "fresque murale menton"** et deuxième sur "fresque murale Côme". La base fonctionne.

Sept articles de presse parlent d'elle pour la fresque de plus de 20 mètres dédiée à Gaber et Jannacci, au Circolo Cerizza à Milan : Il Giorno, Artuu, MilanoToday, Mentelocale, Revenews, Giornale di Segrate, Libero. **Aucun ne renvoie vers le site.** Ils sont déclarés en `sameAs` et `subjectOf` dans le JSON-LD.

---

## Fait

- Correctifs techniques : duplication d'URL avec et sans `.html` via `netlify.toml`, `serviceType` réparé sur 135 pages, `getPageLang()` qui ne renvoyait jamais "en", `areaServed`
- Entité résolue : `ProfessionalService` avec adresse et géo, `@id` stable, presse liée
- Bloc SEO en bas de 117 pages : prix, supports, lieux, FAQ, le tout en JSON-LD, 9 questions par page
- 497 paragraphes réécrits sur les pages villes, mots-clés multipliés par 3,6, volume de texte en hausse de 60 %
- 24 pages Côte d'Azur créées : Èze, Villefranche, Saint-Paul-de-Vence, Vence, Mougins, Grasse, Cap-d'Ail, Beausoleil
- 117 meta descriptions uniques avec prix et devis
- 639 attributs `width` et `height` ajoutés aux images
- `llms.txt` à la racine

---

## Ce qui reste, par ordre

1. **97 chapôs au-dessus des trois cartes**, jamais réécrits, encore pleins de phrases vides. Ils sont dans un `<div class="info-card">` avec un `<p>` sans classe, c'est pour ça qu'ils sont passés à travers.
2. **La question "Quand peut-on peindre à X ?"** est inutile. La remplacer par l'angle des fêtes et spécialités locales, qui donne une date butoir au client : Fête du Citron à Menton, Festival à Sanremo, Foire de la truffe blanche à Alba, Salone del Mobile à Milan, Biennale à Venise.
3. **59 pages françaises ont perdu leurs accents** dans le bloc SEO : "facades", "hotels", "l'annee".
4. **41 pages usages jamais touchées** : maison et villa, hôtel et boutique, restaurant et café, chambre d'enfant, façades, plafonds et escaliers, bureaux et showrooms, architectes d'intérieur. 21 contiennent des phrases vides et **aucune n'affiche de prix**. C'est probablement le plus gros gisement de trafic non exploité.
5. **Une page prix par langue** : `quanto costa un murales`, `prix fresque murale`, `how much does a mural cost`. Tous les concurrents l'ont, le site n'a rien.
6. **Nouvelles villes.** D'abord les dix déjà citées comme proches sans avoir leur page : Lecco, Santa Margherita Ligure, Cagnes-sur-Mer, Menaggio, Juan-les-Pins, Valbonne, Asti, Mondovì, Ramatuelle, Lugano. Puis la priorité 1 du fichier des 76 villes UE.
7. **Ouverture de `/es/` puis `/de/`.**

Hors code : demander les backlinks aux sept rédactions, inscrire le site sur Bing Webmaster Tools, créer un élément Wikidata.

---

## Pièges découverts, à ne pas répéter

**La typographie du titre est attachée à `.local-hero-copy`.** Sortir le `<h1>` de ce conteneur lui fait perdre toutes ses règles de largeur et d'interligne, et le rendu devient méconnaissable. Si un jour il faut scinder ce bloc, les deux morceaux doivent conserver la classe `local-hero-copy`.

**Ne pas empiler les correctifs CSS.** Une règle rendant la photo collante, écrite dans une version précédente, s'est superposée à une règle de grille écrite ensuite, et les deux blocs se chevauchaient. Toujours annuler explicitement l'ancienne règle avant d'en écrire une nouvelle.

**Un contrôle qualité basé sur une liste de mots ne sert à rien.** Il ne trouve que ce qu'on lui a dit de chercher. Pour détecter les textes vides, relever **tous** les paragraphes du site et les trier, sans liste préétablie.

**Ne jamais dire "vérifié" pour du visuel sans avoir vu le rendu.** Vérifier que la règle CSS est présente ne prouve pas que l'affichage est bon.

---

## Contrôles à lancer après chaque modification

```bash
# JSON-LD valides sur les 205 pages
python3 -c "
import glob,re,json
bad=0
for f in glob.glob('**/*.html',recursive=True):
    s=open(f,encoding='utf-8',errors='ignore').read()
    for m in re.finditer(r'<script type=\"application/ld\+json\">(.*?)</script>',s,re.S):
        try: json.loads(m.group(1))
        except: bad+=1; print('KO',f)
print('JSON-LD invalides:',bad)"

# aucun prix perime, aucune mention de distance
grep -rl '450 €\|distance depuis\|distanza da' --include='*.html' . | head

# balises equilibrees
python3 -c "
import glob
for t in ['section','div','article','table']:
    a=sum(open(f,encoding='utf-8',errors='ignore').read().count('<'+t) for f in glob.glob('**/*.html',recursive=True))
    b=sum(open(f,encoding='utf-8',errors='ignore').read().count('</'+t+'>') for f in glob.glob('**/*.html',recursive=True))
    print(t,'OK' if a==b else 'DESEQUILIBRE')"
```

Mesure de spécificité : proportion de phrases de plus de 60 caractères qui n'apparaissent sur aucune autre page du même groupe linguistique. Cible minimale 30 %. Moyenne actuelle autour de 41 %.
