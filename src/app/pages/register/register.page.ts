import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionSheetController, IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // Hace referencia a un elemento del DOM
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  registerUser: Usuario = {
    email: '',
    password: '',
    name: '',
    username: '',
    avatar: ''
  };

  constructor(private usuarioService: UsuarioService,
    private navCtrl: NavController, private uiService: UiServiceService,
    private actionCtrl: ActionSheetController, private socialService: SocialService) { }

  async ngOnInit() {
    await this.slides.lockSwipes(true);
  }

  // Registrar un usuario
  async register(fRegister: NgForm) {
    if (fRegister.invalid) { return; }
    const valido = await this.usuarioService.register(this.registerUser);

    if (valido) {
      // Navegar a tabs
      const usuario = await this.usuarioService.getUsuario();
      await this.socialService.createSocialData({ usuario });
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // Mostrar alerta de que el login no es correcto
      await this.uiService.presentAlert('El usuario o email ya existen');
    }

  }
}
