package repository;

import model.EmpresaParceira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpresaParceiraRepository extends JpaRepository<EmpresaParceira, Long> {

    /**
     * Busca uma empresa parceira pelo campo login.
     * Usado durante o processo de autenticação.
     * 
     * @param login Login da empresa
     * @return Optional contendo a empresa se encontrada
     */
    Optional<EmpresaParceira> findByLogin(String login);

}
