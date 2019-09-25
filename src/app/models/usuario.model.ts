export class Model {
    constructor(objeto?) {
        Object.assign(this, objeto);
    }
}

//classe usuario extendendo a classe Model
export class Usuario extends Model {
    id?: number;
    uid?: string;
    nome_responsavel?: string;
    cnpj?: string;
    nome_estabelecimento?: string;
    coordenada?: any;

    dadosCadastrados(): boolean {        
        if(this.id && this.nome_responsavel && this.cnpj && this.nome_estabelecimento && this.coordenada) {
            return true;
        }
        return false;
    }
}