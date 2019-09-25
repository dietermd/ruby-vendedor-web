import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AngularFireStorage } from "@angular/fire/storage";
import { Produto } from "../../../app/models/produto.model";
import { Queries } from "../../../app/services/queries.service";

@Component({
  selector: 'page-inserirProduto',
  templateUrl: 'inserirProduto.html'
})
export class InserirProdutoPage implements OnInit {

  private inserirProdutoFormGoup: FormGroup;
  private imagem: File = null;
  imgPreviewUrl: string | ArrayBuffer = null;

  constructor(public navCtrl: NavController, private navParams: NavParams, private storage: AngularFireStorage, private toastCtrl: ToastController, private queries: Queries) {}
  
  ngOnInit() {
    const DINHEIRO_VALIDATION = /^[0-9]+\.[0-9]{2}$/;
    this.inserirProdutoFormGoup = new FormGroup({
      nomeProduto: new FormControl(null, [Validators.required]),
      preco: new FormControl(null, [Validators.required, Validators.pattern(DINHEIRO_VALIDATION)]),
      descricao: new FormControl(null)
    });
  }

  get nomeProduto() { return this.inserirProdutoFormGoup.get('nomeProduto'); }
  get preco() { return this.inserirProdutoFormGoup.get('preco'); }
  get descricao() { return this.inserirProdutoFormGoup.get('descricao'); }

  onFileSelected(event: any, inputFileImagem: HTMLInputElement) {
    const files = event.target.files;
    files.length > 0 ? this.imagem = files[0] : this.imagem = null;
    if(this.imagem) {
      if (this.imagem.type.match(/image\/(png|jfif|pjpeg|jpeg|pjp|jpg)/) == null) {
        this.imagem = null;
        inputFileImagem.value = null;
        this.imgPreviewUrl = null;
        const toast = this.toastCtrl.create({
          message: 'Apenas imagens são permitidas.',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.imagem);
      reader.onload = (_event) => {
        this.imgPreviewUrl = reader.result;
      }
    }
  }

  montarProduto() {
    const novoProduto = new Produto({
      vendedor_uid: this.navParams.get('uid'), 
      nome: this.nomeProduto.value,
      preco: +this.preco.value,
      descricao: this.getDescricao(this.descricao.value),
      imagem_url: null
    });
    if(this.imagem) {
      const imgID = this.uuidv4();
      const storageRef = this.storage.ref('produtos/' + imgID);
      storageRef.put(this.imagem).then(() => {
        storageRef.getDownloadURL().subscribe(url => {
          novoProduto.imagem_url = url;
          this.inserirProduto(novoProduto);
        });
      });      
    } else {
      this.inserirProduto(novoProduto);
    }
  }

  inserirProduto(novoProduto: Produto) {
    this.queries.inserirProduto(novoProduto).subscribe(res => {
      console.log(res);
      const toast = this.toastCtrl.create({
        message: 'Novos dados inseridos!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      const resolve = this.navParams.get('resolve');
      this.navCtrl.pop().then(() => resolve(true));
    });
  }

  getDescricao(descricao: string) {
    return (!descricao || descricao.trim() === '') ? null : descricao;
  }

  fecharModal() {
    this.navCtrl.pop();
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }  
}

