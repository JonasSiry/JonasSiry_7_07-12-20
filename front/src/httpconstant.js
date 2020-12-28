// Ici on importe le plugin axios qui va servir pour toutes nos requêtes HTTP,
// on a un fichier env dans lequel on garde le lien vers le backend,
// ce n'est pas si secret, surtout en localhost mais c'est pour avoir une bonne habitude de sécurité.

import axios from 'axios'
import {BACKEND_HOST} from './.env';

const HTTP = axios.create({ baseURL: BACKEND_HOST });

export {
    HTTP,
  }