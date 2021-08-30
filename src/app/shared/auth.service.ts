import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
      private fireAuth: AngularFireAuth,
      private router: Router
    ) {

    /**
     * Sempre que ele carregar o serviço de autenticação ele fará um subscribe na instancia do firebase
     * para verificar o estado da autenticação se o usuário esta logado, quando o token do usuário não for mais válido
     * ele sera retirado da sessão e será redirecionado para a página de login novamente;
     *
     * O que me garante que o usuário não acesse as rotas sem a autenticação são as Guardas de Rotas '/data-access'
     */
    this.fireAuth.authState.subscribe(user => {
      if (user && user.uid) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.clear();
        this.router.navigate(['login']);
      }
    });

  }

  async loginWithGoogle() {
    await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {

      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(res.user));
    }).catch(err => {
      localStorage.clear();
      this.router.navigate(['login']);
    });

  }

  async logon() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
