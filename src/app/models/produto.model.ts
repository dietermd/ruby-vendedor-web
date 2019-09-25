export class Model {
  constructor(objeto?) {
    Object.assign(this, objeto);
  }
}

export class Produto extends Model {
  id?: number
  vendedor_uid?: string;
  nome?: string;
  preco?: number;
  descricao?: string;
  imagem_url?: string;
}