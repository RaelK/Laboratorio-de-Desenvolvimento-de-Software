package service;

import model.EmpresaParceira;
import org.springframework.stereotype.Service;
import repository.EmpresaParceiraRepository;

import java.util.List;

@Service
public class EmpresaParceiraService {

    private final EmpresaParceiraRepository empresaRepository;

    public EmpresaParceiraService(EmpresaParceiraRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    public List<EmpresaParceira> findAll() {
        return empresaRepository.findAll();
    }

    public EmpresaParceira findById(Long id) {
        return empresaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmpresaParceira não encontrada: " + id));
    }

    public EmpresaParceira create(EmpresaParceira empresa) {
        empresa.setId(null);
        return empresaRepository.save(empresa);
    }

    public EmpresaParceira update(Long id, EmpresaParceira updated) {
        EmpresaParceira existing = findById(id);
        existing.setNome(updated.getNome());
        existing.setEmail(updated.getEmail());
        existing.setLogin(updated.getLogin());
        existing.setSenha(updated.getSenha());
        return empresaRepository.save(existing);
    }

    public void delete(Long id) {
        EmpresaParceira existing = findById(id);
        empresaRepository.delete(existing);
    }
}
