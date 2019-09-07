export class Model {
  constructor(objeto?) {
    Object.assign(this, objeto);
  }
}

export class Produto extends Model {
  uid?: string;
  nomeProduto?: string;
  preco?: string;
  descricao?: string;
  ativo?: boolean;
  imagem?: any;
}