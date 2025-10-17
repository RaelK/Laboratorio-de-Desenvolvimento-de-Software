package service;

import model.InstituicaoEnsino;
import org.springframework.stereotype.Service;
import repository.InstituicaoEnsinoRepository;

import java.util.List;

@Service
public class InstituicaoEnsinoService {

    private final InstituicaoEnsinoRepository instituicaoRepository;

    public InstituicaoEnsinoService(InstituicaoEnsinoRepository instituicaoRepository) {
        this.instituicaoRepository = instituicaoRepository;
    }

    public List<InstituicaoEnsino> findAll() {
        return instituicaoRepository.findAll();
    }

    public InstituicaoEnsino findById(Long id) {
        return instituicaoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InstituicaoEnsino não encontrada: " + id));
    }

    public InstituicaoEnsino create(InstituicaoEnsino instituicao) {
        instituicao.setId(null);
        return instituicaoRepository.save(instituicao);
    }

    public InstituicaoEnsino update(Long id, InstituicaoEnsino updated) {
        InstituicaoEnsino existing = findById(id);
        existing.setNome(updated.getNome());
        return instituicaoRepository.save(existing);
    }

    public void delete(Long id) {
        InstituicaoEnsino existing = findById(id);
        instituicaoRepository.delete(existing);
    }
}
