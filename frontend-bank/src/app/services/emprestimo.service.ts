import { Injectable } from '@angular/core';
import { Emprestimo } from '../models/emprestimo.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Moeda } from '../models/moeda.model';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {
  private apiUrl = 'http://localhost:8080/emprestimo';
  private apiUrlBc = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json';
  private apiUrlBcCotacao = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia';
  private emprestimos: Emprestimo[] = [];

  constructor(private http: HttpClient) {}

  listar(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.apiUrl);
  }

  adicionar(emprestimo: Omit<Emprestimo, 'id'>): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(this.apiUrl, emprestimo);
  }

  atualizar(emprestimo: Emprestimo): Observable<Emprestimo> {
    return this.http.put<Emprestimo>(this.apiUrl, emprestimo);
  }

  remover(id: number): Observable<void> {
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarPorId(id: number): Emprestimo | undefined {
    return this.emprestimos.find(e => e.id === id);
  }

  // Método auxiliar para cálculo de meses entre datas
  calcularMeses(dataInicio: Date, dataFim: Date): number {
    if(!dataInicio || !dataFim) {
      return 0;
    }
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    
    const diff = (fim.getFullYear() - inicio.getFullYear()) * 12;
    return diff + (fim.getMonth() - inicio.getMonth());
  }


  calcularValorFinal(valorObtidoEmprestimo: number, taxaJurosMensal: number, meses: number): number {

    var valorTotal = valorObtidoEmprestimo * Math.pow((1 + taxaJurosMensal / 100), meses);
    
    return valorTotal;
  }

  listarMoedas(): Observable<Moeda[]> {
    return this.http
      .get<{value: Moeda[] }>(this.apiUrlBc)
      .pipe(map(r => r.value));
  }

  cotacaoMoeda(moeda: string, data: string): Observable<number> {
    const url = `${this.apiUrlBcCotacao}(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${moeda}'&@dataCotacao='${data}'&$top=100&$format=json`;
    return this.http.get<{value: any[]}>(url).pipe(
      map(r => {
        console.log(r)
        const cotacao5 = r.value[4]?.cotacaoCompra ?? 0;
        const cotacao1 = r.value[0]?.cotacaoCompra ?? 0;
        return cotacao5 !== 0 ? cotacao5 : cotacao1;
        
      })
    );
  }
}
