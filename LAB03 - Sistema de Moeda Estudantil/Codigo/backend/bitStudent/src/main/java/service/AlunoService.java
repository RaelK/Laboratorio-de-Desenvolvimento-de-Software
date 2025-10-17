package service;

import model.Aluno;
import org.springframework.stereotype.Service;
import repository.AlunoRepository;

import java.util.List;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    public List<Aluno> findAll() {
        return alunoRepository.findAll();
    }

    public Aluno findById(Long id) {
        return alunoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado: " + id));
    }

    public Aluno create(Aluno aluno) {
        aluno.setId(null);
        return alunoRepository.save(aluno);
    }

    public Aluno update(Long id, Aluno updated) {
        Aluno existing = findById(id);
        existing.setNome(updated.getNome());
        existing.setEmail(updated.getEmail());
        existing.setCpf(updated.getCpf());
        existing.setLogin(updated.getLogin());
        existing.setSenha(updated.getSenha());
        existing.setRg(updated.getRg());
        existing.setEndereco(updated.getEndereco());
        existing.setCurso(updated.getCurso());
        existing.setSaldoMoedas(updated.getSaldoMoedas());
        existing.setInstituicaoEnsino(updated.getInstituicaoEnsino());
        return alunoRepository.save(existing);
    }

    public void delete(Long id) {
        Aluno existing = findById(id);
        alunoRepository.delete(existing);
    }
}
