import { Box, List, ListItem, Typography } from "@mui/material"

export default function CGU() {
  return (
    <Box
      sx={{
        color: "white",
        padding: "20px",
        backgroundColor: "#333333",
        textAlign: "justify",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{ fontSize: "2rem" }}
        gutterBottom
      >
        Conditions Générales d'Utilisation (CGU)
      </Typography>
      <Typography
        variant="subtitle2"
        align="center"
        sx={{ fontSize: "1rem", pb: 2 }}
        gutterBottom
      >
        Date de dernière mise à jour : 18/09/2025
      </Typography>
      <Box sx={{ fontSize: "1rem", pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Article 1 - Objet
        </Typography>
        <Typography sx={{ fontSize: "1rem", pb: 1 }}>
          Les présentes Conditions Générales d'Utilisation (ci-après les « CGU
          ») ont pour objet de définir les règles et modalités de mise à
          disposition des services du site internet GamerChallenges.com ainsi
          que de définir les droits et obligations des utilisateurs dans le
          cadre de son utilisation.
        </Typography>
        <Typography sx={{ fontSize: "1rem", pb: 2 }}>
          Le Site est une plateforme communautaire permettant aux utilisateurs
          de poster, partager et consulter des réalisations issues de défis de
          jeux vidéo (ci-après les « Contenus »). Toute utilisation du Site
          implique l'acceptation sans réserve des présentes CGU par
          l'utilisateur.
        </Typography>
      </Box>

      <Box sx={{ fontSize: "1rem", pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Article 2 - Mentions légales
        </Typography>
        <Typography>
          Le Site Gamer Challenges est édité par : Team Gamer Challenges
        </Typography>
        <Typography>Éditeur : Gamer Challenges</Typography>
        <Typography>Forme juridique : SAS GAMER CHALLENGES </Typography>
        <Typography>Adresse : TSA 75150 PARIS</Typography>
        <Typography>Adresse e-mail : contact@GamerChallenges.com</Typography>
        <Typography>Directeur de la publication : [TEAM OCLOCK]</Typography>
        <Typography>Hébergeur : OVH</Typography>
        <Typography>Adresse : [ MIC 75]</Typography>
        <Typography sx={{ fontSize: "1rem", pb: 2 }}>
          Téléphone : [0143762868]
        </Typography>
      </Box>
      <Box sx={{ fontSize: "1rem", pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Article 3 - Définitions
        </Typography>
        <Typography>
          <strong>Utilisateur :</strong> toute personne accédant et naviguant
          sur le Site.
        </Typography>
        <Typography>
          <strong>Membre :</strong> tout Utilisateur inscrit sur le Site et
          disposant d'un compte personnel.
        </Typography>
        <Typography>
          <strong>Contenu :</strong> toute réalisation, capture d'écran, vidéo,
          texte, commentaire ou tout autre élément publié par un Membre sur le
          Site.
        </Typography>
        <Typography>
          <strong>Compte :</strong> l'ensemble des informations fournies par le
          Membre lors de son inscription et permettant son identification et son
          accès à des services réservés aux Membres.
        </Typography>
      </Box>

      <Box sx={{ fontSize: "1rem", pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Article 4 - Accès au Site et Inscription
        </Typography>

        <Typography>
          L'accès à la simple consultation du Site est libre et gratuit. En
          revanche, la publication de Contenus nécessite la création d'un
          Compte.
        </Typography>
        <Typography>Pour s'inscrire, le Membre doit :</Typography>
        <List>
          <ListItem>
            - Être une personne physique âgée d'au moins 13 ans. Les mineurs de
            13 à 18 ans déclarent avoir obtenu l'autorisation préalable de leur
            représentant légal.
          </ListItem>
          <ListItem>
            - Fournir des informations exactes, complètes et à jour lors de son
            inscription (notamment un pseudonyme, une adresse e-mail valide et
            un mot de passe).
          </ListItem>
          <ListItem>
            - Ne pas créer de compte pour le compte d'un tiers sans son
            autorisation.
          </ListItem>
        </List>
        <Typography>
          Le Membre est seul responsable de la confidentialité de son
          identifiant et de son mot de passe. Toute action réalisée à partir de
          son Compte est présumée être effectuée par lui-même.
        </Typography>
      </Box>
      <Box sx={{ fontSize: "1rem", pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {" "}
          Article 5 - Propriété intellectuelle{" "}
        </Typography>
        <Typography>
          <strong>5.1. Contenus de l'Éditeur</strong> <br />
          Tous les éléments constitutifs du Site (logos, textes, graphismes,
          logiciels, etc.) sont la propriété exclusive de l'Éditeur ou de ses
          partenaires et sont protégés par le droit d'auteur, le droit des
          marques et le droit des bases de données.
        </Typography>
        <Typography>
          <strong>5.2. Contenus des Membres</strong> <br />
          En publiant un Contenu sur le Site, le Membre garantit être le
          titulaire des droits de propriété intellectuelle sur ledit Contenu ou
          en avoir obtenu toutes les autorisations nécessaires.
        </Typography>
        <Typography>
          En publiant son Contenu, le Membre concède à l'Éditeur une licence non
          exclusive, gratuite, mondiale et pour toute la durée de protection des
          droits, lui permettant de reproduire, stocker, adapter, traduire,
          diffuser et représenter le Contenu sur le Site et sur les réseaux
          sociaux associés, à des fins de promotion et de fonctionnement de la
          plateforme.
        </Typography>
        <Typography>
          Le Membre conserve l'intégralité de ses droits de propriété
          intellectuelle sur ses propres Contenus.
        </Typography>
      </Box>

      <Box sx={{ fontSize: "1rem", pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Article 6 - Engagements et responsabilité des Membres{" "}
        </Typography>
        <Typography>Le Membre s'engage à :</Typography>
        <List>
          <ListItem>
            - Respecter les lois et règlements en vigueur en France.
          </ListItem>
          <ListItem>
            - Ne publier que des Contenus dont il est l'auteur ou pour lesquels
            il détient les droits.
          </ListItem>
          <Typography>Ne pas publier de Contenus :</Typography>
        </List>
        <List>
          <ListItem>
            - Contrefaisants, illicites, diffamatoires, injurieux, obscènes,
            pornographiques, pédopornographiques, haineux, incitant à la
            violence ou à la discrimination.
          </ListItem>
          <ListItem>
            - Portant atteinte à la vie privée ou à l'image d'autrui.
          </ListItem>
          <ListItem>
            - À caractère commercial ou publicitaire non sollicité (spam).
          </ListItem>
          <ListItem>
            - Contenant des virus ou tout logiciel destiné à endommager ou
            intercepter des données.
          </ListItem>
        </List>
        <Typography>
          Respecter les droits de propriété intellectuelle des éditeurs de jeux
          vidéo. Le Site est un lieu de partage de réalisations personnelles et
          non de piratage ou de partage de contenu illicite (jeux crackés,
          etc.). Tout manquement à ces engagements pourra entraîner, sans
          préavis, la suppression du Contenu concerné et/ou la suspension ou la
          résiliation du Compte du Membre, sans préjudice de toute action
          judiciaire pouvant être engagée.
        </Typography>
      </Box>

      <Box sx={{ fontSize: "1rem", pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {" "}
          Article 7 - Modération{" "}
        </Typography>
        <Typography>
          L'Éditeur se réserve le droit de modérer a posteriori tout Contenu
          publié par un Membre. L'Éditeur peut, à sa seule discrétion, refuser,
          modifier ou retirer tout Contenu qui contreviendrait aux présentes
          CGU, sans avoir à en justifier la raison auprès du Membre.
        </Typography>
        <Typography>
          Les Membres sont invités à signaler tout Contenu non conforme à
          l'adresse suivante : [Adresse e-mail de signalement].
        </Typography>
      </Box>
      <Box sx={{ fontSize: "1rem", pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {" "}
          Article 8 - Données personnelles{" "}
        </Typography>
        <Typography>
          Les données personnelles collectées sur le Site sont traitées
          conformément au Règlement Général sur la Protection des Données (RGPD)
          et à la loi Informatique et Libertés.
        </Typography>
        <Typography>
          L'Éditeur collecte des données pour la gestion des Comptes, la
          modération et l'amélioration du service. Les données collectées sont
          destinées à l'usage exclusif de l'Éditeur et ne sont en aucun cas
          vendues à des tiers.
        </Typography>
        <Typography>
          Conformément à la réglementation, tout Membre dispose d'un droit
          d'accès, de rectification, d'opposition et de suppression des données
          le concernant. Pour exercer ces droits, il peut contacter l'Éditeur à
          l'adresse : [contact@gamerchallenges.com ].
        </Typography>
      </Box>
      <Box sx={{ fontSize: "1rem", pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {" "}
          Article 9 - Responsabilité de l'Éditeur
        </Typography>

        <Typography>
          L'Éditeur s'efforce d'assurer un accès au Site 24h/24 et 7j/7, mais ne
          peut garantir une disponibilité et une continuité de service
          parfaites. Il se réserve le droit d'interrompre l'accès pour des
          raisons de maintenance ou de mise à jour. L'Éditeur ne peut être tenu
          responsable : Des Contenus publiés par les Membres, dont ils sont les
          seuls responsables. D'éventuels préjudices directs ou indirects
          résultant de l'utilisation du Site. Des problèmes techniques
          indépendants de sa volonté (ex : panne de réseau, virus).
        </Typography>
      </Box>
      <Box sx={{ fontSize: "1rem", pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {" "}
          Article 10 - Évolution des CGU
        </Typography>
        <Typography>
          L'Éditeur se réserve le droit de modifier à tout moment les présentes
          CGU. Les nouvelles CGU seront applicables dès leur mise en ligne. Tout
          Membre qui continue à utiliser le Site après la publication des
          nouvelles CGU est réputé les avoir acceptées sans réserve.
        </Typography>
      </Box>
      <Box sx={{ fontSize: "1rem", pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Article 11 - Loi applicable et juridiction compétente
        </Typography>
        <Typography>
          Les présentes CGU sont régies par le droit français. En cas de litige,
          et après une tentative de résolution amiable, les tribunaux français
          seront seuls compétents.
        </Typography>
        <Typography align="center" sx={{ pt: 3, pb: 3 }}>
          Pour plus d'informations, veuillez nous contacter.
        </Typography>
      </Box>
    </Box>
  )
}
