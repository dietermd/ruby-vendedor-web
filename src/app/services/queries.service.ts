import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/auth";

import { rubyApiServerConfig } from "../environments/environment";

@Injectable()
export class Queries {
  
  private headers: object = { headers: { 'Content-Type': 'application/json', 'ApiKey': rubyApiServerConfig.apiKey } };

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}
  
  obterUid(){
    return this.afAuth.auth.currentUser.uid;
  }

  obterVendedor() {
    const url = rubyApiServerConfig.baseUrl + 'vendedor/' + this.afAuth.auth.currentUser.uid;
    return this.http.get(url, this.headers);
  }

  inserirVendedor(vendedor: any) {
    const url = rubyApiServerConfig.baseUrl + 'vendedor/inserir';
    return this.http.post(url, vendedor, this.headers);
  }

  alterarVendedor(vendedor: any) {
    const url = rubyApiServerConfig.baseUrl + 'vendedor/alterar';
    return this.http.put(url, vendedor, this.headers);
  }

  obterTodosProdutos() {
    const url = rubyApiServerConfig.baseUrl + 'vendedor/produtos/' + this.afAuth.auth.currentUser.uid;
    return this.http.get(url, this.headers);
  }

  inserirProduto(produto: any) {
    console.log(produto)
    const url = rubyApiServerConfig.baseUrl + 'produto/inserir';
    return this.http.post(url, produto, this.headers);
  }

  obterProduto(id: number) {
    const url = rubyApiServerConfig.baseUrl + 'produto/' + id;
    return this.http.get(url, this.headers);
  }

  alterarProduto(produto: any) {
    const url = rubyApiServerConfig.baseUrl + 'produto/alterar';
    return this.http.put(url, produto, this.headers);
  }

  excluirProduto(id: number) {
    const url = rubyApiServerConfig.baseUrl + 'produto/excluir/' + id;
    return this.http.delete(url, this.headers);
  }  
}