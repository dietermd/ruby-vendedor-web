export class Model {
    constructor(objeto?) {
        Object.assign(this, objeto);
    }
}
//classe usuario extendendo a classe Model
export class Usuario extends Model {
    uid?: string;
    nomeResponsavel?: string;
    cnpj?: string;
    nomeEstabelecimento?: string;
    localizacao?: string;

    dadosCadastrados(): boolean {        
        if(this.nomeResponsavel && this.cnpj && this.nomeEstabelecimento && this.localizacao) {
            return true;
        }
        return false;
    }
}