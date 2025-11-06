package service;

import model.Professor;
import org.springframework.stereotype.Service;
import repository.ProfessorRepository;

import java.util.List;

@Service
public class ProfessorService {

    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    public List<Professor> findAll() {
        return professorRepository.findAll();
    }

    public Professor findById(Long id) {
        return professorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado: " + id));
    }

    public Professor create(Professor professor) {
        professor.setId(null);
        return professorRepository.save(professor);
    }

    public Professor update(Long id, Professor updated) {
        Professor existing = findById(id);
        existing.setNome(updated.getNome());
        existing.setEmail(updated.getEmail());
        existing.setCpf(updated.getCpf());
        existing.setLogin(updated.getLogin());
        existing.setSenha(updated.getSenha());
        existing.setDepartamento(updated.getDepartamento());
        existing.setSaldoMoedas(updated.getSaldoMoedas());
        return professorRepository.save(existing);
    }

    public void delete(Long id) {
        Professor existing = findById(id);
        professorRepository.delete(existing);
    }

}
