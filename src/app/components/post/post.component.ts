/* eslint-disable no-underscore-dangle */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../interfaces/posts.interface';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { PostsService } from '../../services/posts.service';
import { DataLocalService } from '../../services/data-local.service';
import { SocialService } from '../../services/social.service';
import { Social } from '../../interfaces/social.interface';
import { UsuarioService } from '../../services/usuario.service';


const URL = environment.url;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Output() removePost = new EventEmitter();
  @Input() post: Post = {};
  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };
  socialData: Social = {};
  favoritos: Post [] = [];
  isLike = false;

  constructor(private socialSharing: SocialSharing, private postsService: PostsService,
    private socialService: SocialService) { }

  async ngOnInit() {
    if (this.socialService.posts.some(post => post._id === this.post._id)) {
      this.isLike = true;
    }
  }

  // Compartir publicación
  async share() {
    // eslint-disable-next-line max-len
    await this.socialSharing.share(this.post.message, this.post.usuario.username, this.post.imgs.map(img => `${URL}/posts/imagen/${this.post.usuario._id}/${img}`) || []);
  }

  // Gestión de likes
  async like() {

    this.isLike = !this.isLike;
    if (this.isLike) {
      this.post.favs++;
      await this.socialService.addSocialData(this.post, 'favoritos');
    } else {
      this.post.favs--;
      await this.socialService.removeSocialData(this.post, 'favoritos');
      this.removePost.emit(this.post);
    }
    await this.postsService.updatePosts(this.post);
  }
}
