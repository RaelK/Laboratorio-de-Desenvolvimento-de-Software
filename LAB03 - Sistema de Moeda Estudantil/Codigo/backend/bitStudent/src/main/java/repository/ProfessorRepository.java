package repository;

import model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    /**
     * Busca um professor pelo campo login.
     * Usado durante o processo de autenticação.
     * 
     * @param login Login do professor
     * @return Optional contendo o professor se encontrado
     */
    Optional<Professor> findByLogin(String login);

}
