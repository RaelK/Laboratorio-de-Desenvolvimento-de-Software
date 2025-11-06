package service;

import model.Aluno;
import model.Resgate;
import model.Vantagem;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.AlunoRepository;
import repository.ResgateRepository;
import repository.VantagemRepository;

import java.util.Date;
import java.util.UUID;

@Service
public class ResgateService {

    private final ResgateRepository resgateRepository;
    private final VantagemRepository vantagemRepository;
    private final AlunoRepository alunoRepository;

    public ResgateService(ResgateRepository resgateRepository, VantagemRepository vantagemRepository, AlunoRepository alunoRepository) {
        this.resgateRepository = resgateRepository;
        this.vantagemRepository = vantagemRepository;
        this.alunoRepository = alunoRepository;
    }

    @Transactional
    public Resgate resgatar(Long alunoId, Long vantagemId) {
        Aluno a = alunoRepository.findById(alunoId).orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado: " + alunoId));
        Vantagem v = vantagemRepository.findById(vantagemId).orElseThrow(() -> new ResourceNotFoundException("Vantagem não encontrada: " + vantagemId));

        if (a.getSaldoMoedas() < v.getCustoEmMoedas()) {
            throw new IllegalArgumentException("Saldo insuficiente para resgate");
        }

        a.setSaldoMoedas(a.getSaldoMoedas() - v.getCustoEmMoedas());
        alunoRepository.save(a);

        Resgate r = Resgate.builder()
                .data(new Date())
                .codigoCupom(UUID.randomUUID().toString())
                .aluno(a)
                .vantagem(v)
                .empresaParceira(v.getEmpresaParceira())
                .build();

        return resgateRepository.save(r);
    }
}
