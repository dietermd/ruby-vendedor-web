import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NavController, NavParams, ToastController, AlertController } from "ionic-angular";
import { take } from 'rxjs/operators';

import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Produto } from "../../../app/models/produto.model";

@Component({
  templateUrl: 'alterarProduto.html'
})
export class AlterarProdutoPage implements OnInit {

  label: string;
  private alterarProdutoFormGoup: FormGroup;
  private imagem: File = null;
  imgPreviewUrl: string | ArrayBuffer = null;


  private produto: Produto;

  constructor(public navCtrl: NavController, private navParams: NavParams, private db: AngularFirestore, private storage: AngularFireStorage, private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
    const DINHEIRO_VALIDATION = /^[0-9]+\.[0-9]{2}$/;
    this.alterarProdutoFormGoup = new FormGroup({
      nomeProduto: new FormControl(null, [Validators.required]),
      preco: new FormControl(null, [Validators.required, Validators.pattern(DINHEIRO_VALIDATION)]),
      descricao: new FormControl(null),
      ativo: new FormControl(true, [Validators.required])
    });
    this.db.collection('produtos').doc(this.navParams.get('produtoID')).get().pipe(take(1)).subscribe(snap => {
      this.produto = new Produto(snap.data());
      this.label = this.produto.nomeProduto;

      this.nomeProduto.setValue(this.produto.nomeProduto);
      this.preco.setValue(this.produto.preco);
      this.descricao.setValue(this.produto.descricao);
      this.ativo.setValue(this.produto.ativo);

      this.imgPreviewUrl = this.produto.imagem ? this.produto.imagem.imagemURL : null;
    });
  }

  get nomeProduto() { return this.alterarProdutoFormGoup.get('nomeProduto'); }
  get preco() { return this.alterarProdutoFormGoup.get('preco'); }
  get descricao() { return this.alterarProdutoFormGoup.get('descricao'); }
  get ativo() { return this.alterarProdutoFormGoup.get('ativo'); }

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
    let produtoAlterado = {
      uid: this.produto.uid,
      nomeProduto: this.nomeProduto.value,
      preco: this.preco.value,
      descricao: this.descricao.value,
      ativo: this.ativo.value,
      imagem: null
    }
    if (this.imagem) {
      if (this.produto.imagem && this.produto.imagem.imagemURL !== this.imgPreviewUrl) {
        this.storage.ref('produtos/' + this.produto.imagem.imagemID).delete();
      }
      const imgID = uuidv4();
      const storageRef = this.storage.ref('produtos/' + imgID);
      storageRef.put(this.imagem).then(() => {
        storageRef.getDownloadURL().subscribe(url => {
          produtoAlterado.imagem = { imagemID: imgID, imagemURL: url };
          console.log(produtoAlterado);
          this.alterarProduto(produtoAlterado);
        });
      });
    } else {
      this.alterarProduto(produtoAlterado);
    }
  }

  alterarProduto(produtoAlterado: object) {
    this.db.collection('produtos').doc(this.navParams.get('produtoID')).set(produtoAlterado).then(() => {
      const toast = this.toastCtrl.create({
        message: 'Novos dados inseridos!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.fecharModal();
    });
  }

  confirmarExcluir() {
    const confirm = this.alertCtrl.create({
      title: 'Confirmar Exclusão',
      message: 'Deseja mesmo excluir ' + this.produto.nomeProduto + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: null
        },
        {
          text: 'Excluir',
          handler: () => {
            this.excluirProduto();
          }
        }
      ]
    });
    confirm.present();
  }

  excluirProduto() {
    if (this.produto.imagem) {
      this.storage.ref('produtos/' + this.produto.imagem.imagemID).delete();
    }
    this.db.collection('produtos').doc(this.navParams.get('produtoID')).delete().then(() => {
      const toast = this.toastCtrl.create({
        message: 'Produto excluido!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.fecharModal();
    });
  }

  fecharModal() {
    this.navCtrl.pop();
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}