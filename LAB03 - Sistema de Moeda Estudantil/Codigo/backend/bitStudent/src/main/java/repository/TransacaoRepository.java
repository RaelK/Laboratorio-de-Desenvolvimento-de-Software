package repository;

import model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    List<Transacao> findByProfessorId(Long idProfessor);

    List<Transacao> findByAlunoId(Long idAluno);
}
