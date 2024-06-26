import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from '../../shared/form/form.component';
import { InputTextComponent } from '../../shared/input-text/input-text.component';
import { ButtonPrimaryComponent } from '../../shared/button-primary/button-primary.component';
import { ListaService, Lista } from '../../../services/lista.service';
import { UserService } from '../../../services/user.service';
import { convertToNumber } from '../../../utils/number-utils';
import { faList, faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cadastro-lista',
  standalone: true,
  imports: [
    FormComponent,
    InputTextComponent,
    ButtonPrimaryComponent,
    FormsModule,
  ],
  templateUrl: './cadastro-lista.component.html',
  styleUrls: ['./cadastro-lista.component.scss'],
})
export class CadastroListaComponent implements OnInit {
  nomeLista: string = '';
  saldoLista: string = '';
  listaId: string | null = null;
  isEditing: boolean = false;

  faList = faList;
  faDollarSign = faDollarSign;

  constructor(
    private listaService: ListaService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.listaId = params['id'];
        this.isEditing = true;
        if (this.listaId) this.carregarLista(this.listaId);
      }
    });
  }

  carregarLista(id: string) {
    this.listaService.getListaById(id).subscribe(
      (lista: Lista) => {
        this.nomeLista = lista.nome;
        this.saldoLista = lista.saldo.toString().replace('.', ',');
      },
      (error) => {
        this.toastr.error('Erro ao carregar lista');
        console.error('Erro ao carregar lista:', error);
      }
    );
  }

  salvarLista() {
    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        const saldoNumerico = convertToNumber(this.saldoLista);
        if (isNaN(saldoNumerico)) {
          this.toastr.error('Saldo inválido');
          return;
        }
        const listaData: Lista = {
          nome: this.nomeLista,
          saldo: saldoNumerico,
          userId: user.id,
          valorDisponivel: saldoNumerico,
        };

        if (this.isEditing && this.listaId !== null) {
          this.listaService.updateLista(this.listaId, listaData).subscribe(
            () => {
              this.toastr.success('Lista atualizada com sucesso!');
              this.router.navigate(['/listas']);
            },
            (error) => {
              this.toastr.error('Erro ao atualizar lista');
              console.error('Erro ao atualizar lista:', error);
            }
          );
        } else {
          this.listaService.createLista(listaData).subscribe(
            () => {
              this.toastr.success('Lista cadastrada com sucesso!');
              this.router.navigate(['/listas']);
            },
            (error) => {
              this.toastr.error('Erro ao cadastrar lista');
              console.error('Erro ao cadastrar lista:', error);
            }
          );
        }
      } else {
        this.toastr.error('Usuário não está logado.');
        this.router.navigate(['/login']);
      }
    });
  }

  onSaldoListaChange(value: string) {
    this.saldoLista = value;
  }
}
