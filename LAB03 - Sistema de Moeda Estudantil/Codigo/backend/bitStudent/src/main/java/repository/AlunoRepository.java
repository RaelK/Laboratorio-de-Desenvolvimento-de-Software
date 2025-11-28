package repository;

import model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    /**
     * Busca um aluno pelo campo login.
     * Usado durante o processo de autenticação.
     * 
     * @param login Login do aluno
     * @return Optional contendo o aluno se encontrado
     */
    Optional<Aluno> findByLogin(String login);

}
