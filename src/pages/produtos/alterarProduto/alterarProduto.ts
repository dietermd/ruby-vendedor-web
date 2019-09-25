import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NavController, NavParams, ToastController, AlertController } from "ionic-angular";

import { AngularFireStorage } from "@angular/fire/storage";
import { Produto } from "../../../app/models/produto.model";
import { Queries } from "../../../app/services/queries.service";

@Component({
  templateUrl: 'alterarProduto.html'
})
export class AlterarProdutoPage implements OnInit {

  label: string;
  private alterarProdutoFormGoup: FormGroup;
  private imagem: File = null;
  imgPreviewUrl: string | ArrayBuffer = null;
  private produto: Produto;

  constructor(public navCtrl: NavController, private navParams: NavParams, private queries: Queries, private storage: AngularFireStorage, private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
    const DINHEIRO_VALIDATION = /^[0-9]+\.[0-9]{2}$/;
    this.alterarProdutoFormGoup = new FormGroup({
      nomeProduto: new FormControl(null, [Validators.required]),
      preco: new FormControl(null, [Validators.required, Validators.pattern(DINHEIRO_VALIDATION)]),
      descricao: new FormControl(null),
    });
    
    this.produto = new Produto(this.navParams.get('produto'));
    this.label = this.produto.nome;
    this.nomeProduto.setValue(this.produto.nome);
    this.preco.setValue(this.produto.preco);
    this.descricao.setValue(this.produto.descricao);
    this.imgPreviewUrl = this.produto.imagem_url ? this.produto.imagem_url : null;
  }

  get nomeProduto() { return this.alterarProdutoFormGoup.get('nomeProduto'); }
  get preco() { return this.alterarProdutoFormGoup.get('preco'); }
  get descricao() { return this.alterarProdutoFormGoup.get('descricao'); }

  onFileSelected(event: any, inputFileImagem: HTMLInputElement) {
    const files = event.target.files;
    files.length > 0 ? this.imagem = files[0] : this.imagem = null;
    if (this.imagem) {
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
    const produtoAlterado = new Produto({
      id: this.produto.id,
      vendedor_id: this.produto.vendedor_uid,
      nome: this.nomeProduto.value,
      preco: this.preco.value,
      descricao: this.descricao.value,
      imagem: null
    });
    if (this.imagem) {
      if (this.produto.imagem_url) {
        this.storage.storage.refFromURL(this.produto.imagem_url).delete();  
      }          
      const imgID = this.uuidv4();
      const storageRef = this.storage.ref('produtos/' + imgID);
      storageRef.put(this.imagem).then(() => {
        storageRef.getDownloadURL().subscribe(url => {
          produtoAlterado.imagem_url = url;
          console.log(produtoAlterado);
          this.alterarProduto(produtoAlterado);
        });
      });
    } else {
      this.alterarProduto(produtoAlterado);
    }
  }

  alterarProduto(produtoAlterado: Produto) {
    this.queries.alterarProduto(produtoAlterado).subscribe(res => {
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

  confirmarExcluir() {
    const confirm = this.alertCtrl.create({
      title: 'Confirmar Exclusão',
      message: `Deseja mesmo excluir ${this.produto.nome}?`,
      buttons: [{text: 'Cancelar', handler: null}, {text: 'Excluir', handler: () => {this.excluirProduto();}}]
    });
    confirm.present();
  }

  excluirProduto() {
    if (this.produto.imagem_url) {
      this.storage.storage.refFromURL(this.produto.imagem_url).delete();
    }
    this.queries.excluirProduto(this.produto.id).subscribe(res => {
      console.log(res);
      const toast = this.toastCtrl.create({
        message: 'Produto excluido!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      const resolve = this.navParams.get('resolve');
      this.navCtrl.pop().then(() => resolve(true));
    });
  }

  fecharModal() {
    this.navCtrl.pop();
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

